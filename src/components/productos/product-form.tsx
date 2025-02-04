"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productFormSchema } from "@/schemas/product"
import { Product } from "@/types/product"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  initialData?: Product
  onSuccess?: () => void
}

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData
      ? {
          año_mes: initialData.año_mes,
          descripcion_sap: initialData.descripcion_sap,
          nombre_lean: initialData.nombre_lean,
          sap: initialData.sap,
          division: initialData.division,
          marca: initialData.marca,
          tipo_actividad: initialData.tipo_actividad,
          clasificacion: initialData.clasificacion,
          nps: initialData.nps,
          apo: initialData.apo,
          ton: initialData.ton,
          rolling: initialData.rolling,
          tonxrolling: initialData.tonxrolling,
        }
      : {
          año_mes: "",
          descripcion_sap: "",
          nombre_lean: "",
          sap: undefined,
          division: "",
          marca: "",
          tipo_actividad: "Linea",
          clasificacion: "",
          nps: undefined,
          apo: undefined,
          ton: undefined,
          rolling: undefined,
          tonxrolling: undefined,
        },
  })

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    try {
      const url = initialData
        ? `/api/productos/${initialData.id}` // Update existing product
        : "/api/productos" // Create new product

      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to save product")
      }

      toast({
        title: "Success!",
        description: initialData
          ? "Product updated successfully."
          : "Product created successfully.",
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          {initialData ? "" : "Registrar Producto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <FormField
                control={form.control}
                name="año_mes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Launch Date (YYYY-MM)</FormLabel>
                    <FormControl>
                      <Input placeholder="2025-01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimated launch month and year
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo_actividad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Linea">Linea (Long-term)</SelectItem>
                        <SelectItem value="In&Out">In & Out</SelectItem>
                        <SelectItem value="Innovaciones">Innovation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SAP Information */}
              <FormField
                control={form.control}
                name="sap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SAP Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="12345678"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descripcion_sap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SAP Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Branding Section */}
              <FormField
                control={form.control}
                name="nombre_lean"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lean Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Marketing name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Numeric Metrics */}
              <FormField
                control={form.control}
                name="nps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPS</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>APO Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Fields */}
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="Division name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clasificacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classification</FormLabel>
                    <FormControl>
                      <Input placeholder="Product category..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TON Metrics */}
              <FormField
                control={form.control}
                name="ton"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TON</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rolling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rolling Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tonxrolling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TON x Rolling</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">Crear Producto</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
