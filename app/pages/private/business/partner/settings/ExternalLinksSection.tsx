import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

const externalLinksFields = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn' },
];

export function ExternalLinksSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">External Links</CardTitle>
        <CardDescription className="text-gray-700">Manage your social media links</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {externalLinksFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id} className="text-gray-800">{field.label}</Label>
            <Input id={field.id} placeholder={`Enter ${field.label} URL`} className="text-gray-900" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}