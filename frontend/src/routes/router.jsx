import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/LandingPage.jsx";
import Comparador from "../pages/Comparador.jsx";
import Layout from "../pages/Layout.js";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Comparador />,
    }
])