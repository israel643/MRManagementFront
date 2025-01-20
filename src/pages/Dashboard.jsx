import React from "react";
import CardDashboard from "../components/Cards/cardDashboard";
import "../assets/css/cards/card_dashboard.css";
import Header from "../components/Header/header";

import { ChevronDown, ChevronUp, DollarSign } from "lucide-react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { fetchData } from "../utilities/fetchData";

const Dash = () => {
//   const { data: salesData, loading, error } = useCustomFetch(fetchData, ["/products/10"]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  const salesArray = [salesData]; 

  console.log(salesArray);

  const infoCard = salesArray.map((sale) => ({
    title: sale.title || "Sin título",
    body: sale.total || "No disponible",
    footer: sale.footer || "Sin información adicional",
    icon_up_down: sale.icon_up_down === "up" ? ChevronUp : ChevronDown,
    icon: DollarSign,
  }));

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Bienvenido de nuevo, aquí está el resumen de la semana."
      />
      <div className="d-flex justify-content-around flex-wrap my-4">
        {infoCard.map((item, index) => (
          <CardDashboard
            key={index}
            title={item.title}
            body={item.body}
            icon_up_down={item.icon_up_down}
            footer={item.footer}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dash;
