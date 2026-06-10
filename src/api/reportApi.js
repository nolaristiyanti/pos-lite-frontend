import api from "./axios";

export const getTotalSales =
  async (
    startDate,
    endDate
  ) => {
    const response =
      await api.get(
        "/reports/total-sales",
        {
          params: {
            start_date:
              startDate,
            end_date:
              endDate,
          },
        }
      );

    return response.data;
  };

export const getBestSellingProducts =
  async (
    startDate,
    endDate
  ) => {
    const response =
      await api.get(
        "/reports/best-selling-products",
        {
          params: {
            start_date:
              startDate,
            end_date:
              endDate,
          },
        }
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

export const getSlowMovingProducts = (
  startDate,
  endDate
) =>
  api.get(
    "/reports/slow-moving-products",
    {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    }
  );