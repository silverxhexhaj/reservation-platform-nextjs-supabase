export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration?: number // in minutes
  categoryId?: string
  businessId?: string
  createdAt?: Date
  updatedAt?: Date
}

// Example services data (optional, can be removed if not needed)
export const services: Service[] = [
  {
    id: "1",
    name: "Basic Haircut",
    description: "A classic haircut service including wash and style",
    price: 30,
    duration: 30,
  },
  {
    id: "2",
    name: "Deluxe Massage",
    description: "60-minute full body massage with aromatherapy",
    price: 80,
    duration: 60,
  },
] 