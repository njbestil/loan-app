import React, { useState, useEffect } from 'react';
import { Toast, Button, Checkbox, Label, TextInput, Select, Breadcrumb, Spinner, Modal, Textarea, Radio, Progress, Timeline, Flowbite, Table, Card } from "flowbite-react";
import { HiCheck, HiExclamation, HiHome, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineExclamationCircle,
    HiOutlineCheckCircle, HiOutlineCash, HiOutlineShieldExclamation, HiArrowNarrowRight } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import userService from "../../../services/userService";
import dataService from '../../../services/dataService.js';
import { useLocation, useNavigate } from "react-router-dom";

const useQueryParams = () => {
   return new URLSearchParams(useLocation().search);
};

const status_pass = "pass";
const status_fail = "fail";

function Evaluation() {
    const customTheme = {
        progress: {
            bar: "space-x-2 rounded-full text-center font-medium leading-none text-white bg-red-600 dark:bg-red-500 h-4 flex items-center justify-center text-sm"
        },
    };

    const navigate = useNavigate();
    const query = useQueryParams();
    
    const userId = parseInt(query.get("usrId"));
    const creditScoreId = parseInt(query.get("crdId"));
    const riskScoreId = parseInt(query.get("rskId"));
    const amount = query.get("amt");
    const [toastMessage, setToastMessage] = useState(null);
    const [step, setStep] = useState(1);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [loading, setLoading] = useState(false);

    // User
    const [user, setUser] = useState({});

    // Credit score
    const [creditScoreData, setCreditScoreData] = useState(null);
    const [creditScore, setCreditScore] = useState(0);
    const [creditPassingScore, setCreditPassingScore] = useState(null);
    const [promptCreditScore, setPromptCreditScore] = useState(false);
    const [creditScoreResult, setCreditScoreResult] = useState({});
    const [creditScoreForm, setCreditScoreForm] = useState({
        amount: amount
    });

    // Check if all fields are filled
    const isCreditScoreFormComplete = Object.values(creditScoreForm).every(value => value !== null && value !== "");

    
    // Risk rating score
    const [riskScoreData, setRiskScoreData] = useState(null);
    const [riskScore, setRiskScore] = useState(0);
    const [riskPassingScore, setRiskPassingScore] = useState({});
    const [riskRating, setRiskRating] = useState({});
    const [riskScoreResult, setRiskScoreResult] = useState({});
    const [riskScoreForm, setRiskScoreForm] = useState({});

    // Check if all fields are filled
    const isRiskScoreFormComplete = Object.values(riskScoreForm).every(value => value !== null && value !== "");

    useEffect(() => {
        const getCreditScoreData = async () => {
            try {
                const response = await dataService.getCreditScore();

                // Ensure creditScore is valid
                if (!response || !response.data) {
                    throw new Error("Invalid data received");
                }

                // Add "name" field for each criteria and collect new form state
                const cs = (response.data).find(item => item.id === creditScoreId);
                const csForm = JSON.parse(cs.score_form);
                const csPassingScore = JSON.parse(cs.passing_score)[0];
          
                const updatedFormState = {};
                csForm.forEach(category => {
                    category.criteria.forEach(criteria => {
                        criteria.name = `creditscore_${criteria.id}`;
                        updatedFormState[criteria.name] = null; // Set initial value for the form
                    });
                });

                // Update state after processing data
                setCreditScoreForm(prevState => ({
                    ...prevState,
                    ...updatedFormState
                }));

                if(csPassingScore) setCreditPassingScore(csPassingScore);
                if(csForm) setCreditScoreData(csForm);
            } catch (error) {
                console.error("Error fetching credit score data:", error);
            } finally {
                setLoadingScreen(false);
            }
        };

        const getRiskScoreData = async () => {
            try {
                const response = await dataService.getRiskScore();

                // Ensure creditScore is valid
                if (!response || !response.data) {
                    throw new Error("Invalid data received");
                }

                // Add "name" field for each criteria and collect new form state
                const rs = (response.data).find(item => item.id === riskScoreId);
                const rsForm = JSON.parse(rs.score_form);
                const rsPassingScore = JSON.parse(rs.passing_score);

                const updatedFormState = {};
                rsForm.forEach(category => {
                    category.criteria.forEach(criteria => {
                        criteria.name = `riskscore_${criteria.id}`;
                        updatedFormState[criteria.name] = null; // Set initial value for the form
                    });
                });

                // Update state after processing data
                setRiskScoreForm(prevState => ({
                    ...prevState,
                    ...updatedFormState
                }));

                if(rsPassingScore) setRiskPassingScore(rsPassingScore);
                if(rsForm) setRiskScoreData(rsForm);
            } catch (error) {
                console.error("Error fetching credit score data:", error);
            } finally {
                setLoadingScreen(false);
            }
        };

        const fetchUsers = async () => {
            try {
                setLoadingScreen(true);
                const response = await userService.getUsers();
                
                // Filter users with role "user"
                const filteredUsers = response.data.filter(user => user.id === userId)[0];

                if(response.success) setUser(filteredUsers); // Update the user list with filtered data
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoadingScreen(false);
            }
        };

        getCreditScoreData();
        getRiskScoreData();
        fetchUsers();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "amount") {
            let numericValue = value.replace(/[^0-9]/g, "");

            // Convert to implied decimal (last two digits as decimal places)
            let formattedValue = "";
            if (numericValue.length === 1) {
               formattedValue = `0.0${numericValue}`;
            } else if (numericValue.length === 2) {
               formattedValue = `0.${numericValue}`;
            } else {
               let integerPart = numericValue.slice(0, -2);
               let decimalPart = numericValue.slice(-2);
               formattedValue = `${parseInt(integerPart, 10)}.${decimalPart}`;
            }

            setCreditScoreForm(prevState => ({
                ...prevState,
                [name]: formattedValue
            }));
        } else if(step === 1) {
            setCreditScoreForm(prevState => ({
                ...prevState,
                [name]: value === null ? "" : value
            }));
        } else if(step === 2) {
            setRiskScoreForm(prevState => ({
                ...prevState,
                [name]: value === null ? "" : value
            }));
        }
    };

    const handleFormButton = (direction) => () => {
        window.scrollTo(0, 0); 
        console.log(step)
        if (direction === "next" && step <= 3) {
            switch (step) {
                case 1:
                    // Sum only valid credit scores, excluding "applicant" and "amount"
                    const sumCreditScores = Object.entries(creditScoreForm)
                        .filter(([key, value]) => key.startsWith("creditscore") && !isNaN(value) && value !== "")  // Filter keys that start with "creditscore"
                        .reduce((sum, [key, value]) => sum + parseInt(value, 10), 0);  // Sum the numeric values

                    setCreditScore(sumCreditScores);

                    // Compare sum with "from" value
                    console.log(sumCreditScores, creditPassingScore.from)

                    console.log("Credit score", sumCreditScores, creditScoreForm);

                    const creditScoreResult = getCreditScoreResult(creditScoreData, creditScoreForm);
                    setCreditScoreResult(creditScoreResult);
                    console.log("creditScoreResult", creditScoreResult)

                    if (sumCreditScores < creditPassingScore.from) {
                        setPromptCreditScore(true);
                        return;
                    }
                    break;

                case 2:
                    // Sum of risk scores
                    const sumRiskScores = Object.entries(riskScoreForm)
                    .filter(([key, value]) => key.startsWith("riskscore") && value !== null && value !== undefined && value !== "" && !isNaN(Number(value)))  
                    .reduce((sum, [key, value]) => sum + Number(value), 0);

                    setRiskScore(sumRiskScores);

                    const rr = getRiskCategory(sumRiskScores);
                    setRiskRating(rr);

                    const riskScoreResult = getRiskScoreResult(riskScoreData, riskScoreForm);
                    setRiskScoreResult(riskScoreResult);

                    break;
                case 3:
                    handleSubmit();
                    console.log("step 3")
                    break;
                        
                default:
                    break;
            }

            if(step < 3) setStep(prevStep => prevStep + 1); // Increment step by 1
        } else if (direction === "back") {
            setStep(prevStep => prevStep - 1); // Decrement step by 1
        }
    };

    function getRiskCategory(score) {
        const category = riskPassingScore.find(item => score >= item.from && score <= item.to);
        return category ? category : {};
    };

    const getRiskColor = (progress) => {
        progress = Number(progress);
    
        if (progress > 80) return "green";  // Very Low Risk
        if (progress > 40) return "yellow"; // Moderate Risk
        return "red";  // High Risk
    };

    const getProgress = (rating, totalParts) => {
        // Convert rating and totalParts to numbers
        rating = Number(rating);
        totalParts = Number(totalParts);
    
        // Ensure valid totalParts
        if (isNaN(totalParts) || totalParts <= 0) return 0;
    
        // If rating is invalid, set to highest (out of range)
        if (isNaN(rating) || rating === null || rating === undefined) rating = totalParts + 1;
    
        // Ensure rating is within range, but allow overflow to totalParts + 1
        if (rating < 1) rating = 1;
        if (rating > totalParts + 1) rating = totalParts + 1;
    
        // Calculate progress based on 1 being 100% and out-of-range being 16.67%
        const calc = parseFloat((((totalParts + 2 - rating) / (totalParts + 1)) * 100).toFixed(2));
    
        //console.log("Rating:", rating, "Total Parts:", totalParts, "Progress:", calc + "%");
        return calc;
    };
    

    const getRiskLabel = (rating) => {
        const category = riskPassingScore.find(item => rating == item.value);
        return category !== null && category !== undefined ? category.definition : "Unfit";
    };

    const getCreditScoreResult = (scoringData, applicantScores) => {
        if (!scoringData || !scoringData.length) {
            console.error("Invalid scoring data format");
            return [];
        }
    
        return scoringData.map(category => ({
            category: category.category,
            criteria: category.criteria.map(criteria => {
                const scoreKey = `creditscore_${criteria.id}`;
                const applicantScore = Number(applicantScores[scoreKey]);
    
                // Find the corresponding label based on the applicant's score
                const matchedLabel = criteria.scoring.find(s => s.score === applicantScore)?.label || "Unknown";
    
                return {
                    id: criteria.id,
                    description: criteria.description,
                    score: applicantScore,
                    label: matchedLabel
                };
            })
        }));
    };

    const getRiskScoreResult = (scoringData, applicantScores) => {
        if (!scoringData || !scoringData.length) {
            console.error("Invalid scoring data format");
            return [];
        }
    
        return scoringData.map(category => ({
            category: category.category,
            criteria: category.criteria.map(criteria => {
                const scoreKey = `riskscore_${criteria.id}`;
                const applicantScore = Number(applicantScores[scoreKey]);
    
                // Find the corresponding label based on the applicant's score
                const matchedLabel = criteria.scoring.find(s => s.score === applicantScore)?.label || "Unknown";
    
                return {
                    id: criteria.id,
                    description: criteria.description,
                    score: applicantScore,
                    label: matchedLabel
                };
            })
        }));
    };

    const handleSubmit = async (e = null) => {
        if (e) e.preventDefault(); // Prevent default only if it's an event

        setLoading(true);
        console.log(creditScoreForm);
        console.log(riskScoreForm);
       
        var status = checkStatus();

        const payload = {
            user_id: user.id,
            credit_score_id: creditScoreId,
            risk_score_id: riskScoreId,
            credit_score: creditScore.toString(),
            credit_score_details: JSON.stringify(creditScoreResult),
            risk_score: JSON.stringify(riskRating),
            risk_score_details: JSON.stringify(riskScoreResult),
            remarks: (creditScoreForm.remarks)? creditScoreForm.remarks : null,
            status: status,
        }

        console.log("payload", payload)
       
        try {
            if(!payload.remarks) {
                setToastMessage({ type: "error", message: "Please leave a remark!" });
                return;
            }

            var response = await dataService.createApplication(payload);

            if (response.success) {
                navigate("/home");
            } else {
                handleErrorResponse(response);
            }
        } catch (error) {
            if (!error.success) {
                // Handle API error response (status 404, etc.)
                handleErrorResponse(error.data);
            } else {
                // Handle network errors or unexpected issues
                setToastMessage({ type: "error", message: "Something went wrong. Please try again." });
                console.error("Error:", error);
            }
        } finally {
            setPromptCreditScore(false);
            setLoading(false); // Hide loadingScreen
        }
    };

    const handleErrorResponse = (response) => {
        let errorMessage = response || "Something went wrong!";
  
        if (response) {
           const firstErrorKey = Object.keys(response)[0]; // Get first field with an error
           if (response[firstErrorKey] && response[firstErrorKey].length > 0) {
              errorMessage = response[firstErrorKey][0]; // Get the first error message
           }
        }
  
        setToastMessage({ type: "error", message: errorMessage });
     };
  

    const checkStatus = () => {
        var status;
        if(step == 1 && creditScore >= creditPassingScore.from) status = status_pass;
        else if(step == 3 && riskScore >= 50) {
            status = status_pass;
        }
        else {
            status = status_fail;
        }

        return status;
    }

    if (loadingScreen) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="xl" />
                <span className="ml-2 text-gray-700 dark:text-white">Please wait...</span>
            </div>
        );
    }

    return (
        <Dashboard>
            <div className="max-w p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className='mb-5'>
                    <h5 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        CREDIT SCORE EVALUATION
                    </h5>
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item href="/home" icon={HiHome}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Credit Score Evaluation</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div>
                    <div className="mt-8 sm:mx-auto ">
                        <div className="bg-white py-8 px-4 sm:px-10">
                            <div className="flex justify-between mb-20">
                                {step != 1 && (
                                    <Button color="success" pill onClick={handleFormButton("back")}>
                                        <HiOutlineChevronLeft className="mr-1 h-5 w-5" />
                                        Back
                                    </Button>
                                )}
                                <Button
                                    className="ml-auto"
                                    disabled={
                                        (!isCreditScoreFormComplete && step === 1)
                                        || loading
                                    }
                                    color="success"
                                    pill
                                    onClick={handleFormButton("next")}
                                >
                                    {step === 3 ? (
                                        <>
                                             {loading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                    Finalizing...
                                                    <HiOutlineCheckCircle className="ml-1 h-5 w-5" />
                                                </>
                                            ) : (
                                                <>
                                                    Finish
                                                    <HiOutlineCheckCircle className="ml-1 h-5 w-5" />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            Next
                                            <HiOutlineChevronRight className="ml-1 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div id="steps" className="mx-auto mb-10">
                                <div className="w-full max-w-4xl mx-auto p-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center text-blue-600">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">1</div>
                                            <span className="ml-2 text-sm font-medium">Credit Score</span>
                                        </div>
                                        <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'} mx-4`}></div>
                                        <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}  font-bold`}>2</div>
                                            <span className="ml-2 text-sm font-medium">Credit Risk Rating Score</span>
                                        </div>
                                        <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'} mx-4`}></div>
                                        <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}  font-bold`}>3</div>
                                            <span className="ml-2 text-sm font-medium">Remarks</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {step === 1 && (
                                <div id="step-1">
                                    <div className='mb-10'>
                                        <div className="mb-5 border-b-2 border-gray-400">
                                            <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">APPLICANT DETAILS</h5>
                                        </div>
                                        <div className="grid grid-cols-2 grid-flow-col gap-5">
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="applicant" value="Applicant" />
                                                </div>
                                                <TextInput id="applicant" name="applicant" placeholder='Enter applicant name' value={user.fname+" "+user.lname} shadow disabled />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="amount" value="Amount" />
                                                </div>
                                                <TextInput id="amount" name="amount" type="amount" placeholder='Enter amount' autoComplete="confirmAmount"
                                                    color={(creditScoreForm.amount == null) ? "gray" : (creditScoreForm.amount) ? "success" : "failure"}
                                                    onChange={handleChange} required shadow value={(creditScoreForm.amount == null) ? "" : creditScoreForm.amount} />
                                            </div>
                                        </div>
                                    </div>
                                    {creditScoreData.map((category, index) => (
                                        <div key={index} className="mb-10">
                                            <div className="mb-5 border-b-2 border-gray-400">
                                                <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">{category.category}</h5>
                                            </div>
                                            <div className='grid grid-cols-2 gap-5'>
                                                {category.criteria.map((criterion, idx) => (
                                                    <div key={idx}>
                                                        <div className="capitalize mb-2 block">
                                                            <Label htmlFor={criterion.name} value={criterion.description} />
                                                        </div>
                                                        <Select id={criterion.name} name={criterion.name}
                                                            value={creditScoreForm[criterion.name] || ""}
                                                            color={(creditScoreForm[criterion.name] == null) ? "gray" : (creditScoreForm[criterion.name]) ? "success" : "failure"}
                                                            onChange={handleChange} required shadow>
                                                            <option value="">Select an option</option>
                                                            {criterion.scoring.map((option, optIdx) => (
                                                                <option className='capitalize' key={optIdx} value={option.score}>{option.label}</option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 2 && (
                                <div id="step-2">
                                    <div className='grid grid-cols-[1fr_2fr] gap-4 mb-5'>
                                        <div className='text-center'>
                                            <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">Risk Components</h5>
                                        </div>
                                        <div className='text-center'>
                                            <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">Indicators</h5>
                                        </div>
                                    </div>
                                    {riskScoreData.map((category, index) => (
                                        <div key={index} className='mb-8'>
                                            <div className="mb-5 border-b-2 border-gray-400">
                                                <h5 className="uppercase text-md font-bold tracking-tight text-gray-900 dark:text-white">{category.category}</h5>
                                            </div>

                                            {category.criteria.map((criterion, idx) => (
                                                <div key={idx} className="grid grid-cols-[1fr_2fr] gap-4 mb-5">
                                                    <div className="flex items-center ml-6">
                                                        <Label htmlFor={criterion.name} className="capitalize text-gray-600" value={criterion.description} />
                                                    </div>
                                                    <fieldset className="">
                                                        <div className="flex w-full mx-auto justify-center gap-4">
                                                            {criterion.scoring.map((option, optIdx) => (
                                                                <div key={optIdx} className="flex flex-row w-1/3 items-center gap-4">
                                                                    <Radio
                                                                        id={`${criterion.name}-${option.score}`} // Unique ID
                                                                        name={criterion.name} // Group radios by name
                                                                        value={option.score}
                                                                        checked={riskScoreForm[criterion.name] === String(option.score)} // Ensure correct selection
                                                                        onChange={handleChange} // Update state
                                                                    />
                                                                    <Label htmlFor={`${criterion.name}-${option.score}`} className="capitalize text-xs">
                                                                        {option.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 3 && (
                                <>
                                    <h1 className='ml-1 mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Credit Risk Rating Score - {riskRating.value}</h1>
                                    <Flowbite theme={{ theme: customTheme }}>
                                        <Progress
                                            className='mb-10'
                                            progress={getProgress(riskRating.value, riskPassingScore.length)}
                                            progressLabelPosition="inside"
                                            textLabel={getRiskLabel(riskRating.value)}
                                            size="lg"
                                            color={getRiskColor(getProgress(riskRating.value, riskPassingScore.length))}
                                            labelProgress
                                            labelText
                                            theme={{
                                                label: {
                                                    inside: "absolute inset-0 flex items-center justify-center text-white font-bold",
                                                    outside: "mt-2 text-white",
                                                },
                                            }}
                                        />
                                    </Flowbite>

                                    <div className="w-full mb-10">
                                        <div className="mb-2 block">
                                            <Label htmlFor="remarks" value="Remarks" />
                                        </div>
                                        <Textarea id="remarks" name="remarks" placeholder="Leave a remark..." required rows={4}
                                            value={creditScoreForm.remarks}
                                            onChange={(e) => setCreditScoreForm(prevState => ({
                                                ...prevState,
                                                remarks: e.target.value
                                            }))}
                                        />
                                    </div>

                                    <Timeline className='mb-10'>
                                        <Timeline.Item>
                                            <Timeline.Point icon={HiOutlineCash} />
                                            <Timeline.Content>
                                                <Timeline.Time className='font-semibold text-md text-cyan-600'>Credit Score</Timeline.Time>
                                                <Timeline.Body>
                                                    <p className='my-5 text-sm text-gray-500'>The credit score result provides an evaluation of an applicant's financial reliability based on various criteria, including personal situation and loan history. Each category is assessed using predefined scoring rules, with higher scores indicating lower risk. The final score helps determine the applicant's creditworthiness and eligibility for financial products.</p>

                                                    <div className="flex items-center justify-between gap-4 mb-5">
                                                        <div className="flex items-center gap-2">
                                                            <h2 className="text-lg font-bold text-gray-700">Score:</h2>
                                                            <p className="text-2xl font-semibold text-blue-600">{creditScore +" / "+creditPassingScore.from}</p>
                                                        </div>

                                                        <span
                                                            className={`inline-block px-4 py-2 text-white rounded-full text-lg font-semibold ${creditScore < creditPassingScore.from ? "bg-red-500" : "bg-green-500"}`}
                                                        >
                                                            {creditScore < creditPassingScore.from ? "Failed" : "Passed"}
                                                        </span>
                                                    </div>

                                                    <div className="container mx-auto p-4">
                                                        {creditScoreResult.map((category, index) => (
                                                            <Card key={index} className="mb-6 shadow-md">
                                                                    <h2 className="text-xl font-bold text-gray-800 mb-4">{category.category}</h2>
                                                                    <Table hoverable={true}>
                                                                        <Table.Head>
                                                                            <Table.HeadCell>Description</Table.HeadCell>
                                                                            <Table.HeadCell>Score</Table.HeadCell>
                                                                            <Table.HeadCell>Label</Table.HeadCell>
                                                                        </Table.Head>
                                                                        <Table.Body className="divide-y">
                                                                            {category.criteria.map((item) => (
                                                                                <Table.Row key={item.id} className="bg-white">
                                                                                    <Table.Cell className="font-medium text-gray-900">{item.description}</Table.Cell>
                                                                                    <Table.Cell>{item.score}</Table.Cell>
                                                                                    <Table.Cell>{item.label}</Table.Cell>
                                                                                </Table.Row>
                                                                            ))}
                                                                        </Table.Body>
                                                                    </Table>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </Timeline.Body>
                                            </Timeline.Content>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            <Timeline.Point icon={HiOutlineShieldExclamation} />
                                            <Timeline.Content>
                                                <Timeline.Time className='font-semibold text-md text-cyan-600'>Credit Risk Rating Score</Timeline.Time>
                                                <Timeline.Body>
                                                    <p className='my-5 text-sm text-gray-500'>Credit Risk Rating Score evaluates an individual's financial reliability based on various factors such as age, income source, loan status, and collateral. A higher score indicates lower credit risk and a greater likelihood of loan approval, while a lower score suggests higher risk and potential financial instability.</p>

                                                    <div className="flex items-center justify-between gap-4 mb-5">
                                                        <div className="flex items-center gap-2">
                                                            <h2 className="text-lg font-bold text-gray-700">Score:</h2>
                                                            <p className="text-2xl font-semibold text-blue-600">{riskScore +" / "+100}</p>
                                                            <p className='text-md text-gray-600 font-semibold'>( {riskRating.definition} )</p>
                                                        </div>

                                                        <span className={`inline-block px-4 py-2 text-white rounded-full text-lg font-semibold ${riskScore <= 50 ? "bg-red-500" : "bg-green-500"}`}
                                                        >
                                                            {riskScore <= 50 ? "Failed" : "Passed"}
                                                        </span>
                                                    </div>

                                                    <div className="container mx-auto p-4">
                                                        {riskScoreResult.map((category, index) => (
                                                            <Card key={index} className="mb-6 shadow-md">
                                                                    <h2 className="text-xl font-bold text-gray-800 mb-4">{category.category}</h2>
                                                                    <Table hoverable={true}>
                                                                        <Table.Head>
                                                                            <Table.HeadCell>Description</Table.HeadCell>
                                                                            <Table.HeadCell>Score</Table.HeadCell>
                                                                            <Table.HeadCell>Label</Table.HeadCell>
                                                                        </Table.Head>
                                                                        <Table.Body className="divide-y">
                                                                            {category.criteria.map((item) => (
                                                                                <Table.Row key={item.id} className="bg-white">
                                                                                    <Table.Cell className="capitalize font-medium text-gray-900">{item.description}</Table.Cell>
                                                                                    <Table.Cell className='capitalize'>{item.score}</Table.Cell>
                                                                                    <Table.Cell className='capitalize'>{item.label}</Table.Cell>
                                                                                </Table.Row>
                                                                            ))}
                                                                        </Table.Body>
                                                                    </Table>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </Timeline.Body>
                                            </Timeline.Content>
                                        </Timeline.Item>
                                    </Timeline>

                                </>
                            )}

                            <div className="flex justify-between mt-20">
                                {step != 1 && (
                                    <Button color="success" pill onClick={handleFormButton("back")}>
                                        <HiOutlineChevronLeft className="mr-1 h-5 w-5" />
                                        Back
                                    </Button>
                                )}
                                <Button
                                    className="ml-auto"
                                    disabled={
                                        (!isCreditScoreFormComplete && step === 1) 
                                        //|| (!isRiskScoreFormComplete && step === 2)
                                    }
                                    color="success"
                                    pill
                                    onClick={handleFormButton("next")}
                                >
                                    {step === 3 ? (
                                        <>
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                    Finalizing...
                                                    <HiOutlineCheckCircle className="ml-1 h-5 w-5" />
                                                </>
                                            ) : (
                                                <>
                                                    Finish
                                                    <HiOutlineCheckCircle className="ml-1 h-5 w-5" />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            Next
                                            <HiOutlineChevronRight className="ml-1 h-5 w-5" />
                                        </>
                                    )}
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {toastMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast>
                        {toastMessage.type === "success" ? (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                        ) : (
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiExclamation className="h-5 w-5" />
                            </div>
                        )}

                        <div className="ml-3 text-sm font-normal">{toastMessage.message}</div>
                        <Toast.Toggle onClick={() => setToastMessage(null)} />
                    </Toast>
                </div>
            )}

            <Modal show={promptCreditScore} size="2xl" onClose={() => setPromptCreditScore(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-red-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-500">
                                Unfortunately, the applicant's points did not reach the passing score.
                                <p className="mt-5 text-gray-900 font-bold">Score: {creditScore}</p>
                                <p className="mb-5 text-gray-900 font-bold">Required Score: {creditPassingScore.from}</p>
                            </h3>

                            <div className="mb-10 w-full">
                                <div className="mb-2 block float-start">
                                    <Label htmlFor="remarks" value="Recommendation" />
                                </div>
                                <Textarea
                                    id="remarks"
                                    name="remarks"
                                    placeholder="Leave a recommendation..."
                                    required
                                    rows={4}
                                    value={creditScoreForm.remarks}
                                    onChange={(e) => setCreditScoreForm(prevState => ({
                                        ...prevState,
                                        remarks: e.target.value
                                    }))}
                                />
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button color="failure" type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                                <Button color="gray" type="button" onClick={() => setPromptCreditScore(false)}>
                                    Modify
                                </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Dashboard>

    );
}

export default Evaluation;