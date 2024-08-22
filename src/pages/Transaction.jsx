import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";

const Transaction = () => {
  const [book, setBookId] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMess] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { isbn } = useParams();
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to calculate the date 14 days from today
  const getExpirationDate = () => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 14); // Add 14 days
    const year = expiration.getFullYear();
    const month = String(expiration.getMonth() + 1).padStart(2, "0");
    const day = String(expiration.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [reservationDate, setReservationDate] = useState(getCurrentDate());
  const [expirationDate, setExpirationDate] = useState(getExpirationDate());
  const [error, setError] = useState("");

  const handleReservationChange = (e) => {
    const newReservationDate = e.target.value;
    setReservationDate(newReservationDate);

    // Update expiration date to 14 days from the new reservation date
    const newExpiration = new Date(newReservationDate);
    newExpiration.setDate(newExpiration.getDate() + 14);
    const year = newExpiration.getFullYear();
    const month = String(newExpiration.getMonth() + 1).padStart(2, "0");
    const day = String(newExpiration.getDate()).padStart(2, "0");
    setExpirationDate(`${year}-${month}-${day}`);
  };
  const handleExpirationChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userRole = localStorage.getItem("userRole");
    let userId = localStorage.getItem("userId");
    let bookID = {
      book_copy_id: book,
    };
    try {
      const response = await axios.post(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}/borrow`,
        bookID
      );
      console.log(response);
      enqueueSnackbar("Book borrowed successfully", { variant: "success" });
      navigate(`/home/${userRole}/1`);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
          
          case 400:
            enqueueSnackbar("Error Account has been set to Inactive", {
              variant: "error",
            });
            break;
          case 500:
            enqueueSnackbar("Error 500: Server Error - Try again later", {
              variant: "error",
            });
            break;
          default:
            enqueueSnackbar("An unexpected error occurred", {
              variant: "error",
            });
        }
      } else if (error.request) {
        // The request was made but no response was received
        enqueueSnackbar(
          "No response from the server. Please try again later.",
          { variant: "error" }
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        enqueueSnackbar("Request error: " + error.message, {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/isbn/${isbn}`
      )
      .then((response) => {
        const availableLocation = response.data.shelf_locations.find(
          (location) => location.status === "Available"
        );

        if (availableLocation) {
          setBookId(availableLocation.book_id);
          setStatus(true);
          setMess("Found a book copy available !");
          // You can use `bookId` here as needed
        } else {
          setError(true);
          setMess("No copy available !");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 flex-col">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="p-4 flex justify-center m-4 ">
        <div className="flex w-full max-w-screen-lg ">
          {/* Receipt on the left */}
          <div className="w-2/3 bg-white p-6 rounded shadow-2xl mr-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-xl my-4">Receipt Information</h1>
              <h2 className="font-extralight  text-xl  my-4">
                Borrowing book with ISBN: {isbn}
              </h2>
              <h2 className="font-extralight text-xl  my-4">
                Reservation Date: {reservationDate}
              </h2>
              <h2 className="font-extralight text-xl  my-4">
                Expiration Date: {expirationDate} ( 14 days from today )
              </h2>
              <h2
                className={`m-2 text-xl ${
                  status ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </h2>
              <button
                type="submit"
                className={`${
                  error
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-700 text-white"
                } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                disabled={error}
              >
                Borrow Now !
              </button>
            </form>
          </div>
          {/* Form on the right
          <div className="w-2/3 bg-white p-6 rounded shadow-2xl">
           
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
