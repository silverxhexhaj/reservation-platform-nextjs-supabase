"use client";

import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageGalleryModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageGalleryModal({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset currentIndex when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden" 
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-[95vh] flex items-center justify-center">
          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-50">
            <div className="flex items-center gap-2">
              <span className="text-white/90 text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {isZoomed ? (
                  <ZoomOut className="h-5 w-5" />
                ) : (
                  <ZoomIn className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20 z-50 h-12 w-12"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20 z-50 h-12 w-12"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Image container */}
          <div 
            className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className={`${
                isZoomed 
                  ? 'max-w-none max-h-none w-auto h-auto scale-150' 
                  : 'max-h-[85vh] max-w-[85vw] w-auto h-auto'
              } transition-transform duration-300`}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex justify-center gap-2 overflow-x-auto py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                    currentIndex === index 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 