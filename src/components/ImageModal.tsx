import React, { useEffect, useCallback } from 'react';
import { Modal } from 'flowbite-react';
import path from 'path-browserify';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  basePath: string;
  onNavigate: (direction: 'prev' | 'next') => void;
}

function ImageModal({ isOpen, onClose, images, currentIndex, basePath, onNavigate }: ImageModalProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      onNavigate('prev');
    } else if (event.key === 'ArrowRight') {
      onNavigate('next');
    } else if (event.key === 'Escape') {
      onClose();
    }
  }, [onNavigate, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <Modal 
      show={isOpen} 
      onClose={onClose} 
      size="7xl"
      popup
      dismissible
    >
      <Modal.Body className="p-0">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75" onClick={onClose}>
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
            onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
          >
            ←
          </button>
          <img
            src={`safe-file://${path.join(basePath, currentImage)}`}
            alt={currentImage}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
            onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
          >
            →
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;