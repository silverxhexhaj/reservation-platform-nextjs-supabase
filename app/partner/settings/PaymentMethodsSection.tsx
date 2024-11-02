import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const paymentMethodsFields = [
  { id: 'credit-card', label: 'Credit Card', type: 'checkbox' },
  { id: 'paypal', label: 'PayPal', type: 'checkbox' },
  { id: 'bank-transfer', label: 'Bank Transfer', type: 'checkbox' },
  { id: 'stripe-account', label: 'Stripe Account ID', type: 'input' },
  { id: 'paypal-email', label: 'PayPal Email', type: 'input' },
  { id: 'bank-account', label: 'Bank Account Number', type: 'input' },
];

export function PaymentMethodsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Payment Methods</CardTitle>
        <CardDescription className="text-gray-700">Manage your accepted payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Accepted Payment Types</h3>
          <div className="space-y-2">
            {paymentMethodsFields.filter(field => field.type === 'checkbox').map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={field.id}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor={field.id} className="text-gray-700">{field.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment Account Details</h3>
          <div className="space-y-4">
            {paymentMethodsFields.filter(field => field.type === 'input').map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id} className="text-gray-700 block mb-1">{field.label}</Label>
                <Input 
                  id={field.id} 
                  placeholder={`Enter ${field.label}`} 
                  className="text-gray-900 w-full md:w-2/3"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}