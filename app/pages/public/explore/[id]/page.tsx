"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { format, addMonths, eachDayOfInterval } from 'date-fns';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";
import { businesses, businessOffers } from '@/data/mock';
import { StarIcon, CheckCircle, Clock, Camera, ChevronDown } from "lucide-react";
import { Business, BusinessOffer, categoryServices, categoryTeams, TeamMember } from '@/data';
import { Stories } from './components/Stories';
import { ServiceOffer } from "@/app/components/ServiceOffer";
import { ServiceItem } from "./components/ServiceItem";
import { BookingModal } from "./components/BookingModal";
import { StaffDetailModal } from './components/StaffDetailModal';
import { Reviews } from './components/Reviews';
import { BookingItem, SelectedService } from '@/app/models/custom.models';
import { BusinessDetails } from '@/app/models/functions/businessDetails.model';

const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;


const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

function getBusinessOffers(businessId: string): BusinessOffer[] {
  return (businessOffers as BusinessOffer[]).filter(offer => offer.businessId === businessId);
}

function transformBusinessHours(hours: Business['hours']) {
  if (!hours) return [];
  
  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return daysOrder.map(day => {
    const dayHours = hours[day];
    return {
      day: day.charAt(0).toUpperCase() + day.slice(1),
      hours: dayHours ? `${dayHours.open} - ${dayHours.close}` : 'Closed'
    };
  });
}

export default function BusinessDetailPage() {
  const { id } = useParams();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  // State hooks
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Featured');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isOpeningHoursOpen, setIsOpeningHoursOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isValidBookingTime, setIsValidBookingTime] = useState(false);
  const [dateDragging, setDateDragging] = useState(false);
  const [dateStartX, setDateStartX] = useState(0);
  const [dateScrollLeft, setDateScrollLeft] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<TeamMember | null>(null);

  const gradients = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600',
    'from-orange-400 to-orange-600',
    'from-cyan-400 to-cyan-600'
  ];

  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dateContainerRef = useRef<HTMLDivElement>(null);

  const availableDates = useMemo(() => {
    const today = new Date();
    const twoMonthsFromNow = addMonths(today, 2);
    const dates = eachDayOfInterval({
      start: today,
      end: twoMonthsFromNow,
    });
    return dates;
  }, []);

  const categories = useMemo(() => {
    if (!business?.category || !categoryServices[business.category]) return [];
    return ['Featured', ...categoryServices[business.category].map(cat => cat.name)];
  }, [business?.category]);

  const filteredServices = useMemo(() => {
    if (!business?.category || !categoryServices[business.category]) return [];
    if (activeTab === 'Featured') {
      // For Featured tab, get one service from each category up to 4 services
      const allCategories = categoryServices[business.category];
      const featuredServices = allCategories.slice(0, 4).map(category => ({
        name: '',
        services: [category.services[0]] // Get first service from each category
      }));
      return featuredServices;
    }
    return categoryServices[business.category].filter(cat => cat.name === activeTab);
  }, [business?.category, activeTab]);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !business?.openingHours) return [];

    const dayOfWeek = selectedDate.getDay();
    const todayHours = business.openingHours[dayOfWeek === 0 ? 6 : dayOfWeek - 1]?.hours;

    if (!todayHours || todayHours === 'Closed') return [];

    const [openTime, closeTime] = todayHours.split(' - ').map(t => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 60 + minutes;
    });

    const slots = [];
    const currentDate = new Date();
    const isToday = selectedDate.toDateString() === currentDate.toDateString();
    const currentTime = isToday ? currentDate.getHours() * 60 + currentDate.getMinutes() : 0;

    for (let time = openTime; time < closeTime; time += 30) {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      if (isToday && time <= currentTime) continue;

      slots.push(timeString);
    }

    return slots;
  }, [selectedDate, business?.openingHours]);

  // Effects
  useEffect(() => {
    const foundBusiness = businesses.find(b => b.id === id);
    if (foundBusiness) {
      const transformedBusiness: Business = {
        ...foundBusiness,
        openingHours: transformBusinessHours(foundBusiness.hours),
        location: {
          ...foundBusiness.location,
          coordinates: foundBusiness.location.coordinates || { lat: 0, lng: 0 },
          country: foundBusiness.location.state // Using state as country for now
        },
        isOpen: false, // Will be set by checkBusinessOpen
        closingTime: foundBusiness.hours?.[Object.keys(foundBusiness.hours)[0]]?.close || '00:00',
        galleryImages: foundBusiness.galleryImages || []
      };
      setBusiness(transformedBusiness);
    } else {
      setBusiness(null);
    }
  }, [id]);

  useEffect(() => {
    checkBusinessOpen();
    const interval = setInterval(checkBusinessOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    validateBookingTime();
  }, [selectedDate, selectedTime]);

  const checkBusinessOpen = () => {
    if (!business?.openingHours) return;

    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() * 100 + now.getMinutes();

    const todayHours = business.openingHours[day === 0 ? 6 : day - 1]?.hours;
    if (!todayHours || todayHours === 'Closed') {
      setIsBusinessOpen(false);
      return;
    }

    const [openTime, closeTime] = todayHours.split(' - ').map(t => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 100 + minutes;
    });

    setIsBusinessOpen(time >= openTime && time < closeTime);
  };

  const validateBookingTime = useCallback(() => {
    if (!selectedDate || !selectedTime || !business?.openingHours) {
      setIsValidBookingTime(false);
      return;
    }

    const dayOfWeek = selectedDate.getDay();
    const timeInMinutes = parseInt(selectedTime.split(':')[0]) * 60 + parseInt(selectedTime.split(':')[1]);

    const todayHours = business.openingHours[dayOfWeek === 0 ? 6 : dayOfWeek - 1]?.hours;
    if (!todayHours || todayHours === 'Closed') {
      setIsValidBookingTime(false);
      return;
    }

    const [openTime, closeTime] = todayHours.split(' - ').map(t => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 60 + minutes;
    });

    setIsValidBookingTime(timeInMinutes >= openTime && timeInMinutes < closeTime);
  }, [selectedDate, selectedTime, business?.openingHours]);

  const businessTeam = business?.category ? categoryTeams[business.category] : [];

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
      alert(`Booking confirmed for ${business?.name ?? ''} on ${format(bookingDate, 'MMMM d, yyyy')} at ${selectedTime}\nTotal: $${totalPrice}\nTeam Member: ${selectedTeamMember || 'Random'}`);
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

  const handleDateMouseDown = (e: React.MouseEvent) => {
    setDateDragging(true);
    setDateStartX(e.pageX - (dateContainerRef.current?.offsetLeft || 0));
    setDateScrollLeft(dateContainerRef.current?.scrollLeft || 0);
  };

  const handleDateMouseLeave = () => {
    setDateDragging(false);
  };

  const handleDateMouseUp = () => {
    setDateDragging(false);
  };

  const handleDateMouseMove = (e: React.MouseEvent) => {
    if (!dateDragging) return;
    e.preventDefault();
    if (!dateContainerRef.current) return;

    const x = e.pageX - (dateContainerRef.current.offsetLeft || 0);
    const walk = (x - dateStartX) * 2;
    dateContainerRef.current.scrollLeft = dateScrollLeft - walk;
  };


  return (
    <div className="min-h-screen flex flex-col">
      <style jsx global>{scrollbarHideStyles}</style>
      <Header />
      <main className="flex-grow relative">
          <div className="space-y-8 lg:space-y-16">
            {/* Cover Section */}
            <section className="relative h-64 lg:h-96 overflow-hidden">
              <Image
                src={business?.cover_picture ?? ''}
                alt={business?.name ?? ''}
                width={1920}
                height={1080}
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/70 flex items-end">
                <div className="p-6 text-white max-w-screen-2xl mx-auto w-full">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-2">{business?.name ?? ''}</h1>
                  <p className="lg:text-xl mb-4 opacity-90">{business?.category ?? ''}</p>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                        <StarIcon className="w-4 lg:w-5 h-4 lg:h-5 text-yellow-400 mr-1" />
                        <span className="text-sm lg:text-lg font-semibold">{business?.rating?.toFixed(1) ?? ''}</span>
                      </div>
                      <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                        <span className="text-sm lg:text-lg font-semibold">
                          {Array.from({ length: business?.priceRange === 'LUXURY' ? 4 : business?.priceRange === 'EXPENSIVE' ? 3 : business?.priceRange === 'MODERATE' ? 2 : 1 }).map((_, index) => (
                            <span
                              key={index}
                              className="text-white"
                            >
                              $
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/40 text-sm lg:text-base"
                      >
                        <Camera className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                        View Gallery
                      </Button>
                      <div className={`flex items-center bg-white/20 rounded-full px-3 py-1 ${isBusinessOpen ? 'text-green-400' : 'text-red-400'}`}>
                        <Clock className="mr-1 w-4 lg:w-5 h-4 lg:h-5" />
                        <span className="text-sm lg:text-base font-semibold">
                          {isBusinessOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <div className='flex flex-col lg:flex-row lg:space-x-16 px-6 max-w-screen-2xl mx-auto relative'>
              <div className='flex flex-col flex-1 lg:order-first order-last space-y-8 lg:space-y-16 pb-32 lg:pb-0'>
                
                {/* Add Stories section here */}
                <div>
                  <Stories businessId={business?.id ?? ''} businessName={business?.name ?? ''} />
                </div>

                {/* Services Section */}
                <section>
                  <div className="sticky top-20 bg-white z-40">
                    <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Services</h2>
                    
                    {/* Categories Tabs */}
                    <div className="relative">
                      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveTab(category)}
                            className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                              ${activeTab === category 
                                ? 'bg-black text-white' 
                                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Services List */}
                  {activeTab === 'Featured' ? (
                    <div className="flex flex-col gap-4 pt-6">
                      {filteredServices.map((category, categoryIndex) => 
                        category.services.map((service, serviceIndex) => {
                          const isSelected = selectedServices.some(s => s.name === service.name);
                          return (
                            <ServiceItem
                              key={`${categoryIndex}-${serviceIndex}`}
                              name={service.name}
                              price={service.price}
                              description={service.description}
                              duration={service.duration}
                              isSelected={isSelected}
                              onToggle={() => isSelected 
                                ? removeFromBooking(service.name) 
                                : addToBooking(service, category.name)
                              }
                            />
                          );
                        })
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 pt-6">
                      {filteredServices.flatMap(category => 
                        category.services.map(service => {
                          const isSelected = selectedServices.some(s => s.name === service.name);
                          return (
                            <ServiceItem
                              key={service.name}
                              name={service.name}
                              price={service.price}
                              description={service.description}
                              duration={service.duration}
                              isSelected={isSelected}
                              onToggle={() => isSelected 
                                ? removeFromBooking(service.name) 
                                : addToBooking(service, category.name)
                              }
                            />
                          );
                        })
                      )}
                    </div>
                  )}
                </section>

                {/* Team Section */}
                <section>
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Our Team</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {businessTeam.map((member, index) => {
                      const gradient = gradients[index % gradients.length];

                      return (
                        <div
                          key={member.name}
                          className="group flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                          onClick={() => setSelectedStaff(member)}
                        >
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-200`}>
                            <span className="text-sm font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <p className="text-sm font-medium text-center text-gray-700 truncate w-full group-hover:text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-center text-gray-500 truncate w-full">
                            {member.profession}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Staff Detail Modal */}
                  {selectedStaff && (
                    <StaffDetailModal
                      isOpen={!!selectedStaff}
                      onClose={() => setSelectedStaff(null)}
                      staff={selectedStaff}
                      gradient={gradients[businessTeam.findIndex(m => m.name === selectedStaff.name) % gradients.length]}
                    />
                  )}
                </section>

                {/* Reviews Section */}
                <section>
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Reviews</h2>
                  <Reviews businessId={business?.id ?? ''} />
                </section>

                {/* About Section */}
                <section className="">
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">About Us</h2>
                  <p className="text-gray-700 mb-6 text-lg">
                    {business?.description ?? ''}
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
                        center={business?.location?.coordinates || { lat: 0, lng: 0 }}
                      >
                        {business?.location?.coordinates && (
                          <MarkerF position={business.location.coordinates} />
                        )}
                      </GoogleMap>
                    )}
                  </div>
                </section>

                {/* Opening Hours and Additional Information Section */}
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Opening Hours Section */}
                  <section className="flex-1">
                    <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Opening Hours</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="space-y-2">
                        {business?.openingHours?.map((item, index) => {
                          const isToday = index === (today === 0 ? 6 : today - 1);
                          const isSunday = index === 6;
                          return (
                            <div
                              key={item.day}
                              className={`flex justify-between items-center py-2 ${isSunday ? 'text-gray-400' : ''}`}
                            >
                              <span className={`${isToday ? 'font-bold' : ''} ${isSunday ? '' : 'text-gray-600'}`}>
                                {item.day}
                              </span>
                              <span className={`${isToday ? 'font-bold' : ''} ${item.hours === 'Closed' ? 'text-red-500' : (isSunday ? '' : 'text-gray-800')}`}>
                                {item.hours}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Additional Information */}
                  <section className="flex-1">
                    <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Additional Information</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <ul className="space-y-4">
                        <li className="flex items-center text-base">
                          <CheckCircle size={18} className="mr-2 text-green-500" />
                          <span className="text-gray-800">Instant Confirmation</span>
                        </li>
                        <li className="flex items-center text-base">
                          <CheckCircle size={18} className="mr-2 text-green-500" />
                          <span className="text-gray-800">Free Cancellation (24 hours notice required)</span>
                        </li>
                        {business?.amenities?.map((amenity, index) => (
                          <li key={index} className="flex items-center text-base">
                            <CheckCircle size={18} className="mr-2 text-green-500" />
                            <span className="text-gray-800">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>

                {availableOffers.length > 0 && (
                  <section className="mt-20">
                    <h2 className="text-xl uppercase font-bold text-gray-950 pb-6 pt-6 sticky top-20 bg-white w-full">
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
              </div>

              {/* Booking Section */}
              <section className="lg:w-[420px] lg:relative lg:top-auto lg:bottom-auto lg:inset-x-auto fixed bottom-0 inset-x-0 z-40">
                <div className="lg:sticky lg:top-24 bg-white p-6 lg:rounded-lg lg:shadow-lg flex flex-col lg:border border-gray-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Your Booking</h2>
                    {selectedServices.length > 0 && (
                      <span className="text-sm text-gray-600">{selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected</span>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full py-6 text-base font-semibold rounded-lg transition duration-300 ease-in-out bg-black hover:bg-gray-800 text-white"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    {selectedServices.length === 0 ? 'Book Now' : `Book Now • $${totalPrice}`}
                  </Button>

                  {/* Opening Hours and Location */}
                  <div className="lg:block hidden mt-4 space-y-4 pt-6 border-t border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                      <div className='flex justify-between w-full'>
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span className={business?.isOpen ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                              {business?.isOpen ? 'Open' : 'Closed'}
                            </span>
                            {business?.isOpen && (
                              <>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-600">Closes at {business?.closingTime}</span>
                              </>
                            )}
                          </div>
                          <button 
                            onClick={() => setIsOpeningHoursOpen(!isOpeningHoursOpen)}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center mt-1"
                          >
                            See opening hours
                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpeningHoursOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isOpeningHoursOpen && business?.openingHours && (
                      <div className="mt-2 space-y-1 pl-8">
                        {business?.openingHours.map((item, index) => (
                          <div key={item.day} className="flex justify-between text-sm">
                            <span className={`${index === today - 1 ? 'font-medium' : ''} text-gray-600`}>
                              {item.day}
                            </span>
                            <span className={`${item.hours === 'Closed' ? 'text-red-500' : 'text-gray-900'}`}>
                              {item.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                          <path d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900">
                          {business?.location.address}, {business?.location.city}, {business?.location?.country}
                        </p>
                        <a 
                          href={business?.location?.coordinates ? 
                            `https://www.google.com/maps/search/?api=1&query=${business.location.coordinates.lat},${business.location.coordinates.lng}` :
                            '#'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                        >
                          Get directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <BookingModal
                  isOpen={isBookingModalOpen}
                  onClose={() => setIsBookingModalOpen(false)}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  selectedTeamMember={selectedTeamMember}
                  setSelectedTeamMember={setSelectedTeamMember}
                  selectedServices={selectedServices}
                  removeFromBooking={removeFromBooking}
                  availableDates={availableDates}
                  availableTimeSlots={availableTimeSlots}
                  businessTeam={businessTeam}
                  totalPrice={totalPrice}
                  bookingError={bookingError}
                  handleBooking={handleBooking}
                  dateDragging={dateDragging}
                  dateStartX={dateStartX}
                  dateScrollLeft={dateScrollLeft}
                  handleDateMouseDown={handleDateMouseDown}
                  handleDateMouseLeave={handleDateMouseLeave}
                  handleDateMouseUp={handleDateMouseUp}
                  handleDateMouseMove={handleDateMouseMove}
                  dateContainerRef={dateContainerRef}
                  services={filteredServices.flatMap(category => category.services)}
                  categories={categories}
                  addToBooking={addToBooking}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  filteredServices={filteredServices}
                />
              </section>
            </div>
          </div>
      </main>
    </div>
  );
}