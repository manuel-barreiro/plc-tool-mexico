export interface Product {
  id: string
  status: number
  año_mes: string
  descripcion_sap: string
  nombre_lean: string
  sap: number
  division: string
  marca: string
  tipo_actividad: "Linea" | "In&Out" | "Innovaciones"
  clasificacion: string
  nps: number
  apo: number
  ton: number
  rolling: number
  tonxrolling: number
  days_120: number
  days_90: number
  days_60: number
  days_30: number
}
