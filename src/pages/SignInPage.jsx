import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { useParams, useNavigate } from "react-router-dom";
import loginImg from "../assets/loginImg.png";
import ReactLoading from "react-loading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("Member");
  const [loading, setLoading] = useState(false);
  const toggleCurrPassVisibility = () => setShowCurrPass(!showCurrPass);
  const [showCurrPass, setShowCurrPass] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (event) => {
    setLoading(true);
    event.preventDefault(); // Prevent form submission from reloading the page
    setError(""); // Clear previous error
    axios
      .post(
        "https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/login",
        { email, password }
      )
      .then((response) => {
        console.log(response.data);
        let userId = response.data.user_id;
        axios
          .get(
            `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`
          )
          .then((res) => {
            let userRole = res.data.user_role;
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("userId", userId);
            navigate(`/home/${userRole}/1`);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        setError("Incorrect email or password.");
      });
  };
  return (
    <div
      style={{ backgroundImage: `url(${loginImg})` }}
      className="bg-cover bg-center min-h-screen flex flex-col"
    >
      <div className="bg-red-900 flex items-center p-1">
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
          <div className="w-full max-w-xs">
            <form
              onSubmit={handleLogin}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
              <label className="font-semibold">Password:</label>
                <div className="flex flex-row my-3 ">
                  <input
                    required
                    type={showCurrPass ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  />
                  <button type="button" onClick={toggleCurrPassVisibility}>
                    {showCurrPass ? (
                      <AiOutlineEyeInvisible className="mt-2 text-2xl" />
                    ) : (
                      <AiOutlineEye className="mt-2 text-2xl" />
                    )}
                  </button>
                </div>
                <Link
                  className="text-blue-700 underline underline-offset-2"
                  to="/user/forgetpassword"
                >
                  ForgotPassword ?
                </Link>
              </div>
              {error && (
                <p className="text-red-500 text-xs italic mb-4">{error}</p>
              )}
              <div className="mb-4 p-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sign In As
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Member"
                    checked={role === "Member"}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2 leading-tight"
                  />
                  <label
                    htmlFor="student"
                    className="mr-4 text-gray-700 text-sm"
                  >
                    Member
                  </label>
                  <Link
                    className="text-blue-700 underline underline-offset-2"
                    to="/home/Guest/1"
                  >
                    Guest
                  </Link>

                  {/* <input
                  type="radio"
                  name="role"
                  value="Faculty"
                  checked={role === "Faculty"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2 leading-tight"
                />
                <label  className="text-gray-700 text-sm">
                  Faculty
                </label> */}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-2
                   px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p>Don't have an account ? </p>
                <Link
                  className="text-blue-700 underline underline-offset-2"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInPage;
