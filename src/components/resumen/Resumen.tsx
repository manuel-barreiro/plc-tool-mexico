import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductStats } from "@/components/resumen/components/product-stats"
import { RecentProducts } from "@/components/resumen/components/recent-products"
import { ResumenChart } from "./components/resumen-chart"

export default function Resumen() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <ProductStats />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ResumenChart />
        </div>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProducts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
