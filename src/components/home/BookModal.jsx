import { React, useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose, AiOutlineTag } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// const handleReserveBook = () => {
//   console.log("reserve");
// }

const BookModal = ({ book, onClose, userId }) => {
  const [buttonState, setButton] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "Guest"; // Provide a fallback if needed
  const hanldeBorrowBook = (ISBN) => {
    navigate(`/borrow_transaction/${ISBN}`);
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
        <div className="flex ">
          {/* Image Container */}
          <div className="w-1/3 m-3">
            {book.book_cover_image && (
              <img
                src={book.book_cover_image}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Book Text Content */}
          <div className="flex-1 mt-9 space-y-8">
            <div className="flex justify-start items-center max-h-32 overflow-y-auto gap-x-2">
              <PiBookOpenTextLight className="text-red-300 text-2xl"></PiBookOpenTextLight>
              <h1 className="my-1 text-2xl">{book.title}</h1>
            </div>
            <span className="text-base mr-4 font-light">Edition</span>
            <span>{book.edition}</span>
            <div className="flex justify-start items-center gap-x-2">
              <BiUserCircle className="text-red-300 text-2xl"></BiUserCircle>
              <div className="flex flex-wrap">
                {book.authors.map((author, index) => (
                  <span
                    key={index}
                    className="text-base mx-1 border border-slate-400  rounded-md p-1"
                  >
                    {author}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 break-words max-h-32 overflow-y-auto text-base">
              Description: {book.description}
            </p>

            <div className="flex flex-row my-4">
              <AiOutlineTag className="text-red-300 text-2xl" />
              <div className="flex flex-wrap">
                {book.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="text-base mx-2 bg-red-400 rounded-md p-1"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className=""> Language: {book.language}</div>

            <div className="my-8 p-3 border-2 border-gray-200 rounded-md flex flex-row ">
              <span className="text-base mr-4 text-gray-500">
                Number of Copies available: {book.shelf_locations.length}
              </span>
              {/*
              <div className="max-h-32 overflow-y-auto">
                  Set max height and make it scrollable 
                {book.shelf_locations.map((location, index) => (
                  <div
                    className={`m-2 text-base ${
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
              */}
              <Link to={`/books/details/${book.ISBN}`}>
                <BsInfoCircle className="text-2xl text-green-800 hover:text-black"></BsInfoCircle>
              </Link>
            </div>
            <div className="flex justify-evenly my-4">
              {userRole == "Member"  && (
                <button
                  className={`px-10 py-2  rounded-full text-2xl ${
                    buttonState
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white cursor-pointer"
                  }`}
                  onClick={() => {
                    hanldeBorrowBook(book.ISBN);
                  }}
                  disabled={buttonState}
                >
                  Borrow Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
