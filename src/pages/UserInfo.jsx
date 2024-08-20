import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import BackButton from "../components/BackButton";
import { AiOutlineEdit, AiOutlineTag } from "react-icons/ai";

const UserInfo = () => {
  const { userId } = useParams();
  
  const [user, setUser] = useState({
    id: "",
    name: "",
    address: "",
    phone_number: "",
    email_address: "",
    membership_type: "",
    user_role: "",
    account_status: "",
  })

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://sadnguyencoder.pythonanywhere.com/user/api/v1/user/${userId}`);
        console.log(response.data)
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

  const handleSave = async () => {
    console.log(user);
    try {
      await axios.put(`/api/users/${userId}`, user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
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
              <label className="font-semibold">Name:</label>
              {isEditing ? (
                <div className="flex flex-row ">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded-md ml-2"
                  />
                  <AiOutlineEdit className="mt-2 text-2xl"></AiOutlineEdit>
                </div>
              ) : (
                <span className="border px-2 py-1 rounded-md ml-2">
                  {user.name}
                </span>
              )}
            </div>
            <div className="my-2">
              <label className=" font-semibold">Address:</label>
              {isEditing ? (
                <div className="flex flex-row ">
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
                <span className="border px-2 py-1 rounded-md ml-2">
                  {user.address}
                </span>
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
              <label className="font-semibold">Email Address:</label>
              {isEditing ? (
                <div className="flex flex-row ">
                  <input
                    type="email"
                    name="email_address"
                    value={user.email_address}
                    onChange={handleInputChange}
                    className="border px-2 py-1 rounded-md ml-2"
                  />
                  <AiOutlineEdit className="mt-2 text-2xl"></AiOutlineEdit>
                </div>
              ) : (
                <span className="border px-2 py-1 rounded-md ml-2">
                  {user.email_address}
                </span>
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
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2"
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
