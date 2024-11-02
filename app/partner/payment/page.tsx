'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, CreditCard, Calendar } from 'lucide-react';

export default function Payment() {
  const [payoutMethod, setPayoutMethod] = useState('bank_transfer');
  const [bankAccount, setBankAccount] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  const handleSavePaymentSettings = () => {
    console.log('Saving payment settings:', { payoutMethod, bankAccount, paypalEmail });
    // Here you would typically send this data to your backend
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Payment Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$15,234.56</div>
            <p className="text-sm text-gray-600">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Pending Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$2,345.67</div>
            <p className="text-sm text-gray-600">To be paid on 15th</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Last Payout</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$1,234.56</div>
            <p className="text-sm text-gray-600">Paid on 1st May</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Payment Settings</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Payment Settings</CardTitle>
              <CardDescription className="text-gray-600">Manage your payout preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSavePaymentSettings(); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payout-method" className="text-gray-700">Payout Method</Label>
                  <Select value={payoutMethod} onValueChange={setPayoutMethod}>
                    <SelectTrigger id="payout-method">
                      <SelectValue placeholder="Select payout method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {payoutMethod === 'bank_transfer' && (
                  <div className="space-y-2">
                    <Label htmlFor="bank-account" className="text-gray-700">Bank Account Number</Label>
                    <Input
                      id="bank-account"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="Enter your bank account number"
                    />
                  </div>
                )}
                {payoutMethod === 'paypal' && (
                  <div className="space-y-2">
                    <Label htmlFor="paypal-email" className="text-gray-700">PayPal Email</Label>
                    <Input
                      id="paypal-email"
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="Enter your PayPal email"
                    />
                  </div>
                )}
                <Button type="submit">Save Payment Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-600">Your recent financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { date: '2023-05-01', amount: 1234.56, type: 'Payout' },
                  { date: '2023-04-30', amount: 567.89, type: 'Booking' },
                  { date: '2023-04-29', amount: 234.56, type: 'Booking' },
                ].map((transaction, index) => (
                  <li key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.type}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <p className={`font-bold ${transaction.type === 'Payout' ? 'text-red-700' : 'text-green-700'}`}>
                      {transaction.type === 'Payout' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}