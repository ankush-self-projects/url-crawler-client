import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function login(username: string, password: string) {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data; // { token: ... }
} 