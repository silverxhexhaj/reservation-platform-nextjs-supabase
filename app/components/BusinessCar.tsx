"use client"

import Link from 'next/link';
import Image from 'next/image'
import { Business } from "@/app/models/supabase.models"
import { Star } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardTitle } from "./ui/card"

interface BusinessCardProps {
    business: Business
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    return <>
        <Link
            href={`/pages/private/business/dashboard/${business.id}`}
            key={business.id}
            className="group block h-full"
        >
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-gray-200">
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative border-b border-gray-100">
                    <Image
                        src={business.profile_picture ?? ''}
                        alt={business.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge
                            variant="secondary"
                            className="bg-white/90 backdrop-blur-sm text-neutral-900 font-medium border border-gray-100/50"
                        >
                            {business.category}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <CardContent className="p-4 flex flex-col justify-between h-[calc(100%-60%)]">
                    {/* Business Info */}
                    <div className="space-y-2 flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-1">
                            {business.name}
                        </CardTitle>
                        <p className="text-sm text-neutral-600 min-h-[2.5rem] line-clamp-2">
                            {business.description}
                        </p>
                    </div>

                    {/* Rating and Price */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-neutral-900">
                                {business?.rating?.toFixed(1) ?? 0}
                            </span>
                        </div>

                        {/* Price Range */}
                        <div className="flex items-center space-x-0.5">
                            {Array.from((business?.price_range ?? 1)).map((_, index) => (
                                <span
                                    key={index}
                                    className="text-sm font-medium text-neutral-900"
                                >
                                    $
                                </span>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    </>
}   