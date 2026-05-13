import { useState, useEffect } from 'react';
import { Checkbox, Button, Breadcrumb, Dropdown, Table, Modal, Label, TextInput, Toast, Spinner, Badge } from "flowbite-react";
import { HiOutlineChip, HiOutlineChartPie, HiOutlineEye, HiXCircle, HiCheckCircle, HiFilter, HiHome, HiOutlineDotsVertical, HiCheck, HiExclamation } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import applicationsService from "../services/applicationsService";
import modelsService from "../../models/services/modelsService";
import usersService from "../../users/services/usersService";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const formatDateTime = (dateString) => {
   const date = new Date(dateString);
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
   const day = String(date.getDate()).padStart(2, "0");
   const year = date.getFullYear();

   return `${month}-${day}-${year}`;
};

export default function Application() {
   const navigate = useNavigate();
   const [cid, setCid] = useState(null);
   const [rid, setRid] = useState(null);

   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState({ user: false, admin: false });
   const [toastMessage, setToastMessage] = useState(null);
   const [loadingScreen] = useState(false); // State for loading
   const [users, setUsers] = useState([]);
   const [applications, setApplications] = useState([]);
   const [creditScoreData, setCreditScoreData] = useState([]);
   const [riskScoreData, setRiskScoreData] = useState([]);
   const [data, setData] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [reportForm, setReportForm] = useState({
      creditModel: null,
      riskModel: null
   });

   const fetchUsers = async () => {
      try {
         //setLoadingScreen(true);
         const response = await usersService.list();

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
         const response = await applicationsService.list();

         if (response.success) {
            const filteredData = response.data.filter(app => app.credit_score_id === parseInt(cid) && app.risk_score_id === parseInt(rid)); // Filter where id = 1
            setApplications(filteredData); // Update the user list
            console.log("application", filteredData);
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
         const response = await modelsService.listCreditScores();

         if (response.success) {
            //const filteredData = response.data.filter(item => item.is_deleted != true);
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
         const response = await modelsService.listRiskScores();

         if (response.success) {
            //const filteredData = response.data.filter(item => item.is_deleted != true);
            setRiskScoreData(response.data);
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         //setLoadingScreen(false);
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
      console.log("fetch data")
      // setLoadingScreen(true);
      if (applications.length > 0 && users.length > 0 && riskScoreData.length > 0 && creditScoreData.length > 0) {
         console.log("fetch data2");
         const mergedData = applications.map(app => ({
            ...app,
            credit_score_details: JSON.parse(app.credit_score_details),
            risk_score: JSON.parse(app.risk_score),
            risk_score_details: JSON.parse(app.risk_score_details),
            user: users.find(user => user.id === app.user_id) || null,
            risk: riskScoreData.find(rs => rs.id === app.risk_score_id) || null,
            credit: creditScoreData.find(cs => cs.id === app.credit_score_id) || null
         }));

         // setLoadingScreen(false);
         setData(mergedData); // Store merged data in state
         //console.log("Merged Data:", mergedData);
      } else {
         setData([]);
      }
   }, [users, applications, riskScoreData, creditScoreData]);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const cidParam = params.get("cid");
      const ridParam = params.get("rid");
    
      if (cidParam) setCid(cidParam);
      if (ridParam) setRid(ridParam);
    
      if (cidParam && ridParam) {
        fetchApplications();
      } else {
        setOpenModal(true);
      }
    }, [cid, rid]);

   const filteredData = data.filter(row => {
      // users removed/deleted
      if (!row.user) return false;

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

   const getRiskLevelColor = (riskScore, riskPassingScore) => {
      riskPassingScore = JSON.parse(riskPassingScore);
    
      const values = riskPassingScore.map(risk => Number(risk.value)).filter(v => !isNaN(v));
    
      if (values.length === 0) return "gray"; // fallback if no valid values
    
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const range = maxValue - minValue;
    
      const score = Number(riskScore?.value);
    
      // Handle undefined/invalid rating → gray
      if (isNaN(score) || score === null || score === undefined) {
        return "gray";
      }
    
      // If score is outside the known range → gray
      if (score < minValue || score > maxValue) {
        return "gray";
      }
    
      // Dynamic thresholds (split into 3 bands)
      const cutoffLow = minValue + range * 0.4;  // 40% of range
      const cutoffMid = minValue + range * 0.7;  // 70% of range
    
      if (score <= cutoffLow) return "green";   // Low = safe
      if (score <= cutoffMid) return "yellow";  // Mid
      return "red";                             // High = risky
    };
    

   const getPieColor = (riskScore, riskPassingScore) => {
      riskPassingScore = JSON.parse(riskPassingScore);

      let rating = Number(riskScore.value);
      const totalParts = Number(riskPassingScore.length);

      // Ensure valid totalParts
      if (isNaN(totalParts) || totalParts <= 0) return "#ccc"; // fallback color

      // Handle undefined/invalid rating → return gray
      if (isNaN(rating) || rating === null || rating === undefined) {
         return "#e9e9e9"; // Gray (no rating)
      }

      // Clamp rating within 1 → totalParts
      if (rating < 1) rating = 1;
      if (rating > totalParts) rating = totalParts;

      // Progress: 1 = lowest (0%), totalParts = highest (100%)
      const progress = parseFloat(((rating / totalParts) * 100).toFixed(2));

      console.log(
         "rating=" + riskScore.value,
         "totalParts=" + riskPassingScore.length,
         "progress=" + progress
      );

      // Flipped thresholds with only 3 levels
      if (progress <= 40) return "#95c3af"; // Green (low rating = safe)
      if (progress <= 70) return "#ebe397"; // Yellow (mid rating)
      return "#e5c0c0";                     // Red (high rating = risky)

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

   // Handle form submission
   const handleSubmit = (event) => {
      event.preventDefault();
    
      const creditModel = reportForm.creditModel;
      const riskModel = reportForm.riskModel;
    
      // Update state
      setCid(creditModel);
      setRid(riskModel);
    
      // Update URL parameters
      const url = new URL(window.location);
      url.searchParams.set("cid", creditModel);
      url.searchParams.set("rid", riskModel);
      window.history.replaceState({}, "", url); // replaceState avoids a full reload
    
      console.log("Selected Credit Model ID:", creditModel);
      console.log("Selected Risk Model ID:", riskModel);
    
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
                           label={({ name, percentage }) => `${name}: ${percentage}`}
                        >
                           {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip formatter={(value, name, entry) => [`${value} (${entry.payload.percentage})`, name]} />
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
                  <div className='flex gap-2'>
                     <Button color="success" onClick={() => setOpenModal(true)}>
                        <HiOutlineChartPie className="mr-2 h-5 w-5" /> Generate Report
                     </Button>
                     <Button
                        color="success"
                        onClick={handleNavigate}
                        disabled={filteredData.length === 0}
                     >
                        <HiOutlineChip className="mr-2 h-5 w-5" /> Predictive Analysis
                     </Button>
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
                                 <Table.Cell className='capitalize'>{data.credit.name}</Table.Cell>
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
                                             <span className="capitalize whitespace-nowrap mr-1">{data.risk_score.definition}</span>
                                          </div>
                                       </Badge>

                                       : <Badge color="gray" className="capitalize py-1 px-3 inline-block w-auto rounded-full ">unfit</Badge>}
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

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
               <Modal.Header />
               <Modal.Body>
                  <form onSubmit={handleSubmit}>
                     <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                           Generate Report
                        </h3>

                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="creditModel" value="Credit Model" />
                           </div>
                           <select
                              id="creditModel"
                              name="creditModel"
                              value={reportForm.creditModel || ""}
                              onChange={handleChange}
                              required
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           >
                              <option value="">Select a Credit Model</option>
                              {creditScoreData.map((option) => (
                                 <option key={option.id} value={option.id}>
                                    {option.name}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="riskModel" value="Risk Model" />
                           </div>
                           <select
                              id="riskModel"
                              name="riskModel"
                              value={reportForm.riskModel || ""}
                              onChange={handleChange}
                              required
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           >
                              <option value="">Select a Risk Model</option>
                              {riskScoreData.map((option) => (
                                 <option key={option.id} value={option.id}>
                                    {option.name}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div className="w-full">
                           <Button type="submit" color="success" className="mx-auto">
                              Submit
                           </Button>
                        </div>
                     </div>
                  </form>
               </Modal.Body>
            </Modal>

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
