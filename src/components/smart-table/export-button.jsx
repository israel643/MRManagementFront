import React from "react"
import styles from "./smart-table.module.css"

function ExportButton({ data }) {
  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(",")
    const csv = [headers, ...data.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "exported_data.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <button onClick={exportToCSV} className={styles.exportButton}>
      Exportar a CSV
    </button>
  )
}

export default ExportButton

