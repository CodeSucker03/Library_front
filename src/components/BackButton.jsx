import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination }) => {
  const userRole = localStorage.getItem("userRole") || "";
  const page = localStorage.getItem("currentPage") || "1"
  const defaultDestination = `/home/${userRole}/${page}`;
  const finalDestination = destination || defaultDestination;

  return (
    <div className="flex">
      <Link
        to={finalDestination}
        className="bg-red-500 text-white px-5 py-3 rounded-lg w-fit"
        aria-label="Go back"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
