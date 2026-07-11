const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchMessages = async () => {
  const response = await fetch(`${API_URL}/messages`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json(); // Assumes { data: messages } or just messages array.
};
