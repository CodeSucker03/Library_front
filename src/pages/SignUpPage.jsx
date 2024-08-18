import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [buttonState, setButtState] = useState(true);
  const [Id, setId] = useState("");
  const [role, setRole] = useState("Member");
  const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    
    console.log("Signing up with", { username, password, role });

    const response = await fakeSignupApi(username, password, role);

    if (response.success) {
      console.log("Signup successful!");
      // Handle successful signup (e.g., redirect, display success message, etc.)
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  const fakeSignupApi = (username, password, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
  
  
  const validatePassword = () => {
    const errors = [];
    // Length Check
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    // Complexity Check
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
    <>
      <div className="bg-red-900 flex items-center p-4">
        <img src={logo} alt="Logo" className="w-26 h-32 mr-4" />
        <h1 className="text-3xl font-bold text-white">
          Hanoi University of Science and Technology
        </h1>
      </div>
      <div className="flex min-h-screen pt-4 justify-center bg-gray-800">
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
              <p className="font-light text-gray-500 text-xs italic">
                Skip if you're not a student
              </p>
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
                Username
              </label>
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
    </>
  );
}

export default SignUpPage;
