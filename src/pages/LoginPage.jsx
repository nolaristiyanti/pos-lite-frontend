import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import { useEffect } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login, token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setError("");
    
        setLoading(true);
    
        try {
            const response =
                await axiosInstance.post("/login", {
                    email,
                    password,
                });
    
            const token =
                response.data.data.token;
    
            await login(token);
    
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Invalid credentials"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">
                        POS Lite
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Point of Sales Management System
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="admin@example.com"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;