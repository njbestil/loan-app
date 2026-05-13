import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiOutlineArrowRight, HiMail, HiOutlineChevronLeft, HiExclamation, HiCheck } from "react-icons/hi";
import authService from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      var payload = {
        "email" : email
      }
      const response = await authService.forgotPassword(payload);

      if (response.success) {
        setToastMessage({ type: "success", message: "Reset link sent successfully!" });

        setEmail("");
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      if (!error.success) {
        // Handle API error response (status 404, etc.)
        handleErrorResponse(error);
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
    let errorMessage = response.message || "Failed to send reset link.";

    setToastMessage({ type: "error", message: errorMessage });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Email address" />
              <TextInput
                id="email"
                name="email"
                className="m-0"
                placeholder="Enter your email"
                required
                type="email"
                icon={HiMail}
                value={email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <Button color="success" type="submit" className="w-full uppercase" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
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
              <HiOutlineChevronLeft className="mr-1 text-2xl" /> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
