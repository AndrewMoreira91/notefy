import axios from "axios";

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL as string;

const api = axios.create({
	baseURL: API_SERVER_URL,
})

export default api;