import { useEffect, useState } from "react";

import {
  getTotalSales,
  getBestSellingProducts,
  getLowStockProducts,
} from "../api/reportApi";

const ReportPage = () => {
  const [salesData, setSalesData] = useState(null);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        totalSalesResponse,
        bestSellingResponse,
        lowStockResponse,
      ] = await Promise.all([
        getTotalSales(),
        getBestSellingProducts(),
        getLowStockProducts(),
      ]);

      setSalesData(totalSalesResponse.data);

      setBestSellingProducts(
        bestSellingResponse.data || []
      );

      setLowStockProducts(
        lowStockResponse.data?.products || []
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          Loading reports...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500">
          Sales and inventory insights
        </p>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">
          Total Sales Data
        </h2>

        <pre className="overflow-auto text-sm">
          {JSON.stringify(
            salesData,
            null,
            2
          )}
        </pre>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">
          Best Selling Products
        </h2>

        <pre className="overflow-auto text-sm">
          {JSON.stringify(
            bestSellingProducts,
            null,
            2
          )}
        </pre>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">
          Low Stock Products
        </h2>

        <pre className="overflow-auto text-sm">
          {JSON.stringify(
            lowStockProducts,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default ReportPage;