'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useToast } from "@/app/components/ui/use-toast";
import { CreditCard } from 'lucide-react';
import { PaymentMethodCard } from '@/app/components/client/PaymentMethodCard';

// Mock data for payment methods
const mockPaymentMethods = [
    {
        id: '1',
        cardType: 'Visa',
        lastFourDigits: '4242',
        expiryDate: '12/25',
    },
    {
        id: '2',
        cardType: 'Mastercard',
        lastFourDigits: '8888',
        expiryDate: '06/24',
    },
];

export default function WalletPage() {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
    const { toast } = useToast();

    const handleDeleteCard = (id: string) => {
        setPaymentMethods(prev => prev.filter(card => card.id !== id));
        toast({
            title: "Card removed",
            description: "The payment method has been successfully removed.",
        });
    };

    const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // In a real application, you would send this to your payment processor
        const newCard = {
            id: Date.now().toString(),
            cardType: 'Visa', // This would normally be determined by the card number
            lastFourDigits: formData.get('cardNumber')?.toString().slice(-4) || '0000',
            expiryDate: `${formData.get('expiryMonth')}/${formData.get('expiryYear')}`,
        };

        setPaymentMethods(prev => [...prev, newCard]);
        setIsAddingCard(false);
        toast({
            title: "Card added",
            description: "Your new payment method has been successfully added.",
        });
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Wallet</h1>
                    <p className="text-gray-500 mt-1">Manage your payment methods</p>
                </div>
                <Button 
                    onClick={() => setIsAddingCard(true)}
                    className="shadow-sm hover:shadow-md transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Add Payment Method
                </Button>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-4">
                {paymentMethods.length > 0 ? (
                    paymentMethods.map((method) => (
                        <PaymentMethodCard
                            key={method.id}
                            {...method}
                            onDelete={handleDeleteCard}
                        />
                    ))
                ) : (
                    <PaymentMethodCard isEmpty />
                )}
            </div>

            {/* Add Card Dialog */}
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader className="border-b border-gray-100 pb-4">
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            Add Payment Method
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Enter your card details securely to add a new payment method.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddCard} className="py-6">
                        <div className="grid gap-6">
                            {/* Card Information Section */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                                        Card Number
                                    </Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="cardNumber"
                                            name="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            required
                                            maxLength={19}
                                            className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryMonth" className="text-sm font-medium text-gray-700">
                                            Month
                                        </Label>
                                        <Input
                                            id="expiryMonth"
                                            name="expiryMonth"
                                            placeholder="MM"
                                            required
                                            maxLength={2}
                                            className="border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryYear" className="text-sm font-medium text-gray-700">
                                            Year
                                        </Label>
                                        <Input
                                            id="expiryYear"
                                            name="expiryYear"
                                            placeholder="YY"
                                            required
                                            maxLength={2}
                                            className="border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">
                                            CVC
                                        </Label>
                                        <Input
                                            id="cvc"
                                            name="cvc"
                                            placeholder="123"
                                            required
                                            maxLength={4}
                                            className="border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="mt-8 border-t border-gray-100 pt-6">
                            <DialogClose asChild>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    className="border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button 
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Add Card
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
} 