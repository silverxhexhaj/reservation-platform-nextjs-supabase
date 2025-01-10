import { StarIcon, ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { format } from "date-fns";

interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  replies: number;
  service?: string;
  staffMember?: string;
}

interface ReviewsProps {
  businessId: string;
  reviews?: Review[];
}

export function Reviews({ businessId, reviews: propReviews }: ReviewsProps) {
  // Mock reviews for demo purposes
  const defaultReviews: Review[] = [
    {
      id: "1",
      userName: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing experience! The staff was professional and friendly. I'm definitely coming back for more services.",
      date: "2024-01-15",
      likes: 12,
      replies: 2,
      service: "Premium Haircut",
      staffMember: "Emma Styles"
    },
    {
      id: "2",
      userName: "Michael Chen",
      rating: 4,
      comment: "Great service overall. The atmosphere was relaxing and the results exceeded my expectations. Only minor point was the wait time.",
      date: "2024-01-10",
      likes: 8,
      replies: 1,
      service: "Beard Trim",
      staffMember: "James Clipper"
    },
    {
      id: "3",
      userName: "Emily Wilson",
      rating: 5,
      comment: "Top-notch service! The attention to detail was impressive. The staff really knows what they're doing.",
      date: "2024-01-05",
      likes: 15,
      replies: 3,
      service: "Color Treatment",
      staffMember: "Liam Cuts"
    }
  ];

  const reviews = propReviews || defaultReviews;

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-semibold text-gray-900">4.8</span>
          </div>
          <span className="text-gray-500">• 128 reviews</span>
        </div>
        <Button variant="outline" className="font-medium">
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-100 rounded-xl p-6 space-y-4 hover:border-gray-200 transition-colors duration-200">
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {review.userImage ? (
                    <Image
                      src={review.userImage}
                      alt={review.userName}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-gray-600">
                      {review.userName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{review.userName}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating ? "text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      • {format(new Date(review.date), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                •••
              </Button>
            </div>

            {/* Service and Staff Member */}
            {(review.service || review.staffMember) && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {review.service && (
                  <>
                    <span className="font-medium text-gray-700">{review.service}</span>
                    {review.staffMember && <span>•</span>}
                  </>
                )}
                {review.staffMember && (
                  <span>with <span className="font-medium text-gray-700">{review.staffMember}</span></span>
                )}
              </div>
            )}

            {/* Review Content */}
            <p className="text-gray-600 leading-relaxed">{review.comment}</p>

            {/* Review Actions */}
            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {review.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                {review.replies}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="font-medium">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
} 