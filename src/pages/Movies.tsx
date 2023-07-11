import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieItem from '../components/MovieItem';
import OperationSection from '../components/OperationSection';
import IGenre from '../models/genre';
import IMovie from '../models/movie';

const Movies = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const API_URL = process.env.REACT_APP_TMDB_API_BASE_URL;
  const API_URL_GET_MOVIES = API_URL + '/discover/movie?region=fr&api_key=' + API_KEY + '&include_adult=false&include_video=false&language=en-US';
  const API_URL_GET_GENRES = API_URL + '/genre/movie/list?language=en&region=fr&api_key=' + API_KEY;
  const params = useParams();
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([] as IGenre[]);
  const [movies, setMovies] = useState([] as IMovie[]);
  const [page, setPage] = useState(params.page ? parseInt(params.page) : 1);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [sortCurrentBy, setSortCurrentBy] = useState('.');
  /**
   * Get a list of genre from TMDB
   */
  const getGenres = async () => {
    const response = await fetch(API_URL_GET_GENRES);
    const data = await response.json();
    setGenres(data.genres);
  }
  /**
   * Get a list of movie from TMDB
   */
  const getMovies = async () => {
    const url = API_URL_GET_MOVIES + '&page=' + page + '&sort_by=' + sortBy + (genre === '' ? '' : '&with_genres=' + genre);
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
  }
  /**
   * Get page number
   */
  const getPage = () => {
    params.page ? setPage(parseInt(params.page)) : setPage(1);
  }
  /**
   * Sort movies in current page by proposed value
   * @param sortBy string
   * @param order string
   * @returns movies IMovie[]
   */
  const sortMovies = (list: IMovie[], sortBy: string): IMovie[] => {
    if (sortBy === '.') {
      return list;
    }
    const field = sortBy.split('.')[0];
    const order = sortBy.split('.')[1]; 
    function compare(a: any, b: any) {
      if (a[field] < b[field]){
        return order === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]){
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    }
    return [...list].sort(compare);
  }
  useEffect(() => {
    getPage();
    getGenres();
    getMovies();
  });

  return (
    <>
      <h1>Movies</h1>
      <OperationSection genres={genres} page={page} setGenre={setGenre} setSortBy={setSortBy} setSortCurrentBy={setSortCurrentBy} />
      {
        movies?.length > 0 ? (
          <div className="container">
            {sortMovies(movies, sortCurrentBy).map(m => (<MovieItem key={'movie_' + m['id']} movie={m} />))}
          </div>
        ) : (
          <div className='moviesEmpty'>
            <h2>No Movies Found</h2>
          </div>
        )
      }
    </>
  )
}

export default Movies;
