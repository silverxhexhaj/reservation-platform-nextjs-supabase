import React from 'react';
import Image from 'next/image';

interface MasonryGalleryProps {
  images: string[];
  businessName: string;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images, businessName }) => {
  console.log("MasonryGallery images:", images);

  // Function to get a random span value for each image
  const getRandomSpan = () => Math.floor(Math.random() * 2) + 1;

  return (
    <div className="masonry-gallery">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="masonry-item"
          style={{
            gridRowEnd: `span ${getRandomSpan()}`
          }}
        >
          <Image
            src={image}
            alt={`Gallery image ${index + 1}`}
            width={300}
            height={300}
            className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};