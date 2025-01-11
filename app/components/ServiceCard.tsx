"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { SelectedService } from "@/app/models/custom.models"

interface ServiceCardProps {
  service: SelectedService
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{service.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            ${service.price}
          </p>
          <Button variant="outline" size="sm">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 