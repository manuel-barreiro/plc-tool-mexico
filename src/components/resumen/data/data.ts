import type { CheckpointStatus } from "@/types/product"

// Unified data for all components
export const productData = {
  totalProducts: 123,
  activeProducts: 45,
  completedProducts: 23,
  blockedProducts: 15,
  recentProducts: [
    {
      id: "1",
      name: "Product A",
      sapNumber: "SAP-001",
      status: "in_progress" as CheckpointStatus,
    },
    {
      id: "2",
      name: "Product B",
      sapNumber: "SAP-002",
      status: "completed" as CheckpointStatus,
    },
    {
      id: "3",
      name: "Product C",
      sapNumber: "SAP-003",
      status: "pending" as CheckpointStatus,
    },
    {
      id: "4",
      name: "Product D",
      sapNumber: "SAP-004",
      status: "blocked" as CheckpointStatus,
    },
  ],
  lifecycleProgress: [
    { month: "January", inProgress: 15, completed: 5 },
    { month: "February", inProgress: 20, completed: 8 },
    { month: "March", inProgress: 18, completed: 10 },
    { month: "April", inProgress: 22, completed: 12 },
    { month: "May", inProgress: 25, completed: 15 },
    { month: "June", inProgress: 30, completed: 18 },
  ],
}
