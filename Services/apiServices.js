// eslint-disable-next-line prettier/prettier
import axios from 'axios';
const api = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=2013959dadede878d7fee663eb7e0001';

export const getPopularMovies = async () => {
  var response = await axios.get(`${api}/movie/popular?${apiKey}`);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  var response = await axios.get(`${api}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

export const getPopularTV = async () => {
  var response = await axios.get(`${api}/tv/popular?${apiKey}`);
  return response.data.results;
};

export const getMovieDetail = async (id)=>{
  var response = await axios.get(`${api}/movie/${id}?${apiKey}`);
  return response.data;
}
export const searchMovieTv = async (query,type) => {
  var response = await axios.get(`${api}/search/${type}?${apiKey}&query=${query}`);
  return response.data.results;
};
