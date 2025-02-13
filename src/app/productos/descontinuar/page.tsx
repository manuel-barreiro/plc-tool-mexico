import { SearchProduct } from "@/components/productos/search-product"
import { PackageX } from "lucide-react"

export default function EditProductPage() {
  return (
    <div className="container mx-auto w-full py-5">
      <div className="mb-6 flex items-center gap-2">
        <PackageX size={20} />
        <h1 className="text-2xl font-bold">Descontinuar Producto Existente</h1>
      </div>
      <SearchProduct />
    </div>
  )
}
