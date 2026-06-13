import { useEffect, useState } from "react";

import ReportSummaryCards from "../components/ReportSummaryCards";
import BestSellingProductsTable from "../components/BestSellingProductsTable";
import LowStockProductsTable from "../components/LowStockProductsTable";
import SlowMovingProductsTable from "../components/SlowMovingProductsTable";

import {
  getTotalSales,
  getBestSellingProducts,
  getSlowMovingProducts,
  getLowStockProducts,
} from "../api/reportApi";

import { Boxes, Package, TriangleAlert } from "lucide-react";

const ReportPage = () => {
  const [salesData, setSalesData] = useState(null);

  const [
    bestSellingProducts,
    setBestSellingProducts,
  ] = useState([]);

  const [
    slowMovingProducts,
    setSlowMovingProducts,
  ] = useState([]);

  const [
    lowStockProducts,
    setLowStockProducts,
  ] = useState([]);

  const [
    lowStockPage,
    setLowStockPage,
  ] = useState(1);

  const [
    lowStockLastPage,
    setLowStockLastPage,
  ] = useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] =
    useState(today);

  const [endDate, setEndDate] =
    useState(today);

  const fetchReports = async (
    start = startDate,
    end = endDate
  ) => {
    try {
      setLoading(true);
      setError("");

      const [
        totalSalesResponse,
        bestSellingResponse,
        slowMovingResponse,
      ] = await Promise.all([
        getTotalSales(
          start,
          end
        ),
        getBestSellingProducts(
          start,
          end
        ),
        getSlowMovingProducts(
          start,
          end
        ),
      ]);

      setSalesData(
        totalSalesResponse.data
      );

      setBestSellingProducts(
        bestSellingResponse.data || []
      );

      setSlowMovingProducts(
        slowMovingResponse.data.data || []
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

  const fetchLowStockProducts =
    async (page = 1) => {
      try {
        const response =
          await getLowStockProducts(
            page
          );

        setLowStockProducts(
          response.data.products
            .data || []
        );

        setLowStockLastPage(
          response.data.products
            .last_page || 1
        );
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    fetchReports(
      today,
      today
    );
  }, []);

  useEffect(() => {
    fetchLowStockProducts(
      lowStockPage
    );
  }, [lowStockPage]);

  const handleApplyFilter = () => {
    fetchReports(
      startDate,
      endDate
    );
  };

  const handleStartDateChange = (
    value
  ) => {
    setStartDate(value);
  
    if (
      endDate &&
      value > endDate
    ) {
      setEndDate(value);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-[#8A7A6A]">
          Loading reports...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="
            rounded-3xl
            border
            border-red-200
            bg-white p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#F8F6F4] p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#18181B]">
              Reports
            </h1>

            <p className="mt-1 text-sm text-[#71717A]">
              Monitor sales performance and inventory insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={startDate}
              max={today}
              onChange={(e) =>
                handleStartDateChange(
                  e.target.value
                )
              }
              className="
                rounded-xl border border-[#DCC5AF] px-3 py-2
                bg-[#FFF9F2]
                focus:border-[#C49A6C]
                focus:outline-none
                focus:ring-[#C49A6C]/20"
            />

            <input
              type="date"
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="
                rounded-xl border border-[#DCC5AF] px-3 py-2
                bg-[#FFF9F2]
                focus:border-[#C49A6C]
                focus:outline-none
                focus:ring-[#C49A6C]/20"
            />

            <button
              onClick={handleApplyFilter}
              className="
                rounded-xl
                bg-[#4B2E2B]
                px-5
                py-2
                font-medium
                text-white
                transition
                hover:bg-[#5B392F]
              "
            >
              Apply
            </button>
          </div>
        </div>

        <ReportSummaryCards
          salesData={salesData}
        />

        <BestSellingProductsTable
          products={bestSellingProducts}
        />

        <SlowMovingProductsTable
          products={slowMovingProducts}
        />
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#18181B]">
          Inventory Analytics
        </h2>

        <p className="text-sm text-[#71717A]">
          Monitor stock availability and inventory health.
        </p>
      </div>

      <div className="space-y-6">
        <LowStockProductsTable
          products={lowStockProducts}
          currentPage={
            lowStockPage
          }
          lastPage={
            lowStockLastPage
          }
          onPrevPage={() =>
            setLowStockPage(
              (prev) =>
                Math.max(
                  prev - 1,
                  1
                )
            )
          }
          onNextPage={() =>
            setLowStockPage(
              (prev) =>
                Math.min(
                  prev + 1,
                  lowStockLastPage
                )
            )
          }
        />
      </div>
      
    </div>
  );
};

export default ReportPage;