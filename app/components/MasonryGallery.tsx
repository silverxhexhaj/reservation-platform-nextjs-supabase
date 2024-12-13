import React from 'react';

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
          <img
            src={image}
            alt={`${businessName} gallery image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};