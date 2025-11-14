import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Dashboards
import AdminDashboardLayout from "./layout/AdminDasboardLayout";
import CandidateDashboardLayout from "./layout/CandidateDashboardLayout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboardLayout />   {/* ✅ FIXED */}
              </ProtectedRoute>
            }
          />

          {/* User dashboard */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["USER", "STUDENT"]}>
                <CandidateDashboardLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
