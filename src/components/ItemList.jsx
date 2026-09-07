import { ItemCard } from './ItemCard';

export const ItemList = ({ items, favorites, onToggleFavorite }) => {
  return (
    <div className="item-list">
      {items.map((item) => {
        const isFavorite = favorites.some((fav) => fav.id === item.id);
        return (
          <ItemCard
            key={item.id}
            item={item}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </div>
  );
};