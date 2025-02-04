export type ProductType = "Linea" | "InAndOut"

export type CheckpointStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "blocked"

export type TimelineCheckpoint = {
  days: 120 | 90 | 60 | 30
  status: CheckpointStatus
  tasks: {
    id: string
    name: string
    completed: boolean
    dueDate: Date
  }[]
}

export type Product = {
  id: string
  sapNumber: string
  name: string
  type: ProductType
  classification: string
  nps: number
  apo: string
  status: CheckpointStatus
  timeline: TimelineCheckpoint[]
  createdAt: Date
  updatedAt: Date
}

export type UserRole = "admin" | "manager" | "viewer"
