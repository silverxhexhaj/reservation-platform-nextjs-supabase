"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { StarIcon, CheckCircle, PlusCircle, X, Clock, AlertCircle, Camera, ChevronDown, Shuffle } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { businesses, businessOffers } from '@/data/mock';
import { format } from 'date-fns';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import Image from 'next/image';
import { ImageGalleryModal } from "@/app/components/ImageGalleryModal";
import { ServiceOffer } from "@/app/components/ServiceOffer";
import { BusinessOffer } from '@/data';
import { Stories } from './components/Stories';

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  galleryImages: string[];
}

interface Service {
  name: string;
  price: number;
}

interface ServiceCategory {
  name: string;
  services: Service[];
}

interface CategoryServices {
  [key: string]: ServiceCategory[];
}

const categoryServices: CategoryServices = {
  "Hair Salon": [
    {
      name: "Haircuts",
      services: [
        { name: "Women's Haircut", price: 50 },
        { name: "Men's Haircut", price: 35 },
        { name: "Children's Haircut", price: 25 },
      ]
    },
    {
      name: "Coloring",
      services: [
        { name: "Full Color", price: 80 },
        { name: "Highlights", price: 100 },
        { name: "Balayage", price: 150 },
      ]
    },
    {
      name: "Styling",
      services: [
        { name: "Blowout", price: 40 },
        { name: "Updo", price: 65 },
        { name: "Hair Extensions", price: 200 },
      ]
    }
  ],
  "Nail Salon": [
    {
      name: "Manicures",
      services: [
        { name: "Basic Manicure", price: 30 },
        { name: "Gel Manicure", price: 45 },
        { name: "Nail Art", price: 20 },
      ]
    },
    {
      name: "Pedicures",
      services: [
        { name: "Basic Pedicure", price: 40 },
        { name: "Spa Pedicure", price: 55 },
        { name: "Gel Pedicure", price: 60 },
      ]
    }
  ],
  "Waxing Salon": [
    {
      name: "Facial Waxing",
      services: [
        { name: "Eyebrow Wax", price: 15 },
        { name: "Upper Lip Wax", price: 10 },
        { name: "Full Face Wax", price: 40 },
      ]
    },
    {
      name: "Body Waxing",
      services: [
        { name: "Leg Wax", price: 50 },
        { name: "Brazilian Wax", price: 60 },
        { name: "Full Body Wax", price: 150 },
      ]
    }
  ],
  "Beauty Salon": [
    {
      name: "Facial Treatments",
      services: [
        { name: "Basic Facial", price: 70 },
        { name: "Deep Cleansing Facial", price: 90 },
        { name: "Anti-Aging Facial", price: 110 },
      ]
    },
    {
      name: "Makeup Services",
      services: [
        { name: "Makeup Application", price: 60 },
        { name: "Bridal Makeup", price: 120 },
        { name: "Makeup Lesson", price: 80 },
      ]
    },
    {
      name: "Lash and Brow Services",
      services: [
        { name: "Lash Extensions", price: 100 },
        { name: "Lash Lift", price: 60 },
        { name: "Microblading", price: 200 },
      ]
    }
  ],
  "Barbershop": [
    {
      name: "Haircuts",
      services: [
        { name: "Men's Haircut", price: 30 },
        { name: "Buzz Cut", price: 20 },
        { name: "Kids Haircut", price: 25 },
      ]
    },
    {
      name: "Beard Services",
      services: [
        { name: "Beard Trim", price: 20 },
        { name: "Hot Shave", price: 35 },
        { name: "Hair & Beard Combo", price: 45 },
      ]
    }
  ],
  "Eyebrows & Lashes": [
    {
      name: "Eyebrow Services",
      services: [
        { name: "Eyebrow Threading", price: 15 },
        { name: "Eyebrow Tinting", price: 20 },
        { name: "Brow Lamination", price: 50 },
      ]
    },
    {
      name: "Lash Services",
      services: [
        { name: "Lash Lift", price: 60 },
        { name: "Lash Tint", price: 25 },
        { name: "Lash Extensions", price: 100 },
      ]
    }
  ],
  "Massage": [
    {
      name: "Massage Services",
      services: [
        { name: "Swedish Massage", price: 80 },
        { name: "Deep Tissue Massage", price: 90 },
        { name: "Hot Stone Massage", price: 100 },
        { name: "Couples Massage", price: 150 },
      ]
    }
  ],
  "Spa": [
    {
      name: "Spa Services",
      services: [
        { name: "Spa Day Package", price: 200 },
        { name: "Body Wrap", price: 90 },
        { name: "Aromatherapy Session", price: 70 },
        { name: "Hydrotherapy", price: 80 },
      ]
    }
  ],
  "Gym & Fitness": [
    {
      name: "Fitness Services",
      services: [
        { name: "Monthly Membership", price: 50 },
        { name: "Day Pass", price: 15 },
        { name: "Group Class", price: 20 },
        { name: "Personal Training Session", price: 60 },
      ]
    }
  ],
  "Personal Trainer": [
    {
      name: "Personal Training Services",
      services: [
        { name: "1-on-1 Session", price: 70 },
        { name: "Nutrition Consultation", price: 50 },
        { name: "Fitness Assessment", price: 40 },
        { name: "10-Session Package", price: 600 },
      ]
    }
  ],
  "Therapy Centre": [
    {
      name: "Therapy Services",
      services: [
        { name: "Individual Therapy", price: 100 },
        { name: "Couples Therapy", price: 130 },
        { name: "Group Therapy", price: 50 },
        { name: "Art Therapy", price: 80 },
      ]
    }
  ],
  "Tattoo & Piercing": [
    {
      name: "Tattoo & Piercing Services",
      services: [
        { name: "Small Tattoo", price: 80 },
        { name: "Large Tattoo", price: 200 },
        { name: "Ear Piercing", price: 30 },
        { name: "Body Piercing", price: 50 },
      ]
    }
  ],
  "Tanning Studio": [
    {
      name: "Tanning Services",
      services: [
        { name: "Single Session", price: 20 },
        { name: "Monthly Unlimited", price: 60 },
        { name: "Spray Tan", price: 40 },
        { name: "Tanning Lotion", price: 25 },
      ]
    }
  ],
  "Aesthetics": [
    {
      name: "Aesthetic Services",
      services: [
        { name: "Botox", price: 300 },
        { name: "Dermal Fillers", price: 400 },
        { name: "Chemical Peel", price: 150 },
        { name: "Microdermabrasion", price: 100 },
      ]
    }
  ],
  "Weight Loss": [
    {
      name: "Weight Loss Services",
      services: [
        { name: "Initial Consultation", price: 50 },
        { name: "Weekly Check-in", price: 30 },
        { name: "Meal Plan", price: 100 },
        { name: "Body Composition Analysis", price: 40 },
      ]
    }
  ],
};

interface TeamMember {
  name: string;
  profession: string;
}

interface CategoryTeam {
  [key: string]: TeamMember[];
}

const categoryTeams: CategoryTeam = {
  "Hair Salon": [
    { name: "Emma Styles", profession: "Senior Stylist" },
    { name: "Liam Cuts", profession: "Color Specialist" },
    { name: "Olivia Shears", profession: "Junior Stylist" },
  ],
  "Nail Salon": [
    { name: "Sophia Nails", profession: "Nail Technician" },
    { name: "Ava Polish", profession: "Nail Artist" },
    { name: "Mia Manicure", profession: "Pedicure Specialist" },
  ],
  "Waxing Salon": [
    { name: "Isabella Smooth", profession: "Waxing Specialist" },
    { name: "Ethan Strip", profession: "Body Waxing Expert" },
    { name: "Charlotte Gentle", profession: "Facial Waxing Specialist" },
  ],
  "Beauty Salon": [
    { name: "Amelia Glow", profession: "Makeup Artist" },
    { name: "Harper Beauty", profession: "Skincare Specialist" },
    { name: "Evelyn Lash", profession: "Lash Technician" },
  ],
  "Barbershop": [
    { name: "Noah Razor", profession: "Master Barber" },
    { name: "William Trim", profession: "Beard Specialist" },
    { name: "James Clipper", profession: "Junior Barber" },
  ],
  "Eyebrows & Lashes": [
    { name: "Sophia Arch", profession: "Brow Artist" },
    { name: "Ava Lash", profession: "Lash Extension Specialist" },
    { name: "Mia Tint", profession: "Brow and Lash Tinting Expert" },
  ],
  "Massage": [
    { name: "Oliver Knead", profession: "Massage Therapist" },
    { name: "Elijah Relax", profession: "Sports Massage Specialist" },
    { name: "Charlotte Zen", profession: "Hot Stone Massage Expert" },
  ],
  "Spa": [
    { name: "Amelia Tranquil", profession: "Spa Manager" },
    { name: "Harper Serene", profession: "Facial Specialist" },
    { name: "Abigail Calm", profession: "Body Treatment Expert" },
  ],
  "Gym & Fitness": [
    { name: "Lucas Muscle", profession: "Personal Trainer" },
    { name: "Henry Cardio", profession: "Group Fitness Instructor" },
    { name: "Evelyn Flex", profession: "Yoga Instructor" },
  ],
  "Personal Trainer": [
    { name: "Alexander Fit", profession: "Strength Coach" },
    { name: "Daniel Nutrition", profession: "Nutritionist" },
    { name: "Sophia Endurance", profession: "Cardio Specialist" },
  ],
  "Therapy Centre": [
    { name: "Benjamin Mind", profession: "Psychotherapist" },
    { name: "Emily Counsel", profession: "Marriage Counselor" },
    { name: "Michael Heal", profession: "Art Therapist" },
  ],
  "Tattoo & Piercing": [
    { name: "Liam Ink", profession: "Tattoo Artist" },
    { name: "Olivia Pierce", profession: "Body Piercing Specialist" },
    { name: "Noah Design", profession: "Custom Tattoo Designer" },
  ],
  "Tanning Studio": [
    { name: "Ava Bronze", profession: "Spray Tan Specialist" },
    { name: "Ethan Sun", profession: "Tanning Consultant" },
    { name: "Isabella Glow", profession: "Airbrush Technician" },
  ],
  "Aesthetics": [
    { name: "Sophia Botox", profession: "Aesthetic Nurse" },
    { name: "William Filler", profession: "Dermal Filler Specialist" },
    { name: "Emma Laser", profession: "Laser Treatment Expert" },
  ],
  "Weight Loss": [
    { name: "Oliver Slim", profession: "Weight Loss Consultant" },
    { name: "Charlotte Diet", profession: "Nutritionist" },
    { name: "James Active", profession: "Fitness Coach" },
  ],
};

interface BookingItem {
  name: string;
  price: number;
}

interface SelectedService extends Service {
  categoryName: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128, // Default to New York City coordinates
  lng: -74.0060
};

const mapOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }]
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e0e0e0" }]
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }]
    }
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const openingHours = [
  { day: 'Monday', hours: '9:00 - 20:00' },
  { day: 'Tuesday', hours: '9:00 - 20:00' },
  { day: 'Wednesday', hours: '9:00 - 20:00' },
  { day: 'Thursday', hours: '9:00 - 20:00' },
  { day: 'Friday', hours: '9:00 - 20:00' },
  { day: 'Saturday', hours: '10:00 - 18:00' },
  { day: 'Sunday', hours: 'Closed' },
];

function getBusinessOffers(businessId: string): BusinessOffer[] {
  return businessOffers.filter(offer => offer.businessId === businessId);
}

export default function BusinessDetailPage() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>('');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOpeningHoursOpen, setIsOpeningHoursOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isValidBookingTime, setIsValidBookingTime] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  const validateBookingTime = useCallback(() => {
    if (!selectedDate || !selectedTime) {
      setIsValidBookingTime(false);
      return;
    }

    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const dayOfWeek = selectedDateTime.getDay();
    const timeInMinutes = selectedDateTime.getHours() * 60 + selectedDateTime.getMinutes();

    const todayHours = openingHours[dayOfWeek === 0 ? 6 : dayOfWeek - 1].hours;
    if (todayHours === 'Closed') {
      setIsValidBookingTime(false);
      return;
    }

    const [openTime, closeTime] = todayHours.split(' - ').map(t => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 60 + minutes;
    });

    setIsValidBookingTime(timeInMinutes >= openTime && timeInMinutes < closeTime);
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const foundBusiness = businesses.find(b => b.id === id);
    console.log("Found business:", foundBusiness);
    setBusiness(foundBusiness || null);
  }, [id]);

  useEffect(() => {
    checkBusinessOpen();
    const interval = setInterval(checkBusinessOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    validateBookingTime();
  }, [selectedDate, selectedTime, validateBookingTime]);

  const checkBusinessOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() * 100 + now.getMinutes();

    const todayHours = openingHours[day === 0 ? 6 : day - 1].hours;
    if (todayHours === 'Closed') {
      setIsBusinessOpen(false);
      return;
    }

    const [openTime, closeTime] = todayHours.split(' - ').map(t => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 100 + minutes;
    });

    setIsBusinessOpen(time >= openTime && time < closeTime);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  if (!business) {
    return <div>Business not found</div>;
  }

  console.log("Business gallery images:", business.galleryImages);

  const businessTeam = categoryTeams[business.category] || [];

  const addToBooking = (service: Service, categoryName: string) => {
    if (!selectedServices.some(s => s.name === service.name)) {
      setSelectedServices(prev => [...prev, { ...service, categoryName }]);
      setBookingItems(prev => [...prev, { name: service.name, price: service.price }]);
    }
  };

  const removeFromBooking = (serviceName: string) => {
    setSelectedServices(prev => prev.filter(s => s.name !== serviceName));
    setBookingItems(prev => prev.filter(item => item.name !== serviceName));
  };

  const totalPrice = bookingItems.reduce((sum, item) => sum + item.price, 0);

  const handleBooking = () => {
    // Clear any existing timeout
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    let errorMessage = null;

    if (bookingItems.length === 0) {
      errorMessage = "Please select at least one service.";
    } else if (!selectedTime) {
      errorMessage = "Please select a time for your appointment.";
    } else if (!selectedTeamMember) {
      errorMessage = "Please select a team member or choose 'Random'.";
    } else if (!isValidBookingTime) {
      errorMessage = "Please select a time within the business opening hours.";
    } else {
      const bookingDate = new Date(selectedDate);
      alert(`Booking confirmed for ${business.name} on ${format(bookingDate, 'MMMM d, yyyy')} at ${selectedTime}\nTotal: $${totalPrice}\nTeam Member: ${selectedTeamMember || 'Random'}`);
    }

    setBookingError(errorMessage);

    // Clear the error message after 5 seconds
    if (errorMessage) {
      errorTimeoutRef.current = setTimeout(() => {
        setBookingError(null);
      }, 5000);
    }
  };

  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.

  const availableOffers = business ? getBusinessOffers(business.id) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-white">
          <div className="space-y-16 mb-20">
            {/* Cover Section */}
            <section className="relative h-[480px] overflow-hidden">
              <Image 
                src={business.imageUrl} 
                alt={business.name} 
                width={1920}
                height={1080}
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/70 flex items-end">
                <div className="p-8 text-white w-full max-w-screen-2xl mx-auto">
                  <h1 className="text-5xl font-bold mb-2">{business.name}</h1>
                  <p className="text-xl mb-4 opacity-90">{business.category}</p>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                        <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="text-lg font-semibold">{business.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-lg opacity-90">({business.priceRange})</span>
                    </div>
                    <div className={`flex items-center bg-white/20 rounded-full px-3 py-1 ${isBusinessOpen ? 'text-green-400' : 'text-red-400'}`}>
                      <Clock size={20} className="mr-1" />
                      <span className="text-lg font-semibold">
                        {isBusinessOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            

            <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:space-x-8 px-8'>
              <div className='flex-1 space-y-10 lg:order-first order-last'>
                {/* Add Stories section here */}
                <div className="">
                  <Stories businessId={business.id} businessName={business.name} />
                </div>
                {/* Services Section */}
                <section className="flex-1">
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6 sticky top-20 bg-white w-full">Services</h2>
                  {categoryServices[business.category]?.map((category, index) => (
                    <div key={index} className="mb-12">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">{category.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {category.services.map(service => {
                          const isSelected = selectedServices.some(s => s.name === service.name);
                          return (
                            <div 
                              key={service.name} 
                              className={`flex flex-col justify-between p-6 rounded-lg transition-all duration-300 cursor-pointer
                                ${isSelected 
                                  ? 'text-gray-800 border-2 border-black' 
                                  : 'text-gray-800 border-2 border-gray-100 hover:border-black'}`}
                              onClick={() => isSelected ? removeFromBooking(service.name) : addToBooking(service, category.name)}
                            >
                              <div>
                                <h4 className="text-lg font-semibold mb-2 truncate">{service.name}</h4>
                                <p className={`text-sm ${isSelected ? 'text-gray-800' : 'text-gray-800'}`}>
                                  {service.description || 'Professional service tailored to your needs'}
                                </p>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <span className="text-xl font-bold">${service.price}</span>
                                {isSelected ? (
                                  <CheckCircle size={24} className="text-green-400" />
                                ) : (
                                  <PlusCircle size={24} className={`text-gray-300 hover:text-black transition-colors duration-200`} />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </section>
                {/* Team Section */}
                <section className="">
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6 sticky top-20 bg-white w-full">Our Team</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <div 
                      key="random"
                      className={`flex flex-col items-center transition-colors duration-200 cursor-pointer p-4 rounded-md border-2 border-gray-100 hover:border-gray-800 ${
                        selectedTeamMember === 'Random' ? 'text-gray-800 border-2 border-gray-800' : ''
                      }`}
                      onClick={() => setSelectedTeamMember('Random')}
                    >
                      <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                        <Shuffle size={32} className="text-white" />
                      </div>
                      <p className={`text-sm font-medium text-center ${selectedTeamMember === 'Random' ? 'text-gray-800' : 'text-gray-800'}`}>
                        Random
                      </p>
                      <p className={`text-xs text-center mt-1 ${selectedTeamMember === 'Random' ? 'text-gray-800' : 'text-gray-600'}`}>
                        Any available
                      </p>
                    </div>
                    {businessTeam.map(member => (
                      <div 
                        key={member.name}
                        className={`flex flex-col items-center transition-colors duration-200 cursor-pointer p-4 rounded-md border-2 border-gray-100 hover:border-gray-800 ${
                          selectedTeamMember === member.name ? 'text-gray-800 border-2 border-gray-800' : ''
                        }`}
                        onClick={() => setSelectedTeamMember(member.name)}
                      >
                        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                          <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <p className={`text-sm font-medium text-center ${selectedTeamMember === member.name ? 'text-gray-800' : 'text-gray-800'}`}>
                          {member.name}
                        </p>
                        <p className={`text-xs text-center mt-1 text-ellipsis overflow-hidden ${selectedTeamMember === member.name ? 'text-gray-800' : 'text-gray-600'}`}>
                          {member.profession}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Only show Special Offers section if business has offers */}
                {availableOffers.length > 0 && (
                  <section className="mt-20">
                    <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6 sticky top-20 bg-white w-full">
                      Special Offers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {availableOffers.map((offer) => (
                        <ServiceOffer
                          key={offer.id}
                          {...offer}
                          onBook={() => {
                            setSelectedServices(prev => [
                              ...prev,
                              { 
                                name: offer.title, 
                                price: offer.discountedPrice,
                                categoryName: offer.category 
                              }
                            ]);
                            setBookingItems(prev => [
                              ...prev,
                              { 
                                name: offer.title, 
                                price: offer.discountedPrice 
                              }
                            ]);
                          }}
                        />
                      ))}
                    </div>
                  </section>
                )}

                <div className="flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-16">
                  {/* Additional Information */}
                  <section className="flex-1">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Additional Information</h2>
                    <ul className="space-y-4">
                      <li className="flex items-center text-base">
                        <CheckCircle size={18} className="mr-2 text-green-500" />
                        <span className="text-gray-800">Instant Confirmation</span>
                      </li>
                      <li className="flex items-center text-base">
                        <CheckCircle size={18} className="mr-2 text-green-500" />
                        <span className="text-gray-800">Free Cancellation (24 hours notice required)</span>
                      </li>
                    </ul>
                  </section>
                </div>
                
              </div>

              {/* Booking Section */}
              <section className="lg:order-last order-first lg:w-96 sticky top-20 inset-0">
                <div className="lg:sticky lg:top-24 bg-white p-6 rounded-lg shadow-lg space-y-6 flex flex-col border border-gray-200">
                  <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Your Booking</h2>
                  <div className="flex flex-row lg:flex-col lg:space-y-6 space-x-6 lg:space-x-0">
                    {/* Date Selection */}
                    <div className='flex-1'>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm text-gray-700 appearance-none"
                        />
                      </div>
                    </div>
                    
                    {/* Time Selection */}
                    <div className='flex-1'>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                      <div className="relative">
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm appearance-none text-gray-700"
                        >
                          <option value="">Select a time</option>
                          {Array.from({ length: 24 }, (_, i) => i).map(hour => {
                            const time = `${hour.toString().padStart(2, '0')}:00`;
                            return <option key={time} value={time}>{time}</option>
                          })}
                        </select>
                        <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Team Member Selection */}
                  <div className='lg:flex lg:flex-col hidden'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Team Member</label>
                    <select
                      value={selectedTeamMember}
                      onChange={(e) => setSelectedTeamMember(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm appearance-none text-gray-700"
                    >
                      <option value="">Select a team member</option>
                      <option value="Random">Random</option>
                      {businessTeam.map(member => (
                        <option key={member.name} value={member.name}>{member.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Services - Togglable on mobile */}
                  {selectedServices.length > 0 && (
                    <div className="lg:block bg-gray-50 border-y border-gray-200 p-6 -mx-6">
                      <div 
                        className="flex justify-between items-center cursor-pointer lg:cursor-default"
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                      >
                        <h3 className="text-base font-semibold text-gray-800">Selected Services</h3>
                        <button className="lg:hidden transition-transform duration-300 ease-in-out transform">
                          <ChevronDown 
                            size={20} 
                            className={`text-gray-500 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>
                      </div>
                      <div 
                        className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                          isServicesOpen ? 'max-h-[1000px] opacity-100 visible' : 'max-h-0 opacity-0 invisible lg:max-h-[1000px] lg:opacity-100 lg:visible'
                        }`}
                      >
                        <div className="space-y-5">
                          {selectedServices.map((service, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className='flex items-center space-x-2'>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromBooking(service.name);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                                <span className="text-sm text-gray-600">{service.name}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-800">${service.price}</span>
                            </div>
                          ))}
                          <div className="flex justify-between items-center font-semibold border-t border-gray-200 pt-4">
                            <span className='text-gray-800'>Total:</span>
                            <span className='text-gray-800'>${totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {bookingError && (
                    <div className="bg-red-50 border border-red-200 text-red-400 px-4 py-3 rounded relative" role="alert">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span>{bookingError}</span>
                      </div>
                    </div>
                  )}

                  {/* Book Now Button */}
                  <Button 
                    className="w-full font-semibold py-2 px-4 rounded transition duration-300 ease-in-out bg-black hover:bg-gray-800 text-white"
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>

                  {/* Opening Hours - Toggleable */}
                  <div className="border-t pt-4">
                    <button
                      onClick={() => setIsOpeningHoursOpen(!isOpeningHoursOpen)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-700">Opening Hours</span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-500 transition-transform duration-300 ${
                          isOpeningHoursOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpeningHoursOpen && (
                      <div className="mt-2 space-y-1">
                        {openingHours.map((item, index) => {
                          const isToday = index === (today === 0 ? 6 : today - 1); // Adjust for Sunday
                          const isSunday = index === 6;
                          return (
                            <div 
                              key={item.day} 
                              className={`flex justify-between items-center py-1 text-sm ${
                                isSunday ? 'text-gray-400' : ''
                              }`}
                            >
                              <span className={`${isToday ? 'font-bold' : ''} ${isSunday ? '' : 'text-gray-600'}`}>
                                {item.day}
                              </span>
                              <span className={`${isToday ? 'font-bold' : ''} ${
                                item.hours === 'Closed' ? 'text-red-500' : (isSunday ? '' : 'text-gray-800')
                              }`}>
                                {item.hours}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          {/* Gallery Section */}
          {business.galleryImages && business.galleryImages.length > 0 && (
            <section className="max-w-screen-2xl mx-auto px-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Gallery</h2>
                <button 
                  onClick={() => setSelectedImageIndex(0)}
                  className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
                >
                  <Camera size={20} className="mr-2" />
                  <span>View all photos</span>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {business.galleryImages.slice(0, 8).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${business.name} gallery image ${index + 1}`}
                      width={300}
                      height={0}
                      className="object-cover hover:scale-110 transition-transform duration-300 !h-full w-full"
                    />
                  </div>
                ))}
              </div>
              {business.galleryImages.length > 8 && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setSelectedImageIndex(0)}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    View all {business.galleryImages.length} photos
                  </button>
                </div>
              )}

              {/* Image Gallery Modal */}
              <ImageGalleryModal
                images={business.galleryImages}
                initialIndex={selectedImageIndex}
                isOpen={selectedImageIndex !== -1}
                onClose={() => setSelectedImageIndex(-1)}
              />
            </section>
          )}

            {/* About Section */}
            <section className="mb-20 mt-20 max-w-screen-2xl mx-auto px-8">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">About Us</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  {business.description} We are committed to providing top-notch services to our clients in a welcoming and professional environment.
                </p>
                <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                  {!isLoaded ? (
                    <div className="h-full flex items-center justify-center">
                      <span>Loading map...</span>
                    </div>
                  ) : (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      zoom={14}
                      center={center}
                      options={mapOptions}
                    >
                      <MarkerF position={center} />
                    </GoogleMap>
                  )}
              </div>
            </section>
            

          </div>
        </div>
      </main>
    </div>
  );
}