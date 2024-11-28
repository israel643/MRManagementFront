import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import SidebarMenu from "./SidebarMenu";
import  '../../assets/css/sidebar.css'
import { ChevronRight, LogOut } from "lucide-react";

const Sidebar = () => {
  const { permissions, loading } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (loading) return <div>Loading...</div>;

  return (
    //<div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
    <div
      className={`sidebar vh-100 transition position-relative bg-white border-end shadow
        ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} `}
    >
      <button onClick={() => setIsCollapsed(!isCollapsed)}className="toggle-button" >
        <ChevronRight
          size={16}
          className={` toggle-icon text-danger 
            ${isCollapsed ? '' : 'toggle-icon--rotated'}`
          }
        />
      </button>
      {/* Logo area */}
      <div className="p-4 overflow-hidden h-auto d-flex align-items-center border-bottom">
       <div className={` px-1 bg-danger rounded-3 d-flex align-items-center justify-content-center shadow `}>
           <span className="text-white fw-bold fs-5">MR</span>
        </div>
        {!isCollapsed && (
          <span className="ms-3 fw-bold fs-4 text-dark">Managment</span>
        )}
       </div>
      <SidebarMenu permissions={permissions} isCollapsed={isCollapsed} />

      {/* Bottom section */}
      <div className="position-absolute bottom-0 w-100 p-3 border-top bg-white">
        <div className={`overflow-hidden d-flex ${isCollapsed ? 'justify-content-center' : 'justify-content-start'} 
            align-items-center p-3 rounded-3 user-profile`}>
            <div className="cut-rol d-flex align-items-center justify-content-center 
                bg-danger bg-opacity-10 rounded-3 px-2"
            >
                <span className="text-danger fw-medium">AD</span>
            </div>
            {!isCollapsed && (
                <div className="ms-3">
                    <p className="text-dark fw-medium mb-0">Admin Demo</p>
                    <p className="text-muted small mb-0">admin@demo.com</p>
                </div>
            )}
            {!isCollapsed && (
                <LogOut size={18} className="ms-auto text-secondary" />
            )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
