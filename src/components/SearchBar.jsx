import React, { useState } from 'react';

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchTerm)
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center align-middle">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
            className="w-full p-3 pl-10 text-gray-900 border
             border-gray-300 rounded-full focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:border-blue-500"
            />
            <button
            type="submit"
            className="absolute left-0 top-0 h-full px-3 text-gray-500 hover:text-gray-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M9 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                </svg>
            </button>
        </form>
    </div>
  );
};

export default SearchBar;
