import axios from 'axios';

const API_BASE_URL = 'https://itunes.apple.com';

export const getOneDirectionSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        term: 'one direction',
        entity: 'song',
        limit: 100,
      },
    });

    return response.data.results.map((song) => ({
      id: String(song.trackId),
      title: song.trackName,
      album: song.collectionName,
      image: song.artworkUrl100 ? song.artworkUrl100.replace('100x100bb', '300x300bb') : '',
      releaseYear: new Date(song.releaseDate).getFullYear(),
      duration: `${Math.floor(song.trackTimeMillis / 60000)}:${String(
        Math.floor((song.trackTimeMillis % 60000) / 1000)
      ).padStart(2, '0')} min`,
    }));
  } catch (error) {
    throw new Error('No fue posible obtener la información.');
  }
};