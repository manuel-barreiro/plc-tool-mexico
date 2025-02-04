import { utils, writeFile } from "xlsx"

// Helper function to convert date object to string format
const formatDateForExcel = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("es", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Helper function to prepare data for Excel export
const prepareDataForExcel = (table: any) => {
  const headers = table
    .getHeaderGroups()[0]
    .headers.map((header: any) => header.column.columnDef.header)

  const rows = table.getFilteredRowModel().rows.map((row: any) => {
    return row.getAllCells().map((cell: any) => {
      // Get raw value for the cell
      const value = cell.getValue()

      // If it's a date column (checking if the column id is not 'name')
      if (cell.column.id !== "name" && typeof value === "number") {
        return value // Keep numbers as is for Excel
      }

      // For name column, combine name and ID
      if (cell.column.id === "name") {
        const name = value
        const id = row.original.id
        return `${name} (ID: ${id})`
      }

      return value
    })
  })

  return [headers, ...rows]
}

export const exportToExcel = (
  table: any,
  fileName: string = "table-export"
) => {
  const data = prepareDataForExcel(table)

  // Create workbook and worksheet
  const ws = utils.aoa_to_sheet(data)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, "Data")

  // Auto-size columns
  const colWidths = data[0].map((header: any, index: number) => {
    const maxWidth = data.reduce((w: number, r: any) => {
      const value = r[index]?.toString() || ""
      return Math.max(w, value.length)
    }, header.toString().length)
    return { wch: maxWidth + 2 } // Add padding
  })
  ws["!cols"] = colWidths

  // Export file
  writeFile(wb, `${fileName}.xlsx`)
}
