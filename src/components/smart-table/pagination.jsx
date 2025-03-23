import React from "react"
import styles from "./smart-table.module.css"

function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
  return (
    <div className={styles.pagination}>
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Anterior
        </button>
        <span className="mx-2">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Siguiente
        </button>
      </div>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className={`${styles.itemsPerPageSelect} px-2`}

      >
        {[5, 10, 20, 50].map((value) => (
          <option key={value} value={value} className={styles.perPage}>
            {value} por página
          </option>
        ))}
      </select>
    </div>
  )
}

export default Pagination

