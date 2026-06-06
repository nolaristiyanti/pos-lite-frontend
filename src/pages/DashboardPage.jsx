import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Welcome back,
                            {" "}
                            {user?.name}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        User Information
                    </h2>

                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong>{" "}
                            {user?.name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {user?.email}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;