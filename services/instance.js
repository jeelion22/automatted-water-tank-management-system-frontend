import axios from "axios";

const baseURL = "http://localhost:3001/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { instance, protectedInstance };
