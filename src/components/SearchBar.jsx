import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-50 rounded-lg shadow-inner p-2 border border-gray-200"
    >
      <input
        type="text"
        placeholder="🔍 Search for a movie..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-grow px-3 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
