import React from "react";
import { AuthProvider } from "../context/authContext";
import Sidebar from "../components/Sidebar/sidebar";

const App = () => {
  return (
    <AuthProvider>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Contenido */}
        <main style={{ marginLeft: "250px", padding: "20px" }}>
          <h1>Bienvenido a MR</h1>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;