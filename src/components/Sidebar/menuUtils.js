
export const filterMenuByPermissions = (menu, permissions) => {
    
    if (!permissions || permissions.length === 0) {
        return [];
    }

    const modules = permissions[0].modulos ? permissions[0].modulos.split(",").map(m => m.trim()) : [];
    const permisos_exits = permissions[0].permisos ? permissions[0].permisos.split(",").map(p => p.trim()) : [];

    return menu.filter((item) => {
        // Verificar si el módulo o permiso del menú está en los permisos permitidos
        const mainItemMatch =
            modules.includes(item.id) ||
            (item.permissionView && permisos_exits.includes(item.permissionView));

        if (item.submenu) {
            const filteredSubmenu = item.submenu.filter(
                (subItem) =>
                    modules.includes(subItem.id) || // Verificar módulo del submenú
                    (subItem.permissionView && permisos_exits.includes(subItem.permissionView)) // O permiso del submenú
            );

            return filteredSubmenu.length > 0 || mainItemMatch;
        }
        return mainItemMatch;

    }).map(item => {
        if (item.submenu) {
            return {
                ...item,
                submenu: item.submenu.filter(
                    (subItem) =>
                        modules.includes(subItem.id) ||
                        (subItem.permissionView && permisos_exits.includes(subItem.permissionView))
                )
            };
        }
        return item;
    });
};