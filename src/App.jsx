import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { getOneDirectionSongs } from './services/api';

export const App = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar favoritos desde LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('1d_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar favoritos en LocalStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('1d_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Consumo de la API al iniciar la aplicación
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const data = await getOneDirectionSongs();
        setSongs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Agregar / Quitar de favoritos evitando duplicados
  const handleToggleFavorite = (item) => {
    const exists = favorites.some((fav) => fav.id === item.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <BrowserRouter>
      <Header favoritesCount={favorites.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              songs={songs}
              loading={loading}
              error={error}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;