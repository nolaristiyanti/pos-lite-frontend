import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Transactions",
      path: "/transactions",
    },
    {
      name: "Reports",
      path: "/reports",
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
        <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-blue-600">
                POS Lite
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="p-2 rounded-lg border bg-white"
              type="button"
            >
              ☰
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {user?.name}
              </p>

              <p className="hidden md:block text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}