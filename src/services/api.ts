import axios from 'axios';

const API_BASE_URL = 'https://itunes.apple.com';

interface ITunesTrack {
  trackId: number;
  trackName: string;
  collectionName: string;
  artworkUrl100: string;
  releaseDate: string;
  trackTimeMillis: number;
}

export const getOneDirectionSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        term: 'one direction',
        entity: 'song',
        limit: 200,
      },
    });

    return response.data.results.map((song: ITunesTrack) => ({
      id: song.trackId,
      title: song.trackName,
      album: song.collectionName,
      // imagen de portada a 300x300
      image: song.artworkUrl100 ? song.artworkUrl100.replace('100x100bb', '300x300bb') : '',
      releaseYear: new Date(song.releaseDate).getFullYear(),
      duration: `${Math.floor(song.trackTimeMillis / 60000)}:${String(
        Math.floor((song.trackTimeMillis % 60000) / 1000)
      ).padStart(2, '0')} min`,
    }));
  } catch (error) {
    throw new Error('No fue posible obtener la información de las canciones.');
  }
};