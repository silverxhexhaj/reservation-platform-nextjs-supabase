import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Search } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { AnimatedGradient } from "@/app/components/gradient/AnimatedGradient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import { categoryToIcon } from "@/data";
import { BusinessCategory } from "@/app/models/supabase.models";

// Static data for deals
const DEALS = [
  {
    id: 1,
    title: "Summer Special Massage",
    description: "60-minute relaxation massage with aromatherapy",
    originalPrice: 120,
    discountedPrice: 89,
    discount: 25,
    category: "Wellness",
    business: {
      name: "Zen Spa & Wellness",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 2,
    title: "Haircut & Style Package",
    description: "Professional haircut, wash, and styling",
    originalPrice: 85,
    discountedPrice: 59,
    discount: 30,
    category: "Hair",
    business: {
      name: "Elite Hair Studio",
      rating: 4.9,
      reviews: 243,
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 3,
    title: "Dental Cleaning Special",
    description: "Complete dental cleaning and check-up",
    originalPrice: 200,
    discountedPrice: 149,
    discount: 25,
    category: "Dental",
    business: {
      name: "Bright Smile Dental",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=60"
    }
  }
];

// Categories with their respective icons
const CATEGORIES = [
  { name: "All", icon: categoryToIcon.wellness_centre },
  { name: "Wellness", icon: categoryToIcon.spa },
  { name: "Hair", icon: categoryToIcon.hair_salon },
  { name: "Dental", icon: categoryToIcon.dental_clinic },
  { name: "Fitness", icon: categoryToIcon.gym_and_fitness },
  { name: "Beauty", icon: categoryToIcon.beauty_salon }
];

export default function DealsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative">
          {/* Hero Section with Gradient */}
          <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
            <AnimatedGradient />
            <div className="text-center z-10 space-y-4 text-white">
              <h1 className="text-4xl font-bold">Exclusive Deals</h1>
              <p className="max-w-xl mx-auto">
                Discover amazing offers from top-rated local businesses. Save big on your favorite services.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-screen-2xl mx-auto p-6 relative z-10 bg-background">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide space-x-4">
              {CATEGORIES.map((category) => (
                <div key={category.name} className="flex-shrink-0">
                  <Button
                    variant="outline"
                    className="w-[120px] h-[80px] flex flex-col items-center justify-center p-2 space-y-2 transition-all duration-300 hover:scale-105 border bg-white"
                  >
                    <CategoryIcon icon={category.icon} className="w-5 h-5" />
                    <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
                      {category.name}
                    </span>
                  </Button>
                </div>
              ))}
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {DEALS.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48 w-full">
                    <img
                      src={deal.business.image}
                      alt={deal.business.name}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive" className="text-sm">
                        {deal.discount}% OFF
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div>
                          <Badge variant="outline" className="">
                            {deal.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{deal.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {deal.business.name}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${deal.discountedPrice}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ${deal.originalPrice}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>⭐ {deal.business.rating}</span>
                      <span>•</span>
                      <span>{deal.business.reviews} reviews</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 