import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* =========================
   PUBLIC PAGES
========================= */

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Company from "./pages/Company";
import Solutions from "./pages/Solutions";
import Investors from "./pages/Investors";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";


/* =========================
   CLIENT PAGES
========================= */

import ClientDashboard from "./pages/ClientDashboard";
import ClientRequests from "./pages/ClientRequests";
import NewServiceRequest from "./pages/NewServiceRequest";
import ClientRequestDetails from "./pages/ClientRequestDetails";
import ClientProfile from "./pages/ClientProfile";
import ClientSettings from "./pages/ClientSettings";


/* =========================
   TECHNICIAN PAGES
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
            MAIN WEBSITE
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

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


        {/* =====================================
            AUTHENTICATION
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================
            CLIENT DASHBOARD
        ===================================== */}

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


        {/* =====================================
            TECHNICIAN DASHBOARD
        ===================================== */}

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


        {/* =====================================
            ADMIN
        ===================================== */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />


        {/* =====================================
            FALLBACK
        ===================================== */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>

  );

}
