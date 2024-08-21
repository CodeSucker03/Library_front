import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import SideBar from "../components/home/sideBar";
import Footer from "./Footer";
import { Link,useParams, useNavigate } from "react-router-dom";
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
  const [selectedGenre, setSelectedGenre] = useState("");
  const {userRole , page} =useParams()
  const navigate = useNavigate();
  
  
  const [pageNum, setPageNum] = useState(parseInt(page));


  const handleLang = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleGenre = (event) => {
    setSelectedGenre(event.target.value);
  };
  // const [showType,setShowType] =useState('table')
  const [query, setQuery] = useState(""); // State to hold the search query

  const fetchBooks = async (searchQuery = "", page) => {
    // default search value is empty
    let url = ``;
    setLoading(true);
    if (searchQuery == "") {
      url = `https://sadnguyencoder.pythonanywhere.com/book/api/v1/books?per_page=5&page=${page}`;

    }else{
    url = `https://sadnguyencoder.pythonanywhere.com/book/api/v1/books/search?query=${searchQuery}`
    }
    try {
      let res = await axios.get(url);
      setBooks(res.data.books);
      navigate(`/home/${userRole}/${pageNum}`)

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId")
    axios
      .get(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`
      )
      .then((res) => {
       setUserName(res.data.name)
      })
      .catch((error) => {console.log(error)});
  }, [] );

  useEffect(() => {
    fetchBooks(query, pageNum); // Fetch books based on the query
  }, [query, pageNum]); // useEffect will re-run whenever the `query` state changes

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // Update the query state, which triggers useEffect
  };

  return (
    <div className="flex flex-col">
      <div className="bg-red-800 flex items-center p-2 fixed top-0 w-full z-50 justify-between">
        <img src={logo} alt="Logo" className="w-14 h-20 mr-4" />
        <h1 className="text-3xl font-bold text-white">HUST Library</h1>
        <SearchBar onSearch={handleSearch} ></SearchBar>
        {userRole == "Librarian" && (
           <Link to="/books/create">
           <MdOutlineAddBox className="text-sky-700 text-4xl"></MdOutlineAddBox>
         </Link>
 
        )}
        
        {/* <div name="FILTERS Lang">
          <select
            id="language"
            className="rounded-full p-2"
            value={selectedLanguage} // Controlled component using value
            onChange={handleLang}
          >
            <option value="" disabled>
              Language Filter
            </option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>

        </div> */}

        <div name="FILTERS Genres">
          <select
            id="language"
            className="rounded-full p-2"
            value={selectedLanguage} // Controlled component using value
            onChange={handleGenre}
          >
            <option value="" disabled>
              Genres Filter
            </option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Drama">Drama</option>
            <option value="Chinese">...</option>
            <option value="Japanese">...</option>
          </select>
          {/* <p>Selected Genre: {selectedGenre}</p> */}
        </div>
        <AiOutlineUser
          className="text-black text-4xl"
          onClick={() => setShowSideBar(true)}
        ></AiOutlineUser>
        {showSideBar && (
          <SideBar userName={userName} onClose={() => setShowSideBar(false)} />
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <BooksCard books={books}></BooksCard>
      )}
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
