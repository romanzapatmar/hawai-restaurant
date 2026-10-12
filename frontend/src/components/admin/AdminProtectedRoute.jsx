import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {

    const isLoggedIn =
        localStorage.getItem("admin_logged_in") === "true";

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}

export default AdminProtectedRoute;