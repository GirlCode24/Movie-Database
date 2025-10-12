import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [lastSearch, setLastSearch] = useState("");

  return (
    <SearchContext.Provider value={{ movies, setMovies, lastSearch, setLastSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
