import { useNavigate } from "react-router-dom";
import IGenre from "../models/genre";

const OperationSection = (props: any) => {
  const { genres, page, setGenre, setSortBy, setSortCurrentBy } = props;
  const navigate = useNavigate();
  const goToPage = (page: string) => navigate('/movies/' + page, { replace: true });

  return (
    <div className="operationSection">
      <div>
        <div className="sortCurrentPage">
          <select onChange={(e) => setSortCurrentBy(e.target.value)}>
            <option value=".">Sort Current Page Only</option>
            <option value="id.asc">Id ASC</option>
            <option value="id.desc">Id DESC</option>
            <option value="popularity.asc">Popularity ASC</option>
            <option value="popularity.desc">Popularity DESC</option>
            <option value="title.asc">Title ASC</option>
            <option value="title.desc">Title DESC</option>
          </select>
        </div>
      </div>
      <div>
        <div className="sortOrder">
          <select onChange={(e) => setSortBy(e.target.value)} defaultValue="popularity.desc">
            <option value="popularity.asc">Popularity Asc</option>
            <option value="popularity.desc">Popularity Desc</option>
            <option value="primary_release_date.asc">Release Date Asc</option>
            <option value="primary_release_date.desc">Release Date Desc</option>
          </select>
        </div>
        <div className="filterByGenre">
          {
            genres?.length > 0 ? (
              <div className='genres'>
                <select onChange={(e) => setGenre(e.target.value)}>
                  <option value="">All</option>
                  {genres.map((g: IGenre) => (<option key={'genre_' + g.id} value={g.id}>{g.name}</option>))}
                </select>
              </div>
            ) : (
              <div className='genresEmpty'>
                No Genres
              </div>
            )
          }
        </div>
        <div className='pagination'>
          <select onChange={(e) => goToPage(e.target.value)} defaultValue={page}>
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
            <option value="4">Page 4</option>
            <option value="5">Page 5</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default OperationSection;
