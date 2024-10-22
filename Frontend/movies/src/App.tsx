
import './assets/styles/index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import {GetContentProvider} from './context/GetContent';
import Favoritos from './Pages/Favoritos';
import { IdProvider } from './context/IdContext';
import Overview from './Pages/Overview';
import Lists from './Pages/Lists'
import ByGenre from './Pages/ByGenre';
import SearchPage from './Pages/SearchPage';
import { SearchProvider } from './context/searchContext';
import Cadastro from './Pages/Cadastro';

function App() {

    
  return (
    <IdProvider>
      <SearchProvider>
          <GetContentProvider>
           
              <Router>
                  <Routes>
                    <Route path='/favorites' element={< Favoritos />} />
                    <Route path='/' element={<Home/>} />
                    <Route path='/search/movie' element={<SearchPage />} />
                    <Route path='/overview-movie/:id' element={<Overview />} />
                    <Route path='/overview-serie/:id' element={<Overview />} />
                    <Route path='/lists' element={<Lists />} />
                    <Route path='/genre/:id' element={<ByGenre />} />
                    <Route path='/genre/:id/overview-movie/:id' element={<Overview />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                  </Routes>
                </Router>
            
          </GetContentProvider>
        </SearchProvider>
    </IdProvider>

      
  )
}

export default App
