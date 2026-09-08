import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export const ItemCard = ({ item, isFavorite, onToggleFavorite }) => {
  const { title, album, image, releaseYear, duration } = item;

  return (
    <View style={styles.card}>
      <Image source={{ uri: image || 'https://via.placeholder.com/150' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.album} numberOfLines={1}>{album}</Text>
        <Text style={styles.details}>Año: {releaseYear} | Duración: {duration}</Text>
        
        <Pressable
          style={[styles.button, isFavorite ? styles.btnRemove : styles.btnAdd]}
          onPress={() => onToggleFavorite(item)}
        >
          <Text style={[styles.btnText, isFavorite ? styles.btnTextRemove : styles.btnTextAdd]}>
            {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  album: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  btnAdd: {
    backgroundColor: '#111',
  },
  btnRemove: {
    backgroundColor: '#ffe5e5',
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnTextAdd: {
    color: '#fff',
  },
  btnTextRemove: {
    color: '#d32f2f',
  },
});