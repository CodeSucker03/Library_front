import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import ReactLoading from "react-loading";
import {
  AiOutlineEdit,
  AiOutlineHistory,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillInteraction,
} from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import logo from "../assets/logo.png";
import BackButton from "../components/BackButton";
import Footer from "./Footer";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [query, setQuery] = useState(""); // State to hold the search query
  const [loading, setLoading] = useState(false);

  const fetchUsers = (searchQuery = "", page) => {
    // default search value is empty
    let url = ``;
    setLoading(true);
    if (searchQuery == "") {
      url = `https://sadnguyencoder.pythonanywhere.com/user/api/v1/users?per_page=8&page=${page}`;
    }
    // const url = `http://localhost:5555/books/?query=${searchQuery}`
    axios
      .get(url)
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // const handleSearch = (searchQuery) => {
  //   setQuery(searchQuery); // Update the query state, which triggers useEffect
  // };
  useEffect(() => {
    fetchUsers(query, pageNum); // Fetch books based on the query
  }, [query, pageNum]); // useEffect will re-run whenever the `query` state changes

  return (
    <div className="flex flex-col">
      <div className="bg-red-800 flex items-center p-2 fixed top-0 w-full z-50 justify">
        <img src={logo} alt="Logo" className="w-14 h-20 mr-4" />
        <h1 className="text-3xl font-bold text-white">
          HUST Library Members Management
        </h1>
        {/* <SearchBar onSearch={handleSearch}></SearchBar> */}
      </div>
      {loading ? (
        <div className="flex flex-grow items-center justify-center">
          <ReactLoading type="cylon" color="red" />
        </div>
      ) : (
        <>
          <div className="mt-28 mx-10">
            <BackButton></BackButton>
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-black">ID</th>
                  <th className="border border-black max-md:hidden">Name</th>
                  <th className="border border-black max-md:hidden">
                    Membership type
                  </th>
                  <th className="border border-black">Account status</th>
                  <th className="border border-black">History</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="h-8">
                    <td className="border border-slate-700 text-center">
                      {user.id}
                    </td>
                    <td className="border border-slate-700 text-center max-md:hidden">
                      {user.name}
                    </td>
                    <td className="border border-slate-700 text-center max-md:hidden">
                      {user.membership_type}
                    </td>
                    <td
                      className={`border border-slate-700 text-center ${
                        user.account_status === "Active"
                          ? "text-green-500"
                          : "text-red-400"
                      }`}
                    >
                      <div className="flex flex-row justify-center items-center">
                      {user.account_status}
                      <Link to={`/user/status/${user.id}`}>
                      <AiFillInteraction className="text-4xl mx-4"></AiFillInteraction>
                      </Link>
                      </div>
                      
                    </td>
                    <td className="border border-slate-700 text-center">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/user/history/${user.id}`}>
                          <BsInfoCircle className="text-2xl text-red-800"></BsInfoCircle>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-3
                   px-4 rounded-2xl focus:outline-none focus:shadow-outline  "
              onClick={() => setPageNum(pageNum > 1 ? pageNum - 1 : 1)} // Decrement pageNum only if it's greater than 1
            >
              <AiOutlineArrowLeft></AiOutlineArrowLeft>
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-3
                   px-4 rounded-2xl focus:outline-none focus:shadow-outline  "
            >
              {pageNum}
            </button>
            {users.length != 0 && (
              <button
                className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-3
                   px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                onClick={() => setPageNum(pageNum + 1)}
              >
                <AiOutlineArrowRight></AiOutlineArrowRight>
              </button>
            )}
          </div>
        </>
      )}
      <div className="flex justify-center">
        {/* Footer content goes here */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default UsersTable;
