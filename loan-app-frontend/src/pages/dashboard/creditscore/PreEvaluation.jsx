import React, { useState, useEffect } from 'react';
import { Button, Carousel, Label, TextInput, Select, Breadcrumb, Spinner, Modal, Toast } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiCheck, HiExclamation, HiArrowRight, HiOutlineShieldExclamation, HiHome, HiOutlineExclamationCircle, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineCash  } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import userService from "../../../services/userService";
import dataService from '../../../services/dataService.js';
import { useNavigate } from "react-router-dom";

const chunkArray = (array, size) => {
   return array.reduce((result, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!result[chunkIndex]) result[chunkIndex] = [];
      result[chunkIndex].push(item);
      return result;
   }, []);
};

const formatDateTime = (dateString) => {
   const date = new Date(dateString);
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
   const day = String(date.getDate()).padStart(2, "0");
   const year = date.getFullYear();
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");
   const seconds = String(date.getSeconds()).padStart(2, "0");

   return `${month}-${day}-${year} | ${hours}:${minutes}:${seconds}`;
};

function PreEvaluation() {
   const navigate = useNavigate();
   const [toastMessage, setToastMessage] = useState(null);
   const [loadingScreen, setLoadingScreen] = useState(true);
   const [loading, setLoading] = useState(false);
   const [openConfirmModal, setOpenConfirmModal] = useState(false);
   const [formData, setFormData] = useState({
      user_id: null,
      amount: null,
      credit_score_id: null,
      risk_score_id: null
   });
   const [selectedCreditCard, setSelectedCreditCard] = useState(null);
   const [selectedRiskCard, setSelectedRiskCard] = useState(null);
   const [users, setUsers] = useState([]);
   const [creditScoreData, setCreditScoreData] = useState([]);
   const [riskScoreData, setRiskScoreData] = useState([]);

   const creditSlides = chunkArray(creditScoreData, 3); // Group cards into sets of 3
   const riskSlides = chunkArray(riskScoreData, 3); // Group cards into sets of 3

   useEffect(() => {
      fetchUsers();
      fetchCreditScore();
      fetchRiskScore();
   }, []);

   const fetchUsers = async () => {
      try {
         setLoadingScreen(true);
         const response = await userService.getUsers();
         
         // Get logged-in user from localStorage
         const storedUser = JSON.parse(localStorage.getItem("user"));
         const loggedInUserId = storedUser?.id;
         
         // Filter users with role "user"
         const filteredUsers = response.data.filter(
            user => user.role === "user" && user.is_active == 1 && (user.admin_id == loggedInUserId || user.admin_id == 0)
         );
   
         setUsers(filteredUsers); // Update the user list with filtered data
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         setLoadingScreen(false);
      }
   };

   const fetchCreditScore = async () => {
      try {
         setLoadingScreen(true);
         const response = await dataService.getCreditScore();
         
         if (response.success) {
            const filteredData = response.data.filter(item => item.is_deleted != true);
            setCreditScoreData(filteredData);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         setLoadingScreen(false);
      }
   };

   const fetchRiskScore = async () => {
      try {
         setLoadingScreen(true);
         const response = await dataService.getRiskScore();
         
         if(response.success) {
            const filteredData = response.data.filter(item => item.is_deleted != true);
            setRiskScoreData(filteredData);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         setLoadingScreen(false);
      }
   };

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
         setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue
         }));
      } else {
         console.log(name, value)
         setFormData(prevState => ({
            ...prevState,
            [name]: value === null ? "" : value
         }));
      }
   };

   const handleProcessing = () => {
      // Form validation
      if (!formData.user_id || !formData.amount || !selectedCreditCard || !selectedRiskCard) {
         setToastMessage({ type: "error", message: "Please fill out all required fields." });
         return;
      }

      setLoading(true);
   
      // Construct query parameters
      const queryParams = new URLSearchParams({
         usrId: formData.user_id,
         crdId: selectedCreditCard.split("-")[1],
         rskId: selectedRiskCard.split("-")[1],
         amt: formData.amount,
      }).toString();
   
      // Navigate after a short delay to allow toast to display
      setTimeout(() => {
         setLoading(false);
         navigate(`/creditscore/evaluation?${queryParams}`);
      }, 1000);
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
                  CREDIT SCORE EVALUATION
               </h5>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Credit Score Evaluation</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <div>
               <div className="mt-8 sm:mx-auto ">
                  <div className='mb-20'>
                     <div className="mb-5 border-b-2 border-gray-400">
                        <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">APPLICANT INFORMATION</h5>
                     </div>
                     <div className="grid grid-cols-2 grid-flow-col gap-5">
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="user_id" value="Applicant" />
                           </div>
                           <Select id="user_id" name="user_id"
                              value={formData.user_id || ""}
                              color={(formData.user_id == null) ? "gray" : (formData.user_id) ? "success" : "failure"}
                              onChange={handleChange} required shadow>
                              <option value="">Select applicant</option>
                              {users.map((user) => (
                                 <option key={user.id} value={user.id}>
                                    {user.fname +" "+ user.lname}
                                 </option>
                              ))}
                           </Select>
                        </div>
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="amount" value="Amount" />
                           </div>
                           <TextInput id="amount" name="amount" type="amount" placeholder='Enter amount' autoComplete="confirmAmount"
                              color={(formData.amount == null) ? "gray" : (formData.amount) ? "success" : "failure"}
                              onChange={handleChange} required shadow value={(formData.amount == null) ? "" : formData.amount} />
                        </div>
                     </div>
                  </div>

                  <div className="mb-5 border-b-2 border-gray-400">
                     <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">CREDIT SCORE MODEL</h5>
                  </div>
                  <div className="bg-white py-5 px-4">
                     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel
                           slide={false}
                           leftControl={<HiOutlineChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />}
                           rightControl={<HiOutlineChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />}
                        >
                           {creditSlides && creditSlides.length > 0 ? (
                              creditSlides.map((group, index) => (
                                 <div key={index} className="flex justify-center gap-6 p-6">
                                    {group.map((card, idx) => {
                                       const isSelected = selectedCreditCard === `creditscore-${card.id}`;
                                       return (
                                          <div
                                             key={idx}
                                             className={`w-64 h-48 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center dark:bg-gray-800 cursor-pointer border-4 
                                             ${isSelected ? "border-green-400" : "border-gray-100"}`}
                                             onClick={() => setSelectedCreditCard(`creditscore-${card.id}`)}
                                          >
                                             <div className="p-4 flex items-center justify-center bg-gray-700 rounded-full">
                                                <HiOutlineCash className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="mt-5 mb-1 text-xl font-semibold dark:text-white">{card.name}</h3>
                                             <p className="text-sm text-gray-500 dark:text-gray-300">Created: {formatDateTime(card.created_at)}</p>
                                          </div>
                                       );
                                    })}
                                 </div>
                              ))
                           ) : (
                              <div className="text-center py-10 text-gray-500 dark:text-gray-300">
                                 No records found
                              </div>
                           )}

                        </Carousel>
                     </div>
                  </div>

                  <div className="mt-10 border-b-2 border-gray-400">
                     <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">RISK SCORE MODEL</h5>
                  </div>
                  <div className="bg-white py-5 px-4">
                     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel
                           slide={false}
                           leftControl={<HiOutlineChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />}
                           rightControl={<HiOutlineChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />}
                        >
                           {riskSlides.length === 0 ? (
                              <div className="text-center py-10 text-gray-500 dark:text-gray-300">
                                 No records found
                              </div>
                           ) : (
                              riskSlides.map((group, index) => (
                                 <div key={index} className="flex justify-center gap-6 p-6">
                                    {group.map((card, idx) => {
                                       const isSelected = selectedRiskCard === `riskscore-${card.id}`;
                                       return (
                                          <div
                                             key={idx}
                                             className={`w-64 h-48 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center dark:bg-gray-800 cursor-pointer border-4 
                                             ${isSelected ? "border-green-400" : "border-gray-100"}`}
                                             onClick={() => setSelectedRiskCard(`riskscore-${card.id}`)}
                                          >
                                             <div className="p-4 flex items-center justify-center bg-gray-700 rounded-full">
                                                <HiOutlineShieldExclamation className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="mt-5 mb-1 text-xl font-semibold dark:text-white">{card.name}</h3>
                                             <p className="text-sm text-gray-500 dark:text-gray-300">Created: {formatDateTime(card.created_at)}</p>
                                          </div>
                                       );
                                    })}
                                 </div>
                              ))
                           )}

                        </Carousel>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-10 flex justify-center">
               <Button color="success" onClick={() => handleProcessing()} disabled={loading}>
                  {loading ? (
                     <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        PROCESSING...
                        <HiArrowRight className="ml-2 h-5 w-5" />
                     </>
                  ) : (
                        <>
                           START PROCESSING
                           <HiArrowRight className="ml-2 h-5 w-5" />
                        </>
                  )}
                  
               </Button>
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

         <Modal show={openConfirmModal} size="sm" onClose={() => setOpenConfirmModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-red-200" />
                  <h3 className="mb-5 text-center text-lg font-normal text-gray-500 dark:text-gray-500">
                     Please select confirm to proceed.
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure" onClick={() => setOpenConfirmModal(false)}>
                        {"Confirm"}
                     </Button>
                     <Button color="gray" onClick={() => setOpenConfirmModal(false)}>
                        Cancel
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </Dashboard>

   );
}

export default PreEvaluation;