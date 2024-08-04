import React, { useState } from 'react';
import { twMerge } from "tailwind-merge";
import Toast from './Toast';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onTextChange: (text: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  fontFamily: string;
  onFontFamilyChange: (family: string) => void;
  circleSize: number;
  onCircleSizeChange: (size: number) => void;
  showCircle: boolean;
  onShowCircleChange: (show: boolean) => void;
  textCircleSize: number;
  onTextCircleSizeChange: (size: number) => void;
  kerning: number;
  onKerningChange: (kerning: number) => void;
  imageOffsetX: number;
  onImageOffsetXChange: (offset: number) => void;
  imageOffsetY: number;
  onImageOffsetYChange: (offset: number) => void;
  imageZoom: number;
  onImageZoomChange: (zoom: number) => void;
  onCaptureImage: () => void;
  textRotation: number;
  onTextRotationChange: (rotation: number) => void;
}

function SidebarDrawer({
  isOpen,
  onClose,
  text,
  onTextChange,
  fontSize,
  onFontSizeChange,
  strokeWidth,
  onStrokeWidthChange,
  fontFamily,
  onFontFamilyChange,
  circleSize,
  onCircleSizeChange,
  showCircle,
  onShowCircleChange,
  textCircleSize,
  onTextCircleSizeChange,
  kerning,
  onKerningChange,
  imageOffsetX,
  onImageOffsetXChange,
  imageOffsetY,
  onImageOffsetYChange,
  imageZoom,
  onImageZoomChange,
  onCaptureImage,
  textRotation,
  onTextRotationChange
}: SidebarDrawerProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const [showImageControls, setShowImageControls] = useState(false);

  const fontOptions = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 
    'Trebuchet MS', 'Arial Black', 'Impact'
  ];

  const handleCopyImage = async () => {
    try {
      await onCaptureImage();
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (error) {
      console.error('Error copying image:', error);
    }
  };

  return (
    <>
      <div className={twMerge(
        "fixed inset-y-0 left-0 z-50 w-96 bg-base-200 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h2 className="text-2xl font-bold">Image Editor</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">
          <div className="space-y-6">
            {/* Text Manipulation Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Text Manipulation</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="text" className="label">
                    <span className="label-text">Overlay Text</span>
                  </label>
                  <input
                    id="text"
                    name="text"
                    value={text}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder="Enter text"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label htmlFor="fontFamily" className="label">
                    <span className="label-text">Font Style</span>
                  </label>
                  <select
                    id="fontFamily"
                    value={fontFamily}
                    onChange={(e) => onFontFamilyChange(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="fontSize" className="label">
                    <span className="label-text">Font Size: {fontSize}px</span>
                  </label>
                  <input
                    id="fontSize"
                    type="range"
                    min="1"
                    max="200"
                    value={fontSize}
                    onChange={(e) => onFontSizeChange(Number(e.target.value))}
                    className="range range-primary range-sm"
                  />
                </div>

                <div>
                  <label htmlFor="strokeWidth" className="label">
                    <span className="label-text">Stroke Width: {strokeWidth}px</span>
                  </label>
                  <input
                    id="strokeWidth"
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={strokeWidth}
                    onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                    className="range range-primary range-sm"
                  />
                </div>

                <div>
                  <label htmlFor="kerning" className="label">
                    <span className="label-text">Kerning: {kerning}px</span>
                  </label>
                  <input
                    id="kerning"
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={kerning}
                    onChange={(e) => onKerningChange(Number(e.target.value))}
                    className="range range-primary range-sm"
                  />
                </div>

                <div>
                  <label htmlFor="textCircleSize" className="label">
                    <span className="label-text">Text Circle Size: {textCircleSize}%</span>
                  </label>
                  <input
                    id="textCircleSize"
                    type="range"
                    min="10"
                    max="100"
                    value={textCircleSize}
                    onChange={(e) => onTextCircleSizeChange(Number(e.target.value))}
                    className="range range-primary range-sm"
                  />
                </div>

                <div>
                  <label htmlFor="textRotation" className="label">
                    <span className="label-text">Text Rotation: {textRotation}°</span>
                  </label>
                  <input
                    id="textRotation"
                    type="range"
                    min="-180"
                    max="180"
                    value={textRotation}
                    onChange={(e) => onTextRotationChange(Number(e.target.value))}
                    className="range range-primary range-sm"
                  />
                  <div className="w-full flex justify-between text-xs px-2">
                    <span>-180°</span>
                    <span>0°</span>
                    <span>180°</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Manipulation Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Image Manipulation</h3>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Show Image Controls</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={showImageControls}
                    onChange={(e) => {
                      setShowImageControls(e.target.checked);
                      if (!e.target.checked) {
                        onShowCircleChange(false);
                      }
                    }}
                  />
                </label>
              </div>
              {showImageControls && (
                <div className="space-y-4 mt-4">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Show Circle</span>
                      <input
                        type="checkbox"
                        checked={showCircle}
                        onChange={(e) => onShowCircleChange(e.target.checked)}
                        className="checkbox"
                      />
                    </label>
                  </div>

                  {showCircle && (
                    <div>
                      <label htmlFor="circleSize" className="label">
                        <span className="label-text">Circle Size: {circleSize}%</span>
                      </label>
                      <input
                        id="circleSize"
                        type="range"
                        min="10"
                        max="100"
                        value={circleSize}
                        onChange={(e) => onCircleSizeChange(Number(e.target.value))}
                        className="range range-primary range-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="imageOffsetX" className="label">
                      <span className="label-text">Image X Offset: {imageOffsetX}px</span>
                    </label>
                    <input
                      id="imageOffsetX"
                      type="range"
                      min="-100"
                      max="100"
                      value={imageOffsetX}
                      onChange={(e) => onImageOffsetXChange(Number(e.target.value))}
                      className="range range-primary range-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="imageOffsetY" className="label">
                      <span className="label-text">Image Y Offset: {imageOffsetY}px</span>
                    </label>
                    <input
                      id="imageOffsetY"
                      type="range"
                      min="-100"
                      max="100"
                      value={imageOffsetY}
                      onChange={(e) => onImageOffsetYChange(Number(e.target.value))}
                      className="range range-primary range-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="imageZoom" className="label">
                      <span className="label-text">Image Zoom: {imageZoom}x</span>
                    </label>
                    <input
                      id="imageZoom"
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.01"
                      value={imageZoom}
                      onChange={(e) => onImageZoomChange(Number(e.target.value))}
                      className="range range-primary range-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-auto p-4 border-t border-base-300">
          <button onClick={handleCopyImage} className="btn btn-primary w-full">
            Copy Image to Clipboard
          </button>
        </div>
      </div>
      <Toast message="Image copied to clipboard!" type="success" isVisible={toastVisible} />
    </>
  );
}

export default SidebarDrawer;