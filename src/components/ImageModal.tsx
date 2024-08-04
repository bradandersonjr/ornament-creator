import React, { useEffect, useCallback, useState, useRef } from 'react';
import SidebarDrawer from './SidebarDrawer';
import html2canvas from 'html2canvas';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  text: string;
  setText: (text: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  circleSize: number;
  setCircleSize: (size: number) => void;
  showCircle: boolean;
  setShowCircle: (show: boolean) => void;
  textCircleSize: number;
  setTextCircleSize: (size: number) => void;
  kerning: number;
  setKerning: (kerning: number) => void;
  imageOffsetX: number;
  setImageOffsetX: (offset: number) => void;
  imageOffsetY: number;
  setImageOffsetY: (offset: number) => void;
  imageZoom: number;
  setImageZoom: (zoom: number) => void;
  textRotation: number;
  setTextRotation: (rotation: number) => void;
}

function ImageModal({
  isOpen,
  imageSrc,
  altText,
  onClose,
  onNavigate,
  text,
  setText,
  fontSize,
  setFontSize,
  strokeWidth,
  setStrokeWidth,
  fontFamily,
  setFontFamily,
  circleSize,
  setCircleSize,
  showCircle,
  setShowCircle,
  textCircleSize,
  setTextCircleSize,
  kerning,
  setKerning,
  imageOffsetX,
  setImageOffsetX,
  imageOffsetY,
  setImageOffsetY,
  imageZoom,
  setImageZoom,
  textRotation,
  setTextRotation
}: ImageModalProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
      case 'Escape':
        onClose();
        break;
    }
  }, [onNavigate, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawerOpen) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - imageOffsetX, y: e.clientY - imageOffsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawerOpen || !isDragging) return;
    const newOffsetX = e.clientX - dragStart.x;
    const newOffsetY = e.clientY - dragStart.y;
    setImageOffsetX(newOffsetX);
    setImageOffsetY(newOffsetY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isDrawerOpen) return;
    e.preventDefault();
    const zoomFactor = 0.1;
    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
    setImageZoom((prevZoom) => Math.max(0.1, Math.min(3, prevZoom + delta)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const radius = circleSize / 2;
  const textRadius = textCircleSize / 2;
  const textPath = `M${50 - textRadius},50 A${textRadius},${textRadius} 0 0,0 ${50 + textRadius},50`;

  const kernedText = text.split('').join(String.fromCharCode(8202).repeat(kerning));

  const copyImageToClipboard = useCallback(async () => {
    if (imageRef.current) {
      try {
        const canvas = await html2canvas(imageRef.current, {
          ignoreElements: (element) => element.classList.contains('ignore-capture')
        });
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]);
          }
        }, 'image/png', 1);
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    } else {
      console.error('Image reference not found');
    }
  }, []);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawerOpen) {
      e.preventDefault();
      copyImageToClipboard();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50">
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        text={text}
        onTextChange={setText}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        strokeWidth={strokeWidth}
        onStrokeWidthChange={setStrokeWidth}
        fontFamily={fontFamily}
        onFontFamilyChange={setFontFamily}
        circleSize={circleSize}
        onCircleSizeChange={setCircleSize}
        showCircle={showCircle}
        onShowCircleChange={setShowCircle}
        textCircleSize={textCircleSize}
        onTextCircleSizeChange={setTextCircleSize}
        kerning={kerning}
        onKerningChange={setKerning}
        imageOffsetX={imageOffsetX}
        onImageOffsetXChange={setImageOffsetX}
        imageOffsetY={imageOffsetY}
        onImageOffsetYChange={setImageOffsetY}
        imageZoom={imageZoom}
        onImageZoomChange={setImageZoom}
        onCaptureImage={copyImageToClipboard}
        textRotation={textRotation}
        onTextRotationChange={setTextRotation}
      />
      <div className="flex-grow flex items-center justify-center">
        <div 
          ref={imageRef}
          className={`relative max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl ${isDrawerOpen ? 'cursor-move' : 'cursor-default'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
        >
          <img 
            src={imageSrc} 
            alt={altText} 
            className="max-w-full max-h-full object-contain"
            style={{
              transform: `translate(${imageOffsetX}px, ${imageOffsetY}px) scale(${imageZoom})`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            draggable={false}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="absolute inset-0" viewBox="0 0 100 100" width="100%" height="100%">
              {showCircle && isDrawerOpen && (
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="red"
                  strokeWidth="0.5"
                  className="ignore-capture"
                />
              )}
              <path id="textPath" d={textPath} fill="none" />
              <text
                fontSize={`${fontSize / 10}px`}
                fontFamily={fontFamily}
                stroke="white"
                strokeWidth={strokeWidth / 10}
                strokeLinejoin="round"
                strokeLinecap="round"
                transform={`rotate(${textRotation}, 50, 50)`}
              >
                <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                  {kernedText}
                </textPath>
              </text>
              <text
                fontSize={`${fontSize / 10}px`}
                fontFamily={fontFamily}
                fill="black"
                transform={`rotate(${textRotation}, 50, 50)`}
              >
                <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                  {kernedText}
                </textPath>
              </text>
            </svg>
          </div>
          <button
            onClick={onClose}
            className={`btn btn-circle btn-sm absolute top-2 right-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ignore-capture`}
          >
            ✕
          </button>
          <button
            onClick={toggleDrawer}
            className={`btn btn-circle btn-sm absolute top-2 left-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ignore-capture`}
          >
            ☰
          </button>
          <button
            onClick={() => onNavigate('prev')}
            className={`btn btn-circle btn-sm absolute top-1/2 left-2 transform -translate-y-1/2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ignore-capture`}
          >
            ←
          </button>
          <button
            onClick={() => onNavigate('next')}
            className={`btn btn-circle btn-sm absolute top-1/2 right-2 transform -translate-y-1/2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ignore-capture`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
    