import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";
import { HiOutlineArrowRight, HiLockClosed, HiMail } from "react-icons/hi";
import authService from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(formData); 

      if(response.data.rol != "users") {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        setError("Unable to recognize email or password.");
      }
    } catch (err) {

      const errorMessage = err || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img src="/images/logo.png" className="mx-auto" alt="App Logo" />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <TextInput
                id="email"
                name="email"
                type="email"
                icon={HiMail}
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                color={formData.email ? (isEmailValid(formData.email) ? "success" : "failure") : "gray"}
              />
            </div>
            <div>
              <TextInput
                id="password"
                name="password"
                type="password"
                icon={HiLockClosed}
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                color={formData.password ? "success" : "gray"}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/forgotpassword" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
            {/* <div className="text-sm">
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up for an account
              </a>
            </div> */}
          </div>

          <div>
            <Button color="success" type="submit" className="w-full uppercase" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  SIGNING IN...
                </>
              ) : (
                "SIGN IN"
              )}
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
