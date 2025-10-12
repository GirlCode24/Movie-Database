import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handles when user types in the search bar
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handles when user submits the search
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (query.trim()) {
      onSearch(query); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center mt-6">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleInputChange}
        className="border rounded-l-lg px-4 py-2 w-64 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
