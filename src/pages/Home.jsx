import { SearchBar } from '../components/SearchBar';
import { ItemList } from '../components/ItemList';

export const Home = ({ songs, loading, error, searchTerm, setSearchTerm, favorites, onToggleFavorite }) => {
  // Filtro por término ingresado utilizando métodos de JavaScript (filter/includes)
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      <h2>Explorar Canciones y Álbumes</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Renderizado condicional */}
      {loading && <p className="status-message">Cargando información...</p>}
      {error && <p className="status-message error">{error}</p>}
      
      {!loading && !error && filteredSongs.length === 0 && (
        <p className="status-message">No encontramos resultados.</p>
      )}

      {!loading && !error && filteredSongs.length > 0 && (
        <ItemList
          items={filteredSongs}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
};