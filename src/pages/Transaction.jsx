import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const Transaction = () => {
  const { isbn, userId } = useParams();
  const [reservationDate, setReservationDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");

  const handleReservationChange = (e) => {
    const selectedDate = e.target.value;
    setReservationDate(selectedDate);
    setExpirationDate(""); // Clear expiration date if reservation date changes
  };

  const handleExpirationChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate <= reservationDate) {
      setError("Expiration date must be after the reservation date.");
    } else {
      setError("");
      setExpirationDate(selectedDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      // Process the form submission, e.g., send data to a server
      console.log("Reservation Date:", reservationDate);
      console.log("Expiration Date:", expirationDate);
      console.log("ISBN:", isbn);
      console.log("User ID:", userId);
      // You can add more logic here as needed
    }
  };

  return (
    <div className="p-4 flex-col">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="p-4 flex justify-center m-4 ">
        <div className="flex w-full max-w-screen-lg ">
          {/* Receipt on the left */}
          <div className="w-2/3 bg-white p-6 rounded shadow-2xl mr-4">
            <h1 className="text-xl my-4">Receipt Information</h1>
            <h2 className="font-extralight  my-4">
              Borrowing book with ISBN: {isbn} by User ID: {userId}
            </h2>
            <h2 className="font-extralight  my-4">
              Reservation Date: {reservationDate}
            </h2>
            <h2 className="font-extralight  my-4">
              Expiration Date: {expirationDate}
            </h2>
          </div>
          {/* Form on the right */}
          <div className="w-2/3 bg-white p-6 rounded shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="reservationDate"
                >
                  Set Reservation Date
                </label>
                <input
                  type="date"
                  id="reservationDate"
                  value={reservationDate}
                  onChange={handleReservationChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="expirationDate"
                >
                  Set Expiration Date
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  value={expirationDate}
                  onChange={handleExpirationChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={!reservationDate}
                  min={reservationDate}
                />
                {error && (
                  <p className="text-red-500 text-xs italic mt-2">{error}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`${
                    error
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  disabled={error}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
