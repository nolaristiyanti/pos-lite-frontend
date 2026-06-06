import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import TransactionPage from "../pages/TransactionPage";
import ReportPage from "../pages/ReportPage";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/categories"
                element={
                    <ProtectedRoute>
                        <CategoryPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <ProductPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <TransactionPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <ReportPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;