import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const userRoles = Array.isArray(auth?.role) ? auth.role : [auth?.role];
    const hasAccess = userRoles.some(role => allowedRoles?.includes(role));

    return (
        auth?.role ? (
            hasAccess ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
}

export default RequireAuth;
