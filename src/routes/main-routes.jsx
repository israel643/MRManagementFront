import { createBrowserRouter } from "react-router-dom";
import App from "../pages/Inicio"; // El layout principal
import Dash from "../pages/Dashboard";
import Products from "../components/Products/ProductsSection"  //Products.jsx"; //"../pages/products/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dash />,
      },
      {
        path: "saludo",
        element: <div>Hola isra</div>,
      },
      {
        path: "products",
        element: <Products/>,
      },
    ],
  },
]);

export default router;