import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import SideBar from "../components/home/sideBar";
import Footer from "./Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineViewSidebar } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import logo from "../assets/logo.png";
import SearchBar from "../components/SearchBar";
import { enqueueSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { userRole, page } = useParams();
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState(parseInt(page));

  // const [showType,setShowType] =useState('table')
  const [query, setQuery] = useState(""); // State to hold the search query

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    axios
      .get(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`
      )
      .then((res) => {
        setUserName(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchBooks = async (searchQuery = "", page, selectgenres = []) => {
    let filterdata = {
      genres: selectgenres,
    };

    let url = ``;
    if (searchQuery != "") {
      url = `https://sadnguyencoder.pythonanywhere.com/book/api/v1/books/search?query=${searchQuery}`;
      try {
        let res = await axios.get(url);
        setBooks(res.data.books);
      } catch (error) {
        setBooks([]);
        console.log(error);
      }
    } else {
      if (selectgenres.length > 0) {
        url = `https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/genres/search?per_page=5&page=${page}`;
        try {
          let res = await axios.post(url, filterdata);
          setBooks(res.data.books);
        } catch (error) {
          setBooks([]);
          console.log(error);
        }
      } else {
        url = `https://sadnguyencoder.pythonanywhere.com/book/api/v1/books?per_page=5&page=${page}`;
        try {
          let res = await axios.get(url);
          setBooks(res.data.books);
        } catch (error) {
          setBooks([]);
          console.log(error);
        }
      }
    }

    // Move setLoading(false) to always execute after API call
    setLoading(false);

    // Ensure the navigate function call is appropriate for your use case
    navigate(`/home/${userRole}/${page}`);
  };

  useEffect(() => {
    fetchBooks(query, pageNum, selectedGenres); // Fetch books based on the query
  }, [query, pageNum, selectedGenres]); // useEffect will re-run whenever the `query` or `selectedGenre` state changes
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // Update the query state, which triggers useEffect
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  // Genres
  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/genres?per_page=100&page=1"
      );
      setLoading(false);
      setGenres(response.data.genres); // Assuming the response contains a 'genres' array
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-red-800 flex items-center p-2 fixed top-0 w-full z-50 justify-between">
        <img src={logo} alt="Logo" className="w-14 h-20 mr-4" />
        <h1 className="text-3xl font-bold text-white">HUST Library</h1>
        <SearchBar onSearch={handleSearch}></SearchBar>
        {userRole == "Librarian" && (
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-700 text-4xl"></MdOutlineAddBox>
          </Link>
        )}
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="px-6 py-3 bg-white text-black font-semibold rounded-3xl hover:bg-blue-600 transition duration-300"
        >
          Genre Filter
        </button>
        {isHovered && (
          <div // the background screen
            className="fixed bg-transparent top-0 left-0 right-0 bottom-0 z-50
          flex justify-center items-start"
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onClick={(event) => event.stopPropagation()}
              onMouseLeave={() => setIsHovered(false)}
              // This stops the click event from bubbling up to the parent div,
              // preventing the modal from closing when clicking inside it.
              className="w-[1400px] max-w-full h-[350px] bg-red-800 rounded-2xl p-4 flex flex-col relative "
            >
              <label className="text-xl mr-4 text-black">Genres</label>
              <div className="flex flex-wrap">
                {genres.map((genre) => (
                  <div key={genre} className="mr-6">
                    <label className="text-white text-xl font-semibold">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre)} // Correctly binding checked status
                        value={genre}
                        onChange={handleCheckboxChange}
                        className="mr-4"
                      />
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <AiOutlineUser
          className="text-black text-4xl"
          onClick={() => setShowSideBar(true)}
        ></AiOutlineUser>
        {showSideBar && (
          <SideBar userName={userName} onClose={() => setShowSideBar(false)} />
        )}
      </div>
      {loading ? <Spinner /> : <BooksCard books={books}></BooksCard>}
      <div className="flex justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-3
                   px-4 rounded-2xl focus:outline-none focus:shadow-outline  "
          onClick={() => setPageNum(pageNum > 1 ? pageNum - 1 : 1)} // Decrement pageNum only if it's greater than 1
        >
          <AiOutlineArrowLeft></AiOutlineArrowLeft>
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-3
                   px-4 rounded-2xl focus:outline-none focus:shadow-outline  "
        >
          {pageNum}
        </button>
        {books.length != 0 && (
          <button
            className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-3
                   px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            onClick={() => setPageNum(pageNum + 1)}
          >
            <AiOutlineArrowRight></AiOutlineArrowRight>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        {/* Footer content goes here */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
