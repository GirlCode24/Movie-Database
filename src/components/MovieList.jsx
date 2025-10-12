import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelect }) => {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No movies found. Try searching for something else.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default MovieList;
