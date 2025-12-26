import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

// 🔹 All products
export const fetchAllProduct = () => {
  return API.get("/products");
};

// 🔹 Single product (✅ REQUIRED)
export const fetchSingleProduct = (id) => {
  return API.get(`/products/${id}`);
};

// 🔹 Categories
export const fetchCategoryProduct = () => {
  return API.get("/products/categories");
};

// 🔹 Products by category
export const fetchProductsByCategory = (category) => {
  return API.get(`/products/category/${category}`);
};
