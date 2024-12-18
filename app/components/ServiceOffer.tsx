"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { BusinessOffer } from "@/data";

interface ServiceOfferProps extends Omit<BusinessOffer, 'businessId'> {
  onBook?: () => void;
}

export function ServiceOffer({
  title,
  description,
  originalPrice,
  discountedPrice,
  discountPercentage,
  validUntil,
  imageUrl,
  category,
  onBook,
}: ServiceOfferProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
            <span className="text-lg font-bold text-red-600">
              ${discountedPrice}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100">
            {discountPercentage}% OFF
          </Badge>
          <Badge variant="outline">
            {category}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Valid until {formatDate(validUntil)}
          </div>
          <Button onClick={onBook}>
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
} 