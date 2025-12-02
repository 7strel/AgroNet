import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL; // Load from environment

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the Authorization token dynamically
export const setAuthToken = () => {
  const token = JSON.parse(localStorage.getItem("user_token") || '""');
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Call this function at startup to set token
setAuthToken();

export default api;
