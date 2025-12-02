import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "./components/AnimatedPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StarBackground from "./components/StarBackground";
import IssueCertificate from "./pages/IssueCertificate";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyCertificate from "./pages/VerifyCertificate";
import About from "./pages/About";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

// Protects routes that require authentication
function ProtectedRoute({ isAuthenticated, loading, children }) {
  if (loading) return null; // or a loader component
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Prevents logged-in users from visiting login/register
function PublicRoute({ isAuthenticated, loading, children }) {
  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function AnimatedRoutes({ isAuthenticated, setIsAuthenticated, loading }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop /> 
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <AnimatedPage>
              <HomePage />
            </AnimatedPage>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
              <AnimatedPage>
                <Login onAuthSuccess={() => setIsAuthenticated(true)} />
              </AnimatedPage>
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
              <AnimatedPage>
                <Register onAuthSuccess={() => setIsAuthenticated(true)} />
              </AnimatedPage>
            </PublicRoute>
          }
        />

        <Route
          path="/about"
          element={
            <AnimatedPage>
              <About />
            </AnimatedPage>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <AnimatedPage>
                <Dashboard />
              </AnimatedPage>
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue-certificate"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <AnimatedPage>
                <IssueCertificate />
              </AnimatedPage>
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify-certificate"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <AnimatedPage>
                <VerifyCertificate />
              </AnimatedPage>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Global logout listener
  useEffect(() => {
    const handleLogout = () => setIsAuthenticated(false);
    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative">
        <StarBackground />
        <div className="relative z-10">
          <Header
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <main>
            <AnimatedRoutes
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              loading={loading}
            />
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
