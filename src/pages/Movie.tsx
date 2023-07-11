import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/MovieDetails";
import IMovie from "../models/movie";

const Movie = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const API_URL = process.env.REACT_APP_TMDB_API_BASE_URL;
  const params = useParams();
  const id = params.id ? params.id : null;
  const [movie, setMovie] = useState({} as IMovie);
  const [credits, setCredits] = useState([]);
  /**
   * Get a list of credit from TMDB
   */
  const getCredits = async () => {
    const url = API_URL + '/movie/' + id + '/credits?api_key=' + API_KEY;
    const response = await fetch(url);
    const data = await response.json();
    setCredits(data.cast);
  }
  /**
   * Get a movie detail from TMDB
   */
  const getMovie = async () => {
    const url = API_URL + '/movie/' + id + '?api_key=' + API_KEY;
    const response = await fetch(url);
    const data = await response.json();
    setMovie(data);
  }

  useEffect(() => {
    getMovie();
    getCredits();
  });

  return (
    <>
      <MovieDetails credits={credits} movie={movie} />
    </>
  )
}

export default Movie;
