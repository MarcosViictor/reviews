
import './assets/styles/index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import {GetMoviesProvider} from './context/GetMovies';
import { GetSeriesProvider } from './context/GetSeries';
import { GetRecomendationProvider } from './context/GetRecomendation';

function App() {

    
  return (
    <GetRecomendationProvider>
      <GetMoviesProvider>
          <GetSeriesProvider>
            <Router>
              <Routes>
                {/* <Route path='/login' element={<Login />} /> */}
                <Route path='/' element={<Home/>} />
              </Routes>
            </Router>
          </GetSeriesProvider>
        </GetMoviesProvider>
    </GetRecomendationProvider>

      
  )
}

export default App
