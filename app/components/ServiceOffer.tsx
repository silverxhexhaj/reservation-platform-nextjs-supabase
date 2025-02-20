"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { Offer } from "../models/functions/businessDetails.model";

interface ServiceOfferProps {
  offer: Offer;
  selected_offer_id: string;
  onBook?: () => void;
}

export function ServiceOffer({
  offer,
  onBook,
  selected_offer_id,
}: ServiceOfferProps) {

  const formatDate = (date: string) => {
    const parts = date.split('-');
    if (parts.length !== 3) return date;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <Card className={`overflow-hidden group ${selected_offer_id === offer.id ? 'border-2 border-black' : ''}`}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={offer?.image_url ?? ''}
          alt={offer?.name ?? ''}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-600">
              ${offer?.price ?? 0}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{offer?.name ?? ''}</h3>
        <p className="text-gray-600 mb-6">{offer?.description ?? ''}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Valid until {formatDate(offer?.end_date ?? '')}
          </div>
          <Button onClick={onBook} className={`${selected_offer_id === offer.id ? 'bg-black text-white' : ''}`}>
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
} 