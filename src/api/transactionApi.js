import axiosInstance from "./axios";

export const checkout = async (payload) => {
  const response = await axiosInstance.post(
    "/checkout",
    payload
  );

  return response.data;
};

export const getTransactions = async (
  page = 1
) => {
  const response =
    await axiosInstance.get(
      "/transactions",
      {
        params: {
          page,
        },
      }
    );

  return response.data;
};

export const getTransactionById = async (id) => {
  const response = await axiosInstance.get(
    `/transactions/${id}`
  );

  return response.data;
};