import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import TransactionPage from "../pages/TransactionPage";
import ReportPage from "../pages/ReportPage";

import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../components/AppLayout";

import UserPage from "../pages/UserPage";

const AppRoutes = () => {
  const protectedPage = (
    Component,
    role = null
  ) => (
    <ProtectedRoute role={role}>
      <AppLayout>
        <Component />
      </AppLayout>
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={protectedPage(DashboardPage)}
      />

      <Route
        path="/dashboard"
        element={protectedPage(DashboardPage)}
      />

      <Route
        path="/categories"
        element={protectedPage(
          CategoryPage,
          "admin"
        )}
      />

      <Route
        path="/products"
        element={protectedPage(
          ProductPage,
          "admin"
        )}
      />

      <Route
          path="/users"
          element={protectedPage(
              UserPage,
              "admin"
          )}
      />

      <Route
        path="/transactions"
        element={protectedPage(TransactionPage)}
      />

      <Route
        path="/reports"
        element={protectedPage(
          ReportPage,
          "admin"
        )}
      />
    </Routes>
  );
};

export default AppRoutes;