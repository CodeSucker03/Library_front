import React, { useState, useEffect } from "react";

const ShelfLocation = ({ shelf, onShelfDataChange, onDelete, isEdit }) => {
  const [status, setStatus] = useState(shelf.status);
  const [shelfName, setShelfName] = useState(shelf.shelf);

  useEffect(() => {
    onShelfDataChange({book_id:shelf.book_id , shelf: shelfName, status });
  }, [shelfName, status]);

  return (
    <div className="flex flex-row border-2 px-2 py-1 m-2 border-gray-200 rounded-2xl justify-evenly">
      <div className="my-4 flex flex-row ">
        <label className="text-sm mr-4 text-gray-500">Shelf #{shelfName}</label>
        <input
          required
          type="text"
          value={shelfName}
          onChange={(e) => setShelfName(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
      </div>
      {/* Availability (Radio Buttons) */}
      <div className="my-2 mx-4 flex items-center">
        <div className="mr-4">
          <input
            required
            type="radio"
            value="Available"
            checked={status === "Available"}
            onChange={(e) => setStatus(e.target.value)}
            className="mr-2"
          />
          <label className="text-gray-500">Available</label>
        </div>

        <div className="mr-4">
          <input
            required
            type="radio"
            value="Borrowed"
            checked={status === "Borrowed"}
            onChange={(e) => setStatus(e.target.value)}
            className="mr-2"
          />
          <label className="text-gray-500">Borrowed</label>
        </div>

        <div className="mr-4">
          <input
            required
            type="radio"
            value="Damaged"
            checked={status === "Damaged"}
            onChange={(e) => setStatus(e.target.value)}
            className="mr-2"
          />
          <label className="text-gray-500">Damaged</label>
        </div>
        
        {/* <div>
          <input
            type="radio"
            value="Reserved"
            checked={status === "Reserved"}
            onChange={(e) => setStatus(e.target.value)}
            className="mr-2"
          />
          <label className="text-gray-500">Reserved</label>
        </div> */}
      </div>
      {/* Delete Button */}
      {isEdit && (
        <button
          onClick={onDelete}
          className=" bg-red-500 text-white px-4 my-4 rounded-xl hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ShelfLocation;