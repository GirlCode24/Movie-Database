import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import { SearchProvider } from "./context/SearchContext";
import { FavoritesProvider } from "./context/FavoritesContext";

const App = () => {
  return (
    <SearchProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </SearchProvider>
  );
};

export default App;