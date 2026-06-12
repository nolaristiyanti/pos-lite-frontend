import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    const adminNavItems = [
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
            name: "Users",
            path: "/users",
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

    const cashierNavItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "Transactions",
            path: "/transactions",
        },
    ];

    const navItems =
        user?.role === "admin"
            ? adminNavItems
            : cashierNavItems;

    return (
        <nav className="sticky top-0 z-50 border-b border-[#ECE7E3] bg-white/90 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-8">
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-[#8B5A3C]">
                                BrewPOS
                            </h1>
                        </div>

                        <div className="hidden items-center gap-2 md:flex">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `
                                        rounded-xl
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200
                                        ${
                                            isActive
                                                ? "bg-[#F8F1EC] text-[#8B5A3C] shadow-sm"
                                                : "text-zinc-500 hover:bg-[#F8F1EC] hover:text-[#8B5A3C]"
                                        }
                                    `
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="rounded-xl border border-[#ECE7E3] bg-white p-2 text-zinc-600"
                        >
                            ☰
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-zinc-900">
                                {user?.name}
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="
                                rounded-xl
                                border
                                border-[#ECE7E3]
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-zinc-600
                                transition-all
                                duration-200
                                hover:border-[#D8B89C]
                                hover:bg-[#F8F1EC]
                                hover:text-[#8B5A3C]
                            "
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}