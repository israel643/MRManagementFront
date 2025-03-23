import React, { useState } from "react";
import { useSmartTable } from "@/hooks/useSmartTable";
import Pagination from "./pagination";
import ExportButton from "./export-button";
import styles from "./smart-table.module.css";
import { Trash2, Edit } from "lucide-react";

function SmartTable({ data, actions }) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    currentItems,
    sortConfig,
    currentPage,
    itemsPerPage,
    totalPages,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
  } = useSmartTable(data, searchTerm);

  if (!data || data.length === 0) {
    return <div>No existe información</div>;
  }

  const getSortIcon = (key) => {
    if (!sortConfig) {
      return "⇅";
    }
    return sortConfig.key === key
      ? sortConfig.direction === "ascending"
        ? "↑"
        : "↓"
      : "⇅";
  };

  const dataKeys = Object.keys(data[0] || {});

  return (
    <div className={styles.container}>
      <div className={styles.tableControls}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <ExportButton data={data} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {dataKeys.map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className={styles.tableHeader}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <span className={styles.sortIcon}>{getSortIcon(key)}</span>
              </th>
            ))}
            {/* Columna de acciones */}
            {actions && actions.length > 0 && (
              <th key="actions" className={styles.tableHeader}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {dataKeys.map((key) => (
                <td key={`${key}-${index}`}>{item[key]}</td>
              ))}
              {/* Botones de acción con íconos */}
              {actions && actions.length > 0 && (
                <td className={styles.actionsCell}>
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.handler(item)}
                      className={styles.actionButton}
                      title={action.label}
                    >
                      {action.icon === "edit" && <Edit size={16} />}
                      {action.icon === "delete" && <Trash2 size={16} />}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

export default SmartTable;