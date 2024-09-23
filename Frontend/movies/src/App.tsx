
import './assets/styles/index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import {GetMoviesProvider} from './context/GetMovies';
import { GetSeriesProvider } from './context/GetSeries';
import { GetRecomendationProvider } from './context/GetRecomendation';
import { GetFavsProvider } from './context/GetFavs';
import Favoritos from './Pages/Favoritos';

function App() {

    
  return (
    <GetFavsProvider>
      <GetRecomendationProvider>
        <GetMoviesProvider>
            <GetSeriesProvider>
              <Router>
                <Routes>
                  <Route path='/favorites' element={< Favoritos />} />
                  <Route path='/' element={<Home/>} />
                </Routes>
              </Router>
            </GetSeriesProvider>
          </GetMoviesProvider>
      </GetRecomendationProvider>
    </GetFavsProvider>

      
  )
}

export default App
