
import './assets/styles/index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import {GetContentProvider} from './context/GetContent';
import Favoritos from './Pages/Favoritos';
import { IdProvider } from './context/IdContext';
import Overview from './Pages/Overview';
import Lists from './Pages/Lists'
import ByGenre from './Pages/ByGenre';

function App() {

    
  return (
    <IdProvider>
        <GetContentProvider>
           
              <Router>
                  <Routes>
                    <Route path='/favorites' element={< Favoritos />} />
                    <Route path='/' element={<Home/>} />
                    <Route path='/overview-movie/:id' element={<Overview />} />
                    <Route path='/overview-serie/:id' element={<Overview />} />
                    <Route path='/lists' element={<Lists />} />
                    <Route path='/genre/:id' element={<ByGenre />} />
                  </Routes>
                </Router>
            
          </GetContentProvider>
          </IdProvider>

      
  )
}

export default App
