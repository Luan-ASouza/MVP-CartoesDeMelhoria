import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Inicio from "../pages/Inicio";
import { Loading } from "../components/Loading";
import Layout from "../pages/Layout";
import LoginPage from "../pages/Login";

/* const Layout = lazy(() => import("../components/Layout")); */
const Cartoes = lazy(() => import("../pages/Cartoes"));
const Armarios = lazy(() => import("../pages/Armarios"));
const Etiquetas = lazy(() => import("../pages/Etiquetas"));
const ConjuntoArmarios = lazy(() => import("../pages/ConjuntoArmarios"));
const isLogged = localStorage.getItem('usuario');

export const Router = () => {
  return (
    <Routes>
      {isLogged !== ''? (
        <Route path="/" element={<Inicio />} />
      ) : (
        <Route path="/" element={<LoginPage />} />
        )}

      <Route
        element={
          <Layout />
        }
      >
        <Route path="/cartoes" element={
          <Suspense fallback={<Loading />}>
            <Cartoes />
          </Suspense>
        } />
        <Route path="/etiquetas" element={
          <Suspense fallback={<Loading />}>
            <Etiquetas />
          </Suspense>
        } />
        <Route path="/armarios" element={
          <Suspense fallback={<Loading />}>
            <Armarios />
          </Suspense>
        } />
        <Route path="/armarios/:id" element={
          <Suspense fallback={<Loading />}>
            <ConjuntoArmarios />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};