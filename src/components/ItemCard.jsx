import { Heart, Trash2 } from 'lucide-react';

export const ItemCard = ({ item, onToggleFavorite, isFavorite }) => {
  const { title, album, image, releaseYear, duration } = item;

  return (
    <article className="item-card">
      <img src={image || 'https://via.placeholder.com/300'} alt={album} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-album"><strong>Álbum:</strong> {album}</p>
        <div className="card-details">
          <span><strong>Año:</strong> {releaseYear}</span>
          <span><strong>Duración:</strong> {duration}</span>
        </div>
        <button
          onClick={() => onToggleFavorite(item)}
          className={`btn-favorite ${isFavorite ? 'remove' : 'add'}`}
        >
          {isFavorite ? (
            <>
              <Trash2 size={16} /> Quitar de favoritos
            </>
          ) : (
            <>
              <Heart size={16} /> Agregar a favoritos
            </>
          )}
        </button>
      </div>
    </article>
  );
};