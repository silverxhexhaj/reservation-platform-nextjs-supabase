"use client"

import Link from "next/link"
import { formatDate } from "@fullcalendar/core/index.js"
import { Button } from "./ui/button"
import Image from "next/image"
import { BusinessSummary } from "@/app/models/functions/businessSummary.model"
import { DealSummary } from "@/app/models/functions/homePageBusinesses.models"
import { Star } from "lucide-react"

interface OfferCardProps {
    offer: DealSummary,
    business: BusinessSummary
}

export function OfferCard({ offer, business }: OfferCardProps) {
    return <>
        <Link
            href={`/pages/public/explore/${business.id}?offer=${offer.id}`}
            key={offer.id}
            className="group block"
        >
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                {/* Image and Discount Badge */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                        src={offer.image_url}
                        alt={offer.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {business && (
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex justify-between">
                                <p className="text-sm font-medium text-gray-900">{business.name}</p>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-gray-600">{business.review_average}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 min-h-[2.5rem] line-clamp-2">
                        {offer.description}
                    </p>

                    {/* Price and CTA */}
                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <p className="text-xl font-bold text-gray-900">${offer.price}</p>
                        </div>
                        <Button
                            variant="outline"
                            className="text-sm border-gray-200 hover:bg-gray-50"
                        >
                            Book Now
                        </Button>
                    </div>

                    {/* Valid Until */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Valid until {formatDate(offer.end_date)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    </>
}
