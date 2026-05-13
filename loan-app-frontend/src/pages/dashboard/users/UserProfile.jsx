import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, Button, Breadcrumb, Dropdown, Table, Modal, Label, TextInput, Select, Toast, Spinner, Badge } from "flowbite-react";
import { HiFilter, HiHome, HiOutlineDotsVertical, HiPlus, HiCheck, HiExclamation, HiOutlineTrash, HiOutlinePencilAlt, HiOutlineLockClosed, HiOutlineExclamationCircle } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";
import userService from "../../../services/userService";

export default function Users() {
  const formRef = useRef(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [loadingScreen, setLoadingScreen] = useState(false); // State for loading
  const [errors, setErrors] = useState({});
  const [userDetail, setUserDetail] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  const [passwordFormData, setPasswordFormData] = useState({
    password: null,
    c_password: null,
  });

  const user = getUserData();

  function getUserData() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  const fetchUsers = async () => {
    try {
      setLoadingScreen(true);
      const response = await userService.getUsers();
      const userDetail = response.data.find(row => row.id === user.id);
      setUserDetail(userDetail); // Update the user list
      setFormData({
        fname: userDetail.fname,
        lname: userDetail.lname,
        address: userDetail.address,
        contact_number: userDetail.contact_number,
        email: userDetail.email,
        role: userDetail.role
      });

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingScreen(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "contact_number") {
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

  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    setPasswordFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors(prevState => ({
      ...prevState,
      ["c_password"]: null
    }));

  };

  const handleSubmit = async (e) => {
    console.log("handle submit!");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Show loading

    try {
      const response = await userService.updateUser(user.id, formData);

      setLoading(false); // Hide loading

      if (response.success) {
        const msg = "Profile updated successfully!";

        setToastMessage({ type: "success", message: msg });

        setErrors({}); // Clear errors

        fetchUsers();
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      setLoading(false); // Hide loading

      if (error?.errors) {
        // Handle API error response (status 404, etc.)
        handleErrorResponse(error.errors);
      } else {
        // Handle network errors or unexpected issues
        setToastMessage({ type: "error", message: "Something went wrong. Please try again." });
        console.error("Error:", error);
      }
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Show loading

    try {
      var response = await userService.changeUserPassword(user.id, passwordFormData);

      setLoading(false); // Hide loading

      if (response.success) {
        var msg = "Password is updated successfully!"

        setToastMessage({ type: "success", message: msg });

        // Clear form fields
        setPasswordFormData({
          password: null,
          c_password: null,
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

    if (response && typeof response === "object") {
      const firstErrorKey = Object.keys(response)[0]; // Get first field with an error
      if (response[firstErrorKey]?.length > 0) {
        errorMessage = response[firstErrorKey][0]; // Get the first error message
      }
    }

    setToastMessage({ type: "error", message: errorMessage });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fname) newErrors.fname = "First name is required";
    if (!formData.lname) newErrors.lname = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contact_number) newErrors.contact_number = "Contact number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
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
            Profile
          </h5>
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/home" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="my-8">
          <div>
            <form ref={formRef} onSubmit={handleSubmit}>
              {/* Applicant Details Section */}
              <div className="pb-3 flex justify-between items-center mb-5 border-b-2 border-gray-400">
                <h5 className="uppercase text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  APPLICANT DETAILS
                </h5>
                <Button color="success" size="xs" onClick={() => setOpenModal(true)} >
                  Reset Password
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-10">
                <div>
                  <Label htmlFor="fname" value="First Name" />
                  <TextInput
                    id="fname"
                    name="fname"
                    placeholder="Enter first name"
                    value={formData.fname || ""}
                    color={formData.fname == null ? "gray" : formData.fname ? "gray" : "failure"}
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
                    color={formData.lname == null ? "gray" : formData.lname ? "gray" : "failure"}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Address Field Spanning Two Columns */}
                <div className="col-span-2">
                  <Label htmlFor="address" value="Address" />
                  <TextInput
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address || ""}
                    color={formData.address == null ? "gray" : formData.address ? "gray" : "failure"}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email || ""}
                    color={formData.email == null ? "gray" : (formData.email && isEmailValid(formData.email)) ? "gray" : "failure"}
                    type="email"
                    onChange={handleChange}
                    required
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
                    value={formData.contact_number || ""}
                    color={formData.contact_number == null ? "gray" : formData.contact_number ? "gray" : "failure"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>


              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-10">
                <Button color="gray" href="/home">Cancel</Button>
                <Button type="submit" color="success" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Updating Profile...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)}>
          <Modal.Header>Change Password</Modal.Header>
          <Modal.Body>
            <form ref={formRef} onSubmit={handleSubmitPassword}>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Label htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={passwordFormData.password || ""}
                    color={passwordFormData.password == null ? "gray" : passwordFormData.password ? "success" : "failure"}
                    type="password"
                    onChange={handleChangePassword}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="c_password" value="Confirm Password" />
                  <TextInput
                    id="c_password"
                    name="c_password"
                    placeholder="Enter confirm password"
                    value={passwordFormData.c_password || ""}
                    color={passwordFormData.c_password == null ? "gray" : (passwordFormData.c_password && errors.c_password == null) ? "success" : "failure"}
                    type="password"
                    onChange={handleChangePassword}
                    required
                  />
                  {errors.c_password && <p className="text-red-500 text-sm mt-1">{errors.c_password}</p>}
                </div>
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
                      "Updating password...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
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