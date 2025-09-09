import Header from "../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaEnvelope, FaLock, FaFile } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { registerUser, reset } from "../features/User/userSlice";
import "./placeholderColor.css";

const Register = () => {
  // initialize dispatch
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const message = useSelector((state) => state.user.message);

  //   sate to check for error message
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
    }
    if (isSuccess) {
      console.log("Registration successful");
    }

    dispatch(reset());

    // Cleanup function to reset error message on component unmount
    return () => {
      setErrorMessage("");
    };
  }, [isError, isSuccess, message, dispatch, errorMessage]);

  // Redux selectors to get colors
  const textColor = useSelector((state) => state.color.colors.textColor);
  const bgColor = useSelector((state) => state.color.colors.bgColor);

  // State to manage password match validation
  const [passwordMatch, setPasswordMatch] = useState(true);

  // State to manage password validation
  const [passwordValid, setPasswordValid] = useState(true);

  // Password validation regex
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z]).{8,}$/;

  // State to manage user data
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    profilePicture: "",
  });

  // Function to handle input changes
  const onchange = (e) => {
    const { name, value } = e.target;

    setuserData({
      ...userData,
      [name]: value,
    });

    // Validate password in real-time
    if (name === "password") {
      setPasswordValid(passwordRegex.test(value));
    }

    // Reset password match error when user types
    if (name === "password" || name === "password2") {
      setPasswordMatch(true);
    }
  };

  // Function to handle image upload
  const onImageChange = (e) => {
    const file = e.target.files[0];

    // validate file type and size if necessary
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (file && !allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG/PNG/JPG)");
      return;
    }

    // validate file size 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file && file.size > maxSize) {
      alert("File size exceeds 10MB limit");
      return;
    }

    setuserData({
      ...userData,
      profilePicture: file,
    });
  };

  // Function to handle form submission
  const submitForm = (e) => {
    e.preventDefault();

    // Validate password strength
    if (!passwordRegex.test(userData.password)) {
      setPasswordValid(false);
      return;
    }

    // check if passwords match
    if (userData.password !== userData.password2) {
      setPasswordMatch(false);
      return;
    }

    const formData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      profilePicture: userData.profilePicture,
    };

    dispatch(registerUser(formData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div
        className="flex flex-col justify-center items-center gap-5 w-[1200px] mx-auto my-10 p-5"
        style={{ color: textColor, backgroundColor: bgColor }}
      >
        {/* Heading */}
        <div className="heading flex justify-center items-center gap-5">
          <h1 className="text-4xl font-bold">Register a new User</h1>
          <FaUser
            size={30}
            className="hover:scale-110 transition-transform duration-300"
            style={{
              color: textColor,
              cursor: "pointer",
            }}
          />
        </div>

        {/* Form */}

        {/* if Succes then show success message else the form */}

        {isSuccess ? (
          <div className="text-green-500 text-lg">
            Registration successful! You can now log in.
          </div>
        ) : (
          <>
            <form onSubmit={submitForm}>
              {/* if errorMessage contains error then show error else form inputs */}
              {errorMessage ? (
                <div className="text-red-500 mb-3">{errorMessage}</div>
              ) : (
                <>
                  <div className="flex flex-col gap-3 mt-5">
                    {/* UserName Div */}
                    <div className="userDiv relative">
                      <input
                        type="text"
                        style={{
                          color: textColor,
                          "--placeholder-color": textColor,
                        }}
                        name="username"
                        placeholder="Username"
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        onChange={onchange}
                        required
                      />
                      <FaUser size={20} className="absolute right-2 top-3" />
                    </div>

                    {/* Email Div */}
                    <div className="emailDiv relative">
                      <input
                        type="email"
                        style={{
                          color: textColor,
                          "--placeholder-color": textColor,
                        }}
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        onChange={onchange}
                        required
                      />
                      <FaEnvelope
                        size={20}
                        className="absolute right-2 top-3"
                      />
                    </div>

                    {/* Password Div */}
                    <div className="passwordDiv relative">
                      <input
                        type="password"
                        style={{
                          color: textColor,
                          "--placeholder-color": textColor,
                        }}
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        onChange={onchange}
                        required
                      />
                      <FaLock size={20} className="absolute right-2 top-3" />
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
                    <div className="passwordDiv relative">
                      <input
                        type="password"
                        style={{
                          color: textColor,
                          "--placeholder-color": textColor,
                        }}
                        name="password2"
                        placeholder="Confirm Password"
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        onChange={onchange}
                        required
                      />
                      <FaLock size={20} className="absolute right-2 top-3" />
                    </div>

                    {/* Password Not Match Error */}
                    {!passwordMatch && (
                      <div className="text-red-500">
                        Passwords do not match. Please try again.
                      </div>
                    )}

                    {/* Profile Picture Upload Div */}
                    <div className="Filediv relative">
                      <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        onChange={onImageChange}
                      />
                      <FaFile size={20} className="absolute right-2 top-3" />
                    </div>

                    {/* Image Preview */}
                    {userData.profilePicture && (
                      <img
                        src={URL.createObjectURL(userData.profilePicture)}
                        alt="Profile Preview"
                        className="mt-3 w-32 h-32 object-cover rounded"
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    className="mt-5 p-2 w-full font-bold text-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Register
                  </button>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
