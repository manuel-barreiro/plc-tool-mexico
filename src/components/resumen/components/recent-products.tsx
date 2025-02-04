import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { productData } from "@/components/resumen/data/data"
import { CheckpointStatus } from "@/types/product"

export function RecentProducts() {
  return (
    <div className="space-y-8">
      {productData.recentProducts.map((product) => (
        <div key={product.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {product.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              SAP: {product.sapNumber}
            </p>
          </div>
          <div className="ml-auto">
            <Badge variant={getStatusVariant(product.status)}>
              {product.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusVariant(
  status: CheckpointStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default"
    case "in_progress":
      return "default"
    case "pending":
      return "secondary"
    case "blocked":
      return "destructive"
    default:
      return "default"
  }
}
