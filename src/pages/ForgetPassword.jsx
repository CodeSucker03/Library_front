import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ForgetPassword = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMess] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      user_id: parseInt(userId, 10),
      email: email.trim(),
    };

    try {
      const response = await axios.post(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/forgot_password`,
        payload
      );
      setMess(response.data.message);
      setShowOtp(true);
    } catch (error) {
      console.error(error);
      setMess("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      user_id: parseInt(userId, 10),
      email: email.trim(),
      otp_code: otp.trim(),
    };

    try {
      const response = await axios.post(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/verify_otp_code`,
        payload
      );
      const res = await axios.get(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`
      );
      setLoading(false);

      let userRole = res.data.user_role;
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userId", userId);
      enqueueSnackbar(response.data.message, { variant: "success" });
      navigate(`/home/${userRole}/1`);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to validate OTP. Please try again.", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Enter your information</h1>
      <form onSubmit={handleSubmit}>
        {!showOtp && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userId"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}

        <p className="text-red-500 text-xs italic mb-4">{message}</p>

        {!showOtp && (
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Sending..." : "Send me OTP code"}
          </button>
        )}
      </form>

      {showOtp && (
        <form onSubmit={sendOtp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              OTP
            </label>
            <input
              type="password"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Validating..." : "Validate"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
