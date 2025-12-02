import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/marketplace/products/");
  return response.data.products;
};

export const createProduct = async (productData: { name: string; price: number; description: string; image: string }) => {
  const response = await api.post("/marketplace/products/", productData);
  return response.data;
};

export const updateProduct = async (id: number, updatedData: { name: string; price: number; description: string; image: string }) => {
  const response = await api.put(`/marketplace/products/${id}/`, updatedData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/marketplace/products/${id}/`);
  return response.data;
};
