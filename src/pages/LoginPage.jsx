import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";

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
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });

            const token = response.data.data.token;

            await login(token);

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Invalid email or password"
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
        <div className="min-h-screen bg-[#F8F6F4]">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4">
                <div className="grid w-full overflow-hidden rounded-[32px] border border-[#ECE7E3] bg-white shadow-sm lg:grid-cols-2">
                    {/* LEFT PANEL */}
                    <div className="hidden bg-[#8B5A3C] p-12 text-white lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                                BrewPOS
                            </span>

                            <h1 className="mt-8 text-5xl font-semibold leading-tight">
                                Run your business
                                <br />
                                with confidence.
                            </h1>

                            <img
                                src="/images/barista.svg"
                                alt="BrewPOS"
                                className="mx-auto mt-8 w-full max-w-[280px]"
                            />
                        </div>

                        <p className="text-sm text-white/70">
                            Smart POS for Modern Business
                        </p>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex items-center justify-center p-8 sm:p-10 lg:p-14">
                        <div className="w-full max-w-md">
                            {/* MOBILE BRAND */}
                            <div className="mb-10 text-center lg:hidden">
                                <h1 className="text-3xl font-semibold text-[#8B5A3C]">
                                    BrewPOS
                                </h1>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Smart POS for Modern Business
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-3xl font-semibold text-zinc-900">
                                    Welcome back
                                </h2>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Sign in to your account.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        required
                                        className="w-full rounded-2xl border border-[#ECE7E3] px-4 py-3 outline-none transition focus:border-[#8B5A3C]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-2xl border border-[#ECE7E3] px-4 py-3 outline-none transition focus:border-[#8B5A3C]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-2xl bg-[#8B5A3C] py-3.5 font-medium text-white transition hover:bg-[#72452B] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading
                                        ? "Signing in..."
                                        : "Sign In"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;