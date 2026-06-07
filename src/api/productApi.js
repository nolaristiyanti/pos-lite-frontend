import axiosInstance from "./axios";

export const getProducts = async ({
  page = 1,
  search = "",
} = {}) => {
  const response = await axiosInstance.get("/products", {
    params: {
      page,
      search,
    },
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

export const createProduct = async (data) => {
  const response = await axiosInstance.post(
    "/products",
    data
  );

  return response.data;
};

export const updateProduct = async (
  id,
  data
) => {
  const response = await axiosInstance.put(
    `/products/${id}`,
    data
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `/products/${id}`
  );

  return response.data;
};