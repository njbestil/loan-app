import React, { useState, useEffect, useRef } from 'react';
import { Card, Accordion, Button, Breadcrumb, Toast, Spinner, Badge, Table } from "flowbite-react";
import { HiOutlineChartPie, HiOutlineEye, HiXCircle, HiCheckCircle, HiFilter, HiHome, HiOutlineDotsVertical, HiPlus, HiCheck, HiExclamation } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import userService from "../../../services/userService";
import dataService from "../../../services/dataService";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSearchParams } from "react-router-dom";


const formatPhoneNumber = (value) => {
   // Remove all non-numeric characters
   let cleaned = value.replace(/\D/g, "");

   // Apply the format: 917 123 4567
   let formatted = cleaned
      .replace(/^(\d{0,3})?(\d{0,3})?(\d{0,5})?$/, (_, p1, p2, p3) => {
         return [p1, p2, p3].filter(Boolean).join(" ");
      });

   // Prevent input from exceeding the intended format length (max: 12 chars)
   return formatted.length > 12 ? formData.contact_number : formatted;
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

export default function ApplicationReport() {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const cid = parseInt(searchParams.get("cid"));
   const rid = parseInt(searchParams.get("rid"));

   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState({ user: false, admin: false });
   const [toastMessage, setToastMessage] = useState(null);
   const [loading, setLoading] = useState(false); // State for loading
   const [loadingScreen, setLoadingScreen] = useState(true); // State for loading
   const [errors, setErrors] = useState({});
   const [users, setUsers] = useState([]);
   const [applications, setApplications] = useState([]);
   const [creditScoreData, setCreditScoreData] = useState([]);
   const [riskScoreData, setRiskScoreData] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const [data, setData] = useState([]);
   const [riskGroupData, setRiskGroupData] = useState([]);

   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

   const fetchUsers = async () => {
      try {
         //setLoadingScreen(true);
         const response = await userService.getUsers();

         if (response.success) {
            setUsers(response.data); // Update the user list
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         //setLoadingScreen(false);
      }
   };

   const fetchApplications = async () => {
      try {
         //setLoadingScreen(true);
         const response = await dataService.getApplications();

         if (response.success) {
            const filteredData = response.data.filter(app => app.credit_score_id === cid && app.risk_score_id === rid); // Filter where id = 1
            setApplications(filteredData); // Update the user list
            console.log("application", filteredData);

            const groupData = mergeCriteria(groupByRiskScore(filteredData));
            setRiskGroupData(groupData);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         //setLoadingScreen(false);
      }
   };

   const fetchCreditScore = async () => {
      try {
         //setLoadingScreen(true);
         const response = await dataService.getCreditScore();

         if (response.success) {
            const filteredData = response.data.filter(app => app.id === cid);
            setCreditScoreData(response.data);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         //setLoadingScreen(false);
      }
   };

   const fetchRiskScore = async () => {
      try {
         //setLoadingScreen(true);
         const response = await dataService.getRiskScore();

         if (response.success) {
            const filteredData = response.data.filter(app => app.id === rid);
            setRiskScoreData(response.data);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         //setLoadingScreen(false);
      }
   };

   function mergeCriteria(data) {
      // Iterate over the top-level keys (1, 3)
      for (const key in data) {
         const item = data[key];
         // Create a map to track unique combinations of description, score, and label
         const criteriaMap = new Map();

         // Iterate over each category array in the main array
         item.groupByCriteria.forEach(categoryArray => {
            categoryArray.forEach(category => {
               category.criteria.forEach(criterion => {
                  // Create a unique key for each combination of description, score, and label
                  const key = `${criterion.description}-${criterion.score}-${criterion.label}`;

                  // If this combination exists in the map, increment the count; otherwise, add it
                  if (criteriaMap.has(key)) {
                     criteriaMap.get(key).count++;
                  } else {
                     criteriaMap.set(key, { description: criterion.description, score: criterion.score, label: criterion.label, count: 1 });
                  }
               });
            });
         });

         item.groupByCriteria = Array.from(criteriaMap.values());
      }


      // // Convert the map to an array
      return data;
   }

   function groupByRiskScore(data) {
      const groupedResult = {};

      data.forEach(item => {
         let riskValue = "Unfit"; // Default if risk_score is missing or invalid
         let riskScoreObject = {};

         try {
            if (item.risk_score) {
               riskScoreObject = JSON.parse(item.risk_score);
               riskValue = riskScoreObject.definition || "Unfit";
            }
         } catch (error) {
            console.error("Error parsing risk_score for item:", item);
         }

         // If the riskValue group doesn't exist, initialize it as an empty array
         if (!groupedResult[riskValue]) {
            groupedResult[riskValue] = {
               groupByCriteria: [],  // Initialize as an array
               risk_score: item.risk_score
            };
         }

         // Add the current item to the group array
         groupedResult[riskValue].groupByCriteria.push(JSON.parse(item.credit_score_details));
      });

      // Sorting the object alphabetically by risk category name
      const sortedResult = Object.fromEntries(
         Object.entries(groupedResult).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      );

      return sortedResult;
   }


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
         //console.log("Merged Data:", mergedData);
      }
   }, [users, applications, riskScoreData, creditScoreData]);

   const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const filteredData = data.filter(row => {
      if (!row.user || !row.risk || !row.credit) return false;

      const search = searchTerm.toLowerCase();
      const paddedUserId = row.user.id.toString().padStart(6, '0'); // Pads user.id to 6 digits
      const riskDefinition = row.risk_score?.definition || "";
      const creditName = row.credit?.name || "";

      const matchesSearch =
         paddedUserId.includes(search) ||
         row.user.fname?.toLowerCase().includes(search) ||
         row.user.lname?.toLowerCase().includes(search) ||
         creditName.toLowerCase().includes(search) ||
         row.created_at?.toLowerCase().includes(search) ||
         riskDefinition.toLowerCase().includes(search);

      const matchesRole =
         (!statusFilter.fail && !statusFilter.pass) || // If both filters are off, show all
         (statusFilter.fail && row.status?.toLowerCase() === "fail") || // Check lowercase to prevent case issues
         (statusFilter.pass && row.status?.toLowerCase() === "pass");

      return matchesSearch && matchesRole;
   });

   const getPieColor = (riskScore, riskPassingScore) => {
      riskPassingScore = JSON.parse(riskPassingScore);

      let rating = Number(riskScore?.value);
      const totalParts = Number(riskPassingScore.length);

      if (isNaN(totalParts) || totalParts <= 0) return "#d9d9d9";

      if (isNaN(rating) || rating === null || rating === undefined) {
         return "#e9e9e9";
      }

      if (rating < 1) rating = 1;
      if (rating > totalParts) rating = totalParts;

      const progress = parseFloat(((rating / totalParts) * 100).toFixed(2));

      if (progress <= 40) return "#95c3af";
      if (progress <= 70) return "#ebe397";
      return "#e5c0c0";
   };

   const groupRiskScoreForPieChart = (data) => {
      const grouped = data.reduce((acc, item) => {
         const riskDefinition = item.risk_score?.definition || "Unfit"; // Get definition or default to "Unfit"

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


   // Group the data by description
   const groupByDescription = (data) => {
      const groupedData = data.reduce((acc, item) => {
         if (!acc[item.description]) {
            acc[item.description] = [];
         }
         acc[item.description].push(item);
         return acc;
      }, {});

      return calculatePercentages(groupedData);
   }

   function calculatePercentages(jsonObject) {
      let updatedJsonObject = {};
   
      for (let key in jsonObject) {
         let jsonArray = jsonObject[key];
         let total = jsonArray.reduce((sum, item) => sum + item.count, 0);
   
         updatedJsonObject[key] = jsonArray.map(item => ({
            ...item,
            percentage: parseFloat(((item.count / total) * 100).toFixed(1)) // Ensure it's a number
         }));
      }
   
      return updatedJsonObject;
   }


   //****************** */

   // Function to generate a random color in hex format
   const generateRandomColor = () => {
      const randomDarkValue = () => Math.floor(Math.random() * 128); // Value between 0 and 127

      const red = randomDarkValue();
      const green = randomDarkValue();
      const blue = randomDarkValue();

      return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
   };

   // Function to transform JSON into chart data with dynamic colors
   const getChartData = (data) => {
      const test = Object.values(data).flat().map(item => ({
         name: item.label,
         value: item.percentage,
         color: generateRandomColor() // Assign a random color
      }));
      return test;
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
                  Credit Score Analysis
               </h5>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>
                     Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/creditscoredata/application">Manage Credit Score Data</Breadcrumb.Item>
                  <Breadcrumb.Item>Credit Score Analysis</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <div className="my-8">
               <div className="flex items-center justify-center gap-6">
                  <PieChart width={1000} height={400}>
                     <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name}: ${percentage}`}
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip formatter={(value, name, entry) => [`${value} (${entry.payload.percentage})`, name]} />
                  </PieChart>
               </div>
               <div>
                  {Object.entries(riskGroupData).map(([key, value]) => (
                     <div key={key} className='mb-8'>
                        <Card className="w-full">
                           <h5 className="uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {key}
                           </h5>

                           <div className="my-6">
                              <Accordion collapseAll>
                                 {Object.entries(groupByDescription(value.groupByCriteria)).map(([description, items]) => (
                                    <Accordion.Panel key={description}>
                                       <Accordion.Title>{description}</Accordion.Title>
                                       <Accordion.Content>
                                          <div className="flex flex-row gap-8 w-full justify-between items-center">
                                             {/* Table Section */}
                                             <div className="w-1/2 min-w-0 overflow-x-auto">
                                                <Table hoverable className="w-full">
                                                   <Table.Head>
                                                      <Table.HeadCell>Label</Table.HeadCell>
                                                      <Table.HeadCell className="text-center w-12">Score</Table.HeadCell>
                                                      <Table.HeadCell className="text-center w-12">Count</Table.HeadCell>
                                                      <Table.HeadCell className="text-center w-12">Percentage</Table.HeadCell>
                                                   </Table.Head>
                                                   <Table.Body className="divide-y">
                                                      {items.map((item, index) => (
                                                         <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                            <Table.Cell>{item.label}</Table.Cell>
                                                            <Table.Cell className="text-center">{item.score}</Table.Cell>
                                                            <Table.Cell className="text-center">{item.count}</Table.Cell>
                                                            <Table.Cell className="text-center">{item.percentage}%</Table.Cell>
                                                         </Table.Row>
                                                      ))}
                                                   </Table.Body>
                                                </Table>
                                             </div>

                                             {/* Pie Chart Section */}
                                             <div className="w-full sm:w-1/2 flex justify-center">
                                                <ResponsiveContainer width="100%" height={400}>
                                                   <PieChart>
                                                      <Pie
                                                         data={getChartData(items)}
                                                         cx="50%"
                                                         cy="50%"
                                                         outerRadius="60%" // use percentage for responsiveness
                                                         fill="#8884d8"
                                                         dataKey="value"
                                                         label={({ name, value }) => `${value}%`}
                                                      >
                                                         {getChartData(items).map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                         ))}
                                                      </Pie>
                                                      <Tooltip />
                                                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                                                   </PieChart>
                                                </ResponsiveContainer>
                                             </div>

                                          </div>
                                       </Accordion.Content>
                                    </Accordion.Panel>
                                 ))}
                              </Accordion>
                           </div>
                        </Card>
                     </div>
                  ))}
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
