import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "../pages/Home";
import { Cards } from "../pages/Cards";

export const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/cartoes" element={<Cards />} />
            </Route>
        </Routes>
    )
}