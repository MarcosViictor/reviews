import './assets/styles/index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import { GetContentProvider } from './context/GetContent';
import Favoritos from './Pages/Favoritos';
import { IdProvider } from './context/IdContext';
import Overview from './Pages/Overview';
import Lists from './Pages/Lists';
import ByGenre from './Pages/ByGenre';
import SearchPage from './Pages/SearchPage';
import { SearchProvider } from './context/searchContext';
import HistoryPage from './Pages/HistoryPage';
import OverviewCommentPage from './Pages/OverviewComment';
import Framed from './Pages/Framed';
import Community from './Pages/Community';
import Sugestion from './Pages/Sugestion';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import Cookies from 'js-cookie';

// Componente de rota privada
const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const token = Cookies.get('token'); // Verifica se o token está presente
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <IdProvider>
      <SearchProvider>
        <GetContentProvider>
          <Router>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas protegidas (inclui todas as outras) */}
              <Route path="/" element={<PrivateRoute element={<Home />} />} />
              <Route path="/search/movie" element={<PrivateRoute element={<SearchPage />} />} />
              <Route path="/overview-movie/:id" element={<PrivateRoute element={<Overview />} />} />
              <Route path="/overview-serie/:id" element={<PrivateRoute element={<Overview />} />} />
              <Route path="/genre/:id" element={<PrivateRoute element={<ByGenre />} />} />
              <Route
                path="/genre/:id/overview-movie/:id"
                element={<PrivateRoute element={<Overview />} />}
              />
              <Route path="/favorites" element={<PrivateRoute element={<Favoritos />} />} />
              <Route path="/lists" element={<PrivateRoute element={<Lists />} />} />
              <Route path="/history" element={<PrivateRoute element={<HistoryPage />} />} />
              <Route
                path="/comments/:id"
                element={<PrivateRoute element={<OverviewCommentPage />} />}
              />
              <Route path="/community" element={<PrivateRoute element={<Community />} />} />
              <Route path="/framed" element={<PrivateRoute element={<Framed />} />} />
              <Route path="/sugestion" element={<PrivateRoute element={<Sugestion />} />} />
            </Routes>
          </Router>
        </GetContentProvider>
      </SearchProvider>
    </IdProvider>
  );
}

export default App;
