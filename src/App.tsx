import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading';

const Movie = lazy(() => import('./pages/Movie'));
const Movies = lazy(() => import('./pages/Movies'));

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className='appNavigation'>
          <a href='/'><span style={{padding: '10px'}}>HOME</span></a>
          <a href='/movies/1'><span style={{padding: '10px'}}>MOVIES</span></a>
        </div>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/movies/:page' element={<Movies />} />
            <Route path='/movie/:id' element={<Movie />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
