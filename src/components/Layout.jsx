import { Outlet } from "react-router-dom";
import NavApp from './navbar/NavApp';
import Footer from "./footer/Footer";

const Layout = () => {
    return (
        <main className="App">
            <NavApp />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout;