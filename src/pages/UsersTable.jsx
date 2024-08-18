import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import logo from "../assets/logo.png";


const UsersTable = ({ users }) => {
  return (
  <div className="flex flex-col">
    <div className="bg-red-800 flex items-center p-2 fixed top-0 w-full z-50 justify-between">
      <img src={logo} alt="Logo" className="w-14 h-20 mr-4" />
      <h1 className="text-3xl font-bold text-white">HUST Library</h1>
      <SearchBar onSearch={handleSearch}></SearchBar>
    </div>
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-black">ID</th>
          <th className="border border-black">Name</th>
          <th className="border border-black max-md:hidden">
            Membership type{" "}
          </th>
          <th className="border border-black max-md:hidden">Account status</th>
          <th className="border border-black">Manage</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.ID} className="h-8">
            <td className="border border-slate-700 text-center">
              {user.ID}
            </td>
            <td className="border border-slate-700 text-center">
              {user.name}
            </td>
            <td className="border border-slate-700 text-center max-md:hidden">
              {user.membership_type}
            </td>
            <td className="border border-slate-700 text-center max-md:hidden">
              {user.account_status}
            </td>
            <td className="border border-slate-700 text-center">
              <div className="flex justify-center gap-x-4">
                <BsInfoCircle className="text-2xl text-green-800"></BsInfoCircle>
                <AiOutlineEdit className="text-2xl text-yellow-600"></AiOutlineEdit>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UsersTable;
