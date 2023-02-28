import axios from "axios";

const base_URL = `${import.meta.env.VITE_SERVER_URL}/api/`;

export const customRequest = axios.create({
  baseURL: base_URL,
});
