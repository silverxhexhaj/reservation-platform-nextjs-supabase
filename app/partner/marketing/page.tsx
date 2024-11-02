import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Marketing() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">3</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Email Subscribers</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Avg. Open Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">22.5%</p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Manager</h2>
          <p className="text-gray-700">Marketing campaign creation and management interface goes here.</p>
        </div>
      </div>
    </div>
  );
}