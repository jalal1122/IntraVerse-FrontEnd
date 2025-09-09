import Header from "../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { MdLogin } from "react-icons/md";
import { useEffect, useState } from "react";
import "./placeholderColor.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser, reset } from "../features/User/userSlice";
import { useNavigate } from "react-router";
import Loader from "../Components/Loader";

const Login = () => {
  // Redux selectors to get colors
  const { textColor, bgColor } = useSelector((state) => state.color.colors);

  // State to manage error message
  const [errorMessage, setErrorMessage] = useState("");

  // State to manage user data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // initialize dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage password validation
  const [passwordValid, setPasswordValid] = useState(true);

  // Password validation regex
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z]).{8,}$/;

  // get the user state from Redux store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  // Effect to handle side effects based on user state
  useEffect(() => {
    // Set error message if there is an error
    if (isError) {
      setErrorMessage(message);
    }

    // If login is successful or user is already logged in, navigate to dashboard
    if (isSuccess || user) {
      console.log("Login successful");
      // Navigate to dashboard or home page after successful login
      navigate("/");
    }

    // reset the user State
    dispatch(reset());

    // Cleanup function to reset error message on component unmount
    return () => {
      setErrorMessage("");
    };
  }, [isError, isSuccess, message, dispatch, user, navigate]);

  // Handle input changes
  const onchange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form handler
  const submitForm = (e) => {
    e.preventDefault();

    // Validate password strength
    if (!passwordRegex.test(userData.password)) {
      setPasswordValid(false);
      return;
    }

    // Dispatch login action with user data
    dispatch(loginUser(userData));
  };

  // if the user is loading, show the loader
  // Otherwise, render the login form
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <div
        className="flex flex-col justify-center items-center gap-5 w-[1200px] mx-auto my-10 p-5"
        style={{ color: textColor, backgroundColor: bgColor }}
      >
        {/* Heading */}
        <div className="heading flex justify-center items-center gap-5">
          <h1 className="text-4xl font-bold">User Login</h1>
          <MdLogin
            size={30}
            className="hover:scale-110 transition-transform duration-300"
            style={{
              color: textColor,
              cursor: "pointer",
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={submitForm}>
          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-500 mb-3 text-center">{errorMessage}</div>
          )}

          <div className="flex flex-col gap-3 mt-5 w-[300px]">
            {/* Email Div */}
            <div className="emailDiv relative">
              <input
                type="email"
                name="email"
                style={{
                  color: textColor,
                  "--placeholder-color": textColor,
                }}
                placeholder="Email"
                className="w-full p-2 border-2 border-gray-300 rounded"
                onChange={onchange}
                required
              />
              <FaEnvelope size={20} className="absolute right-2 top-3" />
            </div>

            {/* Password Validation Error */}
            {!passwordValid && userData.password && (
              <div className="text-red-500 text-sm">
                Password must contain at least 8 characters, including:
                <ul className="list-disc list-inside ml-2">
                  <li>One uppercase letter (A-Z)</li>
                  <li>One lowercase letter (a-z)</li>
                  <li>One digit (0-9)</li>
                  <li>One special character (!@#$%^&*)</li>
                </ul>
              </div>
            )}

            {/* Password Div */}

            <div className="passwordDiv relative mt-4">
              <input
                type="password"
                name="password"
                style={{
                  color: textColor,
                  "--placeholder-color": textColor,
                }}
                placeholder="Password"
                className="w-full p-2 border-2 border-gray-300 rounded"
                onChange={onchange}
                required
              />
              <FaLock size={20} className="absolute right-2 top-3" />
            </div>

            {/* Button to Submit the form */}
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
