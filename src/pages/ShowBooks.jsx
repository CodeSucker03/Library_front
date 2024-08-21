import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { AiFillMessage } from "react-icons/ai";

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [numCopies, setNumCopies] = useState("");
  const [description, setDescription] = useState("");
  const [shelfLocation, setShelfLocation] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      // .get(`http://localhost:5555/books/${id}`)
      .get(
        `https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/isbn/${id}`
      )
      .then((response) => {
        setBook(response.data);
        setShelfLocation(response.data.shelf_locations);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="fixed top-7 left-6">
        <BackButton />
      </div>
      <div className="px-32 py-4">
        <h1 className="text-3xl my-4">Book Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex-col border-2 border-gray-300 rounded-lg px-4 py-2 hover:shadow-xl">
              <div className="my-4 p-3 border-2 border-gray-200 rounded-md">
                <span className="text-xl mr-4 text-gray-500">
                  Shelf Locations
                </span>
                {shelfLocation.map((location, index) => (
                  <div
                    className={`m-2 text-xl ${
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
              <AiFillMessage className="text-3xl"></AiFillMessage>
              <p className="mt-4 break-word text-2xl text-gray-500">
              {book.description}
            </p>
            </div>

            {/* Right Side - Other Book Details */}
            <div className="flex-col border-2 border-gray-300 rounded-lg px-4 py-2 hover:shadow-xl">
              <div className="my-4 px-24 py-2 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">ID</span>
                <span>{book.ISBN}</span>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">Title</span>
                <span>{book.title}</span>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full flex flex-row">
                <span className="text-xl mr-4 text-gray-500">Author</span>
                <div className="flex flex-wrap">
                  {book.authors && book.authors.length > 0 ? (
                    book.authors.map((author, index) => (
                      <span
                        key={index}
                        className="text-base mx-1 px-3 border border-slate-300 rounded-md p-1"
                      >
                        {author}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No authors available</span>
                  )}
                </div>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full flex flex-row">
                <span className="text-xl mr-4 text-gray-500">Genres</span>
                <div className="flex flex-wrap">
                  {book.genres && book.genres.length > 0 ? (
                    book.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="text-base mx-2 rounded-md p-1"
                      >
                        {genre}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No genres available</span>
                  )}
                </div>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">Publisher</span>
                <span>{book.publisher}</span>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">Edition</span>
                <span>{book.edition}</span>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                <span>{book.publication_date}</span>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">Language</span>
                <span>{book.language}</span>
              </div>
              <div className="my-4 px-24 p-3 border-2 border-gray-200 rounded-full">
                <span className="text-xl mr-4 text-gray-500">
                  Number of Copies
                </span>
                <span>{book.number_of_copies_available}</span>
              </div>
              {/* <div className='my-4 px-24 p-3 border-2 border-gray-200 rounded-full'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4 px-24 p-3 border-2 border-gray-200 rounded-full'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowBooks;
