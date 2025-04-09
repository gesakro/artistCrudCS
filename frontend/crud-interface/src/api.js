import axios from 'axios';

// Usa la variable de entorno para la URL del backend
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Funciones para Artistas
export const getArtists = async () => {
  const response = await axios.get(`${API_URL}/artists/`);
  return response.data;
};

export const createArtist = async (artist) => {
  const response = await axios.post(`${API_URL}/artists/`, artist);
  return response.data;
};

export const updateArtist = async (id, artist) => {
  const response = await axios.put(`${API_URL}/artists/${id}`, artist);
  return response.data;
};

export const deleteArtist = async (id) => {
  const response = await axios.delete(`${API_URL}/artists/${id}`);
  return response.data;
};

export const deleteArtistByName = async (name) => {
  const response = await axios.delete(`${API_URL}/artists/name/${name}`);
  return response.data;
};

// Funciones para Álbumes
export const createAlbum = async (album) => {
  const response = await axios.post(`${API_URL}/albums/`, album);
  return response.data;
};

export const updateAlbum = async (id, album) => {
  const response = await axios.put(`${API_URL}/albums/${id}`, album);
  return response.data;
};

export const deleteAlbum = async (albumId) => {
  const response = await axios.delete(`${API_URL}/albums/${albumId}`);
  return response.data;
};

export const getAlbumsByArtist = async (artistId) => {
  const response = await axios.get(`${API_URL}/artists/${artistId}/albums`);
  return response.data;
};

export const getFullAlbums = async () => {
  const response = await axios.get(`${API_URL}/albums/full`);
  return response.data;
};

// Funciones para Canciones
export const createSong = async (song) => {
  const response = await axios.post(`${API_URL}/songs/`, song);
  return response.data;
};

export const updateSong = async (id, song) => {
  const response = await axios.put(`${API_URL}/songs/${id}`, song);
  return response.data;
};

export const deleteSong = async (songId) => {
  const response = await axios.delete(`${API_URL}/songs/${songId}`);
  return response.data;
};
