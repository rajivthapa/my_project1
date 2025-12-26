import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/users/add", data);
};
