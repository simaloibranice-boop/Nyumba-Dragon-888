import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


/* =========================
   AUTH
========================= */

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/auth/ProtectedRoute";


/* =========================
   PUBLIC
========================= */

import Home from "./pages/Home";
import PublicProfessionalProfile from "./pages/PublicProfessionalProfile";
import Professionals from "./pages/Professionals";
import PublicPages from "./pages/PublicPages";


/* =========================
   MAIN PLATFORM
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
import TechnicianWallet from "./pages/TechnicianWallet";


/* =========================
   ADMIN
========================= */

import AdminDashboard from "./pages/AdminDashboard";


export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =====================================
                    PUBLIC — HOME ONLY
                ===================================== */}

                <Route
                    path="/"
                    element={<Home />}
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
                    PROTECTED PUBLIC PLATFORM
                    LOGIN / REGISTER REQUIRED
                ===================================== */}

                <Route
                    path="/professionals"
                    element={
                        <ProtectedRoute>
                            <Professionals />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/professionals/:slug"
                    element={
                        <ProtectedRoute>
                            <PublicProfessionalProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/how-it-works"
                    element={
                        <ProtectedRoute>
                            <PublicPages page="/how-it-works" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <PublicPages page="/about" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/careers"
                    element={
                        <ProtectedRoute>
                            <PublicPages page="/careers" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/partners"
                    element={
                        <ProtectedRoute>
                            <PublicPages page="/partners" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <ProtectedRoute>
                            <PublicPages page="/contact" />
                        </ProtectedRoute>
                    }
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
                    PROTECTED PLATFORM
                ===================================== */}

                <Route
                    path="/services"
                    element={
                        <ProtectedRoute>
                            <Services />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/services/:slug"
                    element={
                        <ProtectedRoute>
                            <ServiceDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/company"
                    element={
                        <ProtectedRoute>
                            <Company />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/solutions"
                    element={
                        <ProtectedRoute>
                            <Solutions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/investors"
                    element={
                        <ProtectedRoute>
                            <Investors />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    CLIENT
                ===================================== */}

                <Route
                    path="/client/dashboard"
                    element={
                        <ProtectedRoute>
                            <ClientDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/client/requests"
                    element={
                        <ProtectedRoute>
                            <ClientRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/client/requests/new"
                    element={
                        <ProtectedRoute>
                            <NewServiceRequest />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/client/requests/:id"
                    element={
                        <ProtectedRoute>
                            <ClientRequestDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/client/profile"
                    element={
                        <ProtectedRoute>
                            <ClientProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/client/settings"
                    element={
                        <ProtectedRoute>
                            <ClientSettings />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    TECHNICIAN
                ===================================== */}

                <Route
                    path="/technician/dashboard"
                    element={
                        <ProtectedRoute>
                            <TechnicianDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technician/jobs"
                    element={
                        <ProtectedRoute>
                            <TechnicianJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technician/earnings"
                    element={
                        <ProtectedRoute>
                            <TechnicianEarnings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technician/wallet"
                    element={
                        <ProtectedRoute>
                            <TechnicianWallet />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technician/analytics"
                    element={
                        <ProtectedRoute>
                            <TechnicianAnalytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technician/profile"
                    element={
                        <ProtectedRoute>
                            <TechnicianProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/technician/settings"
                    element={
                        <ProtectedRoute>
                            <TechnicianSettings />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    ADMIN
                ===================================== */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    UNKNOWN ROUTES
                ===================================== */}

                <Route
                    path="*"
                    element={<Home />}
                />

            </Routes>

        </BrowserRouter>
    );
}
