import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnlineBooking() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Online Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">342</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Booking Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">78%</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Most Booked Service</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-xl font-semibold text-gray-900">Massage</p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Settings</h2>
          <p className="text-gray-700">Online booking configuration options go here.</p>
        </div>
      </div>
    </div>
  );
}