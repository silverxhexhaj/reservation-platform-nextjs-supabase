"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useState, useEffect } from "react";
import { DealItem } from "../models/functions/searchDeals.model";
import Link from "next/link";

interface CountdownTimerProps {
  expiresAt: Date;
}

// Components
function CountdownTimer({ expiresAt }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = expiresAt.getTime() - now;

      if (distance < 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const formatUnit = (value: number, unit: string) => 
        `${value} ${unit}${value !== 1 ? 's' : ''}`;

      if (days > 0) {
        setTimeLeft(`${formatUnit(days, 'day')}${hours > 0 ? `, ${formatUnit(hours, 'hour')}` : ''}`);
      } else if (hours > 0) {
        setTimeLeft(`${formatUnit(hours, 'hour')}${minutes > 0 ? `, ${formatUnit(minutes, 'minute')}` : ''}`);
      } else if (minutes > 0) {
        setTimeLeft(formatUnit(minutes, 'minute'));
      } else {
        setTimeLeft('Less than a minute');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <Badge 
      variant="outline" 
      className="absolute right-3 bottom-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400/20 font-medium text-xs px-2 py-1 shadow-lg shadow-red-500/20 backdrop-blur-sm"
    >
      {timeLeft}
    </Badge>
  );
}

export function DealCard({ deal }: { deal: DealItem }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48 w-full">
        <img
          src={deal.business.image_url}
          alt={deal.business.name}
          className="object-cover w-full h-full rounded-t-lg"
        />
        <div className="absolute bottom-3 left-3 z-10">
          <Badge 
            variant="outline" 
            className="rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-white/90 backdrop-blur-sm text-neutral-900 border-neutral-200/50 font-medium text-xs flex items-center px-2 py-1"
          >
            {deal.sub_category.name}
          </Badge>
        </div>
        <CountdownTimer expiresAt={new Date(deal.deal.end_date)} />
      </div>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{deal.deal.title}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {deal.business.name}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⭐ {deal.business.rating}</span>
                  <span>•</span>
                <span>{deal.business.rating} reviews</span>
              </div>  
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ul className="space-y-1.5 mb-4">
          {deal.deal.description}
        </ul>
      </CardContent>
      <CardFooter className="p-0 py-2">
        <Link href={`/pages/public/explore/${deal.business.id}?offer=${deal.deal.id}`} className="w-full">
          <Button 
            className="w-full text-base font-semibold border-t border-gray-100 rounded-none"
            size="lg"
          >
            <span className="font-normal pr-1">Book for</span> ${deal.deal.price}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 