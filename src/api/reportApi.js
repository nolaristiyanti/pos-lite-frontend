import api from "./axios";

export const getTotalSales = async () => {
  const response = await api.get("/reports/total-sales");
  return response.data;
};

export const getBestSellingProducts = async () => {
  const response = await api.get("/reports/best-selling-products");
  return response.data;
};

export const getLowStockProducts = async () => {
  const response = await api.get("/reports/low-stock-products");
  return response.data;
};

export const getDashboardSummary =
  async () => {
    const response =
      await api.get(
        "/reports/dashboard-summary"
      );

    return response.data;
  };