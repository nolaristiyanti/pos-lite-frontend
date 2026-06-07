import { useEffect, useState } from "react";
import ReportSummaryCards from "../components/ReportSummaryCards";
import BestSellingProductsTable from "../components/BestSellingProductsTable";
import LowStockProductsTable from "../components/LowStockProductsTable";

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
        <h1 className="text-3xl font-bold tracking-tight">
          Reports Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Monitor sales performance and inventory status
        </p>
      </div>
  
      <ReportSummaryCards
        salesData={salesData}
      />
  
      <BestSellingProductsTable
        products={bestSellingProducts}
      />
  
      <LowStockProductsTable
        products={lowStockProducts}
      />
    </div>
  );
};

export default ReportPage;