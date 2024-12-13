"use client"

import { Service } from "@/lib/services"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ServiceCard } from "@/components/service-card"

interface ServicesModalProps {
  services: Service[]
}

export function ServicesModal({ services }: ServicesModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-full min-h-[200px] w-full">
          View {services.length} more services
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>All Services</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 