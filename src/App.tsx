import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/layout/navbar";
import { Footer } from "./components/layout/footer";
import { HomePage } from "./pages/home";
import { ContributePage } from "./pages/contribute";
import { ContributorsPage } from "./pages/contributors";
import { DashboardPage } from "./pages/dashboard";
import { AboutPage } from "./pages/about";
import { AdminLoginPage } from "./pages/admin";
import { AdminDashboardPage } from "./pages/admin/dashboard";
import { KneeOAInfoPage } from "./pages/knee-oa-info";
import { useAdminStore } from "./lib/store";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<KneeOAInfoPage />} />
            <Route path="/analysis" element={<HomePage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="/contributors" element={<ContributorsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
