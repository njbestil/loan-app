import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, Button, Breadcrumb, Dropdown, Table, Modal, Label, TextInput, Select, Toast, Spinner, Badge } from "flowbite-react";
import { HiOutlineChip, HiOutlineChartPie, HiOutlineEye, HiXCircle, HiCheckCircle, HiFilter, HiHome, HiOutlineDotsVertical, HiPlus, HiCheck, HiExclamation } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import userService from "../../../services/userService";
import dataService from "../../../services/dataService";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const formatPhoneNumber = (value) => {
   // Remove all non-numeric characters
   let cleaned = value.replace(/\D/g, "");

   // Apply the format: 917 123 4567
   let formatted = cleaned
      .replace(/^(\d{0,3})?(\d{0,3})?(\d{0,5})?$/, (_, p1, p2, p3) => {
         return [p1, p2, p3].filter(Boolean).join(" ");
      });

   // Prevent input from exceeding the intended format length (max: 12 chars)
   return formatted.length > 12 ? reportForm.contact_number : formatted;
};

const formatDateTime = (dateString) => {
   const date = new Date(dateString);
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
   const day = String(date.getDate()).padStart(2, "0");
   const year = date.getFullYear();
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");
   const seconds = String(date.getSeconds()).padStart(2, "0");

   return `${month}-${day}-${year}`;
};

export default function UserApplication() {
   const navigate = useNavigate();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);

   const [cid, setCid] = useState(null);
   const [rid, setRid] = useState(null);

   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState({ user: false, admin: false });
   const [toastMessage, setToastMessage] = useState(null);
   const [loading, setLoading] = useState(false); // State for loading
   const [loadingScreen, setLoadingScreen] = useState(false); // State for loading
   const [users, setUsers] = useState([]);
   const [applications, setApplications] = useState([]);
   const [creditScoreData, setCreditScoreData] = useState([]);
   const [riskScoreData, setRiskScoreData] = useState([]);
   const [data, setData] = useState([]);
   const [openModal, setOpenModal] = useState(true);
   const [reportForm, setReportForm] = useState({
      creditModel: null,
      riskModel: null
   });
   
   const user = getUserData();

   function getUserData() {
      var userDetails;
      var userId = queryParams.get("uid");

      if(userId != null) {
         userDetails = {
            id: parseInt(userId, 10) 
         }
      } else {
         const userData = localStorage.getItem("user");
         userDetails = userData ? JSON.parse(userData) : null;
      }
     
      return userDetails;
   }

   const fetchUsers = async () => {
      try {
         const response = await userService.getUsers();
         setUsers(response.data); // Update the user list
      } catch (error) {
         console.error("Error fetching users:", error);
      } 
   };

   const fetchApplications = async () => {
      try {
         const response = await dataService.getApplications();

         if (response.success) {
            const filteredData = response.data.filter(app => app.user_id === user.id); // Filter where id = 1
            setApplications(filteredData); // Update the user list
            console.log("application", filteredData);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      }
   };

   const fetchCreditScore = async () => {
      try {
         const response = await dataService.getCreditScore();

         if (response.success) {
            setCreditScoreData(response.data);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      }
   };

   const fetchRiskScore = async () => {
      try {
         const response = await dataService.getRiskScore();

         if (response.success) {
            setRiskScoreData(response.data);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      }
   };

   // Fetch users on component mount
   useEffect(() => {
      fetchUsers();
      fetchApplications();
      fetchCreditScore();
      fetchRiskScore();
   }, []);

   // Merge data after both API calls complete
   useEffect(() => {
      setLoadingScreen(true);
      if (applications.length > 0 && users.length > 0 && riskScoreData.length > 0 && creditScoreData.length > 0) {
         const mergedData = applications.map(app => ({
            ...app,
            credit_score_details: JSON.parse(app.credit_score_details),
            risk_score: JSON.parse(app.risk_score),
            risk_score_details: JSON.parse(app.risk_score_details),
            user: users.find(user => user.id === app.user_id) || null,
            risk: riskScoreData.find(rs => rs.id === app.risk_score_id) || null,
            credit: creditScoreData.find(cs => cs.id === app.credit_score_id) || null
         }));

         setLoadingScreen(false);
         setData(mergedData); // Store merged data in state
      } else {
         setData([]);
         setTimeout(() => {
            setLoadingScreen(false);
         }, 1500); // 1000ms = 1 second delay
      }
   }, [users, applications, riskScoreData, creditScoreData]);

   const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const filteredData = data.filter(row => {
      const paddedUserId = row.user.id.toString().padStart(6, '0'); // Pads user.id to 6 digits
      const riskDefinition = (row.risk_score.definition) ? row.risk_score.definition : "";
      const creditName = (row.credit.name) ? row.credit.name : "";

      const matchesSearch =
         paddedUserId.includes(searchTerm.toLowerCase()) ||
         row.user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
         row.user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
         creditName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         row.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
         riskDefinition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
         (!statusFilter.fail && !statusFilter.pass) || // If both filters are off, show all
         (statusFilter.fail && row.status?.toLowerCase() === "fail") || // Check lowercase to prevent case issues
         (statusFilter.pass && row.status?.toLowerCase() === "pass");

      return matchesSearch && matchesRole;
   });

   const handleView = (data) => {
      // Store data in localStorage
      localStorage.setItem("applicant_details", JSON.stringify(data));

      navigate(`/creditscoredata/application/details?${data.id}`);
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

   const getRiskLevelColor = (riskScore, riskPassingScore) => {
      riskPassingScore = JSON.parse(riskPassingScore);

      // Get min and max values
      const minValue = Math.min(...riskPassingScore.map(risk => Number(risk.value)));
      const maxValue = Math.max(...riskPassingScore.map(risk => Number(risk.value)));

      // Determine color
      if (riskScore.value > maxValue) {
         return "gray";
      }
      else if (riskScore.value == minValue) {
         return "green"; // Lowest risk (best)
      } else if (riskScore.value == maxValue) {
         return "red"; // Highest risk (worst)
      } else {
         return "yellow"; // Middle risk
      }
   };

   const getPieColor = (riskScore, riskPassingScore) => {
      riskPassingScore = JSON.parse(riskPassingScore);

      // Get min and max values
      const minValue = Math.min(...riskPassingScore.map(risk => Number(risk.value)));
      const maxValue = Math.max(...riskPassingScore.map(risk => Number(risk.value)));

      // Determine color
      if (riskScore.value > maxValue || riskScore.value < minValue) {
         return "#e9e9e9";
      }
      else if (riskScore.value == minValue) {
         return "#95c3af"; // Lowest risk (best)
      } else if (riskScore.value == maxValue) {
         return "#e5c0c0"; // Highest risk (worst)
      } else if (riskScore.value > minValue && riskScore.value < maxValue) {
         return "#ebe397"; // Middle risk
      } else {
         return "#e9e9e9";
      }
   };

   const groupRiskScoreForPieChart = (data) => {
      const grouped = data.reduce((acc, item) => {
         const riskDefinition = item.risk_score?.definition || "Unfit"; // Get definition or default to "Unfit"
         const riskValue = item.risk_score?.value?.toString() || "0"; // Convert value to string, default to "0"

         const existing = acc.find((entry) => entry.name === riskDefinition);
         if (existing) {
            existing.value += 1; // Increment occurrence count
         } else {
            acc.push({
               name: riskDefinition,
               value: 1,
               color: getPieColor(item.risk_score, item.risk.passing_score) || "#d9d9d9" // Default to gray if not in the map
            });
         }
         return acc;
      }, []);

      // Calculate total occurrences for percentage calculation
      const total = grouped.reduce((sum, entry) => sum + entry.value, 0);

      // Add percentage to each group
      return grouped.map(entry => ({
         ...entry,
         percentage: ((entry.value / total) * 100).toFixed(2) + "%" // Format as percentage
      }));
   };

   const pieData = groupRiskScoreForPieChart(filteredData);

   // Handle form submission
   const handleSubmit = (event) => {
      event.preventDefault();
      // After form submission, update cid and rid
      setCid(reportForm.creditModel);
      setRid(reportForm.riskModel);

      // You can now use cid and rid for any other logic or API calls
      console.log("Selected Credit Model ID:", reportForm.creditModel);
      console.log("Selected Risk Model ID:", reportForm.riskModel);

      onCloseModal();
   };

   function onCloseModal() {
      setOpenModal(false);
   }

   // Handle form data changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setReportForm((prevData) => ({
         ...prevData,
         [name]: value
      }));
   };

   const handleNavigate = () => {
      if (filteredData.length > 0) {
         navigate(`/creditscoredata/application/report?cid=${cid}&rid=${rid}`);
      }
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
                  Manage Credit Score Data
               </h5>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>
                     Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Manage Credit Score Data</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <div className="my-8">
               {filteredData.length > 0 && (
                  <div className="flex items-center justify-center gap-6">
                     <PieChart width={1000} height={400}>
                        <Pie
                           data={pieData}
                           cx="50%"
                           cy="50%"
                           outerRadius={100}
                           fill="#8884d8"
                           dataKey="value"
                           label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                           {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip
                           formatter={(value, name, entry) => [
                              `${value} (${(entry.payload.percentage * 100).toFixed(0)}%)`,
                              name
                           ]}
                        />
                     </PieChart>
                  </div>
               )}


               {/* Add User Button */}
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                     <TextInput
                        placeholder="Search here..."
                        value={searchTerm}
                        icon={HiFilter}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                     />
                     <div className="flex items-center justify-center gap-2">
                        <Checkbox
                           id="fail"
                           checked={statusFilter.fail} // Updated key
                           onChange={() => setStatusFilter({ ...statusFilter, fail: !statusFilter.fail })} // Updated key
                           label="Fail"
                        />
                        <Label htmlFor="fail" className="flex items-center gap-1">
                           Rejected
                           <HiXCircle className="text-red-500" />
                        </Label>
                     </div>
                     <div className="flex items-center justify-center gap-2">
                        <Checkbox
                           id="pass"
                           checked={statusFilter.pass} // Updated key
                           onChange={() => setStatusFilter({ ...statusFilter, pass: !statusFilter.pass })} // Updated key
                           label="Pass"
                        />
                        <Label htmlFor="pass" className="flex items-center gap-1">
                           Approved
                           <HiCheckCircle className="text-green-500" />
                        </Label>
                     </div>
                  </div>
               </div>
               <div className="">
                  <Table hoverable>
                     <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Credit Score Model</Table.HeadCell>
                        <Table.HeadCell className="text-center">Risk Level</Table.HeadCell>
                        <Table.HeadCell className="text-center">Date</Table.HeadCell>
                        <Table.HeadCell className="text-center">Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                     </Table.Head>
                     <Table.Body>
                        {filteredData.length > 0 ? (
                           filteredData.map((data) => (
                              <Table.Row key={data.id}>
                                 <Table.Cell>{String(data.user.id).padStart(6, "0")}</Table.Cell>
                                 <Table.Cell className='capitalize'>{data.user.fname} {data.user.lname}</Table.Cell>
                                 <Table.Cell>{data.credit.name}</Table.Cell>
                                 <Table.Cell className="text-center">
                                    {data.risk_score && data.risk_score.value && data.risk_score.definition
                                       ? <Badge
                                          color={getRiskLevelColor(data.risk_score, data.risk.passing_score)}
                                          className="inline-block w-auto rounded-full"
                                       >
                                          <div className="flex items-center gap-2 py-1">
                                             <span className="bg-white text-black font-bold w-4 h-4 text-[10px] flex items-center justify-center rounded-full shrink-0">
                                                {data.risk_score.value}
                                             </span>
                                             <span className="lowercase whitespace-nowrap mr-1">{data.risk_score.definition}</span>
                                          </div>
                                       </Badge>

                                       : <Badge color="gray" className="py-1 px-3 inline-block w-auto rounded-full ">unfit</Badge>}
                                 </Table.Cell>
                                 <Table.Cell className='w-32'>{formatDateTime(data.created_at)}</Table.Cell>
                                 <Table.Cell className="flex justify-center items-center">
                                    {data.status === "pass" ? (
                                       <HiCheckCircle className="text-green-500" />
                                    ) : (
                                       <HiXCircle className="text-red-500" />
                                    )}
                                 </Table.Cell>
                                 <Table.Cell className="text-right w-12">
                                    <Dropdown inline label={<HiOutlineDotsVertical className="text-xl" />}>
                                       <Dropdown.Item onClick={() => handleView(data)}>
                                          <HiOutlineEye className="mr-2" /> View
                                       </Dropdown.Item>
                                    </Dropdown>
                                 </Table.Cell>
                              </Table.Row>
                           ))
                        ) : (
                           <Table.Row>
                              <Table.Cell colSpan={7} className="text-center text-gray-500">
                                 No records found
                              </Table.Cell>
                           </Table.Row>
                        )}
                     </Table.Body>
                  </Table>

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
         </div>
      </Dashboard>
   );
}