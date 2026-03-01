import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { Sidebar } from "../SideBar";
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

    // Não mostrar header na página inicial
    const showHeader = location.pathname !== '/';

    return (
        <>
            {showHeader && (
                <Header
                    groupName="Desenvolvedores Frontend"
                    onBack={handleBack}
                    onMenuClick={handleMenuClick}
                />
            )}
            <ThemeProvider>
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
            </ThemeProvider>


            <main className={showHeader ? '-mt-6' : ''}>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}