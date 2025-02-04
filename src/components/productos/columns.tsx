import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { Product } from "@/types/product" // Adjust the import path as needed

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "status",
    size: 10,
    header: "Status",
    cell: ({ row }) => {
      const days = [
        row.original.days_120,
        row.original.days_90,
        row.original.days_60,
        row.original.days_30,
      ]
      const allComplete = days.every((day) => day === 1)

      return (
        <Badge
          className={`flex items-center justify-center rounded-full transition-colors duration-200 ${
            allComplete
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {allComplete ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <X className="h-4 w-4 text-white" />
          )}
        </Badge>
      )
    },
  },
  {
    accessorKey: "año_mes",
    header: "Año - Mes",
  },
  {
    accessorKey: "descripcion_sap",
    header: "Descripción SAP",
  },
  {
    accessorKey: "nombre_lean",
    header: "Nombre Lean",
  },
  {
    accessorKey: "sap",
    header: "SAP",
  },
  {
    accessorKey: "division",
    header: "División",
  },
  {
    accessorKey: "marca",
    header: "Marca",
  },
  {
    accessorKey: "tipo_actividad",
    header: "Tipo de Actividad",
  },
  {
    accessorKey: "clasificacion",
    header: "Clasificación",
  },
  {
    accessorKey: "nps",
    header: "NPS",
  },
  {
    accessorKey: "apo",
    header: "Nº APO",
  },
  {
    accessorKey: "ton",
    header: "TON",
  },
  {
    accessorKey: "rolling",
    header: "Nº Rolling",
  },
  {
    accessorKey: "tonxrolling",
    header: "TON x Rolling",
  },
  {
    accessorKey: "days_120",
    size: 10,

    header: "120 Days",
    cell: ({ row }) => (
      <Badge
        className={`flex items-center justify-center px-2 py-1 transition-colors duration-200 ${
          row.getValue("days_120")
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {row.getValue("days_120") ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <X className="h-4 w-4 text-white" />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "days_90",
    size: 10,

    header: "90 Days",
    cell: ({ row }) => (
      <Badge
        className={`flex items-center justify-center px-2 py-1 transition-colors duration-200 ${
          row.getValue("days_90")
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {row.getValue("days_90") ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <X className="h-4 w-4 text-white" />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "days_60",
    size: 10,

    header: "60 Days",
    cell: ({ row }) => (
      <Badge
        className={`flex items-center justify-center px-2 py-1 transition-colors duration-200 ${
          row.getValue("days_60")
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {row.getValue("days_60") ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <X className="h-4 w-4 text-white" />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "days_30",
    size: 10,

    header: "30 Days",
    cell: ({ row }) => (
      <Badge
        className={`flex items-center justify-center px-2 py-1 transition-colors duration-200 ${
          row.getValue("days_30")
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {row.getValue("days_30") ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <X className="h-4 w-4 text-white" />
        )}
      </Badge>
    ),
  },
]
