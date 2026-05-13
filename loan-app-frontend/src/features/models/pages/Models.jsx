import { useState, useEffect } from 'react';
import { Button, TextInput, Breadcrumb, Tabs, Table, Spinner, Dropdown, Modal, Toast } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiExclamation, HiCheck, HiOutlineExclamationCircle, HiPlus, HiFilter, HiHome, HiOutlineCash, HiOutlineShieldExclamation, HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import modelsService from "../services/modelsService";

const formatDateTime = (dateString) => {
   const date = new Date(dateString);
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
   const day = String(date.getDate()).padStart(2, "0");
   const year = date.getFullYear();
   return `${month}-${day}-${year}`;
};

export default function Models() {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState("");
   const [loadingScreen, setLoadingScreen] = useState(false);
   const [creditScoreData, setCreditScoreData] = useState([]);
   const [openConfirmModal, setOpenConfirmModal] = useState(false);
   const [selectedRow, setSelectedRow] = useState(null);
   const [toastMessage, setToastMessage] = useState(null);
   const [riskScoreData, setRiskScoreData] = useState([]);
   const [modelType, setModelType] = useState("credit");

   useEffect(() => {
      fetchCreditScore();
      fetchRiskScore();
   }, []);

   const fetchCreditScore = async () => {
      try {
         setLoadingScreen(true);
         const response = await modelsService.listCreditScores();
         if (response.success) {
            const filteredData = response.data.filter(item => item.is_deleted != true);
            setCreditScoreData(filteredData);
         }
      } catch (error) {
         console.error("Error fetching credit score data:", error);
      } finally {
         setLoadingScreen(false);
      }
   };

   const fetchRiskScore = async () => {
      try {
         setLoadingScreen(true);
         const response = await modelsService.listRiskScores();
         
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

   const filteredCreditScores = creditScoreData.filter(score =>
      score.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const filteredRiskScores = riskScoreData.filter(score =>
      score.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   if (loadingScreen) {
      return (
         <div className="flex justify-center items-center h-screen">
            <Spinner size="xl" />
            <span className="ml-2 text-gray-700 dark:text-white">Please wait...</span>
         </div>
      );
   }

   const handleView = (data) => {
  
      // Store data in localStorage
      localStorage.setItem('model_detail', JSON.stringify(data));
  
      // Navigate to "models/view"
      navigate('/models/view');
    };

   const handleDelete = (id, type) => {
      setModelType(type)
      setSelectedRow(id);
      setOpenConfirmModal(true);
   };

   const handleDeleteRow = async () => {
      try {
         var response;
         if(modelType == "credit") response = await modelsService.removeCreditScore(selectedRow);
         else response = await modelsService.removeRiskScore(selectedRow);

         if (response.success) {
            setToastMessage({ type: "success", message: "Deleted successfully!" });
            fetchCreditScore();
            fetchRiskScore();
         } else {
            handleErrorResponse(response);
         }

      } catch (error) {

         if (!error.success) {
            // Handle API error response (status 404, etc.)
            if (error.length > 0) setToastMessage({ type: "error", message: error });
            else handleErrorResponse(error.errors);
         } else {
            // Handle network errors or unexpected issues
            setToastMessage({ type: "error", message: "Something went wrong. Please try again." });
            console.error("Error:", error);
         }
      }

      setOpenConfirmModal(false);
   }


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
   return (
      <Dashboard>
         <div className="max-w p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className='mb-5'>
               <h5 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Models</h5>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Manage Models</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <div className="mt-8">
               <Tabs aria-label="Tabs with underline" variant="underline">
                  <Tabs.Item active={modelType=="credit"} title="Credit Score" icon={HiOutlineCash}>
                     <div className="flex justify-between items-center mb-4">
                        <TextInput
                           placeholder="Search here..."
                           value={searchTerm}
                           icon={HiFilter}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-64"
                        />
                        <Button color="success" href='models/credit/create'>
                           <HiPlus className="mr-2 h-5 w-5" /> Create Model
                        </Button>
                     </div>
                     <Table hoverable>
                        <Table.Head>
                           <Table.HeadCell className="text-center w-1">#</Table.HeadCell>
                           <Table.HeadCell>Name</Table.HeadCell>
                           <Table.HeadCell className="text-center w-48">Date</Table.HeadCell>
                           <Table.HeadCell className="text-right w-12">Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                           {filteredCreditScores.length > 0 ? (
                              filteredCreditScores.map((score, i) => (
                                 <Table.Row key={score.id}>
                                    <Table.Cell>{i + 1}</Table.Cell>
                                    <Table.Cell>{score.name}</Table.Cell>
                                    <Table.Cell className="text-center">{formatDateTime(score.created_at)}</Table.Cell>
                                    <Table.Cell className="text-right">
                                       <Dropdown inline label={<HiOutlineDotsVertical className="text-xl" />}>
                                          <Dropdown.Item onClick={() => handleView(score, "credit")}>
                                             <HiOutlineEye className="mr-2" /> View
                                          </Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleDelete(score.id, "credit")}>
                                             <HiOutlineTrash className="mr-2" /> Delete
                                          </Dropdown.Item>
                                       </Dropdown>
                                    </Table.Cell>
                                 </Table.Row>
                              ))
                           ) : (
                              <Table.Row>
                                 <Table.Cell colSpan={4} className="text-center text-gray-500 py-6">
                                    No records found
                                 </Table.Cell>
                              </Table.Row>
                           )}
                        </Table.Body>
                     </Table>

                  </Tabs.Item>
                  <Tabs.Item active={modelType=="risk"} title="Risk Score" icon={HiOutlineShieldExclamation}>
                     <div className="flex justify-between items-center mb-4">
                        <TextInput
                           placeholder="Search here..."
                           value={searchTerm}
                           icon={HiFilter}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-64"
                        />
                        <Button color="success" href='models/risk/create'>
                           <HiPlus className="mr-2 h-5 w-5" /> Create Model
                        </Button>
                     </div>
                     <Table hoverable>
                        <Table.Head>
                           <Table.HeadCell className="text-center w-1">#</Table.HeadCell>
                           <Table.HeadCell>Name</Table.HeadCell>
                           <Table.HeadCell className="text-center w-48">Date</Table.HeadCell>
                           <Table.HeadCell className="text-right w-12">Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                           {filteredRiskScores.length > 0 ? (
                              filteredRiskScores.map((score, i) => (
                                 <Table.Row key={score.id}>
                                    <Table.Cell>{i + 1}</Table.Cell>
                                    <Table.Cell>{score.name}</Table.Cell>
                                    <Table.Cell className="text-center">{formatDateTime(score.created_at)}</Table.Cell>
                                    <Table.Cell className="text-right">
                                       <Dropdown inline label={<HiOutlineDotsVertical className="text-xl" />}>
                                          <Dropdown.Item onClick={() => handleView(score, "risk")}>
                                             <HiOutlineEye className='mr-2' /> View
                                          </Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleDelete(score.id, "risk")}>
                                             <HiOutlineTrash className='mr-2' /> Delete
                                          </Dropdown.Item>
                                       </Dropdown>
                                    </Table.Cell>
                                 </Table.Row>
                              ))
                           ) : (
                              <Table.Row>
                                 <Table.Cell colSpan={4} className="text-center text-gray-500 py-6">
                                    No records found
                                 </Table.Cell>
                              </Table.Row>
                           )}
                        </Table.Body>
                     </Table>
                  </Tabs.Item>
               </Tabs>
            </div>
         </div>

         {/* Confirm Modal */}
         <Modal show={openConfirmModal} size="md" onClose={() => setOpenConfirmModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-500">
                     Are you sure you want to delete this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure" type="submit" onClick={() => handleDeleteRow()}>
                        {"Yes, I'm sure"}
                     </Button>
                     <Button color="gray" onClick={() => setOpenConfirmModal(false)}>
                        No, cancel
                     </Button>
                  </div>
               </div>
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
      </Dashboard>
   );
}
