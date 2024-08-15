import React, { useState } from "react";
import logo from "../assets/logo.png";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState("Student");
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

  return (
    <div>
      <div className="bg-red-900 flex items-center p-4">
        <img src={logo} alt="Logo" className="w-26 h-32 mr-4" />
        <h1 className="text-3xl font-bold text-white">
          Hanoi University of Science and Technology
        </h1>
      </div>
      <div className="flex min-h-screen  pt-4 justify-center bg-gray-900 ">
        <div className="w-full max-w-xl">
          <form
            onSubmit={handleSignup}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sign Up As
              </label>
              <div className="flex items-center">
                <input
                  id="Member"
                  type="radio"
                  name="role"
                  value="Member"
                  checked={role === "Member"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="Member" className="mr-4 text-gray-700 text-sm">
                  Member
                </label>

                <input
                  id="Librarian"
                  type="radio"
                  name="role"
                  value="Librarian"
                  checked={role === "Librarian"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="Librarian" className="text-gray-700 text-sm">
                  Librarian
                </label>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-xs italic mb-4">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
