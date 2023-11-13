import { Outlet, useLocation } from "react-router-dom";
import NavApp from './navbar/NavApp';
import Footer from "./footer/Footer";
import Sidebar from "./admin/Sidebar";

const Layout = () => {
    const location = useLocation();

    // Sprawdź, czy aktualna ścieżka to "/admin"
    const isAdminPath = location.pathname.startsWith("/admin");

    // Jeśli to "/admin", użyj specjalnego layoutu
    if (isAdminPath) {
        return (
            <main className="AdminLayout">
                <NavApp />
                <Sidebar />
            </main>
        );
    }

    // W przeciwnym razie, użyj standardowego layoutu
    return (
        <main className="App">
            <NavApp />
            <Outlet />
            <Footer />
        </main>
    );
}

export default Layout;
