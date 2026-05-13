import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Toast, Modal } from "flowbite-react";
import { HiOutlineChevronLeft, HiExclamation, HiCheck } from "react-icons/hi";
import { Link } from 'react-router-dom';
import authService from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    fname: null,
    lname: null,
    email: null,
    password: null,
    c_password: null,
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: (value == null) ? '' : value
    }));

  };

  const handleCheckboxChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Show loading

    try {
      const response = await authService.register(formData);

      setLoading(false); // Hide loading

      if (response.success) {
        setToastMessage({ type: "success", message: "Registration Successful!" });

        // Clear form fields
        setFormData({
          fname: null,
          lname: null,
          email: null,
          password: null,
          c_password: null,
          role: "user",
        });

        setErrors({}); // Clear errors
        setAgree(false); // Uncheck the checkbox

        console.log("Registration Successful:", response);
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      setLoading(false); // Hide loading

      if (!error.success) {
        // Handle API error response (status 404, etc.)
        if(error.errors) handleErrorResponse(error.errors);
        else setToastMessage({ type: "error", message: error });
      } else {
        // Handle network errors or unexpected issues
        setToastMessage({ type: "error", message: "Registration failed. Please try again." });
        console.error("Error:", error);
      }
    }
  };

  const handleErrorResponse = (response) => {
    let errorMessage = response || "Registration failed!";

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
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.c_password) newErrors.c_password = "Confirm password is required";
    if (formData.password && formData.c_password && formData.password !== formData.c_password) {
      newErrors.c_password = "Passwords do not match";
    }
    if (!agree) newErrors.agree = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isEmailValid = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fname" value="First Name" />
              </div>
              <TextInput id="fname" name="fname" type="text" value={formData.fname || ""} placeholder="Your first name"
                color={(formData.fname == null) ? "gray" : (formData.fname) ? "success" : "failure"}
                onChange={handleChange} required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lname" value="Last Name" />
              </div>
              <TextInput id="lname" name="lname" type="text" value={formData.lname || ""} placeholder="Your last name"
                color={(formData.lname == null) ? "gray" : (formData.lname) ? "success" : "failure"}
                onChange={handleChange} required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput id="email" name="email" type="email" value={formData.email || ""} placeholder="Your email address"
                color={(formData.email == null) ? "gray" : (formData.email && isEmailValid(formData.email)) ? "success" : "failure"}
                onChange={handleChange} required shadow />
            </div>
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
            <div className="flex items-center gap-2">
              <Checkbox id="agree" checked={agree} onChange={handleCheckboxChange} />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link href="#" onClick={() => setOpenModal(true)} className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
            {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

            <Button color="success" type="submit" className="uppercase flex items-center justify-center" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register new account"
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

          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Terms and Conditions</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  By using this Loan Calculator App, you agree to the following terms and conditions:
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  <strong>1. Informational Purposes Only:</strong> The App provides estimated loan calculations for reference only. It does not offer financial advice or guarantee loan approval. Consult a financial expert before making decisions.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  <strong>2. No Liability:</strong> We are not responsible for any decisions made based on the calculations or for any errors in the results.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  <strong>3. User Responsibility:</strong> You are responsible for entering accurate information to receive relevant estimates.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  <strong>4. No Data Storage:</strong> The App does not store or share your personal financial data.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  <strong>5. Changes to Terms:</strong> We may update these terms at any time. Continued use of the App means you accept the updated terms.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
                  If you do not agree with these terms, please stop using the App.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)}>I accept</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </Modal>


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

export default Register;
