import React, { useState } from 'react';
import { Carousel } from 'flowbite-react';
import path from 'path-browserify';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  basePath: string;
}

function ImageGallery({ images, basePath }: ImageGalleryProps) {
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpenModal(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }
  };

  // Extract only the last part of the basePath
  const folderName = basePath.split(/[/\\]/).pop() || 'Images';

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{folderName}</h2>
      <div className="w-[512px] h-[512px] mx-auto">
        <Carousel slide={false} leftControl="←" rightControl="→">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-center w-full h-full">
              <img
                src={`safe-file://${path.join(basePath, image)}`}
                alt={image}
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <ImageModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        images={images}
        currentIndex={currentIndex}
        basePath={basePath}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default ImageGallery;