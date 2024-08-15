import React, { useState, useEffect } from 'react';

const ShelfLocation = ({ shelf, onShelfDataChange }) => {
    const [status, setStatus] = useState(shelf.status);
    const [shelfName, setShelfName] = useState(shelf.shelf);

    useEffect(() => {
        onShelfDataChange({ shelf: shelfName, status });
    }, [shelfName, status]);

    return (
        <div className="flex-row border-2 px-4 py-2 m-2 border-gray-500 rounded-2xl">
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Shelf #{shelfName}</label>
                <input
                    type="text"
                    value={shelfName}
                    onChange={(e) => setShelfName(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
                />
            </div>
            {/* Availability (Radio Buttons) */}
            <div className="my-4 flex items-center">
                <label className="text-xl mr-4 text-gray-500">Status</label>
                <div className="mr-4">
                    <input
                        type="radio"
                        value="available"
                        checked={status === "available"}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mr-2"
                    />
                    <label className="text-gray-500">Available</label>
                </div>
                <div>
                    <input
                        type="radio"
                        value="reserved"
                        checked={status === "reserved"}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mr-2"
                    />
                    <label className="text-gray-500">Reserved</label>
                </div>
            </div>
        </div>
    );
};

export default ShelfLocation;
