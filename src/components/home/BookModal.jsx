import { React, useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose, AiOutlineTag } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import formatYearMonth from "../helper";
import { useParams, useNavigate } from "react-router-dom";

// const handleReserveBook = () => {
//   console.log("reserve");
// }

const BookModal = ({ book, onClose, userId }) => {
  const [buttonState, setButton] = useState(false);
  const navigate = useNavigate();

  const hanldeBorrowBook = (ISBN, userId) => {
    navigate(`/borrow_transaction/${ISBN}/${userId}`);
  };
  return (
    <div // the background screen
      className="fixed bg-gray-800 bg-opacity-80 top-0 left-0 right-0 bottom-0 z-50
    flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()} // This stops the click event from bubbling up to the parent div,
        // preventing the modal from closing when clicking inside it.
        className="w-[1000px] max-w-full h-[650px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex">
          {/* Image Container */}
          <div className="w-1/3 m-3">
            {book.book_cover_image && (
              <img
                src={book.book_cover_image}
                alt={`${book.title} cover`}
                className="w-full max-h-full object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Book Text Content */}
          <div className="flex-1 mt-9">
            <div className="flex justify-start items-center gap-x-2">
              <PiBookOpenTextLight className="text-red-300 text-2xl"></PiBookOpenTextLight>
              <h1 className="my-1 text-xl">{book.title}</h1>
            </div>
            <span className="text-base   mr-4 font-light">Edition</span>
            <span>{book.edition}</span>
            <div className="flex justify-start items-center gap-x-2">
              <BiUserCircle className="text-red-300 text-2xl"></BiUserCircle>
              <h2 className="my-1">By: {book.authors}</h2>
            </div>
            <p className="mt-4">Description: </p>
            <p className="my-2">{book.description}</p>
            <div className="flex flex-row my-4">
              <AiOutlineTag className="text-red-300 text-2xl" />
              <span className="text-sm mx-3 bg-red-400 rounded-md p-1">
                {book.genres}
              </span>
            </div>
            <span> Language: {book.language}</span>

            <div className="my-8 p-3 border-2 border-gray-200 rounded-md">
              <span className="text-xl mr-4 text-gray-500">
                Shelf Locations
              </span>
              <div className="max-h-32 overflow-y-auto">
                {" "}
                {/* Set max height and make it scrollable */}
                {book.shelf_locations.map((location, index) => (
                  <div
                    className={`m-2 text-sm ${
                      location.status === "Available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    key={index}
                  >
                    Location: {location.shelf} {location.status}
                  </div>
                ))}
              </div>
            </div>
            {/* <h2 className="bg-red-300 px-4 py-1 rounded-lg m-3  w-50">
              <p>Publication Date: {formatYearMonth(book.publishYear)}</p>
            </h2> */}
          </div>
        </div>
        <div className="flex justify-evenly my-4">
          <button
            className={`px-10 py-2  rounded-full text-2xl ${
              buttonState
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white cursor-pointer"
            }`}
            onClick={() => {
              hanldeBorrowBook(book.ISBN, userId);
            }}
            disabled={buttonState}
          >
            Borrow Now
          </button>

          {/* <button
            className={`px-10 py-2 rounded-full text-2xl ${
              buttonState
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white cursor-pointer"
            }`}
            onClick={hanldeBorrowBook}
            disabled={buttonState}
          >
            Schedule
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default BookModal;
