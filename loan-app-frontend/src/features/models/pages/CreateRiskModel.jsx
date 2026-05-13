import { useState } from 'react';
import { Button, Label, TextInput, Breadcrumb, Table, Card, Toast, Modal, Carousel, Tooltip } from "flowbite-react";
import { HiHome, HiCheck, HiOutlineQuestionMarkCircle, HiPlus, HiOutlineTrash, HiExclamation } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import modelsService from "../services/modelsService";

export default function CreateRiskModel() {
   const [toastMessage, setToastMessage] = useState(null);
   const [loading, setLoading] = useState(false); // State for loading
   const [scoreForm, setScoreForm] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [openGuide, setOpenGuide] = useState(false);
   const [formData, setFormData] = useState([
      {
         category: "",
         criteria: [{ id: 1, description: "", scoring: [{ label: "", score: 0 }] }]
      }
   ]);
   const [infoData, setInfoData] = useState({
      name: null
   })
   const [editingIndex, setEditingIndex] = useState(null);

   // Passing score

   const [creditRisks, setCreditRisks] = useState([
      { definition: "", from: "", to: "", value: "", monthly_interest_rate: "" },
   ]);

   const handleRiskChange = (index, field, value) => {
      const updatedRisks = [...creditRisks];
      updatedRisks[index][field] = value;
      setCreditRisks(updatedRisks);
   };

   const addCreditRisk = () => {
      setCreditRisks([
         ...creditRisks,
         { definition: "", from: "", to: "", value: "", monthly_interest_rate: "" },
      ]);
   };

   const [maxId, setMaxId] = useState(1);

   const getNextId = () => {
      const nextId = maxId + 1; // Increment the current maxId
      setMaxId(nextId); // Update the maxId state
      return nextId; // Return the incremented ID
   };

   const handleCategoryChange = (index, value) => {
      const newFormData = [...formData];
      newFormData[index].category = value;
      setFormData(newFormData);
   };

   const handleDescriptionChange = (catIndex, critIndex, value) => {
      const newFormData = [...formData];
      newFormData[catIndex].criteria[critIndex].description = value;
      setFormData(newFormData);
   };

   const handleScoringChange = (catIndex, critIndex, scoreIndex, key, value) => {
      const newFormData = [...formData];
   
      // If the field is "score", remove leading zeros
      if (key === "score") {
         if (typeof value === "string") {
            value = value.replace(/^0+/, ''); // remove leading zeros
         }
         value = value ? parseInt(value, 10) : 0; // convert to number, default to 0
      }

      newFormData[catIndex].criteria[critIndex].scoring[scoreIndex][key] = value;
      setFormData(newFormData);
   };

   const addCriterion = (catIndex) => {
      const newFormData = [...formData];
      const nextId = getNextId(); //getNextId(newFormData);
      newFormData[catIndex].criteria.push({ id: nextId, description: "", scoring: [{ label: "", score: 0 }] });
      setFormData(newFormData);
   };

   const addScore = (catIndex, critIndex) => {
      const newFormData = [...formData];
      newFormData[catIndex].criteria[critIndex].scoring.push({ label: "", score: 0 });
      setFormData(newFormData);
   };

   const deleteScore = (catIndex, critIndex, scoreIndex) => {
      setFormData(prevFormData => {
         const updated = [...prevFormData];
         const category = { ...updated[catIndex] };
         const criteria = [...category.criteria];
         const criterion = { ...criteria[critIndex] };
         const scoring = [...criterion.scoring];

         // Prevent deletion if only one score remains
         if (scoring.length <= 1) {
            return prevFormData; // No changes
         }

         // Filter out the score at scoreIndex
         const newScoring = scoring.filter((_, i) => i !== scoreIndex);

         criterion.scoring = newScoring;
         criteria[critIndex] = criterion;
         category.criteria = criteria;
         updated[catIndex] = category;

         return updated;
      });
   };


   const clearFormData = () => {
      setFormData([
         {
            category: "",
            criteria: [{ id: getNextId(), description: "", scoring: [{ label: "", score: 0 }] }]
         }
      ]);
   };

   const validateForm = () => {
      var flag = 0;
      for (const section of formData) {
         if (!section.category.trim()) {
            flag++;
         }
         for (const criterion of section.criteria) {
            if (!criterion.description.trim()) {
               flag++;
            }
            for (const score of criterion.scoring) {
               if (!score.label.trim() || score.score === null || score.score === '') {
                  flag++;
               }
            }
         }
      }

      return flag <= 0;
   };

   const handleSubmit = () => {
      if (!validateForm()) {
         setToastMessage({ type: "error", message: "Please fill out all fields correctly before submitting." });
         return;
      }
      setOpenModal(false);
      console.log("Generated JSON: ", JSON.stringify(formData, null, 2));

      if (editingIndex !== null) {
         // Edit existing item
         setScoreForm(prevState => {
            const updated = [...prevState];
            updated[editingIndex] = formData[0]; // replace the item being edited
            return updated;
         });
         setEditingIndex(null); // reset editing state
      } else {
         // Add new item
         setScoreForm(prevState => [...prevState, ...formData]);
      }

      clearFormData();
      setFormData([
         {
            category: "",
            criteria: [{ id: getNextId(), description: "", scoring: [{ label: "", score: 0 }] }]
         }
      ]);

      console.log("Score form: ", JSON.stringify(scoreForm, null, 2));
   };


   const handleRemove = (index) => {
      const newScoreForm = [...scoreForm];
      newScoreForm.splice(index, 1);
      setScoreForm(newScoreForm);
   };

   const handleEdit = (index) => {
      setEditingIndex(index);
      const itemToEdit = scoreForm[index];
      setFormData([JSON.parse(JSON.stringify(itemToEdit))]); // deep copy
      setOpenModal(true);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (name == "name") {
         setInfoData(prevState => ({
            ...prevState,
            [name]: value
         }));
      }

   };

   const validateCreateModelForm = () => {
      if (!infoData.name || infoData.name.trim() === "") {
         setToastMessage({ type: "error", message: "Model name is required." });
         return false;
      }

      for (const item of creditRisks) {
         if (!item.definition || item.definition.trim() === "" ||
            !item.from || item.from.trim() === "" ||
            !item.to || item.to.trim() === "" ||
            !item.value || item.value.trim() === "" ||
            !item.monthly_interest_rate || item.monthly_interest_rate.trim() === "") {
            setToastMessage({ type: "error", message: "Passing score fields are required." });
            return false;
         }
      }

      if (scoreForm.length === 0) {
         setToastMessage({ type: "error", message: "Score form should not be empty." });
         return false;
      }

      return true;
   };


   const handleCreateModel = async () => {
      if (!validateCreateModelForm()) return;

      var payload = {
         name: infoData.name,
         passing_score: JSON.stringify(creditRisks),
         score_form: JSON.stringify(scoreForm)
      }

      setLoading(true);

      try {
         const response = await modelsService.createRiskScore(payload);

         if (response.success) {
            setToastMessage({ type: "success", message: "Risk Model created successfully!" });

            //reset
            resetForm();
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
      } finally {
         setLoading(false); // Hide loading
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

   const resetForm = () => {
      setInfoData({
         name: null
      });

      setCreditRisks([
         { definition: "", from: "", to: "", value: "", monthly_interest_rate: "" },
      ]);

      setScoreForm([]);

      setFormData([
         {
            category: "",
            criteria: [{ id: getNextId(), description: "", scoring: [{ label: "", score: 0 }] }]
         }
      ]);

      clearFormData();
      setMaxId(1);
   }

   return (
      <Dashboard>
         <div className="max-w p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className='mb-5'>
               <div className="mb-5 flex justify-between items-center">
                  <h5 className="uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                     CREATE RISK MODEL
                  </h5>
                  <Tooltip content="User Guide">
                     <HiOutlineQuestionMarkCircle onClick={() => setOpenGuide(true)} className="h-6 w-6 text-gray-500 hover:cursor-pointer hover:text-black" />
                  </Tooltip>

               </div>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>
                     Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/models">Manage Models</Breadcrumb.Item>
                  <Breadcrumb.Item>Create Risk Model</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <Modal show={openGuide} size="7xl" onClose={() => setOpenGuide(false)} popup>
               <Modal.Header />
               <Modal.Body>
                  <div className="h-[650px]">
                     <Carousel>
                        <div className="flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-700 dark:text-white p-20">
                           {/* Image container with limited height */}
                           <div className="w-full max-h-[500px] overflow-hidden">
                              <img
                                 src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop"
                                 alt="Nature 2"
                                 className="object-cover w-full h-full"
                              />
                           </div>

                           {/* Description below image */}
                           <div className="mt-4 text-center text-lg">
                              Step 1 : Describe here
                           </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-700 dark:text-white p-20">
                           {/* Image container with limited height */}
                           <div className="w-full max-h-[500px] overflow-hidden">
                              <img
                                 src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop"
                                 alt="Nature 2"
                                 className="object-cover w-full h-full"
                              />
                           </div>

                           {/* Description below image */}
                           <div className="mt-4 text-center text-lg">
                              Step 2 : Describe here
                           </div>
                        </div>
                     </Carousel>
                  </div>
               </Modal.Body>
            </Modal>


            <div className="mt-8">
               <div>
                  <div className="mb-5 border-b-2 border-gray-400">
                     <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        INFORMATION
                     </h5>
                  </div>
                  <div className="mb-10 grid gap-5">
                     <div>
                        <Label htmlFor="name" value="Risk Score Name" />
                        <TextInput
                           id="name"
                           name="name"
                           placeholder="Enter credit score name"
                           value={infoData.name ? infoData.name.charAt(0).toUpperCase() + infoData.name.slice(1) : ""}
                           color={infoData.name == null ? "gray" : infoData.name ? "success" : "failure"}
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>

                  <div className="mb-5 border-b-2 border-gray-400">
                     <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        PASSING SCORE
                     </h5>
                  </div>
                  <div className="space-y-6 p-4">
                     <Card className="mb-4">
                        <div className="pb-3 flex justify-between items-center mb-5 border-b-2 border-gray-400">
                           <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                              Score
                           </h5>
                           <Button color="success" size="xs" onClick={addCreditRisk} >
                              <HiPlus className="h-5 w-5" />
                           </Button>
                        </div>
                        {creditRisks.map((risk, index) => (
                           <div key={index} className='grid grid-cols-5 gap-2 mb-5'>
                              <div>
                                 <Label>Definition</Label>
                                 <TextInput
                                    type="text"
                                    value={risk.definition ? risk.definition.charAt(0).toUpperCase() + risk.definition.slice(1) : ""}
                                    onChange={(e) => handleRiskChange(index, "definition", e.target.value)}
                                    placeholder="Definition"
                                 />
                              </div>
                              <div>
                                 <Label>From</Label>
                                 <TextInput
                                    type="number"
                                    value={risk.from}
                                    onChange={(e) => handleRiskChange(index, "from", e.target.value)}
                                    placeholder="From"
                                 />
                              </div>
                              <div>
                                 <Label>To</Label>
                                 <TextInput
                                    type="number"
                                    value={risk.to}
                                    onChange={(e) => handleRiskChange(index, "to", e.target.value)}
                                    placeholder="To"
                                 />
                              </div>
                              <div>
                                 <Label>Value</Label>
                                 <TextInput
                                    type="text"
                                    value={risk.value ? risk.value.charAt(0).toUpperCase() + risk.value.slice(1) : ""}
                                    onChange={(e) => handleRiskChange(index, "value", e.target.value)}
                                    placeholder="Value"
                                 />
                              </div>
                              <div>
                                 <Label>Monthly Interest Rate</Label>
                                 <TextInput
                                    type="number"
                                    step="0.01"
                                    value={risk.monthly_interest_rate}
                                    onChange={(e) => handleRiskChange(index, "monthly_interest_rate", e.target.value)}
                                    placeholder="Monthly Interest Rate"
                                 />
                              </div>
                           </div>
                        ))}
                     </Card>

                     {/* <div className="flex gap-4">
                        <Button onClick={addCreditRisk}>Add Credit Risk</Button>
                        <Button onClick={generateJSON} color="success">Generate JSON</Button>
                     </div> */}
                  </div>
               </div>

               <div className="mb-5 border-b-2 border-gray-400">
                  <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                     SCORING SECTION
                  </h5>
               </div>
               <div className="space-y-6 p-4">
                  <div>
                     <div className="flex justify-end mb-5">
                        <Button
                           color="success"
                           onClick={() => {
                              setEditingIndex(null); // reset editing state
                              setOpenModal(true);
                           }}
                        >
                           Add Criterion
                        </Button>
                     </div>
                     <div className='border rounded-lg'>
                        <Table hoverable={true}>
                           <Table.Head>
                              <Table.HeadCell>Criteria Group</Table.HeadCell>
                              <Table.HeadCell className='w-16'>Action</Table.HeadCell>
                           </Table.Head>
                           <Table.Body className="divide-y">
                              {scoreForm.length === 0 ? (
                                 <Table.Row>
                                    <Table.Cell colSpan={2} className="text-center text-gray-500">
                                       No records
                                    </Table.Cell>
                                 </Table.Row>
                              ) : (
                                 scoreForm.map((item, index) => (
                                    <Table.Row key={index}>
                                       <Table.Cell>{item.category}</Table.Cell>
                                       <Table.Cell className='flex justify-center gap-2'>
                                          <Button
                                             color="primary"
                                             size="sm"
                                             onClick={() => handleEdit(index)}
                                          >
                                             Edit
                                          </Button>
                                          <Button
                                             color="failure"
                                             size="sm"
                                             onClick={() => handleRemove(index)}
                                          >
                                             <HiOutlineTrash className="text-lg" />
                                          </Button>
                                       </Table.Cell>
                                    </Table.Row>
                                 ))
                              )}
                           </Table.Body>
                        </Table>
                     </div>
                  </div>

                  <Modal show={openModal} size="7xl" onClose={() => {
                     setOpenModal(false);
                     clearFormData();
                  }}>
                     <Modal.Header>Add Criterion</Modal.Header>
                     <Modal.Body>
                        {formData.map((section, catIndex) => (
                           <div key={catIndex}>
                              <div className="pb-3 flex justify-between items-center mb-5 border-b-2 border-gray-400">
                                 <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Criterion
                                 </h5>
                                 <Button color="success" size="xs" onClick={() => addCriterion(catIndex)} >
                                    <HiPlus className="h-5 w-5" />
                                 </Button>
                              </div>

                              <div className="mb-4">
                                 <Label htmlFor={`category-${catIndex}`}>Name</Label>
                                 <TextInput
                                    id={`category-${catIndex}`}
                                    value={section.category}
                                    onChange={(e) => {
                                       const value = e.target.value;
                                       const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                                       handleCategoryChange(catIndex, capitalizedValue)
                                    }}
                                 />
                              </div>

                              {[...section.criteria].slice().reverse().map((criterion) => {
                                 // Find original index in the non-reversed array
                                 const critIndex = section.criteria.findIndex(c => c.id === criterion.id);

                                 return (
                                    <Card key={criterion.id} className="mb-6">
                                       <Label htmlFor={`description-${catIndex}-${critIndex}`}>Description</Label>
                                       <TextInput
                                          id={`description-${catIndex}-${critIndex}`}
                                          className='mb-2'
                                          value={criterion.description}
                                          onChange={(e) => {
                                             const value = e.target.value;
                                             const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                                             handleDescriptionChange(catIndex, critIndex, capitalizedValue)
                                          }}
                                       />
                                       <Label>Score Options</Label>
                                       {criterion.scoring.map((score, scoreIndex) => (
                                          <div key={scoreIndex} className="flex gap-2 mb-2 items-center">
                                             <TextInput
                                                placeholder="Label"
                                                className="flex-1"
                                                value={score.label}
                                                onChange={(e) => {
                                                   const value = e.target.value;
                                                   const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                                                   handleScoringChange(catIndex, critIndex, scoreIndex, "label", capitalizedValue);
                                                }}
                                             />
                                             <TextInput
                                                placeholder="Score"
                                                type="number"
                                                className="w-24"
                                                value={score.score !== undefined && score.score !== null 
                                                   ? String(score.score).replace(/^0+(?=\d)/, '') 
                                                   : ''}
                                                onChange={(e) =>
                                                   handleScoringChange(catIndex, critIndex, scoreIndex, "score", parseInt(e.target.value) || 0)
                                                }
                                             />
                                             <Button
                                                color="failure"
                                                size="xs"
                                                onClick={() => deleteScore(catIndex, critIndex, scoreIndex)}
                                             >
                                                <HiOutlineTrash className='text-lg' />
                                             </Button>
                                          </div>
                                       ))}
                                       <Button color="success" onClick={() => addScore(catIndex, critIndex)} className="mb-4">Add Score Option</Button>
                                    </Card>
                                 );
                              })}
                           </div>
                        ))}
                     </Modal.Body>
                     <Modal.Footer>
                        <Button color="success" onClick={handleSubmit} >Submit</Button>
                        <Button color="gray" onClick={() => {
                           setOpenModal(false);
                           clearFormData();
                        }}>
                           Cancel
                        </Button>
                     </Modal.Footer>
                  </Modal>
               </div>

               <div className="flex justify-center">
                  <Button color="success" onClick={handleCreateModel} className="mt-4" disabled={loading}>
                     {loading ? (
                        <>
                           <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                           </svg>
                           <span>Creating Model...</span>
                        </>
                     ) : (
                        <span>Create Model</span>
                     )}
                  </Button>
               </div>
            </div>
         </div>

         {toastMessage && (
            <div className="fixed top-4 right-4 z-[9999]">
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
   )
}
