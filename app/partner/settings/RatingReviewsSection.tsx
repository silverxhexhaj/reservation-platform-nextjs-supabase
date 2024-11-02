import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RatingReviewsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">Rating & Reviews</CardTitle>
        <CardDescription className="text-gray-700">Manage your rating and review settings here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800">Configure review display options, response templates, and other rating-related settings here.</p>
      </CardContent>
    </Card>
  );
}