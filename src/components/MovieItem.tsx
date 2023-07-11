import { Link } from 'react-router-dom';

const MovieItem = (props: any) => {
  const API_URL_IMG = process.env.REACT_APP_TMDB_IMG_BASE_URL;
  const { movie } = props;

  return (
    <div className="movie">
      <div>
        {movie.poster_path ? <Link to={'/movie/' + movie.id}><img src={API_URL_IMG + movie.poster_path} alt={movie.original_title} /></Link> : <p><b>Poster: </b>N/A</p>}    
        <p><b>Genres:</b> {movie.genre_ids}</p>
        <Link to={'/movie/' + movie.id}><h3>{movie.original_title}</h3></Link>
        <p><b>Release Date:</b> {movie.release_date}</p>
        <p><b>Popularity: </b> {movie.popularity}</p>
        <p><b>Vote Average:</b> {movie.vote_average}</p>
        <p><b>Vote Count:</b> {movie.vote_count}</p>
      </div>
    </div>
  )
}

export default MovieItem
