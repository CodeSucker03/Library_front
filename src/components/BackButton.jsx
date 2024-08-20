import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  const userRole = localStorage.getItem("userRole") || "defaultRole"; // Provide a fallback if needed
  // const userId = localStorage.getItem("userId") || "defaultId"; // Provide a fallback if needed
  const destination = `/home/${userRole}`;

  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-red-500 text-white px-5 py-3 rounded-lg w-fit"
        aria-label="Go back"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;

