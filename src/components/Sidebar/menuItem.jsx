import React from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const MenuItem = ({ item, isSubItem, isOpen, toggleSubMenu, isCollapsed, setActiveItem, activeItem }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isActive = activeItem === item.id;
    const navigate = useNavigate(); // Usa el hook useNavigate

    const handleClick = () => {
        setActiveItem(item.id);
        if (hasSubmenu) {
            toggleSubMenu(item.id);
        } else if (item.path) {
            navigate(item.path); // Redirige al path especificado en el item
        }
    };

    return (
        <>
            <button
                onClick={handleClick} // Usa la función handleClick
                className={`btn w-100 d-flex align-items-center py-2 rounded mb-1
                        ${isActive
                        ? 'bg-danger bg-opacity-10 text-danger border-danger'
                        : 'text-secondary hover-danger'}
                        ${isCollapsed ? "justify-content-center" : "justify-content-start"}
                        ${isSubItem ? "fs-sm" : ""}`}
            >
                <span className={`${isActive ? 'text-danger' : 'text-secondary'} 
            flex-shrink-0`}>{<item.icon size={20} />}</span>
                {!isCollapsed && (
                    <>
                        <span className="ms-3 fw-medium flex-grow-1 text-start">{item.title}</span>
                        {hasSubmenu && <ChevronDown size={16} className={`transition ${isOpen ? 'toggle-icon--rotated' : ''} 
                     ${isActive ? 'text-danger' : 'text-secondary'}`} />}
                    </>
                )}
            </button>

            {hasSubmenu && isOpen && !isCollapsed && (
                <div className="submenu ms-4 border-start border-light my-1">
                    {item.submenu.map((subItem) => (
                        <MenuItem
                            key={subItem.id}
                            item={subItem}
                            isSubItem={true}
                            isCollapsed={isCollapsed}
                            toggleSubMenu={toggleSubMenu}
                            isOpen={false}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default MenuItem;