import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/omdb';

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        if (data && data.Response === 'True') {
          setMovie(data);
        } else {
          setError('Movie not found.');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="inline-block mb-4 text-blue-600 hover:underline">
        ← Back to Search
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={
            movie.Poster && movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={movie.Title}
          className="w-60 h-auto rounded-lg"
        />

        <div>
          <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-gray-600 mb-2">{movie.Year}</p>
          <p className="text-sm text-gray-700 mb-4">{movie.Genre}</p>
          <p className="mb-4">{movie.Plot}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
