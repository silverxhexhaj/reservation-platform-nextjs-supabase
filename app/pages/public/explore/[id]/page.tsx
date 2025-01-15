"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { format, addMonths, eachDayOfInterval } from 'date-fns';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";
import { StarIcon, CheckCircle, Clock, Camera, ChevronDown, XCircle } from "lucide-react";
import { Stories } from './components/Stories';
import { BookingModal } from "./components/BookingModal";
import { StaffDetailModal } from './components/StaffDetailModal';
import { Reviews } from './components/Reviews';
import { BookingItem, SelectedService } from '@/app/models/custom.models';
import { BusinessDetails, Staff } from '@/app/models/functions/businessDetails.model';
import { fetchBusinessById } from '@/app/service/business/business.service';
import { businessCategories } from '@/app/models/supabase.models';
import { ServiceItem } from './components/ServiceItem';

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


export default function BusinessDetailPage() {

  const { id } = useParams();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  // State hooks
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

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


  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const businessData = await fetchBusinessById(id as string);

      setBusiness(businessData);
    };

    fetchBusinessDetails();

  }, [id]);

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

 
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !business?.working_hours) return [];

    const dayOfWeek = selectedDate.getDay();
    const todayHours = business.working_hours[dayOfWeek === 0 ? 6 : dayOfWeek - 1]?.start_time;

    if (!todayHours || todayHours === 'Closed') return [];

    const [openTime, closeTime] = todayHours.split(' - ').map((t: string) => {
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
  }, [selectedDate, business?.working_hours]);

  // Effects
  useEffect(() => {
    checkBusinessOpen();
    const interval = setInterval(checkBusinessOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    validateBookingTime();
  }, [selectedDate, selectedTime]);

  const checkBusinessOpen = () => {
    if (!business?.working_hours) return;

    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() * 100 + now.getMinutes();

    const todayHours = business.working_hours[day === 0 ? 6 : day - 1]?.start_time;
    if (!todayHours || todayHours === 'Closed') {
      setIsBusinessOpen(false);
      return;
    }

    const [openTime, closeTime] = todayHours.split(' - ').map((t: string) => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 100 + minutes;
    });

    setIsBusinessOpen(time >= openTime && time < closeTime);
  };

  const validateBookingTime = useCallback(() => {
    if (!selectedDate || !selectedTime || !business?.working_hours) {
      setIsValidBookingTime(false);
      return;
    }

    const dayOfWeek = selectedDate.getDay();
    const timeInMinutes = parseInt(selectedTime.split(':')[0]) * 60 + parseInt(selectedTime.split(':')[1]);

    const todayHours = business.working_hours[dayOfWeek === 0 ? 6 : dayOfWeek - 1]?.start_time;
    if (!todayHours || todayHours === 'Closed') {
      setIsValidBookingTime(false);
      return;
    }

    const [openTime, closeTime] = todayHours.split(' - ').map((t: string)  => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 60 + minutes;
    });

    setIsValidBookingTime(timeInMinutes >= openTime && timeInMinutes < closeTime);
  }, [selectedDate, selectedTime, business?.working_hours]);


  const addToBooking = (service: any, categoryName: string) => {
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
      alert(`Booking confirmed for ${business?.business?.name ?? ''} on ${format(bookingDate, 'MMMM d, yyyy')} at ${selectedTime}\nTotal: $${totalPrice}\nTeam Member: ${selectedTeamMember || 'Random'}`);
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
              src={business?.business?.cover_picture ?? ''}
              alt={business?.business?.name ?? ''}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/70 flex items-end">
              <div className="p-6 text-white max-w-screen-2xl mx-auto w-full">
                <h1 className="text-3xl lg:text-5xl font-bold mb-2">{business?.business?.name ?? ''}</h1>
                <p className="lg:text-xl mb-4 opacity-90">{business?.business?.category ?? ''}</p>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                      <StarIcon className="w-4 lg:w-5 h-4 lg:h-5 text-yellow-400 mr-1" />
                      {/* <span className="text-sm lg:text-lg font-semibold">{business?.business?.rating?.toFixed(1) ?? ''}</span> */}
                    </div>
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                      <span className="text-sm lg:text-lg font-semibold">
                        {Array.from({ length: business?.business?.price_range === 'LUXURY' ? 4 : business?.business?.price_range === 'EXPENSIVE' ? 3 : business?.business?.price_range === 'MODERATE' ? 2 : 1 }).map((_, index) => (
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
                <Stories stories={business?.business_story ?? []} />
              </div>

              {/* Services Section */}
              <section>
                <div className="sticky top-20 bg-white z-40">
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Services</h2>

                  {/* Categories Tabs */}
                  <div className="relative">
                    <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                      {/* todo get categories from services */}
                      {businessCategories.slice(0, 3).map((category, index) => (
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
                    {business?.services?.map((service, serviceIndex) => {
                        const isSelected = selectedServices.some(s => s.name === service.name);
                        return (
                          <ServiceItem
                            key={serviceIndex}
                            name={service.name}
                            price={service.base_price}
                            description={service.description}
                            duration={service.duration}
                            isSelected={isSelected}
                            onToggle={() => isSelected
                              ? removeFromBooking(service.name)
                              : addToBooking(service, activeTab)
                            }
                          />
                        );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 pt-6">
                      {business?.services?.map((service, serviceIndex) => {
                        const isSelected = selectedServices.some(s => s.name === service.name);
                        return (
                          <ServiceItem
                            key={service.name}
                            name={service.name}
                            price={service.base_price}
                            description={service.description}
                            duration={service.duration}
                            isSelected={isSelected}
                            onToggle={() => isSelected
                              ? removeFromBooking(service.name)
                              : addToBooking(service, activeTab)
                            }
                          />
                        );
                    })}
                  </div>
                )}
              </section>

              {/* Team Section */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Our Team</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {business?.staff?.map((member, index) => {
    
                    return (
                      <div
                        key={member.id}
                        className="group flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedStaff(member)}
                      >
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-200`}>
                          <span className="text-sm font-bold text-white">{member.profile.first_name[0] + member.profile.last_name[0]}</span>
                        </div>
                        <p className="text-sm font-medium text-center text-gray-700 truncate w-full group-hover:text-gray-900">
                          {member?.profile?.first_name ?? '' + ' ' + member?.profile?.last_name ?? ''}
                        </p>  
                        <p className="text-xs text-center text-gray-500 truncate w-full">
                          {member?.position}
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
                  />
                )}
              </section>

              {/* Reviews Section */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Reviews</h2>
                <Reviews businessId={id as string} />
              </section>

              {/* About Section */}
              <section className="">
                <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">About Us</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  {business?.business?.description ?? ''}
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
                      center={{ lat: business?.business?.location?.latitude || 0, lng: business?.business?.location?.longitude || 0 }}
                    >
                      {business?.business?.location?.latitude && business?.business?.location?.longitude && (
                        <MarkerF position={{ lat: business?.business?.location?.latitude, lng: business?.business?.location?.longitude }} />
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
                      {business?.working_hours?.map((item, index) => {
                        const isToday = index === (today === 0 ? 6 : today - 1);
                        const isSunday = index === 6;
                        return (
                          <div
                            key={item.day_of_week}
                            className={`flex justify-between items-center py-2 ${isSunday ? 'text-gray-400' : ''}`}
                          >
                            <span className={`${isToday ? 'font-bold' : ''} ${isSunday ? '' : 'text-gray-600'}`}>
                              {item.day_of_week}
                            </span>
                            <span className={`${isToday ? 'font-bold' : ''} ${item.start_time === 'Closed' ? 'text-red-500' : (isSunday ? '' : 'text-gray-800')}`}>
                              {item.start_time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {(business?.additional_info?.length ?? 0) > 0 && (
                  <section className="flex-1">
                    <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Additional Information</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <ul className="space-y-4">
                        {business?.additional_info?.map((info, index) => (
                          <li key={index} className="flex items-center text-base">
                            {info.is_available && (
                              <CheckCircle size={18} className="mr-2 text-green-500" />
                            )}
                            {!info.is_available && (
                              <XCircle size={18} className="mr-2 text-red-500" />
                            )}
                            <span className="text-gray-800">{info.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}
              </div>

              { /*
                {business?.offers?.length > 0 && (
                  <section className="mt-20">
                    <h2 className="text-xl uppercase font-bold text-gray-950 pb-6 pt-6 sticky top-20 bg-white w-full">
                      Special Offers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {business?.offers?.map((offer) => (
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
                */ }
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
                          {/* <span className={business?.isOpen ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                            {business?.isOpen ? 'Open' : 'Closed'}
                          </span>
                          {business?.isOpen && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-600">Closes at {business?.closingTime}</span>
                            </>
                          )} */}
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

                  {isOpeningHoursOpen && business?.working_hours && (
                    <div className="mt-2 space-y-1 pl-8">
                      {business?.working_hours.map((item, index) => (
                        <div key={item.day_of_week} className="flex justify-between text-sm">
                          <span className={`${index === today - 1 ? 'font-medium' : ''} text-gray-600`}>
                            {item.day_of_week}
                          </span>
                          <span className={`${item.start_time === 'Closed' ? 'text-red-500' : 'text-gray-900'}`}>
                            {item.start_time}
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
                        {business?.business?.location?.address}, {business?.business?.location?.city}, {business?.business?.location?.country}
                      </p>
                      <a
                        href={business?.business?.location?.latitude ?
                          `https://www.google.com/maps/search/?api=1&query=${business.business.location.latitude},${business.business.location.longitude}` :
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

              {/* 

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
                businessTeam={business?.staff ?? []}
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
                services={business?.services ?? []}
                categories={businessCategories}
                addToBooking={addToBooking}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                filteredServices={business?.services ?? []}
              />
              Booking Modal */}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}