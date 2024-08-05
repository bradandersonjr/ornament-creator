import React, { useState } from 'react';
import ImageModal from './ImageModal';
import path from 'path-browserify';

interface ImageGalleryProps {
  images: string[];
  basePath: string;
}

function ImageGallery({ images, basePath }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [circleSize, setCircleSize] = useState(100);
  const [showCircle, setShowCircle] = useState(false); // Changed from true to false
  const [textCircleSize, setTextCircleSize] = useState(80);
  const [kerning, setKerning] = useState(0);
  const [imageOffsetX, setImageOffsetX] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const [textRotation, setTextRotation] = useState(0);
  const [textStraighten, setTextStraighten] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const getImageSrc = (imageName: string) => {
    const fullPath = path.join(basePath, imageName);
    return `safe-file://${fullPath.replace(/\\/g, '/')}`;
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    let newIndex;
    if (direction === 'prev') {
      newIndex = (selectedImageIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (selectedImageIndex + 1) % images.length;
    }
    setSelectedImageIndex(newIndex);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer aspect-square relative overflow-hidden"
            onClick={() => openModal(index)}
          >
            <img
              src={getImageSrc(image)}
              alt={image}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      {selectedImageIndex !== null && (
        <ImageModal
          isOpen={selectedImageIndex !== null}
          imageSrc={getImageSrc(images[selectedImageIndex])}
          altText={images[selectedImageIndex]}
          onClose={closeModal}
          onNavigate={navigateImage}
          text={text}
          setText={setText}
          fontSize={fontSize}
          setFontSize={setFontSize}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          circleSize={circleSize}
          setCircleSize={setCircleSize}
          showCircle={showCircle}
          setShowCircle={setShowCircle}
          textCircleSize={textCircleSize}
          setTextCircleSize={setTextCircleSize}
          kerning={kerning}
          setKerning={setKerning}
          imageOffsetX={imageOffsetX}
          setImageOffsetX={setImageOffsetX}
          imageOffsetY={imageOffsetY}
          setImageOffsetY={setImageOffsetY}
          imageZoom={imageZoom}
          setImageZoom={setImageZoom}
          textRotation={textRotation}
          setTextRotation={setTextRotation}
          textStraighten={textStraighten}
          setTextStraighten={setTextStraighten}
        />
      )}
    </div>
  );
}

export default ImageGallery;