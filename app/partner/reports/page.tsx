import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Revenue This Month</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">$12,345.67</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">New Clients This Month</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">45</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Avg. Service Duration</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">45 min</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Revenue by Service</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">Chart or table showing revenue breakdown by service goes here.</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Client Retention Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">Chart showing client retention rate over time goes here.</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-700">Custom Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700">Interface for generating custom reports goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}