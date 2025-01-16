
'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { GalleryItem } from '@/app/models/functions/businessDetails.model';

interface BusinessGalleryProps {
  gallery: GalleryItem[];
}

export function BusinessGallery({ gallery }: BusinessGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <>
      <Button
        variant="outline"
        className="bg-white/20 hover:bg-white/30 text-white border-white/40 text-sm lg:text-base"
        onClick={() => setIsOpen(true)}
      >
        <Camera className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
        View Gallery
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative w-full h-full">
            <Image
              src={gallery[selectedImageIndex]?.image_url}
              alt={gallery[selectedImageIndex]?.description || ''}
              width={1920}
              height={1080}
              className="object-contain"
              priority
            />
            
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-black/70"
                  onClick={handlePrevious}
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-black/70"
                  onClick={handleNext}
                >
                  →
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
