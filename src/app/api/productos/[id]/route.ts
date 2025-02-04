import { NextResponse } from "next/server"
import { Product } from "@/types/product"

const products: Product[] = [
  {
    id: "1",
    status: 1,
    año_mes: "2025-01",
    descripcion_sap: "MAGGI Ju Sznd+C&B CP 14(125+160)g MX",
    nombre_lean: "Pareja Perfecta",
    sap: 12343743,
    division: "Culinarios",
    marca: "Sazonadores Líquidos",
    tipo_actividad: "In&Out",
    clasificacion: "Ofertas Armadas",
    nps: 10800000,
    apo: 14636.59139,
    ton: 58.4,
    rolling: 47,
    tonxrolling: 11.4,
    days_120: 1,
    days_90: 1,
    days_60: 1,
    days_30: 1,
  },
  {
    id: "2",
    status: 1,
    año_mes: "2025-01",
    descripcion_sap: "CARLOS V Chocolate MP 24(18x18g)PR36g+MX",
    nombre_lean: "Carlos V - Jirafa Suizo + Suizo",
    sap: 12398633,
    division: "Impulso",
    marca: "Carlos V",
    tipo_actividad: "In&Out",
    clasificacion: "Jirafas",
    nps: 71093732,
    apo: 15432.09877,
    ton: 224726.508,
    rolling: 36,
    tonxrolling: 224690.508,
    days_120: 1,
    days_90: 1,
    days_60: 1,
    days_30: 1,
  },
  {
    id: "3",
    status: 1,
    año_mes: "2025-01",
    descripcion_sap: "NIDO Deslactosada Lata 6x1.92kgPR320g+MX",
    nombre_lean: "NIDO Deslactosada 1.92kg",
    sap: 12450012,
    division: "Nido Fortificada",
    marca: "Nido Fortificada",
    tipo_actividad: "In&Out",
    clasificacion: "Jirafas",
    nps: 15,
    apo: 8593.749999,
    ton: 99,
    rolling: 37,
    tonxrolling: 62,
    days_120: 1,
    days_90: 1,
    days_60: 1,
    days_30: 1,
  },
  {
    id: "4",
    status: 1,
    año_mes: "2025-01",
    descripcion_sap: "CARNATION Polvo Doypack24x520gPR60g+N1MX",
    nombre_lean: "Carnation jirafa 520g",
    sap: 12462744,
    division: "Lácteos Culinarios",
    marca: "Carnation",
    tipo_actividad: "In&Out",
    clasificacion: "Jirafas",
    nps: 3389,
    apo: 2608.999961,
    ton: 29,
    rolling: 29,
    tonxrolling: 0,
    days_120: 1,
    days_90: 1,
    days_60: 0,
    days_30: 0,
  },
  {
    id: "5",
    status: 1,
    año_mes: "2025-01",
    descripcion_sap: "CONSOMATE Caldo Pollo TomP1(24x105g)N2MX",
    nombre_lean: "Consomate 8+2",
    sap: 12512846,
    division: "Culinarios",
    marca: "Consomate",
    tipo_actividad: "In&Out",
    clasificacion: "Ofertas Armadas",
    nps: 4800000,
    apo: 8283.73016,
    ton: 16.7,
    rolling: 17,
    tonxrolling: -0.3,
    days_120: 1,
    days_90: 1,
    days_60: 0,
    days_30: 0,
  },
  {
    id: "6",
    status: 1,
    año_mes: "2025-01",
    descripcion_sap: "NESCAFÉ prueba",
    nombre_lean: "NESCAFÉ 8+2",
    sap: 12512156,
    division: "Café",
    marca: "Consomate",
    tipo_actividad: "In&Out",
    clasificacion: "Ofertas Armadas",
    nps: 4800000,
    apo: 8283.73016,
    ton: 16.7,
    rolling: 17,
    tonxrolling: -0.3,
    days_120: 1,
    days_90: 1,
    days_60: 1,
    days_30: 0,
  },
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.sap.toString() === params.id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const productIndex = products.findIndex((p) => p.sap.toString() === params.id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Update product (replace with your database logic)
  products[productIndex] = { ...products[productIndex], ...body }

  return NextResponse.json(products[productIndex])
}
