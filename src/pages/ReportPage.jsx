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

  const [
    bestSellingProducts,
    setBestSellingProducts,
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
      ] = await Promise.all([
        getTotalSales(
          start,
          end
        ),
        getBestSellingProducts(
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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reports Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Monitor sales performance and inventory status
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Start Date
            </label>

            {/* <input
              type="date"
              value={startDate}
              onChange={(e) =>
                handleStartDateChange(
                  e.target.value
                )
              }
              className="rounded-xl border border-[#DCC5AF] px-3 py-2"
            /> */}

            <input
              type="date"
              value={startDate}
              max={today}
              onChange={(e) =>
                handleStartDateChange(
                  e.target.value
                )
              }
              className="rounded-xl border border-[#DCC5AF] px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              End Date
            </label>

            {/* <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="rounded-xl border border-[#DCC5AF] px-3 py-2"
            /> */}
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
              className="rounded-xl border border-[#DCC5AF] px-3 py-2"
            />
          </div>

          <button
            onClick={handleApplyFilter}
            className="
              self-end
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
  );
};

export default ReportPage;