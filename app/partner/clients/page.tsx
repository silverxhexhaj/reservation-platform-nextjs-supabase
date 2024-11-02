import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Clients() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Total Clients</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">New Clients This Month</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">78</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Returning Clients</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">65%</p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Client List</h2>
          <p className="text-gray-700">Client management interface goes here.</p>
        </div>
      </div>
    </div>
  );
}