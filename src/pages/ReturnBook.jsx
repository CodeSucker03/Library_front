import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineTag } from "react-icons/ai";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReturnBook = () => {
  const { book_Copy_Id } = useParams();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  let userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      // borrower_id: parseInt(userId),
      book_copy_id: parseInt(book_Copy_Id),
      return_date: formattedDate,
    };
    console.log(payload)
    try {
      const response = await axios.post(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}/return_book`,
        payload
      );
      console.log(response);
      enqueueSnackbar("Book returned successfully", { variant: "success" });
      navigate(`/user/history/${userId}`)
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Failed to return book", { variant: "error" });
    }
  };

  return (
    <div className="p-4 flex justify-center m-4 ">
      <BackButton destination={`/user/history/${userId}`}></BackButton>
      <div className="flex w-full max-w-screen-lg ">
        {/* Receipt on the left */}
        <div className="w-2/3 bg-white p-6 rounded shadow-2xl mr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl my-4">Receipt Information</h1>
            <h2 className="font-extralight  text-xl  my-4">
              Returning book copy with id: {book_Copy_Id}
            </h2>
            <h2 className="font-extralight text-xl  my-4">
              Return Date: {formattedDate}
            </h2>
            <button
              type="submit"
              className="text-white bg-red-600  hover:bg-red-900
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Return
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
