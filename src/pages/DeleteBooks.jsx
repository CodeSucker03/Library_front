import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      // .delete(`http://localhost:5555/books/${id}`)
      .delete(
        `https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/isbn/${id}`
      )

      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          // Custom message for 400 error
          enqueueSnackbar(
            "Cannot delete the book. All copies must be returned first.",
            { variant: "error" }
          );
        } else {
          // General error message for other errors
          enqueueSnackbar("Error deleting book", { variant: "error" });
        }
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner></Spinner> : ""}
      <div
        className="flex flex-col items-center border-2 border-gray-200 rounded-lg px-4 py-2 m-4
       relative hover:shadow-xl w-[600px] p-8 mx-auto"
      >
        <h3 className="text-2xl">Are You Sure you want to delete this book?</h3>
        <p> All copies of {id} must be returned first </p>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full rounded-3xl"
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
