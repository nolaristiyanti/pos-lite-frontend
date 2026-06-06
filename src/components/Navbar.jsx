import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-blue-600">
              POS Lite
            </h1>

            <div className="flex gap-4">
              <Link to="/dashboard">Dashboard</Link>

              <Link to="/categories">Categories</Link>

              <Link to="/products">Products</Link>

              <Link to="/transactions">Transactions</Link>

              <Link to="/reports">Reports</Link>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}