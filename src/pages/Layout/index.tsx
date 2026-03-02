import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Sidebar } from "../../components/SideBar";
import { useState } from "react";
import { ThemeProvider } from "../../context/ThemeContext";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleMenuClick = () => {
        setSidebarOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <ThemeProvider>
                <Header
                    onBack={handleBack}
                    onMenuClick={handleMenuClick}
                />
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="flex-1">
                    <Outlet />
                </main>

                <Footer />
            </ThemeProvider>
        </div>
    )
}

export default Layout;