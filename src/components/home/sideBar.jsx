import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineHistory,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

const sideBar = ({ onClose, user }) => {
  const navigate = useNavigate();
  const handleShowUserInfo = () => {
    navigate(`/user/details/${user.ID}`);
  };
  
  const LogOut = () => {
    console.log("LOGout");
  };
  
  const showHistory = () => {
    console.log("Show history");
  };
  
  const memberManagement = () => {
    navigate("/userMangement")
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
            <button
              onClick={handleShowUserInfo} // Replace with your function to show user info
              className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer"
            >
              <AiOutlineUser className="text-red-300 text-5xl" />
              <h2 className="my-1 font-semibold text-gray-600 text-2xl">
                Do Nhat Hoang
              </h2>
            </button>

            <button
              onClick={showHistory} // Replace with your function to show user info
              className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer"
            >
              <AiOutlineHistory className="text-red-300 text-4xl" />
              <h1 className="my-1 font-medium text-gray-600 text-1xl">
                Read History
              </h1>
            </button>

            <button
              onClick={memberManagement} // Replace with your function to show user info
              className="flex justify-start items-center gap-x-2 mt-16 bg-transparent border-none cursor-pointer"
            >
              <AiOutlineUserSwitch className="text-red-300 text-4xl" />
              <h1 className="my-1 font-medium text-gray-600 text-1xl">
                Member management
              </h1>
            </button>
          </div>
          <div className="flex-grow w-full bg-green-500">
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
