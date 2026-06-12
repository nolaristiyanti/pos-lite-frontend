import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getCashierSummary,
} from "../api/reportApi";

import { useAuth } from "../context/AuthContext";
import {
  Coffee,
  ReceiptText,
  Wallet,
  AlertTriangle,
  CreditCard,
  Clock3,
  TrendingUp,
  Trophy,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    todaySales: 0,
    todayTransactions: 0,
    monthlyRevenue: 0,
    lowStockAlerts: 0,
  
    averageOrderValue: 0,
  
    topSellingProduct: null,

    peakSalesHour: null,
  
    revenueTrend: {
      percentage: 0,
      direction: "up",
      difference: 0,
    },
  });

  const hasSalesToday = stats.todaySales > 0;

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

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");
  
      if (user?.role === "cashier") {
        const response =
          await getCashierSummary();
  
          setStats({
            todaySales:
              response?.data?.today_sales || 0,
          
            todayTransactions:
              response?.data?.today_transactions || 0,
          
            monthlyRevenue:
              response?.data?.monthly_revenue || 0,
          
            lowStockAlerts:
              response?.data?.low_stock_alerts || 0,
          
            averageOrderValue:
              response?.data?.average_order_value || 0,
          
            topSellingProduct:
              response?.data?.top_selling_product || null,
          
            peakSalesHour:
              response?.data?.peak_sales_hour || null,
          
            revenueTrend:
              response?.data?.revenue_trend || {
                percentage: 0,
                direction: "up",
                difference: 0,
              },
          });
      } else {
        const response =
          await getDashboardSummary();
  
          setStats({
            todaySales:
              response?.data?.today_sales || 0,
          
            todayTransactions:
              response?.data?.today_transactions || 0,
          
            monthlyRevenue:
              response?.data?.monthly_revenue || 0,
          
            lowStockAlerts:
              response?.data?.low_stock_alerts || 0,
          
            averageOrderValue:
              response?.data?.average_order_value || 0,
          
            topSellingProduct:
              response?.data?.top_selling_product || null,
          
            peakSalesHour:
              response?.data?.peak_sales_hour || null,
          
            revenueTrend:
              response?.data?.revenue_trend || {
                percentage: 0,
                direction: "up",
                difference: 0,
              },
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
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  const cards =
  user?.role === "cashier"
    ? [
        {
          title: "My Sales Today",
          value: formatCurrency(
            stats.todaySales
          ),
          icon: Coffee,
          insight:
            stats.todayTransactions > 0
              ? "Updated today"
              : "No transactions yet",
        },
        {
          title:
            "My Transactions Today",
          value:
            stats.todayTransactions,
          icon: ReceiptText,
          insight:
            "Orders processed today",
        },
      ]
    : [
        {
          title:
            "Today's Sales",
          value:
            formatCurrency(
              stats.todaySales
            ),
          icon: Coffee,
          insight:
            "Updated today",
        },
        {
          title:
            "Today's Transactions",
          value:
            stats.todayTransactions,
          icon: ReceiptText,
          insight:
            "Orders processed today",
        },
        {
          title:
            "Monthly Revenue",
          value:
            formatCurrency(
              stats.monthlyRevenue
            ),
          icon: Wallet,
          insight:
            "Revenue accumulated this month",
        },
        {
          title:
            "Low Stock Alerts",
          value:
            stats.lowStockAlerts,
          icon: AlertTriangle,
          insight:
            stats.lowStockAlerts === 0
              ? "Inventory looks healthy"
              : "Requires restocking attention",
        },
      ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#4B2E2B] via-[#5B392F] to-[#7A523B] p-8 text-white shadow-xl">
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10">
          <div className="h-56 w-56 rounded-full border-[18px] border-white"></div>
          <div className="absolute -right-8 top-12 h-24 w-24 rounded-full border-[14px] border-white"></div>
        </div>

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            Brew Better. Sell Faster.
          </div>

          <h1 className="mt-5 text-4xl font-bold">
            Welcome back,{" "}
            {user?.name}
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-amber-100">
            Monitor your coffee
            shop performance in
            one place.
          </p>
        </div>
      </section>

      <section
        className={`grid gap-6 ${
          user?.role === "cashier"
          ? "grid-cols-1 md:grid-cols-2"
          : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
        }`}
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`
                rounded-[28px]
                border
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                border-[#DCC5AF] bg-gradient-to-br from-[#FFF9F2] to-white
              `}
            >
              <div className="relative">
                <div className="pr-20">
                  <p className="text-sm font-medium text-[#4B2E2B]">
                    {card.title}
                  </p>

                  <div className="mt-3 h-1 w-10 rounded-full bg-[#C49A6C]" />

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#4B2E2B]">
                    {card.value}
                  </h2>
                </div>

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#F3E7DB]
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                    "
                  >
                      <Icon
                        size={20}
                        strokeWidth={2}
                        className="text-[#8B5E3C]"
                      />
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-[#F1E8DE] pt-4">
                <p className="text-sm text-gray-500">
                  {card.insight}
                </p>
              </div>
            </div>
          );
        })}
      </section>
      
      {user?.role === "admin" && (
      <section className="rounded-3xl border border-[#ECE7E3] bg-[#FCFBFA] p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2">
          <div className="relative h-5 w-4 rotate-12">
            <div className="absolute left-0 top-0 h-5 w-3 rounded-full bg-[#D8C6B8]" />
              <div className="absolute right-0 top-0 h-5 w-3 rounded-full bg-[#D8C6B8]" />

              <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white/70" />
            </div>

            <div className="relative h-5 w-4 rotate-12">
              <div className="absolute left-0 top-0 h-5 w-3 rounded-full bg-[#A97A58]" />
              <div className="absolute right-0 top-0 h-5 w-3 rounded-full bg-[#A97A58]" />

              <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white/70" />
            </div>

            <div className="relative h-5 w-4 rotate-12">
              <div className="absolute left-0 top-0 h-5 w-3 rounded-full bg-[#6B4226]" />
              <div className="absolute right-0 top-0 h-5 w-3 rounded-full bg-[#6B4226]" />

              <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white/70" />
            </div>
          </div>

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A523B]">
            Business Insights
          </p>
        </div>

        <div
          className={`grid gap-6 ${
            user?.role === "cashier"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          <div className="rounded-[28px] border border-[#E9DED2] bg-white p-6 shadow-sm 
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#DCC5AF]"
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#F8F4EE]
              "
            >
              <Trophy
                size={22}
                className="text-[#8B5E3C]"
              />
            </div>

            <h3 className="font-semibold text-[#4B2E2B]">
              Product Spotlight
            </h3>

            <p className="mt-3 text-3xl font-bold leading-tight text-[#4B2E2B]">
              {stats.topSellingProduct?.name ?? "No sales yet"}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              {stats.topSellingProduct
                ? `${stats.topSellingProduct.qty} sold this month`
                : "No sales this month"}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#E9DED2] bg-white p-6 shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#DCC5AF]"
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#F8F4EE]
              "
            >
              <TrendingUp
                size={22}
                className="text-[#8B5E3C]"
              />
            </div>

            <h3 className="font-semibold text-[#4B2E2B]">
              Revenue Trend
            </h3>

            {hasSalesToday ? (
              <>
                <p
                  className={`mt-3 text-2xl font-bold ${
                    stats.revenueTrend?.direction === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stats.revenueTrend?.direction === "up"
                    ? "↑"
                    : "↓"}{" "}
                  {Math.abs(
                    stats.revenueTrend?.percentage ?? 0
                  )}
                  %
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {stats.revenueTrend?.difference >= 0
                    ? "+"
                    : "-"}
                  {formatCurrency(
                    Math.abs(
                      stats.revenueTrend?.difference ?? 0
                    )
                  )}{" "}
                  vs yesterday
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 text-xl font-bold text-[#4B2E2B]">
                  No sales yet today
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Compared with yesterday
                </p>
              </>
            )}
          </div>

          <div className="rounded-[28px] border border-[#E9DED2] bg-white p-6 shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#DCC5AF]"
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#F8F4EE]
              "
            >
              <Clock3
                size={22}
                className="text-[#8B5E3C]"
              />
            </div>

            <h3 className="font-semibold text-[#4B2E2B]">
              Peak Sales Hour
            </h3>

            <p className="mt-3 text-xl font-bold text-[#4B2E2B]">
              {stats.peakSalesHour?.hour ??
                "No peak hour yet"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {stats.peakSalesHour
                ? `${stats.peakSalesHour.transactions} transactions during peak hour`
                : "Based on today's sales activity."}
            </p>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}