import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getCashierSummary,
} from "../api/reportApi";

import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    todaySales: 0,
    todayTransactions: 0,
    monthlyRevenue: 0,
    lowStockAlerts: 0,
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const formatCurrency = (
    amount
  ) => {
    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    ).format(amount);
  };

  const fetchDashboardStats =
    async () => {
      try {
        setLoading(true);
        setError("");

        if (
          user?.role === "cashier"
        ) {
          const response =
            await getCashierSummary();

          setStats({
            todaySales:
              response?.data
                ?.my_sales_today || 0,

            todayTransactions:
              response?.data
                ?.my_transactions_today ||
              0,

            monthlyRevenue: 0,
            lowStockAlerts: 0,
          });
        } else {
          const response =
            await getDashboardSummary();

          setStats({
            todaySales:
              response?.data
                ?.today_sales || 0,

            todayTransactions:
              response?.data
                ?.today_transactions ||
              0,

            monthlyRevenue:
              response?.data
                ?.monthly_revenue || 0,

            lowStockAlerts:
              response?.data
                ?.low_stock_alerts ||
              0,
          });
        }
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load dashboard statistics"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  const adminCards = [
    {
      title: "Today's Sales",
      value: formatCurrency(
        stats.todaySales
      ),
      icon: "💰",
    },
    {
      title:
        "Today's Transactions",
      value:
        stats.todayTransactions,
      icon: "🧾",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(
        stats.monthlyRevenue
      ),
      icon: "📈",
    },
    {
      title: "Low Stock Alerts",
      value:
        stats.lowStockAlerts,
      icon: "⚠️",
    },
  ];

  const cashierCards = [
    {
      title: "My Sales Today",
      value: formatCurrency(
        stats.todaySales
      ),
      icon: "💰",
    },
    {
      title:
        "My Transactions Today",
      value:
        stats.todayTransactions,
      icon: "🧾",
    },
  ];

  const cards =
    user?.role === "cashier"
      ? cashierCards
      : adminCards;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-500">
          {user?.role === "cashier"
            ? "Monitor your personal sales performance today."
            : "Monitor your business performance and key metrics from a single dashboard."}
        </p>
      </div>

      <div
        className={`grid gap-6 ${
          user?.role === "cashier"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
        }`}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              card.title ===
                "Low Stock Alerts" &&
              stats.lowStockAlerts > 0
                ? "border-amber-300 bg-amber-50"
                : "bg-white"
            }`}
          >
            <div className="mb-4 text-4xl">
              {card.icon}
            </div>

            <p className="text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}