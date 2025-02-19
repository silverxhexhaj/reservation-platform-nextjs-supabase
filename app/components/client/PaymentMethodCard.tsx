import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CreditCard, Trash2 } from "lucide-react";

interface PaymentMethodCardProps {
    id?: string;
    cardType?: string;
    lastFourDigits?: string;
    expiryDate?: string;
    isEmpty?: boolean;
    onDelete?: (id: string) => void;
}

export function PaymentMethodCard({
    id,
    cardType = "Visa",
    lastFourDigits,
    expiryDate,
    isEmpty = false,
    onDelete
}: PaymentMethodCardProps) {
    if (isEmpty) {
        return (
            <Card className="mb-4 border border-dashed border-gray-200 bg-gray-50">
                <CardContent className="p-6 flex items-center justify-center">
                    <p className="text-gray-500 text-center">No payment methods added yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-4 hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {cardType} •••• {lastFourDigits}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Expires {expiryDate}
                            </p>
                        </div>
                    </div>
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => id && onDelete(id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 