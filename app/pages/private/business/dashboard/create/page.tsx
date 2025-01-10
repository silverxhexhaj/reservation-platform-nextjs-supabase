"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Plus, X } from 'lucide-react';

export default function CreateBusiness() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    services: [{ name: '', price: '' }],
    teamMembers: [{ name: '', role: '' }],
    openingHours: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: updatedTeamMembers }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '' }],
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '' }],
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/business/success');
  };

  return (
    <div className="min-h-screen pt-20 max-w-7xl mx-auto">
      <Header user={null} />
      <main className="space-y-8 px-8 mt-20">
        <Card className="w-full border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl text-black">Create Your Business</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Business Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your business name"
                    className="border-gray-300 focus:ring-gray-400 focus:border-gray-400 text-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700">Business Category</Label>
                  <Select name="category" onValueChange={(value) => handleSelectChange(value, 'category')}>
                    <SelectTrigger className="w-full border-gray-300 bg-white text-gray-700 focus:ring-gray-400 focus:border-gray-400">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Salon</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                      <SelectItem value="barbershop">Barbershop</SelectItem>
                      <SelectItem value="gym">Gym</SelectItem>
                      <SelectItem value="nail_salon">Nail Salon</SelectItem>
                      <SelectItem value="massage">Massage</SelectItem>
                      <SelectItem value="yoga_studio">Yoga Studio</SelectItem>
                      <SelectItem value="tattoo_parlor">Tattoo Parlor</SelectItem>
                      <SelectItem value="beauty_clinic">Beauty Clinic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">Business Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your business"
                    rows={4}
                    className="border-gray-300 focus:ring-gray-400 focus:border-gray-400 text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700">Services</Label>
                {formData.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Service name"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                      className="flex-grow border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                    />
                    <Input
                      placeholder="Price"
                      value={service.price}
                      onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                      className="w-24 border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(index)}
                      className="text-gray-500 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addService} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700">Team Members</Label>
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Team member name"
                      value={member.name}
                      onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                      className="flex-grow border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                    />
                    <Input
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                      className="flex-grow border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTeamMember(index)}
                      className="text-gray-500 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addTeamMember} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Plus className="mr-2 h-4 w-4" /> Add Team Member
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHours" className="text-gray-700">Opening Hours</Label>
                <Textarea
                  id="openingHours"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                  placeholder="Enter your opening hours"
                  rows={4}
                  className="border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your business address"
                  rows={3}
                  className="border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>

              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                Create Business
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}