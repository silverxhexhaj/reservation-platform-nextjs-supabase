"use client"

import { Service } from "@/lib/services"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

interface ServiceCardProps {
  service: Service
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