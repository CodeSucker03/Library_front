import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import Resizer from "react-image-file-resizer";
import ShelfLocation from "../components/ShelfLocation";

const EditBooks = () => {
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [language, setLanguage] = useState("");
  const [numCopies, setNumCopies] = useState("");
  const [description, setDescription] = useState("");
  const [shelfLocation, setShelfLocation] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [buttonState, setButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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

  // Get present book
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/isbn/${id}`
      )
      .then((response) => {
        // console.log(`https://sadnguyencoder.pythonanywhere.com/book/api/v1/${id}`)
        setISBN(id);
        setAuthor(response.data.authors);
        setSelectedGenres(response.data.genres);
        setTitle(response.data.title);
        setPublisher(response.data.publisher);
        setEdition(response.data.edition);
        setPublishYear(response.data.publishYear);
        setLanguage(response.data.language);
        setNumCopies(response.data.number_of_copies_available);
        setImageUrl(response.data.book_cover_image);
        setDescription(response.data.description);
        setShelfLocation(response.data.shelf_locations);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  const addShelfLocation = () => {
    setShelfLocation([...shelfLocation, { shelf: "", status: "Available" }]);
    setNumCopies(numCopies + 1);
  };

  const deleteShelfLocation = (name) => {
    const updatedLocations = shelfLocation.filter(
      (item) => item.shelf !== name
    );
    setShelfLocation(updatedLocations);
    setNumCopies(numCopies - 1);
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
  // Function to handle updating the shelfLocation array
  const handleShelfData = (updatedShelf, index) => {
    const isDuplicate = shelfLocation.some(
      (location, i) => location.shelf === updatedShelf.shelf && i !== index
    );

    if (!isDuplicate) {
      setButton(false);
      setShelfLocation((prevState) => {
        const newState = [...prevState];
        newState[index] = updatedShelf; // Update the specific object
        return newState;
      });
    } else {
      setButton(true);
      enqueueSnackbar("Duplicate shelf is Invalid", { variant: "error" });
    }
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

  const hanldeEditBook = async (event) => {
    event.preventDefault();
    setButton(true); // set button disable
    let uploadedImageUrl = imageUrl;
    if (typeof author === "string") {
      author = author.split(",");
    }

    try {
      if (image) {
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
        uploadedImageUrl = response.data.secure_url;
      }
      // const bookData = {
      //   title,
      //   author,
      //   publishYear,

      //   imageUrl: uploadedImageUrl,
      // };

      const bookData = {
        ISBN: ISBN,
        authors: author,
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
      const serverRes = await axios.put(
        `https://sadnguyencoder.pythonanywhere.com/book/api/v1/book/isbn/${ISBN}`,
        bookData
      );
      console.log(serverRes);
      navigate("/home/Librarian/1");
      enqueueSnackbar("Book Edited successfully!", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Edit failed", { variant: "error" });
      setButton(false);
    }
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-row  items-start">
        <div className="flex flex-col">
          <div className="my-4">
            {/* Book Cover */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`${title} cover`}
                className="object-cover w-64 h-96  rounded-lg shadow-lg"
              />
            )}
          </div>
          {uploadProgress > 0 && (
            <div className="my-4">
              <div className="h-2 bg-gray-300 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="my-2 flex flex-col">
            <label className="text-xl text-gray-500">Change Book Cover</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-2 border-gray-500 px-4 py-2 rounded-full"
            ></input>
          </div>
        </div>

        <div className="flex flex-col border-2 border-black rounded-xl w-[900px] p-4 m-4">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">ISBN</label>
            <input
              type="text"
              value={ISBN || ""}
              onChange={(e) => setISBN(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Authors</label>
            <p className="text-gray-400 font-extralight p-1">
              If multiple authors, seperate by comma (ex: Name1, Name2)
            </p>
            <input
              type="text"
              value={author || ""}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full focus:ring
             focus:ring-red-500 rounded-full"
            ></input>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Genres</label>
            <div className="flex flex-wrap">
              {genres.map((genre) => (
                <div key={genre} className="mr-4">
                  <label className="text-gray-700">
                    <input
                      type="checkbox"
                      value={genre || ""}
                      checked={selectedGenres.includes(genre)}
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
              value={title || ""}
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
              value={publisher || ""}
              onChange={(e) => setPublisher(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-full"
            />
          </div>
          {/* Edition (Number) */}
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Edition</label>
            <input
              type="number"
              value={edition || ""}
              onChange={(e) => setEdition(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full focus:ring focus:ring-red-500 rounded-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="date"
              value={publishYear || ""}
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
          Number of Copies (Number)
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Number of Copies: {numCopies}
            </label>
          </div>
          {/* Generate Shelf Locations (Based on Number of Copies) */}
          <label className="text-xl mr-4 text-gray-500">Shelf Location</label>
          {/* Button to Add New Shelf Location */}
          <MdOutlineAddBox
            onClick={addShelfLocation}
            className="text-4xl text-red-400"
          >
            Add Shelf Location
          </MdOutlineAddBox>
          {shelfLocation.length > 0 && (
            <div className="flex flex-col">
              {shelfLocation.map((location, index) => {
                const key = location.book_id;
                console.log(`Rendering ShelfLocation with key: ${key}`);
                return (
                  <ShelfLocation
                    key={location.shelf}
                    shelf={location}
                    onShelfDataChange={(updatedShelf) => {
                      handleShelfData(updatedShelf, index);
                    }}
                    onDelete={() => deleteShelfLocation(location.shelf)} // Pass delete handler
                    isEdit={true}
                  />
                );
              })}
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
          <button
            className={`p-2 mx-64 min-w-40 rounded-full ${
              buttonState
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white cursor-pointer"
            }`}
            onClick={hanldeEditBook}
            disabled={buttonState}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditBooks;
