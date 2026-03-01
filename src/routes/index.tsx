import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Inicio } from "../pages/Inicio";
import { Cartoes } from "../pages/Cartoes";
import { Armarios } from "../pages/Armarios";
import { Etiquetas } from "../pages/Etiquetas";
import { ExibirCard } from "../components/ExibirCard";

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
                <Route path="/cartoes/:id" element={<ExibirCard/>}/>
            </Route>
        </Routes>
    )
}