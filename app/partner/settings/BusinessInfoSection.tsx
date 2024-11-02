import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const businessInfoFields = [
  { id: 'business-name', label: 'Business name', type: 'input' },
  { id: 'country', label: 'Country', type: 'select', options: [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]},
  { id: 'currency', label: 'Currency', type: 'select', options: [
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
    { value: 'gbp', label: 'GBP' },
  ]},
  { id: 'tax-calculation', label: 'Tax calculation', type: 'select', options: [
    { value: 'inclusive', label: 'Tax Inclusive' },
    { value: 'exclusive', label: 'Tax Exclusive' },
  ]},
  { id: 'team-language', label: 'Team default language', type: 'select', options: [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
  ]},
  { id: 'client-language', label: 'Client default language', type: 'select', options: [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
  ]},
];

export function BusinessInfoSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Business Info</CardTitle>
        <CardDescription className="text-gray-700">Manage your business information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {businessInfoFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id} className="text-gray-800">{field.label}</Label>
            {field.type === 'input' ? (
              <Input id={field.id} placeholder={`Enter ${field.label.toLowerCase()}`} className="text-gray-900" />
            ) : (
              <Select>
                <SelectTrigger id={field.id} className="text-gray-900">
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}