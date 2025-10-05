import axios from 'axios';

const API_KEY = '9bcecba2'; 
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('searchMovies error:', error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return response.data;
  } catch (error) {
    console.error('getMovieDetails error:', error);
    return null;
  }
};