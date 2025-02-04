import { z } from "zod"

export const productFormSchema = z.object({
  año_mes: z.string().regex(/^\d{4}-\d{2}$/, "Must be in YYYY-MM format"),
  descripcion_sap: z.string().min(5, "Minimum 5 characters").max(100),
  nombre_lean: z.string().min(3, "Minimum 3 characters").max(50),
  sap: z.number().int().positive("Must be a positive number"),
  division: z.string().min(3, "Minimum 3 characters"),
  marca: z.string().min(2, "Minimum 2 characters"),
  tipo_actividad: z.enum(["Linea", "In&Out", "Innovaciones"]),
  clasificacion: z.string().min(3, "Minimum 3 characters"),
  nps: z.number().min(0, "Cannot be negative"),
  apo: z.number().min(0, "Cannot be negative"),
  ton: z.number().min(0, "Cannot be negative"),
  rolling: z.number().min(0, "Cannot be negative"),
  tonxrolling: z.number().min(0, "Cannot be negative"),
})
