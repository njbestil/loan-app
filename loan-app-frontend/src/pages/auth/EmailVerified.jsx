import React from "react";
import { Button } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function EmailVerified() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <HiCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">Email Verified Successfully</h2>
        <p className="text-gray-600 mt-2">
          Your email has been successfully verified. You can now access your account.
        </p>
        <Button color="success" className="mt-4 w-full" onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    </div>
  );
}

export default EmailVerified;
