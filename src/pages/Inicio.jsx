import React, { useState, useEffect } from "react";
import { AuthProvider } from "../context/authContext";
import Sidebar from "../components/Sidebar/sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AuthProvider>
      <div className="d-flex flex-column">
        <div className={`d-flex ${isMobile ? "" : "position-relative"}`}>
          {/* Sidebar */}
          <Sidebar
            isExpanded={isExpanded}
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
          />

          {/* Contenido principal */}
          <main
            className={`bg-light flex-grow-1 ${
              isMobile ? "" : isExpanded ? "main-expanded" : "main-collapsed"
            }`}
          >
            {/* toggleSidebar y el estado del Sidebar*/}
            <Outlet context={{ toggleSidebar, isMobile, isExpanded }} />
          </main>

          {/* Overlay para dispositivos móviles */}
          {isMobile && isExpanded && (
            <div
              className="sidebar-overlay"
              onClick={toggleSidebar}
            ></div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
