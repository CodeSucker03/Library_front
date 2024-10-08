import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineHistory,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

const sideBar = ({ onClose, userName }) => {
  const [userRole, setRole] = useState(localStorage.getItem("userRole"));
  let userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("currentPage");

    sessionStorage.clear();
    navigate(`/login`);
  };

  const showHistory = () => {
    navigate(`/user/history/${userId}`);
  };

  const memberManagement = () => {
    navigate("/userMangement");
  };

  return (
    <div
      className="fixed bg-gray-800 bg-opacity-80 top-0 left-0 right-0 bottom-0 z-50
    flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[300px] max-w-full h-full bg-white rounded-3xl p-4 mr-4 flex flex-col relative"
      >
        <div className="h-screen flex flex-col">
          <div className="flex-grow-[9] w-full">
            {/* First div content */}
            <AiOutlineClose
              className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
              onClick={onClose}
            />

            {/* User Name and logo */}
            <div className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer">
              <AiOutlineUser className="text-red-300 text-5xl" />
              {userRole != "" && (
                <Link to={`/user/details/${userId}`}>
                <h2 className="my-1 font-semibold text-gray-600 text-2xl">
                  {userName}
                </h2>
                </Link>
              )}
              {userRole != "Member" && userRole != "Librarian" && (
                <Link to={`/login`}>
                  <h2 className="my-1 font-semibold text-gray-600 text-2xl">
                    Login to borrow books
                  </h2>
                </Link>
              )}
              
            </div>
            {userRole == "Member" && (
              <button
                onClick={showHistory}
                className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer"
              >
                <AiOutlineHistory className="text-red-300 text-4xl" />
                <h1 className="my-1 font-medium text-gray-600 text-1xl">
                  Read History
                </h1>
              </button>
            )}

            {userRole == "Librarian" && (
              <button
                onClick={memberManagement} // Replace with your function to show user info
                className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer"
              >
                <AiOutlineUserSwitch className="text-red-300 text-4xl" />
                <h1 className="my-1 font-medium text-gray-600 text-1xl">
                  Member management
                </h1>
              </button>
            )}
          </div>
          <div className="flex-grow w-full">
            {/* Second div content */}
            <button
              onClick={LogOut}
              className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer"
            >
              <AiOutlineLogout className="text-red-300 text-4xl" />
              <p>Log Out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sideBar;
