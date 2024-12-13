import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

const locationFields = [
  { id: 'address', label: 'Address' },
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State/Province' },
  { id: 'postal-code', label: 'Postal Code' },
];

export function LocationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Location</CardTitle>
        <CardDescription className="text-gray-700">Manage your business location details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {locationFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id} className="text-gray-800">{field.label}</Label>
            <Input id={field.id} placeholder={`Enter ${field.label.toLowerCase()}`} className="text-gray-900" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}