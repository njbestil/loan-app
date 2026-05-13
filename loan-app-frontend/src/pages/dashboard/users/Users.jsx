import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, Button, Breadcrumb, Dropdown, Table, Modal, Label, TextInput, Select, Toast, Spinner, Badge } from "flowbite-react";
import { HiFilter, HiHome, HiOutlineDotsVertical, HiPlus, HiCheck, HiExclamation, HiOutlineTrash, HiOutlinePencilAlt, HiOutlineFolder, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineLockClosed, HiOutlineExclamationCircle } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import userService from "../../../services/userService";
import dataService from "../../../services/dataService";
import { useNavigate } from "react-router-dom";

export default function Users() {
   const navigate = useNavigate();
   const formRef = useRef(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [roleFilter, setRoleFilter] = useState({ user: false, admin: false });
   const [toastMessage, setToastMessage] = useState(null);
   const [loading, setLoading] = useState(false); // State for loading
   const [loadingScreen, setLoadingScreen] = useState(false); // State for loading
   const [errors, setErrors] = useState({});
   const [users, setUsers] = useState([]);
   const [applications, setApplications] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [openConfirmModal, setOpenConfirmModal] = useState(false);
   const [mode, setMode] = useState(null);
   const [isShowPassword, setIsShowPassword] = useState(true);
   const [selectedUser, setSelectedUser] = useState(null);
   const [formData, setFormData] = useState({
      fname: null,
      lname: null,
      address: null,
      contact_number: null,
      email: null,
      password: null,
      c_password: null,
      role: null,
   });

   // Get logged-in user from localStorage
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const loggedInUserId = storedUser?.id;

   const fetchUsers = async () => {
      try {
         setLoadingScreen(true);
         const response = await userService.getUsers();

         // Filter users with is_active = true
         let activeUsers = response.data.filter(
            user => user.is_active == 1 && (user.admin_id == loggedInUserId || user.admin_id == 0)
         );

         console.log("users filter", activeUsers);

         setUsers(activeUsers); // Update the user list with filtered + sorted data
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         setLoadingScreen(false);
      }
   };

   const fetchApplications = async () => {
      try {
         setLoadingScreen(true);
         const response = await dataService.getApplications();

         if (response.success) {
            setApplications(response.data); // Update the user list
         }
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         setLoadingScreen(false);
      }
   };

   // Fetch users on component mount
   useEffect(() => {
      fetchUsers();
      fetchApplications();
   }, []);

   const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const filteredUsers = users.filter(user => {
      const address = (user.address) ? user.address : "";
      const contact_number = (user.contact_number) ? user.contact_number : "";

      const matchesSearch =
         user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         address.toLowerCase().includes(searchTerm.toLowerCase()) ||
         contact_number.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
         (!roleFilter.user && !roleFilter.admin) ||
         (roleFilter.user && user.role === "user") ||
         (roleFilter.admin && user.role === "admin");

      return matchesSearch && matchesRole;
   });

   const handleAdd = async () => {
      // Clear form fields
      setFormData({
         fname: null,
         lname: null,
         address: null,
         contact_number: null,
         email: null,
         password: null,
         c_password: null,
         role: null,
      });
      setMode("add");
      setOpenModal(true); // Open the modal after data is set
   };

   const handleEdit = (id) => {
      console.log("Edit user", id);
      setSelectedUser(id);
      setMode("edit");

      // Find the user from the existing list
      const userData = users.find(user => user.id === id);
      if (!userData) {
         console.error("User not found");
         return;
      }

      // Update formData with the selected user’s details
      setFormData({
         fname: userData.fname || "",
         lname: userData.lname || "",
         address: userData.address || "",
         contact_number: userData.contact_number || "",
         email: userData.email || "", // Not needed for edit mode, but included
         password: "", // Keep empty for security
         c_password: "", // Keep empty for security
         role: userData.role || "", // Not needed for edit mode, but included
      });

      setOpenModal(true); // Open the modal after data is set
   };

   const handleChangePassword = (id) => {
      setMode("password");
      setSelectedUser(id);

      // Find the user from the existing list
      const userData = users.find(user => user.id === id);
      if (!userData) {
         console.error("User not found");
         return;
      }

      // Update formData with the selected user’s details
      setFormData({
         fname: userData.fname || "",
         lname: userData.lname || "",
         address: userData.address || "",
         contact_number: userData.contact_number || "",
         email: userData.email || "", // Not needed for edit mode, but included
         password: null, // Keep empty for security
         c_password: null, // Keep empty for security
         role: userData.role || "", // Not needed for edit mode, but included
      });

      setOpenModal(true); // Open the modal after data is set
   };

   const handleViewLoans = (id) => {
      navigate(`/creditscoredata/application/user?uid=${id}`);
   }

   const handleDelete = (id) => {
      setMode("delete");
      setSelectedUser(id);
      setOpenConfirmModal(true);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (name == "role") {
         var password = null;
         var isShowpassword = true;

         if (value == "user") {
            isShowpassword = false;

            password = "password123";
         }

         setFormData(prevState => ({
            ...prevState,
            [name]: value,
            ["password"]: password, // add this since we are removing user access
            ["c_password"]: password // add this since we are removing user access
         }));

         setIsShowPassword(isShowpassword);
      }
      else if (name == "contact_number") {
         const formattedNumber = formatPhoneNumber(value);

         setFormData(prevState => ({
            ...prevState,
            [name]: formattedNumber
         }));
      } else {
         setFormData(prevState => ({
            ...prevState,
            [name]: value
         }));

         setErrors(prevState => ({
            ...prevState,
            ["c_password"]: null
         }));
      }

   };

   const handleDeleteUser = async () => {
      setLoading(true); // Show loading

      try {
         const response = await userService.deleteUser(selectedUser);

         setLoading(false); // Hide loading

         if (response.success) {
            setToastMessage({ type: "success", message: "User is deleted successfully!" });
            fetchUsers();
         } else {
            handleErrorResponse(response);
         }

      } catch (error) {
         setLoading(false); // Hide loading

         if (!error.success) {
            // Handle API error response (status 404, etc.)
            handleErrorResponse(error.errors);
         } else {
            // Handle network errors or unexpected issues
            setToastMessage({ type: "error", message: "Something went wrong. Please try again." });
            console.error("Error:", error);
         }
      }

      setOpenConfirmModal(false);
   }

   const handleSubmit = async (e) => {
      console.log("handle submit!")
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      setLoading(true); // Show loading

      try {
         var response = null;

         if (mode == "add") { 
            formData.admin_id = (formData.role == "user") ? loggedInUserId : 0;
            response = await userService.registerUser(formData);
          }
         else if (mode == "edit") { response = await userService.updateUser(selectedUser, formData); }
         else if (mode == "password") { response = await userService.changeUserPassword(selectedUser, formData); }

         setLoading(false); // Hide loading

         if (response.success) {
            var msg = "Success!";
            if (mode == "add") { msg = "User added successfully!" }
            else if (mode == "edit") { msg = "User is updated successfully!" }
            else if (mode == "password") { msg = "User password is updated successfully!" }


            setToastMessage({ type: "success", message: msg });

            // Clear form fields
            setFormData({
               fname: null,
               lname: null,
               address: null,
               contact_number: null,
               email: null,
               password: null,
               c_password: null,
               role: null,
            });

            setErrors({}); // Clear errors

            fetchUsers();
         } else {
            handleErrorResponse(response);
         }
      } catch (error) {
         setLoading(false); // Hide loading

         if (!error.success) {
            // Handle API error response (status 404, etc.)
            if (error.errors) handleErrorResponse(error.errors);
            else setToastMessage({ type: "error", message: error });
         } else {
            // Handle network errors or unexpected issues
            setToastMessage({ type: "error", message: "Something went wrong. Please try again." });
            console.error("Error:", error);
         }
      }

      setOpenModal(false);
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

   const validateForm = () => {
      let newErrors = {};
      if (!formData.fname) newErrors.fname = "First name is required";
      if (!formData.lname) newErrors.lname = "Last name is required";
      if (!formData.address) newErrors.address = "Last name is required";
      if (!formData.contact_number) newErrors.contact_number = "Last name is required";
      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Invalid email format";
      }
      if (mode == "password" || mode == "add") {
         if (!formData.password) newErrors.password = "Password is required";
         if (!formData.c_password) newErrors.c_password = "Confirm password is required";
         if (formData.password && formData.c_password && formData.password !== formData.c_password) {
            newErrors.c_password = "Passwords do not match";
         }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const isEmailValid = (value) => {
      return /\S+@\S+\.\S+/.test(value);
   }

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

   const hasLoanApplication = (id) => {
      return applications.some(app => app.user_id === id);
   };

   const getUserLoanApplicationCount = (id) => {
      return applications.filter(app => app.user_id === id && app.status == "pass").length;
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
                  Add Users
               </h5>
               <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/home" icon={HiHome}>
                     Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Add Users</Breadcrumb.Item>
               </Breadcrumb>
            </div>

            <div className="my-8">
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
                     <div className="flex items-center gap-2">
                        <Checkbox
                           id="user"
                           checked={roleFilter.user}
                           onChange={() => setRoleFilter({ ...roleFilter, user: !roleFilter.user })}
                           label="User"
                        />
                        <Label htmlFor="accept" className="flex">
                           User
                        </Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <Checkbox
                           id="admin"
                           checked={roleFilter.admin}
                           onChange={() => setRoleFilter({ ...roleFilter, admin: !roleFilter.admin })}
                           label="Admin"
                        />
                        <Label htmlFor="accept" className="flex">
                           Admin
                        </Label>
                     </div>


                  </div>
                  <Button color="success" onClick={() => handleAdd()}> {/* Replace with your add user logic */}
                     <HiPlus className="mr-2 h-5 w-5" />
                     Add User
                  </Button>
               </div>
               <div className="">
                  <Table hoverable>
                     <Table.Head>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Address</Table.HeadCell>
                        <Table.HeadCell>Contact No.</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell className="text-center">Active Loans</Table.HeadCell>
                        <Table.HeadCell className="text-center">Role</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                     </Table.Head>
                     <Table.Body>
                        {filteredUsers.map((user) => (
                           <Table.Row key={user.id}>
                              <Table.Cell className='capitalize'>{user.fname}</Table.Cell>
                              <Table.Cell className='capitalize'>{user.lname}</Table.Cell>
                              <Table.Cell>{user.address}</Table.Cell>
                              <Table.Cell>{(user.contact_number) ? "+63 " + user.contact_number : ""}</Table.Cell>
                              <Table.Cell>{user.email}</Table.Cell>
                              <Table.Cell className="text-center">
                                 {user.role !== "admin" && (
                                    <Badge
                                       className="px-2 inline-flex w-auto"
                                       color={getUserLoanApplicationCount(user.id) > 0 ? "success" : "failure"}
                                       icon={
                                          getUserLoanApplicationCount(user.id) > 0
                                             ? HiOutlineCheckCircle
                                             : HiOutlineXCircle
                                       }
                                    >
                                       {getUserLoanApplicationCount(user.id) > 0 ? getUserLoanApplicationCount(user.id) : ""}
                                    </Badge>
                                 )}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                 <Badge color={user.role === "admin" ? "indigo" : "warning"} className="inline-block w-auto">
                                    {user.role}
                                 </Badge>
                              </Table.Cell>
                              <Table.Cell className="text-right w-12">
                                 <Dropdown inline label={<HiOutlineDotsVertical className="text-xl" />}>
                                    <Dropdown.Item onClick={() => handleEdit(user.id)}>
                                       <HiOutlinePencilAlt className="mr-2" /> Edit
                                    </Dropdown.Item>
                                    {user.role == "admin" && (
                                       <Dropdown.Item onClick={() => handleChangePassword(user.id)}>
                                          <HiOutlineLockClosed className="mr-2" /> Change Password
                                       </Dropdown.Item>
                                    )}
                                    {user.role == "user" && (
                                       <Dropdown.Item onClick={() => handleViewLoans(user.id)}>
                                          <HiOutlineFolder className="mr-2" /> View Loans
                                       </Dropdown.Item>
                                    )}
                                    <Dropdown.Item onClick={() => handleDelete(user.id)}>
                                       <HiOutlineTrash className="mr-2" /> Delete
                                    </Dropdown.Item>
                                 </Dropdown>
                              </Table.Cell>
                           </Table.Row>
                        ))}
                     </Table.Body>
                  </Table>
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
                           <Button color="failure" type="submit" onClick={() => handleDeleteUser()}>
                              {"Yes, I'm sure"}
                           </Button>
                           <Button color="gray" onClick={() => setOpenConfirmModal(false)}>
                              No, cancel
                           </Button>
                        </div>
                     </div>
                  </Modal.Body>
               </Modal>

               {/* Add User Modal */}
               <Modal show={openModal} size="6xl" onClose={() => setOpenModal(false)}>
                  <Modal.Header>{mode === "edit" ? "Edit User" : mode === "password" ? "Change Password" : "Add New User"}</Modal.Header>
                  <Modal.Body>
                     <form ref={formRef} onSubmit={handleSubmit}>
                        {/* Applicant Details Section */}
                        {(mode == "edit" || mode == "add") && (
                           <>
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
                                       value={formData.fname || ""}
                                       color={formData.fname == null ? "gray" : formData.fname ? "success" : "failure"}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div>
                                    <Label htmlFor="lname" value="Last Name" />
                                    <TextInput
                                       id="lname"
                                       name="lname"
                                       placeholder="Enter last name"
                                       value={formData.lname || ""}
                                       color={formData.lname == null ? "gray" : formData.lname ? "success" : "failure"}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div>
                                    <Label htmlFor="address" value="Address" />
                                    <TextInput
                                       id="address"
                                       name="address"
                                       placeholder="Enter address"
                                       value={formData.address || ""}
                                       color={formData.address == null ? "gray" : formData.address ? "success" : "failure"}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div>
                                    <Label htmlFor="contact_number" value="Contact Number" />
                                    <TextInput
                                       id="contact_number"
                                       name="contact_number"
                                       addon="+63"
                                       placeholder="XXX XXX XXXX"
                                       value={formData.contact_number || ""}
                                       color={formData.contact_number == null ? "gray" : formData.contact_number ? "success" : "failure"}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                              </div>
                           </>
                        )}

                        <div className="mb-5 border-b-2 border-gray-400">
                           <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                              ACCOUNT DETAILS
                           </h5>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                           {(mode == "edit" || mode == "add") && (
                              <>
                                 <div>
                                    <Label htmlFor="role" value="Role" />
                                    <Select
                                       id="role"
                                       name="role"
                                       value={formData.role || ""}
                                       color={(formData.role == null) ? "gray" : (formData.role) ? "success" : "failure"}
                                       onChange={handleChange}
                                       required
                                       shadow
                                    >
                                       <option value="">Select role</option>
                                       <option value="admin">Admin</option>
                                       <option value="user">User</option>
                                    </Select>
                                 </div>
                                 <div>
                                    <Label htmlFor="email" value="Email" />
                                    <TextInput
                                       id="email"
                                       name="email"
                                       placeholder="Enter email"
                                       value={formData.email || ""}
                                       color={formData.email == null ? "gray" : (formData.email && isEmailValid(formData.email)) ? "success" : "failure"}
                                       type="email"
                                       onChange={handleChange}
                                       required
                                       disabled={mode == "edit"}
                                    />
                                 </div>
                              </>
                           )}
                           {/* Only show Account Details if mode is "add" */}
                           {(mode !== "edit" && isShowPassword) && (
                              <>
                                 <div>
                                    <Label htmlFor="password" value="Password" />
                                    <TextInput
                                       id="password"
                                       name="password"
                                       placeholder="Enter password"
                                       value={formData.password || ""}
                                       color={formData.password == null ? "gray" : formData.password ? "success" : "failure"}
                                       type="password"
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div>
                                    <Label htmlFor="c_password" value="Confirm Password" />
                                    <TextInput
                                       id="c_password"
                                       name="c_password"
                                       placeholder="Enter confirm password"
                                       value={formData.c_password || ""}
                                       color={formData.c_password == null ? "gray" : (formData.c_password && errors.c_password == null) ? "success" : "failure"}
                                       type="password"
                                       onChange={handleChange}
                                       required
                                    />
                                    {errors.c_password && <p className="text-red-500 text-sm mt-1">{errors.c_password}</p>}
                                 </div>
                              </>
                           )}
                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-10">
                           <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
                           <Button type="submit" color="success" disabled={loading}>
                              {loading ? (
                                 <>
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    {mode === "edit" ? "Updating User..." : mode === "password" ? "Updating password..." : "Adding User..."}
                                 </>
                              ) : (
                                 mode === "edit" ? "Save" : mode === "password" ? "Submit" : "Add User"
                              )}
                           </Button>
                        </div>
                     </form>
                  </Modal.Body>
               </Modal>
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