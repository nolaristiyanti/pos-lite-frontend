import api from "./axios";

export const getTotalSales = async () => {
  const response = await api.get("/reports/total-sales");
  return response.data;
};

export const getBestSellingProducts = async () => {
  const response = await api.get(
    "/reports/best-selling-products"
  );

  return response.data;
};

export const getLowStockProducts = async (
  page = 1
) => {
  const response = await api.get(
    "/reports/low-stock-products",
    {
      params: {
        page,
      },
    }
  );

  return response.data;
};

export const getDashboardSummary = async () => {
  const response = await api.get(
    "/reports/dashboard-summary"
  );

  return response.data;
};

export const getCashierSummary = async () => {
  const response = await api.get(
    "/reports/cashier-summary"
  );

  return response.data;
};