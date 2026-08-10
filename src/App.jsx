import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

/* =========================
   PUBLIC PAGES
========================= */

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* =========================
   AUTHENTICATED WEBSITE
========================= */

import Company from "./pages/Company";
import Solutions from "./pages/Solutions";
import Investors from "./pages/Investors";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";

/* =========================
   CLIENT
========================= */

import ClientDashboard from "./pages/ClientDashboard";
import ClientRequests from "./pages/ClientRequests";
import NewServiceRequest from "./pages/NewServiceRequest";
import ClientRequestDetails from "./pages/ClientRequestDetails";
import ClientProfile from "./pages/ClientProfile";
import ClientSettings from "./pages/ClientSettings";

/* =========================
   TECHNICIAN
========================= */

import TechnicianDashboard from "./pages/TechnicianDashboard";
import TechnicianJobs from "./pages/TechnicianJobs";
import TechnicianEarnings from "./pages/TechnicianEarnings";
import TechnicianAnalytics from "./pages/TechnicianAnalytics";
import TechnicianProfile from "./pages/TechnicianProfile";
import TechnicianSettings from "./pages/TechnicianSettings";

/* =========================
   ADMIN
========================= */

import AdminDashboard from "./pages/AdminDashboard";


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================
            PUBLIC
            Only these pages are visible
            before authentication.
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================
            PROTECTED APPLICATION
        ===================================== */}

        <Route element={<ProtectedRoute />}>

          {/* WEBSITE */}

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/services/:slug"
            element={<ServiceDetails />}
          />

          <Route
            path="/company"
            element={<Company />}
          />

          <Route
            path="/solutions"
            element={<Solutions />}
          />

          <Route
            path="/investors"
            element={<Investors />}
          />


          {/* CLIENT */}

          <Route
            path="/client/dashboard"
            element={<ClientDashboard />}
          />

          <Route
            path="/client/requests"
            element={<ClientRequests />}
          />

          <Route
            path="/client/requests/new"
            element={<NewServiceRequest />}
          />

          <Route
            path="/client/requests/:id"
            element={<ClientRequestDetails />}
          />

          <Route
            path="/client/profile"
            element={<ClientProfile />}
          />

          <Route
            path="/client/settings"
            element={<ClientSettings />}
          />


          {/* TECHNICIAN */}

          <Route
            path="/technician/dashboard"
            element={<TechnicianDashboard />}
          />

          <Route
            path="/technician/jobs"
            element={<TechnicianJobs />}
          />

          <Route
            path="/technician/earnings"
            element={<TechnicianEarnings />}
          />

          <Route
            path="/technician/analytics"
            element={<TechnicianAnalytics />}
          />

          <Route
            path="/technician/profile"
            element={<TechnicianProfile />}
          />

          <Route
            path="/technician/settings"
            element={<TechnicianSettings />}
          />


          {/* ADMIN */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

        </Route>


        {/* =====================================
            FALLBACK
        ===================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}
