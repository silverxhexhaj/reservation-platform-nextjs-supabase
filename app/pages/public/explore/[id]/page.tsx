"use client";

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";
import { StarIcon, CheckCircle, Clock, ChevronDown, XCircle } from "lucide-react";
import { Stories } from '../../../../components/business/Stories';
import { BookingModal } from "../../../../components/business/BookingModal";
import { StaffDetailModal } from '../../../../components/business/StaffDetailModal';
import { Reviews } from '../../../../components/business/Reviews';
import { BookingItem } from '@/app/models/custom.models';
import { BusinessDetails, Service, Staff } from '@/app/models/functions/businessDetails.model';
import { fetchBusinessById } from '@/app/service/business/business.service';
import { ServiceItem } from '../../../../components/business/ServiceItem';
import { ServiceOffer } from '@/app/components/ServiceOffer';
import { BusinessGallery } from '@/app/components/business/BusinessGallery';
import { SubCategory } from '@/app/models/supabase.models';
import { authService } from '@/app/service/auth.service';

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
  const searchParams = useSearchParams();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  // State hooks
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [isBusinessOpen, setIsBusinessOpen] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [disableBookingButton, setDisableBookingButton] = useState<boolean>(true);

  const [businsessRating, setBusinsessRating] = useState<number | null>(null);

  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);

  const [isOpeningHoursOpen, setIsOpeningHoursOpen] = useState(false);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const businessData = await fetchBusinessById(id as string);

      if (businessData?.working_hours) {
        const now = new Date();
        const currentEndTime = businessData.working_hours.find(hours => hours.day_of_week === today)?.end_time;

        if (currentEndTime) {
          const [endHour, endMinute] = currentEndTime.split(':').map(Number);
          const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
          const endTotalMinutes = (endHour * 60) + endMinute;
          setIsBusinessOpen(currentTotalMinutes < endTotalMinutes);
        }
      }

      if (businessData?.services) {
        setFilteredServices(businessData.services);
      }

      setBusiness(businessData);
    };
    fetchBusinessDetails();
  }, [id]);


  useEffect(() => {
    const disableBookingButton = async () => {
      const isClientType = await authService.isClient();

      setDisableBookingButton(selectedServices.length === 0 || !isClientType);
    };

    disableBookingButton();
  }, [selectedServices]);


  const addToBooking = (service: any) => {
    if (!selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(prev => [...prev, { ...service }]);
      setBookingItems(prev => [...prev, { id: service.id, name: service.name, price: service.base_price }]);
    }
  };

  const removeFromBooking = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
    setBookingItems(prev => prev.filter(item => item.id !== serviceId));
  };

  const clearSelectedItems = () => {
    setSelectedServices([]);
    setBookingItems([]);
  };

  const filterServicesByCategory = (sub_category: SubCategory) => {
    setSelectedSubCategory(sub_category);
    setFilteredServices(business?.services?.filter(service => service.sub_category.id === sub_category.id) ?? []);
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
                <p className="lg:text-xl mb-4 opacity-90">{business?.business?.category?.display_name ?? ''}</p>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                      <StarIcon className="w-4 lg:w-5 h-4 lg:h-5 text-yellow-400 mr-1" />
                      <span className="text-sm lg:text-lg font-semibold">{ businsessRating ?? ''}</span>
                    </div>
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                      <span className="text-sm lg:text-lg font-semibold">
                        {Array.from({ length: business?.business?.price_range?.length ?? 1 }).map((_, index) => (
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
                    <BusinessGallery gallery={business?.gallery ?? []} />

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
              <div>
                <Stories stories={business?.business_story ?? []} />
              </div>
              <div>
                <div className="bg-white z-40">
                  <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Services</h2>

                  <div className="relative">
                    <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                      {
                        business?.business?.sub_categories?.map((sub_category, index) => (
                          <button
                            key={index}
                            className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedSubCategory?.id === sub_category.id ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                            onClick={() => filterServicesByCategory(sub_category)}
                          >
                            {sub_category.display_name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-6">
                  {filteredServices?.map((service) => {
                    const isSelected = selectedServices.some(s => s.id === service.id);
                    return (
                      <ServiceItem
                        key={service.id}
                        name={service.name}
                        price={service.base_price}
                        description={service.description}
                        duration={service.duration}
                        isSelected={isSelected}
                        onToggle={() => isSelected
                          ? removeFromBooking(service.id)
                          : addToBooking(service)
                        }
                      />
                    );
                  })}
                </div>
              </div>

              {(business?.offers?.length ?? 0) > 0 && (
                <section className="mt-20">
                  <h2 className="text-xl uppercase font-bold text-gray-950 pb-6 pt-6 sticky top-20 bg-white w-full">
                    Special Offers
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {business?.offers?.map((offer) => (
                      <ServiceOffer
                        key={offer.id}
                        offer={offer}
                        selected_offer_id={searchParams.get('offer') ?? ''}
                        onBook={() => {
                          setSelectedServices(prev => [...prev, { name: offer.name, price: offer.price, categoryName: offer.sub_category.display_name }]);
                          setBookingItems(prev => [...prev, { name: offer.name, price: offer.price }]);
                        }}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Team Section */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-950 pb-6 pt-6">Our Team</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {business?.staff?.map((member) => {
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
                <Reviews businessId={id as string} setBusinsessRating={setBusinsessRating} />
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
                      {business?.working_hours?.map((item) => (
                        <div key={item.day_of_week} className={`${today === item.day_of_week ? 'font-bold' : ''} flex justify-between text-sm`}>
                          <span className="text-gray-600">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][item.day_of_week]}
                          </span>
                          {item.is_available ? (
                            <span className="text-gray-900">
                              {item.start_time.slice(0, -3)} - {item.end_time.slice(0, -3)}
                            </span>
                          ) : (
                            <span className="text-red-500">Closed</span>
                          )}
                        </div>
                      ))}
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
                  disabled={disableBookingButton}
                  className="w-full py-6 text-base font-semibold rounded-lg transition duration-300 ease-in-out bg-black hover:bg-gray-800 text-white"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  {selectedServices.length === 0 ? 'Book Now' : `Book Now • $${bookingItems.reduce((sum, item) => sum + item.price, 0)}`}
                </Button>

                {/* Opening Hours and Location */}
                <div className="lg:block hidden mt-4 space-y-4 pt-6 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className='flex justify-between w-full'>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className={isBusinessOpen ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                            {isBusinessOpen ? 'Open' : 'Closed'}
                          </span>
                          {isBusinessOpen && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-600">Closes at {business?.working_hours?.find(hours => hours.day_of_week === today)?.end_time?.slice(0, -3)}</span>
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

                  {isOpeningHoursOpen && business?.working_hours && (
                    <div className="mt-2 space-y-1 pl-8">
                      {business?.working_hours?.map((item, index) => (
                        <div key={item.day_of_week} className={`${today === item.day_of_week ? 'font-bold' : ''} flex justify-between text-sm`}>
                          <span className="text-gray-600">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][item.day_of_week]}
                          </span>
                          {item.is_available ? (
                            <span className="text-gray-900">
                              {item.start_time.slice(0, -3)} - {item.end_time.slice(0, -3)}
                            </span>
                          ) : (
                            <span className="text-red-500">Closed</span>
                          )}
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
                        {business?.business?.location?.name ?? ''} {business?.business?.location?.floor ?? ''}, {business?.business?.location?.side ?? ''}, {business?.business?.location?.city_name ?? ''}, {business?.business?.location?.country ?? ''}
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

              <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                selectedServices={selectedServices}
                removeFromBooking={removeFromBooking}
                clearSelectedItems={clearSelectedItems}
                subCategories={business?.business?.sub_categories ?? []}
                addToBooking={addToBooking}
                businessId={id as string}
              />

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}