import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import BackButton from "../components/BackButton";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineTag,
} from "react-icons/ai";
import { useSnackbar } from "notistack";

const UserInfo = () => {
  const { userId } = useParams();
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonState, setButtState] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const toggleCurrPassVisibility = () => setShowCurrPass(!showCurrPass);
  const toggleNewPassVisibility = () => setShowNewPass(!showNewPass);
  const [user, setUser] = useState({
    id: "",
    name: "",
    address: "",
    phone_number: "",
    email_address: "",
    membership_type: "",
    user_role: "",
    account_status: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const validatePassword = () => {
    const errors = [];
    // Length Check
    if (newPass.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    // Complexity Check
    const complexityRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!complexityRegex.test(newPass)) {
      errors.push(
        "Password must include uppercase, lowercase, number, and special character."
      );
    }
    if (errors.length > 0) {
      setPasswordError(errors.join(" "));
      setButtState(true);
    } else {
      setPasswordError("");
      setButtState(false);
    }
  };

  useEffect(() => {
    setError("")
    setButtState(false);
  }, [currPass]);

  useEffect(() => {
    validatePassword();
  }, [newPass]);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  let email = user.email_address;
  const handleSave = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    // console.log(user);
    try {
      let checkdata = {
        email: email,
        password: currPass,
      };
      let response = await axios.post(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/login`,
        checkdata
      );
      let password = currPass;
      if (newPass != "") {
        password = newPass;
      }

      let newdata = {
        address: user.address,
        phone_number: user.phone_number,
        password: password,
      };
      let userId = user.id;
      let res = await axios.put(
        `https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}/update`,
        newdata
      );
      enqueueSnackbar("User info updated successfully!", {
        variant: "success",
      });
      navigate(`/user/details/${userId}`);
      setIsEditing(false)
    } catch (error) {
      console.log(error);
      setError("Current password is wrong");
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="flex flex-row m-4 justify-center p-4 rounded-lg shadow-2xl mx-48">
        <div className="flex flex-col m-4 p-4">
          <BiUserCircle className="text-9xl mr-4 text-pink-800" />
          <label className="font-semibold">{user.name}</label>
        </div>

        <div className="w-40"></div>

        <div className="flex flex-col space-y-4">
          <div className="">
            <label className="font-semibold">ID:</label>
            {isEditing ? (
              <span className="border px-2 py-1 rounded-md ml-2">
                {user.id}
              </span>
            ) : (
              <span className="border px-2 py-1 rounded-md ml-2">
                {user.id}
              </span>
            )}
          </div>
          <form onSubmit={handleSave}>
            <div className="py-4">
              {isEditing ? (
                <div>
                  <p className="text-red-500 text-xs italic mb-4">
                    Enter current password to authorize change
                  </p>
                  <div>
                    <div className="flex flex-row my-3 ">
                      <label className="font-semibold">
                        Enter current password:
                      </label>
                      <input
                        required
                        type={showCurrPass ? "text" : "password"}
                        onChange={(e) => setCurrPass(e.target.value)}
                        className="border px-2 py-1 rounded-md ml-2"
                      />
                      <AiOutlineEdit className="mt-2 text-2xl" />
                      <button type="button" onClick={toggleCurrPassVisibility}>
                        {showCurrPass ? (
                          <AiOutlineEyeInvisible className="mt-2 text-2xl" />
                        ) : (
                          <AiOutlineEye className="mt-2 text-2xl" />
                        )}
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs italic mb-4">
                        {error}
                      </p>
                    )}
                    <div className="flex flex-row my-3 ">
                      <label className="font-semibold">
                        Enter new password:
                      </label>
                      <input
                        type={showNewPass ? "text" : "password"}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="border px-2 py-1 rounded-md ml-2"
                      />
                      <button type="button" onClick={toggleNewPassVisibility}>
                        {showNewPass ? (
                          <AiOutlineEyeInvisible className="mt-2 text-2xl" />
                        ) : (
                          <AiOutlineEye className="mt-2 text-2xl" />
                        )}
                      </button>
                    </div>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-xs italic">
                      {passwordError}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <label className="font-semibold">Name:</label>
                  <span className="border px-2 py-1 rounded-md ml-2">
                    {user.name}
                  </span>
                </>
              )}
            </div>

            <div className="my-2">
              {isEditing ? (
                <div className="flex flex-row ">
                  <label className=" font-semibold">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded-md ml-2"
                  />
                  <AiOutlineEdit className="mt-2 text-2xl"></AiOutlineEdit>
                </div>
              ) : (
                <>
                  <label className=" font-semibold">Address:</label>
                  <span className="border px-2 py-1 rounded-md ml-2">
                    {user.address}
                  </span>
                </>
              )}
            </div>
            <div className="my-2 py-4 ">
              <label className="font-semibold">Phone Number:</label>
              {isEditing ? (
                <div className="flex flex-row ">
                  <input
                    type="text"
                    name="phone_number"
                    value={user.phone_number}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded-md ml-2"
                  />
                  <AiOutlineEdit className="mt-2 text-2xl"></AiOutlineEdit>
                </div>
              ) : (
                <span className="border px-2 py-1 rounded-md ml-2">
                  {user.phone_number}
                </span>
              )}
            </div>
            <div className="py-4">
              {isEditing ? (
                <></>
              ) : (
                <div>
                  <label className="font-semibold">Email Address:</label>
                  <span className="border px-2 py-1 rounded-md ml-2">
                    {user.email_address}
                  </span>
                </div>
              )}
            </div>

            <div className="py-4">
              {isEditing ? (
                <></>
              ) : (
                <>
                  <label className="font-semibold">Membership Type:</label>
                  <span className="border px-2 py-1 rounded-md ml-2">
                    {user.membership_type}
                  </span>
                </>
              )}
            </div>
            <div className="py-4">
              {isEditing ? (
                <></>
              ) : (
                <>
                  <label className="font-semibold">User Role:</label>
                  <span className="border px-2 py-1 rounded-md ml-2">
                    {user.user_role}
                  </span>
                </>
              )}
            </div>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2"
                    onClick={() => setIsEditing(false)}
                  >
                    View
                  </button>

                  <button
                    disabled={buttonState}
                    type="submit"
                    className={`px-4 py-2 ${
                      buttonState
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white rounded-md mx-2"
                    }`}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
