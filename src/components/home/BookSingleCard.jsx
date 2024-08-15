import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit,AiOutlineTag } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";
import formatYearMonth from "../helper";
const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      key={book.ISBN}
      className="border-2 border-gray-200 rounded-lg px-4 py-2 m-4
       relative hover:shadow-xl"
    >
      <div className="flex flex-col ">
        <div className="flex-grow w-full">
          {/* First div content */}
          <div className="flex justify-center">
            {book.book_cover_image && (
              <img
                src={book.book_cover_image}
                alt={`${book.title} cover`}
                className="w-40 h-56 object-cover my-0 rounded-lg shadow-lg"
              />
            )}
          </div>
            {/* <h2 className=" px-4 py-1 w-32 bg-red-300 rounded-lg m-3">
           {formatYearMonth(book.publishYear)}
            </h2> */}
            {/* <h4 className="my-2 text-gray-500">{book.ISBN}</h4> */}

          <div className="flex flex-col items-start gap-y-2 mt-4">
            <div className="flex items-center gap-x-2">
              <PiBookOpenTextLight className="text-red-300 text-2xl" />
              <h1 className="text-lg font-semibold break-words max-w-[170px]">
                {book.title}
              </h1>
            </div>

            <div className="flex items-center gap-x-2 ">
              <BiUserCircle className="text-red-300 text-2xl" />
              <h2 className="text-md break-words max-w-[170px]">by: {book.authors}</h2>
            </div>
            
            <div className="flex items-center gap-x-2 ">
              <AiOutlineTag className="text-red-300 text-2xl" />
              <h2 className="text-md break-words max-w-[170px]">Genres: {book.genres}</h2>
            </div>

          </div>
        </div>
        <div className="h-[60px] w-full footer ">
          {/* Second div content */}
          <div className="flex justify-between items-center gap-x-2 p-4 ">
            <BiShow
              className="text-3xl text-blue-800 hover:text-black cursor-pointer"
              onClick={() => setShowModal(true)}
            />
            <Link to={`/books/details/${book.ISBN}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black"></BsInfoCircle>
            </Link>
            <Link to={`/books/edit/${book.ISBN}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600  hover:text-black"></AiOutlineEdit>
            </Link>
            <Link to={`/books/delete/${book.ISBN}`}>
              <MdOutlineDelete className="text-2xl text-red-600 hover:text-black"></MdOutlineDelete>
            </Link>
          </div>
          {showModal && (
            <BookModal book={book} onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSingleCard;
