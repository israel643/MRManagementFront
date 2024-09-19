import { createBrowserRouter } from "react-router-dom";
import App from "../pages/Inicio";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path:"/saludo",
        element: "Hola isra"
    }
]);

export default router;