import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ShelfLocation from "../components/ShelfLocation";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import Resizer from "react-image-file-resizer";

const CreateBooks = () => {
  {
    /* States input */
  }
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [image, setImage] = useState(null); // New state for the image file
  const [loading, setLoading] = useState(false);
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [language, setLanguage] = useState("");
  const [numCopies, setNumCopies] = useState("");
  const [description, setDescription] = useState("");
  const [shelfLocation, setShelfLocation] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [buttonState, setButton] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // GENRE LIST ADD HERE
  const genresList = [
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Historical Fiction",
    "Horror",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Young Adult",
    "Children's",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  const generateShelfLocations = (numCopies) => {
    // Assuming shelf numbers are sequential starting from 1
    setShelfLocation(
      Array.from({ length: numCopies }, (_, index) => ({
        shelf: ``,
        status: ``, // cycling through statuses
      }))
    );
  };

  // Resize image function
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200, // Max width
        300, // Max height
        "JPEG", // Output format
        80, // Quality
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "blob" // Output type (blob is used for file uploads)
      );
    });

  // Function to handle updating the shelfLocation array
  const handleShelfData = (updatedShelf, index) => {
    setShelfLocation((prevState) => {
      const newState = [...prevState];
      newState[index] = updatedShelf; // Update the specific object
      return newState;
    });
  };

  const handleSaveBook = async (event) => {
    event.preventDefault();
    setButton(true); // set button disable

    if (image) {
      try {
        const resizedImage = await resizeFile(image);
        const cloudName = "dehwipfaq";
        const presetKey = "ml_default";
        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", presetKey);
        // Upload image to cloud
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        const uploadedImageUrl = response.data.secure_url;
        //     const bookData = {
        //       title,
        //       author,
        //       publishYear,
        //       imageUrl: uploadedImageUrl,
        //     };
        const bookData = {
          ISBN: "string",
          authors: author.split(","),
          genres: selectedGenres,
          title: title,
          publisher: publisher,
          edition: edition,
          publication_date: publishYear,
          language: language,
          number_of_copies_available: numCopies,
          book_cover_image: uploadedImageUrl,
          description: description,
          shelf_locations: shelfLocation,
        };
        console.log(bookData);
        // const serverRes = await axios.post(
        //   `http://localhost:5555/books`,
        //   bookData
        // );
        // console.log(serverRes);
        // navigate("/");
        // enqueueSnackbar("Book created successfully!", { variant: "success" });
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Image upload failed", { variant: "error" });
        setButton(false);
      }
    } else {
      enqueueSnackbar("Please select an image", { variant: "warning" });
      setButton(false); // set button disable
    }
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div
        className="flex flex-col border-2 border-gray-400 rounded-xl w-[600px]
      hover:shadow-2xl p-4 mx-auto"
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Authors</label>
          <p className="text-gray-400 font-extralight p-1">
            If multiple authors, seperate by comma (ex: Name1, Name2)
          </p>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring
             focus:ring-red-500 rounded-full"
          ></input>
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Genres</label>
          <div className="flex flex-wrap">
            {genresList.map((genre) => (
              <div key={genre} className="mr-4">
                <label className="text-gray-700">
                  <input
                    type="checkbox"
                    value={genre}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring
             focus:ring-red-500 rounded-full"
          ></input>
        </div>

        {/* Publisher */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publisher</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-full"
          />
        </div>

        {/* Edition (Number) */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Edition</label>
          <input
            type="number"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="date"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-full shadow-sm 
            focus:outline-none focus:ring focus:ring-red-500 "
          ></input>
        </div>

        {/* Language (Dropdown) */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-full"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">Chinese</option>
            <option value="French">Japanese</option>
          </select>
        </div>

        {/* Number of Copies (Number) */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Number of Copies</label>
          <input
            type="number"
            value={numCopies}
            onChange={(e) => {
              const value = Math.max(0, e.target.value); // Ensure the value is not negative
              setNumCopies(value);
              generateShelfLocations(value);
            }}
            min="0" // Prevent negative numbers
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-full"
          />
        </div>
        <label className="text-xl mr-4 text-gray-500">Shelf Location</label>
        {/* Generate Shelf Locations (Based on Number of Copies) */}
        {shelfLocation.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-2">
            {shelfLocation.map((location, index) => (
              <ShelfLocation
                key={index}
                shelf={location}
                onShelfDataChange={(updatedShelf) =>
                  handleShelfData(updatedShelf, index)
                }
              />
            ))}
          </div>
        )}

        {/* Description */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-lg"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Book Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
          ></input>
        </div>

        {uploadProgress > 0 && (
          <div className="my-4">
            <div className="h-2 bg-gray-300 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-gray-500 mt-2">{uploadProgress}% uploaded</p>
          </div>
        )}
        <button
          className={`p-2 m-8 rounded-full ${
            buttonState
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white cursor-pointer"
          }`}
          onClick={handleSaveBook}
          disabled={buttonState}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
