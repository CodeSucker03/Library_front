import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import { AiOutlineEdit, AiOutlineHistory } from "react-icons/ai";
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

  const fetchBooks = (searchQuery = "", page) => {
    // default search value is empty
    let url = ``;
    setLoading(true);
    if (searchQuery == "") {
    //   url = `https://sadnguyencoder.pythonanywhere.com/book/api/v1/books?per_page=5&page=${page}`;
    }
    // const url = `http://localhost:5555/books/?query=${searchQuery}`
    axios
      .get(url)
      .then((res) => {
        
        // setBooks(res.data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks(query, pageNum); // Fetch books based on the query
  }, [query, pageNum]); // useEffect will re-run whenever the `query` state changes

  return (
    <div className="flex flex-col">
      <div className="bg-red-800 flex items-center p-2 fixed top-0 w-full z-50 justify-between">
        <img src={logo} alt="Logo" className="w-14 h-20 mr-4" />
        <h1 className="text-3xl font-bold text-white">
          HUST Library Members Management
        </h1>
        <SearchBar></SearchBar>
      </div>
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
              <th className="border border-black">Manage</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.ID} className="h-8">
                <td className="border border-slate-700 text-center">
                  {user.ID}
                </td>
                <td className="border border-slate-700 text-center max-md:hidden">
                  {user.name}
                </td>
                <td className="border border-slate-700 text-center max-md:hidden">
                  {user.membership_type}
                </td>
                <td className="border border-slate-700 text-center">
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
      <div className="flex justify-center">
        {/* Footer content goes here */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default UsersTable;
