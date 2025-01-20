import React, { useState } from "react";
import { menuItems } from "./menuItems";
import { filterMenuByPermissions } from "./menuUtils";
import MenuItem from "./menuItem";

const SidebarMenu = ({ permissions, isCollapsed }) => {
    const [openSubMenus, setOpenSubMenus] = useState([]);
    const [activeItem, setActiveItem] = useState("dashboard");

    const toggleSubMenu = (itemId) => {
        setOpenSubMenus((prev) =>
            prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
        );
    };

    const filteredMenu = filterMenuByPermissions(menuItems, permissions);

    return (
        <nav className="mt-4 px-3 overflow-hidden">
            {filteredMenu.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    isCollapsed={isCollapsed}
                    isOpen={openSubMenus.includes(item.id)}
                    toggleSubMenu={toggleSubMenu}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            ))}
        </nav>
    );
};

export default SidebarMenu;
