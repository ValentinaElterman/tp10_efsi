import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { ItemCard } from '../components/ItemCard';

export const HomeScreen = ({ songs, loading, error, favorites, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por canción o álbum..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#111" />
          <Text style={styles.statusText}>Cargando información...</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
        </View>
      )}

      {!loading && !error && filteredSongs.length === 0 && (
        <View style={styles.center}>
          <Text style={styles.statusText}>No encontramos resultados.</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isFavorite = favorites.some((fav) => fav.id === item.id);
            return (
              <ItemCard
                item={item}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
              />
            );
          }}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 14,
  },
  list: {
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#d32f2f',
  },
});