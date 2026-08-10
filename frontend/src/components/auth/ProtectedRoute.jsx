import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                        Loading Nyũmba Dragon 888...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return children;
}
