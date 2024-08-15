import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import Resizer from "react-image-file-resizer";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [buttonState, setButton] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Get present book
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        setImageUrl(response.data.imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

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
    let uploadedImageUrl = imageUrl
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
      const bookData = {
        title,
        author,
        publishYear,

        imageUrl: uploadedImageUrl,
      };
      const serverRes = await axios.put(
        `http://localhost:5555/books/${id}`,
        bookData
      );
      console.log(serverRes);
      navigate("/");
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
        <div className="flex flex-col border-2 border-black rounded-xl w-[900px] p-4 m-4">
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

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Change Book Cover
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
            ></input>
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
            ></input>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
            ></input>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="date"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
            ></input>
          </div>
          <button
            className={`p-2 m-8 rounded-full ${
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
