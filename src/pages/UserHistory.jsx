import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { AiOutlineEdit, AiOutlineHistory} from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import logo from "../assets/logo.png";
import BackButton from "../components/BackButton";
import Footer from "./Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [userRole, setRole] = useState(localStorage.getItem("userRole"));


  const fetchHistory = (searchQuery = "", page = 1) => {
    // default search value is empty
    let url = ``;
    setLoading(true);
    if (searchQuery == "") {
      url = `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}/borrow_history`;
    }
    // const url = `http://localhost:5555/books/?query=${searchQuery}`
    axios
      .get(url)
      .then((res) => {
        setHistory(res.data.history);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory(); // Fetch books based on the query
  }, []); // useEffect will re-run whenever the `query` state changes

  return (
    <div className="flex flex-col">
      <div className="bg-red-800 flex items-center p-2 fixed top-0 w-full z-50 justify-start">
        <img src={logo} alt="Logo" className="w-14 h-20 mr-4" />
        <h1 className="text-3xl font-bold text-white">User {userId} read History</h1>
      </div>
      <div className="mt-28 mx-10">
        {userRole == "Librarian" && (
          <BackButton destination={"/userMangement"}></BackButton>
        )}
        
        {userRole == "Member" && (
          <BackButton></BackButton>
        )}
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-black">Title</th>
              <th className="border border-black ">Issue Date</th>
              <th className="border border-black">Due Date</th>
              <th className="border border-black">Return Date</th>
              <th className="border border-black">Overdue Fine</th>
              <th className="border border-black">Manage</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 && (
              <>
                {history.map((book, index) => (
                  <tr key={index} className="h-8">
                    <td className="border border-slate-700 text-center">
                      {book.title}
                    </td>
                    <td className="border border-slate-700 text-center max-md:hidden">
                      {book.issue_date}
                    </td>
                    <td className="border border-slate-700 text-center max-md:hidden">
                      {book.due_date}
                    </td>
                    <td className="border border-slate-700 text-center max-md:hidden">
                      {book.return_date}
                    </td>
                    <td className="border border-slate-700 text-center max-md:hidden">
                      {book.overdue_fines}
                    </td>
                    <td className="border border-slate-700 text-center">
                      <div className="flex justify-center gap-x-4">
                        <AiOutlineEdit className="text-2xl text-yellow-600"></AiOutlineEdit>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}

          </tbody>
        </table>
        {history.length == 0 && (
        <div className="flex my-10  justify-center text-3xl font-light">
          <AiOutlineHistory className="mx-5"></AiOutlineHistory>
           No book borrowed
        </div>
        )}

      </div>
      <div className="flex justify-center">
        {/* Footer content goes here */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default UserHistory;
