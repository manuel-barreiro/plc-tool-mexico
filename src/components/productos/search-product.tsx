"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductForm } from "@/components/productos/product-form"
import { Product } from "@/types/product"

export function SearchProduct() {
  const [product, setProduct] = useState<Product | null>(null)
  const [sapKey, setSapKey] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!sapKey) {
      setError("Please enter a valid SAP key")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Replace with your API call
      const response = await fetch(`/api/productos/${sapKey}`)
      if (!response.ok) {
        throw new Error("Product not found")
      }

      const data = await response.json()
      setProduct(data)
    } catch (err) {
      setError("Product not found. Please check the SAP key.")
      setProduct(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Ingrese clave SAP"
          value={sapKey}
          onChange={(e) => setSapKey(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar Producto"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {product && (
        <ProductForm initialData={product} onSuccess={() => setProduct(null)} />
      )}
    </div>
  )
}
