import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Interceptor para añadir el token de autenticación a las solicitudes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Funciones para interactuar con el backend
export const fetchProfiles = () => API.get('/profiles');
export const getProfile = (id) => API.get(`/profiles/${id}`);
export const updateProfile = (id, updatedProfile) => API.patch(`/profiles/${id}`, updatedProfile);
export const uploadProfileImage = (formData) => API.post('/files/upload', formData);

export default API;