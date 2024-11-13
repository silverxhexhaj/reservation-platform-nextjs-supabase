"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ServiceCard } from "./service-card"
import { Service } from "@/types"

interface ServicesModalProps {
  services: Service[]
}

export function ServicesModal({ services }: ServicesModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-full min-h-[220px]">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-semibold">Others</span>
            <span className="text-sm text-muted-foreground">
              View {services.length} more services
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Services</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 