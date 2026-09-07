import { ItemList } from '../components/ItemList';

export const Favorites = ({ favorites, onToggleFavorite }) => {
  return (
    <main className="container">
      <h2>Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p className="status-message">Aún no agregaste canciones a tus favoritos.</p>
      ) : (
        <ItemList
          items={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
};