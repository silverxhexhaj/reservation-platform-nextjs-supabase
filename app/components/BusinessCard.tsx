"use client"

import Link from 'next/link';
import Image from 'next/image'
import { Business } from "@/app/models/supabase.models"
import { Heart, Crown, Percent, Sparkles, Star, Users, MapPin } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent} from "./ui/card"
import { motion } from 'framer-motion';
import { useState } from 'react';
import { itemVariants } from '../models/transitionEffects.models';


function isNewBusiness(createdAt: Date): boolean {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdAt > thirtyDaysAgo;
}


interface BusinessCardProps {
    business: Business
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault(); 
        setIsSaved(!isSaved);
    };

    return (
        <motion.div variants={itemVariants}>
            <Link
                href={`/pages/private/business/dashboard/${business.id}`}
                className="group block h-full"
            >
                <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg border ${business.is_premium ? 'border-amber-200 hover:border-amber-300' : 'border-gray-100 hover:border-gray-200'
                    }`}>
                    <div className="aspect-[4/3] overflow-hidden relative border-b border-gray-100">
                        <Image
                            src={business.cover_picture ?? ''}
                            alt={business.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 z-10">
                            <Badge
                                variant="secondary"
                                onClick={handleSave}
                                className={`w-6 h-6 rounded-full p-0 justify-center bg-white/40 hover:bg-white/80 backdrop-blur-sm font-medium text-xs flex items-center cursor-pointer transition-colors ${isSaved ? 'text-rose-600' : 'text-neutral-900 hover:text-rose-600'
                                    }`}
                            >
                                <Heart className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
                            </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 z-10">
                            <Badge
                                variant="secondary"
                                className="bg-white/90 backdrop-blur-sm text-neutral-900 border-neutral-200/50 font-medium text-xs flex items-center px-2 py-1"
                            >
                                {business.category}
                            </Badge>
                        </div>
                        <div className="absolute bottom-3 right-3 z-10 flex flex-row gap-2">
                            {isNewBusiness(new Date(business.created_at)) && (
                                <Badge
                                    variant="secondary"
                                    className="bg-emerald-100/90 backdrop-blur-sm text-emerald-800 border-emerald-200/50 font-medium text-xs flex items-center gap-1"
                                >
                                    <Sparkles className="w-3 h-3" /> New
                                </Badge>
                            )}
                            {!business.is_premium && (
                                <Badge
                                    variant="secondary"
                                    className="w-6 h-6 rounded-full px-1 justify-center bg-blue-100/90 backdrop-blur-sm text-blue-800 border-blue-200/50 font-medium text-xs flex items-center"
                                >
                                    <Percent className="w-3 h-3" />
                                </Badge>
                            )}
                            {business.is_premium && (
                                <Badge
                                    variant="secondary"
                                    className="w-6 h-6 rounded-full px-1 justify-center bg-amber-100/90 backdrop-blur-sm text-amber-800 border-amber-200/50 font-medium text-xs flex items-center"
                                >
                                    <Crown className="w-3 h-3" />
                                </Badge>
                            )}
                        </div>
                    </div>

                    <CardContent className={`p-3 ${business.is_premium ? 'bg-gradient-to-b from-amber-50/50 to-transparent' : ''}`}>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <h3 className="text-sm md:text-base font-semibold line-clamp-1">
                                    {business.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center space-x-1 text-neutral-500 max-w-[200px]">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                        <span className="text-xs truncate">{business.location?.city}</span>
                                    </div>
                                </div>
                                <p className="text-xs md:text-sm text-neutral-500 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-[1.25rem] md:leading-[1.5rem]">
                                    {business.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-medium text-neutral-900">
                                        {business.rating?.toFixed(1) ?? '0.0'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1 text-neutral-500">
                                    <Users className="w-3 h-3" />
                                    <span className="text-xs">{business.review_count ?? 0}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-0.5">
                                {Array.from({length: business?.price_range ?? 1}).map((_, index) => (
                                    <span
                                        key={index}
                                        className={`text-[10px] font-medium ${business.is_premium ? 'text-amber-600' : 'text-neutral-900'
                                            }`}
                                    >
                                        $
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}   