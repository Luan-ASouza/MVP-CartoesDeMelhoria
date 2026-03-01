import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Inicio } from "../pages/Inicio";
import { Cartoes } from "../pages/Cartoes";
import { Armarios } from "../pages/Armarios";
import { Etiquetas } from "../pages/Etiquetas";

export const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}>
                <Route index element={<Inicio />} />
                <Route path="/cartoes" element={<Cartoes />} />
                <Route path="/etiquetas" element={<Etiquetas />} />
                <Route path="/armarios" element={<Armarios />} />
            </Route>
        </Routes>
    )
}