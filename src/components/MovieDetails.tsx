import { useNavigate } from 'react-router-dom';
import IProductionCountry from '../models/production_country';
import IGenre from '../models/genre';
import ICredit from '../models/credit';

const MovieDetails = (props: any) => {
  const API_URL_IMG = process.env.REACT_APP_TMDB_IMG_BASE_URL;
  const { credits, movie } = props;
  const navigate = useNavigate();
  return (
    <>
      <p style={{textAlign: 'left'}}><button onClick={() => navigate(-1)}>Return</button></p>
      <h1>{movie.original_title}</h1>
      {
        movie ? (
          <div className="container">
            {movie.poster_path ? <img src={API_URL_IMG + movie.poster_path} alt={'poster-' + movie.title} width={'100%'} /> : <p><b>Poster: </b> N/A</p>}
            <p><b>Genres: </b>{movie?.genres?.length ? movie.genres.map((g: IGenre) => g.name).join(', ') : ''}</p>
            <p><b>Original title: </b>{movie.title}</p>
            <p><b>Overview: </b>{movie.overview}</p>
            <p><b>Release date: </b>{movie.release_date}</p>
            <p><b>Vote average: </b>{movie.vote_average}</p>
            <p><b>Vote count: </b>{movie.vote_count}</p>
            <p><b>Budget in US dollar: </b>{movie.budget}</p>
            <p><b>Production country: </b>{movie?.production_countries?.length ? movie.production_countries.map((pc: IProductionCountry) => pc.name).join(', ') : ''}</p>
            <p><b>Revenue in US dollar: </b>{movie.revenue}</p>
          </div>
        ) : (
          <div className="movieEmpty">
            <h2>No Movie Found</h2>
          </div>
        )
      }
      {
        credits ? (
          <div className="container">
            <p>
              <b>Credits: </b>
              {credits.length > 0 ? credits.slice(0,3).map((c: ICredit) => c.name).join(', ') : 'N/A'}
            </p>
          </div>
        ) : (
          <div className="creditsEmpty">
            <h2>No Credits Found</h2>
          </div>
        )
      }
      <p style={{textAlign: 'left'}}><button onClick={() => navigate(-1)}>Return</button></p>
    </>
  )
}

export default MovieDetails;
