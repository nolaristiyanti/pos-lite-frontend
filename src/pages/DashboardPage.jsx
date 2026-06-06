import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back, {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            -
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            -
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Transactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            -
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Total Sales
          </p>

          <h2 className="text-3xl font-bold mt-2">
            -
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-2">
          POS Lite Overview
        </h2>

        <p className="text-gray-600">
          This dashboard will display business insights,
          transaction activity, inventory information,
          and sales reports.
        </p>
      </div>
    </div>
  );
}