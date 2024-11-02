import Image from 'next/image'
import { cn } from "@/lib/utils"

interface MasonryGalleryProps {
  images: { src: string; alt: string }[]
  className?: string
}

export function MasonryGallery({ images, className }: MasonryGalleryProps) {
  return (
    <div className={cn("columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4", className)}>
      {images.map((image, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}