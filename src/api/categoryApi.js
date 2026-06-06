import axiosInstance from "./axios";

export const getCategories = async (params = {}) => {
  const response = await axiosInstance.get("/categories", {
    params,
  });

  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}`);

  return response.data;
};

export const createCategory = async (payload) => {
  const response = await axiosInstance.post("/categories", payload);

  return response.data;
};

export const updateCategory = async (id, payload) => {
  const response = await axiosInstance.put(
    `/categories/${id}`,
    payload
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(
    `/categories/${id}`
  );

  return response.data;
};

export const getAllCategories =
  async () => {
    const response =
      await axiosInstance.get(
        "/categories/all"
      );

    return response.data;
  };