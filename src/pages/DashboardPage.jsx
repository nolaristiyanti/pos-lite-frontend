import { useEffect, useState } from "react";

import { getAllCategories } from "../api/categoryApi";
import { getProducts } from "../api/productApi";
import { getTransactions } from "../api/transactionApi";
import { getTotalSales } from "../api/reportApi";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    transactions: 0,
    totalSales: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        categoriesResponse,
        productsResponse,
        transactionsResponse,
        totalSalesResponse,
      ] = await Promise.all([
        getAllCategories(),
        getProducts(),
        getTransactions(),
        getTotalSales(),
      ]);

      setStats({
        categories:
          categoriesResponse?.data?.length ||
          categoriesResponse?.length ||
          0,

        products:
          productsResponse?.meta?.total ||
          productsResponse?.data?.meta?.total ||
          0,

        transactions:
          transactionsResponse?.meta?.total ||
          transactionsResponse?.data?.meta?.total ||
          0,

        totalSales:
          totalSalesResponse?.total_sales ||
          totalSalesResponse?.data?.total_sales ||
          0,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Categories",
      value: stats.categories,
    },
    {
      title: "Products",
      value: stats.products,
    },
    {
      title: "Transactions",
      value: stats.transactions,
    },
    {
      title: "Total Sales",
      value: formatCurrency(stats.totalSales),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back. Monitor your POS Lite business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}