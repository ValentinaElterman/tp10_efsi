import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/screens/HomeScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { getOneDirectionSongs } from './src/services/api';

const Tab = createBottomTabNavigator();

export default function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

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

  const handleToggleFavorite = (item) => {
    const exists = favorites.some((fav) => fav.id === item.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#111' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#111',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen name="Inicio">
          {() => (
            <HomeScreen
              songs={songs}
              loading={loading}
              error={error}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Favoritos">
          {() => (
            <FavoritesScreen
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}