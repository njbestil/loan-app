import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Select, Toast, Modal } from "flowbite-react";
import { HiOutlineChevronLeft, HiExclamation, HiCheck } from "react-icons/hi";
import { Link } from 'react-router-dom';
import userService from "../../services/userService";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: null,
    c_password: null,
  });

  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: (value == null) ? '' : value
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Show loading

    try {
      const response = await userService.changePassword(formData);

      

      if (response.success) {
        setToastMessage({ type: "success", message: "Reset password Successful!" });

        // Clear form fields
        setFormData({
          password: null,
          c_password: null
        });

        setErrors({}); // Clear errors
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      if (!error.success) {
        // Handle API error response (status 404, etc.)
        handleErrorResponse(error.data);
      } else {
        // Handle network errors or unexpected issues
        setToastMessage({ type: "error", message: "Reset password failed. Please try again." });
        console.error("Error:", error);
      }
    } finally {
      setLoading(false); // Hide loading
    }
  };

  const handleErrorResponse = (response) => {
    let errorMessage = response || "Reset password failed!";

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

    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.c_password) newErrors.c_password = "Confirm password is required";
    if (formData.password && formData.c_password && formData.password !== formData.c_password) {
      newErrors.c_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput id="password" name="password" type="password" value={formData.password || ""} placeholder='Your password' autoComplete="password"
                color={(formData.password == null) ? "gray" : (formData.password) ? "success" : "failure"}
                onChange={handleChange} required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="c_password" value="Confirm password" />
              </div>
              <TextInput id="c_password" name="c_password" type="password" value={formData.c_password || ""} autoComplete="c_password"
                color={(formData.c_password == null) ? "gray" : (formData.c_password) ? "success" : "failure"}
                onChange={handleChange} required shadow />
              {errors.c_password && <p className="text-red-500 text-sm">{errors.c_password}</p>}
            </div>

            <Button color="success" type="submit" className="uppercase flex items-center justify-center" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Resetting password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

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

          <div className="mt-6">
            <Link to="/login" className="flex items-center text-sm text-blue-600 hover:text-blue-500">
              <HiOutlineChevronLeft className='mr-1 text-2xl' /> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
