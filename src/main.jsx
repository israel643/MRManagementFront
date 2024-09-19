import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import './assets/css/index.css'
import router from './routes/main-routes.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
