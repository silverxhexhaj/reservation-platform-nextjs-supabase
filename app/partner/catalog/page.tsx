import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Catalog() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Total Products</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">56</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Total Services</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-gray-900">23</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">Best Selling Item</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-xl font-semibold text-gray-900">Haircut</p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product and Service List</h2>
          <p className="text-gray-700">Catalog management interface goes here.</p>
        </div>
      </div>
    </div>
  );
}