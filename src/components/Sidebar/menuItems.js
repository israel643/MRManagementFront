import {
    LayoutDashboard,
    Users,
    Boxes,
    PackageSearch,
    Handshake,
    ChartLine,
    BookUser,
    Wallet,
    PackageOpen
} from 'lucide-react';
  
export const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      id: "inventary",
      title: "Inventario",
      icon: Boxes,
      submenu: [
        {
          id: "products",
          title: "Productos",
          icon: PackageSearch,
          path: "/productos",
          permissionView: "products_read",
        },
        {
          id: "adjustment",
          title: "Ajustes",
          icon: PackageOpen,
          path: "/ajustes",
          permissionView: "adjustment_read",
        },
      ],
    },
    {
      id: "provider",
      title: "Proveedores",
      icon: Handshake,
      submenu: [
        {
          id: "resumenProviders",
          title: "Resumen",
          icon: ChartLine,
          path: "/productos",
        },
        {
          id: "directoryProviders",
          title: "Directorio",
          icon: BookUser,
          path: "/productos",
        },
      ],
    },
    {
      id: "clients",
      title: "Clientes",
      icon: Users,
    },
    {
      id: "sales",
      title: "Ventas",
      icon: Wallet,
    },
  ];
  