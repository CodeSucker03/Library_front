import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineTag } from "react-icons/ai";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserStatus = () => {
  const { userId } = useParams();
  const [status, setStatus] = useState(""); // Initialize state for status

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    // You can perform additional actions here, such as updating the status in a form or making an API call
  };
  const [user, setUser] = useState({
    id: "",
    name: "",
    address: "",
    phone_number: "",
    email_address: "",
    membership_type: "",
    user_role: "",
    account_status: "",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`
        );
        setUser(response.data);
        setStatus(response.data.account_status)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      member_id: parseInt(userId),
      account_status: status,
    };
    console.log(payload);
    try {
      const response = await axios.put(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/librarian/update_member_account_status`,
        payload
      );
      console.log(response);
      enqueueSnackbar("Update user successfully", { variant: "success" });
      navigate(`/userMangement`);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Failed to Update User", { variant: "error" });
    }
  };

  return (
    <div className="p-4 flex justify-center m-4 ">
      <BackButton destination={`/userMangement`}></BackButton>
      <div className="flex w-full max-w-screen-lg ">
        {/* Receipt on the left */}
        <div className="w-2/3 bg-white p-6 rounded shadow-2xl mr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl my-4">User Status</h1>
            <div className="flex items-center gap-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={status ==="Active"}
                  className="hidden"
                  onChange={handleStatusChange}
                />
                <span
                  className={`w-4 h-4 rounded-full border-2 cursor-pointer mr-2 inline-block ${
                    status === "Active" ? "bg-green-500" : "bg-white"
                  }`}
                ></span>
                Active
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={status === "Inactive"}
                  className="hidden"
                  onChange={handleStatusChange}
                />
                <span
                  className={`w-4 h-4 rounded-full border-2 cursor-pointer mr-2 inline-block ${
                    status === "Inactive" ? "bg-red-500" : "bg-white"
                  }`}
                ></span>
                Inactive
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-red-600  hover:bg-red-900
                font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
