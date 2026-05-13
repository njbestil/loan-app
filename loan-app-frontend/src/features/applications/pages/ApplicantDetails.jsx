import { useState, useEffect } from 'react';
import { Toast, Button, Label, TextInput, Breadcrumb, Spinner, Textarea, Progress, Timeline, Flowbite, Table, Card } from "flowbite-react";
import {
   HiCheck, HiExclamation, HiHome,
   HiOutlineCash, HiOutlineShieldExclamation, HiArrowLeft
} from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import { useNavigate } from "react-router-dom";

const getProgress = (rating, totalParts) => {
   // Convert rating and totalParts to numbers
   rating = Number(rating);
   totalParts = Number(totalParts);
   console.log("ratin="+rating, "totalparts="+totalParts);
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

const sumScores = (data) => {
   return data.reduce((total, category) => {
      const categorySum = category.criteria.reduce((sum, item) => sum + item.score, 0);
      return total + categorySum;
   }, 0);
};

export default function ApplicantDetails() {
   const customTheme = {
      progress: {
         bar: "space-x-2 rounded-full text-center font-medium leading-none text-white bg-red-600 dark:bg-red-500 h-4 flex items-center justify-center text-sm"
      },
   };

   const navigate = useNavigate();

   const [toastMessage, setToastMessage] = useState(null);
   const [loadingScreen] = useState(false); // State for loading
   const [user, setUser] = useState([]);
   const [data, setData] = useState([]);
   const [creditScoreResult, setCreditScoreResult] = useState([]);
   const [creditScore, setCreditScore] = useState(0);
   const [creditPassingScore, setCreditPassingScore] = useState(null);

   const [riskScoreResult, setRiskScoreResult] = useState([]);
   const [riskRating, setRiskRating] = useState([]);
   const [riskPassingScore, setRiskPassingScore] = useState([]);
   const [riskScore, setRiskScore] = useState(0);


   // Fetch users on component mount
   useEffect(() => {
      const applicantDetails = JSON.parse(localStorage.getItem("applicant_details"));
      console.log(applicantDetails)
      setData(applicantDetails);
      setUser(applicantDetails.user);
      setCreditScoreResult(applicantDetails.credit_score_details);

      // Credit
      setCreditScore(applicantDetails.credit_score);
      setCreditPassingScore(JSON.parse(applicantDetails.credit.passing_score)[0]);

      // Risk
      if (applicantDetails.risk) {
         setRiskPassingScore(JSON.parse(applicantDetails.risk.passing_score));
      }
      if (applicantDetails.risk_score && Object.keys(applicantDetails.risk_score).length > 0) {
         setRiskScoreResult(applicantDetails.risk_score_details);
         setRiskScore(sumScores(applicantDetails.risk_score_details));
         setRiskRating(applicantDetails.risk_score);
      } else {
         setRiskRating({
            "definition": "Unfit",
            "from": 0,
            "to": 49,
            "value": "6",
            "monthly_interest_rate": 0
         });
      }
   }, []);

   const getRiskLabel = (rating) => {
      const category = riskPassingScore.find(item => rating == item.value);
      return category !== null && category !== undefined ? category.definition : "Unfit";
   };

   const getRiskColor = (progress) => {
      progress = Number(progress);

      if (progress > 80) return "green";  // Very Low Risk
      if (progress > 40) return "yellow"; // Moderate Risk
      return "red";  // High Risk
   };


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
                  User Details
               </h5>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>
                     Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                     href={user.role === "user" ? "/creditscoredata/application/user" : "/creditscoredata/application"}
                  >
                     Manage Credit Score Data
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>User Details</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <div className="m-8">
               <div className='mb-20'>
                  <div className="mb-5 border-b-2 border-gray-400">
                     <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        APPLICANT DETAILS
                     </h5>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mb-10">
                     <div>
                        <Label htmlFor="fname" value="First Name" />
                        <TextInput
                           id="fname"
                           name="fname"
                           placeholder="Enter first name"
                           value={user.fname || ""}
                           disabled
                        />
                     </div>
                     <div>
                        <Label htmlFor="lname" value="Last Name" />
                        <TextInput
                           id="lname"
                           name="lname"
                           placeholder="Enter last name"
                           value={user.lname || ""}
                           disabled
                        />
                     </div>
                     <div>
                        <Label htmlFor="address" value="Address" />
                        <TextInput
                           id="address"
                           name="address"
                           placeholder="Enter address"
                           value={user.address || ""}
                           disabled
                        />
                     </div>
                     <div>
                        <Label htmlFor="contact_number" value="Contact Number" />
                        <TextInput
                           id="contact_number"
                           name="contact_number"
                           addon="+63"
                           placeholder="XXX XXX XXXX"
                           value={user.contact_number || ""}
                           disabled
                        />
                     </div>
                  </div>
               </div>

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
                     value={data.remarks || ""}
                     disabled
                  />
               </div>

               <Timeline className='mb-10'>
                  <Timeline.Item>
                     <Timeline.Point icon={HiOutlineCash} />
                     <Timeline.Content>
                        <Timeline.Time className='font-semibold text-lg text-cyan-600'>Credit Score</Timeline.Time>
                        <Timeline.Body>
                           <p className='my-5 text-md text-gray-500'>The credit score result provides an evaluation of an applicant&apos;s financial reliability based on various criteria, including personal situation and loan history. Each category is assessed using predefined scoring rules, with higher scores indicating lower risk. The final score helps determine the applicant&apos;s creditworthiness and eligibility for financial products.</p>

                           <div className="flex items-center justify-between gap-4 mb-5">
                              <div className="flex items-center gap-2">
                                 <h2 className="text-lg font-bold text-gray-700">Score:</h2>
                                 <p className="text-2xl font-semibold text-blue-600">{creditScore + " / " + creditPassingScore?.from}</p>
                              </div>

                              <span
                                 className={`inline-block px-4 py-2 text-white rounded-full text-lg font-semibold ${creditScore < creditPassingScore?.from ? "bg-red-500" : "bg-green-500"}`}
                              >
                                 {creditScore < creditPassingScore?.from ? "Failed" : "Passed"}
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
                  <Timeline.Item>
                     <Timeline.Point icon={HiOutlineShieldExclamation} />
                     <Timeline.Content>
                        <Timeline.Time className='font-semibold text-lg text-cyan-600'>Credit Risk Rating Score</Timeline.Time>
                        <Timeline.Body>
                           <p className='my-5 text-md text-gray-500'>Credit Risk Rating Score evaluates an individual&apos;s financial reliability based on various factors such as age, income source, loan status, and collateral. A higher score indicates lower credit risk and a greater likelihood of loan approval, while a lower score suggests higher risk and potential financial instability.</p>

                           <div className="flex items-center justify-between gap-4 mb-5">
                              <div className="flex items-center gap-2">
                                 <h2 className="text-lg font-bold text-gray-700">Score:</h2>
                                 <p className="text-2xl font-semibold text-blue-600">{riskScore + " / " + 100}</p>
                                 {riskRating.definition && (
                                    <p className="text-md text-gray-600 font-semibold">
                                       ( {riskRating.definition} )
                                    </p>
                                 )}
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
               </Timeline>
            </div>

            <div className="my-10 flex justify-center">
               <Button color="success" onClick={() => navigate(-1)} >
                  <>
                     <HiArrowLeft className="mr-2 h-5 w-5" />
                     BACK
                  </>
               </Button>
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
         </div>
      </Dashboard>
   );
}
