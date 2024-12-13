'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { 
  Dialog, 
  DialogContent 
} from "@/app/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import Image from 'next/image';

interface Story {
  id: string;
  imageUrl: string;
  title: string;
  caption?: string;
  timestamp: Date;
  viewed: boolean;
}

interface StoriesProps {
  businessId: string;
  businessName: string;
}

const mockStories: Story[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    title: 'Summer Styles',
    caption: 'Summer styles inspiration 🌞',
    timestamp: new Date(),
    viewed: false
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    title: 'New Products',
    caption: 'New products just arrived! 🎉',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    viewed: false
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
    title: 'Meet Our Team',
    caption: 'Meet our amazing team! 👋',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    viewed: true
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    title: 'Spa Day',
    caption: 'Relax and rejuvenate 💆‍♀️',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    viewed: false
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    title: 'Special Offer',
    caption: '20% off all services this week! 🎉',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    viewed: true
  }
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80";

export function Stories({ businessId, businessName }: StoriesProps) {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
    setIsViewerOpen(true);
    setStories(prev => prev.map((story, i) => 
      i === index ? { ...story, viewed: true } : story
    ));
  };

  const closeStory = () => {
    setIsViewerOpen(false);
    setSelectedStoryIndex(null);
  };

  const navigateStory = (direction: 'prev' | 'next') => {
    if (selectedStoryIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(selectedStoryIndex + 1, stories.length - 1)
      : Math.max(selectedStoryIndex - 1, 0);
    
    setSelectedStoryIndex(newIndex);
    setStories(prev => prev.map((story, i) => 
      i === newIndex ? { ...story, viewed: true } : story
    ));
  };

  // Function to check if story is new (less than 24 hours old)
  const isNewStory = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = diff / (1000 * 60 * 60);
    return hours < 24;
  };

  // Function to get gradient border class
  const getStoryBorderClass = (story: Story) => {
    if (!story.viewed && isNewStory(story.timestamp)) {
      return "border-[3px] border-gradient-to-tr from-orange-500 via-red-500 to-purple-500 animate-pulse";
    }
    return cn(
      "border-2",
      story.viewed ? "border-gray-300" : "border-blue-500"
    );
  };

  // Add error handling for images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  if (stories.length === 0) return null;

  return (
    <div className="">
      {/* Stories Scroll Area */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-4">
        {stories.map((story, index) => (
          <div key={story.id} className="flex flex-col items-center gap-2 w-20">
            <div className="relative">
              <button
                className="relative flex-shrink-0 w-20 h-20 focus:outline-none"
                onClick={() => openStory(index)}
              >
                <div className={cn(
                  "absolute inset-0 rounded-full",
                  !story.viewed && isNewStory(story.timestamp) 
                    ? "bg-gradient-to-tr from-orange-500 via-red-500 to-purple-500 p-[2px]"
                    : story.viewed 
                      ? "border-2 border-gray-300" 
                      : "border-2 border-blue-500"
                )}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={story.imageUrl}
                      alt={story.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      unoptimized
                    />
                  </div>
                </div>
                {isNewStory(story.timestamp) && !story.viewed && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                    NEW
                  </div>
                )}
              </button>
            </div>
            <span className="text-xs text-gray-600 font-medium line-clamp-2 text-center h-8 mt-2">
              {story.title}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className=" md:max-w-[430px] md:h-[85vh] h-screen p-0 overflow-hidden bg-gradient-to-b from-gray-900 to-black border-0 mx-auto rounded-xl">
          {selectedStoryIndex !== null && (
            <div className="relative h-full flex flex-col">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
                {stories.map((_, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-200",
                      index === selectedStoryIndex 
                        ? "bg-white" 
                        : "bg-white/30"
                    )}
                  />
                ))}
              </div>

              {/* Header */}
              <div className="relative z-10 px-4 pt-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
                    <Image
                      src={stories[selectedStoryIndex].imageUrl}
                      alt={businessName}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{businessName}</div>
                    <div className="flex items-center text-[10px] text-gray-300 gap-1">
                      <Clock className="w-3 h-3" />
                      {format(stories[selectedStoryIndex].timestamp, 'PP')}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full h-8 w-8"
                  onClick={closeStory}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex items-center justify-center relative bg-black/20">
                <Image
                  src={stories[selectedStoryIndex].imageUrl}
                  alt={stories[selectedStoryIndex].title}
                  width={430}
                  height={760}
                  className="h-full w-full object-contain"
                  onError={handleImageError}
                  unoptimized
                  priority
                />

                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                  <div className="w-1/3 h-full flex items-center justify-start pointer-events-auto">
                    {selectedStoryIndex > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 ml-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                        onClick={() => navigateStory('prev')}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  <div className="w-1/3 h-full flex items-center justify-end pointer-events-auto">
                    {selectedStoryIndex < stories.length - 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 mr-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                        onClick={() => navigateStory('next')}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Caption */}
              {stories[selectedStoryIndex].caption && (
                <div className="relative z-10 p-4 bg-gradient-to-t from-black/80 to-transparent h-16">
                  <p className="text-white text-sm font-medium">
                    {stories[selectedStoryIndex].caption}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 