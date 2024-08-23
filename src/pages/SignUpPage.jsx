import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import loginImg from "../assets/loginImg.png";
import ReactLoading from "react-loading";

import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineTag,
} from "react-icons/ai";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [buttonState, setButtState] = useState(true);
  const [Id, setId] = useState("");
  const [role, setRole] = useState("Member");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const toggleCurrPassVisibility = () => setShowCurrPass(!showCurrPass);

  const handleSignup = async (event) => {
    setLoading(true)
    event.preventDefault();
    let parsedId = parseInt(Id, 10);
    let userData = {
      id: parsedId,
      name: username,
      phone_number: phone,
      email_address: email,
      password: password,
    };

    console.log(userData);

    try {
      const response = await axios.post(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user`,
        userData
      );

      // Check for success based on status code or response content
      console.log(response);
      setLoading(false)
      navigate("/login");
      enqueueSnackbar("Account created successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      // Handle network or unexpected errors
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      setLoading(false)

    }
  };

  const validatePassword = () => {
    const errors = [];
    // Length Check
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    // Complexity Check
    const complexityRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!complexityRegex.test(password)) {
      errors.push(
        "Password must include uppercase, lowercase, number, and special character."
      );
    }
    if (errors.length > 0) {
      setPasswordError(errors.join(" "));
      setButtState(true);
    } else {
      setPasswordError("");
      setButtState(false);
    }
  };
  // Trigger validation when the password changes
  useEffect(() => {
    validatePassword();
  }, [password]);
  return (
    <div
      style={{ backgroundImage: `url(${loginImg})` }}
      className="bg-cover bg-center min-h-screen flex flex-col"
    >
      <div className="bg-red-900 flex items-center p-4">
        <img src={logo} alt="Logo" className="w-26 h-32 mr-4" />
        <h1 className="text-3xl font-bold text-white">
          Hanoi University of Science and Technology
        </h1>
      </div>
      {loading ? (
        <div className="flex flex-grow items-center justify-center">
          <ReactLoading type="cylon" color="red" />
        </div>
      ) : (
      <div className="flex pt-4 justify-center">
        <div className="w-full max-w-xl">
          <form
            onSubmit={handleSignup}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Id"
              >
                Student Id
              </label>
              {/* <p className="font-light text-gray-500 text-xs italic">
                Skip if you're not a student
              </p> */}
              <input
                id="Id"
                type="text"
                value={Id}
                onChange={(e) => setId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Full name
              </label>
              <p className="text-gray-500 text-xs italic">Ex: Nguyen Van A</p>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3
                 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">Enter password:</label>
              <div className="flex flex-row my-3 ">
                <input
                  required
                  type={showCurrPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border px-2 py-1 rounded-md ml-2"
                />
                <button type="button" onClick={toggleCurrPassVisibility}>
                  {showCurrPass ? (
                    <AiOutlineEyeInvisible className="mt-2 text-2xl" />
                  ) : (
                    <AiOutlineEye className="mt-2 text-2xl" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address (optional)
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number(optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email 
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 
                text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs italic mb-4">{error}</p>
            )}
            <div className="flex items-center justify-center">
              <button
                disabled={buttonState}
                type="submit"
                className={`p-2 px-10 rounded-3xl mt-4  ${
                  buttonState
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white cursor-pointer"
                }`}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}

export default SignUpPage;
