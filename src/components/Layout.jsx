import { Outlet } from "react-router-dom";
import NavApp from './NavApp';
import Footer from "./Footer";

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