import axios from "axios";

const baseURL = "http://localhost:3001/api/" || "https://iot1.innotrat.in/api/";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const protectedInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { instance, protectedInstance };
