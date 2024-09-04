
import './assets/styles/index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import {GetMoviesProvider} from './context/GetMovies';
import { GetSeriesProvider } from './context/GetSeries';

function App() {

    
  return (
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

      
  )
}

export default App
