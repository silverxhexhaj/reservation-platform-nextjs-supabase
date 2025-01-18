'use client'

import { StarIcon, ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { format } from "date-fns";
import { fetchBusinessReviews } from "@/app/service/review/review.service";
import { TotalReviews } from "@/app/models/functions/reviews.models";
import { useEffect, useState } from "react";

interface ReviewsProps {
  businessId: string;
}

export function Reviews({ businessId }: ReviewsProps) {
  
  const [reviews, setReviews] = useState<TotalReviews | null>(null);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await fetchBusinessReviews(businessId, page, 25);
      setReviews(reviews);
    };
    fetchReviews();
  }, [businessId, page]);

  
  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-semibold text-gray-900">{reviews?.average_rating}</span>
          </div>
          <span className="text-gray-500">• {reviews?.total_reviews} reviews</span>
        </div>
        <Button variant="outline" className="font-medium">
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.reviews?.map((review) => (
          <div key={review.id} className="border border-gray-100 rounded-xl p-6 space-y-4 hover:border-gray-200 transition-colors duration-200">
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {review.user.profile_picture ? (
                    <Image
                      src={review.user.profile_picture}
                      alt={review.user.first_name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-gray-600">
                      {review.user.first_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{review.user.first_name} {review.user.last_name}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating ? "text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      • {format(new Date(review.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {(reviews?.total_pages ?? 1) > page && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="font-medium" onClick={() => setPage(page + 1)}>
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
} 