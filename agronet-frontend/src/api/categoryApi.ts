import api from "./api";

export const getCategories = async () => {
  const response = await api.get("/marketplace/categories/");
  return response.data.categories;
};

export const createCategory = async (categoryData: { name: string }) => {
  const response = await api.post("/marketplace/categories/", categoryData);
  return response.data;
};

export const updateCategory = async (id: number, updatedData: { name: string }) => {
  const response = await api.put(`/marketplace/categories/${id}/`, updatedData);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/marketplace/categories/${id}/`);
  return response.data;
};
