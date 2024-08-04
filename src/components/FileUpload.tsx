import { useState } from 'react';
import { Label, Button } from 'flowbite-react';
import SubfolderCards from './SubfolderCards';
import ImageGallery from './ImageGallery';
import SidebarDrawer from './SidebarDrawer';

declare global {
  interface Window {
    electron: {
      openFolder: () => Promise<string>;
      readDir: (path: string) => Promise<{ name: string; type: string }[]>;
      setFullScreen: () => void;
      resetWindowSize: () => void;
    };
  }
}

function FileUpload() {
  const [items, setItems] = useState<{ name: string; type: string }[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFolderSelect = async (path?: string) => {
    try {
      const folderPath = path || await window.electron.openFolder();
      if (folderPath) {
        const contents = await window.electron.readDir(folderPath);
        setItems(contents);
        setCurrentPath(folderPath);
        setShowContent(true);
        if (!path) {
          setPathHistory([folderPath]);
        }
        window.electron.setFullScreen();
      }
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  const handleNavigate = (newPath: string) => {
    setPathHistory(prev => [...prev, newPath]);
    handleFolderSelect(newPath);
  };

  const handleResetWindowSize = () => {
    setShowContent(false);
    setPathHistory([]);
    window.electron.resetWindowSize();
  };

  const handleBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = [...pathHistory];
      newHistory.pop();
      setPathHistory(newHistory);
      handleFolderSelect(newHistory[newHistory.length - 1]);
    } else {
      handleResetWindowSize();
    }
  };

  if (showContent) {
    const folders = items.filter(item => item.type === 'directory').map(item => item.name);
    const images = items.filter(item => item.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(item.name)).map(item => item.name);
  
    return (
      <div className="w-full">
        <div className="mb-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg sticky top-0 z-10">
          <Button onClick={handleBack}>
            Back
          </Button>
          <p className="text-gray-600 dark:text-gray-400 truncate">{currentPath}</p>
          {images.length > 0 && (
            <Button onClick={() => setIsDrawerOpen(true)}>Open Sidebar</Button>
          )}
        </div>
        <div className="mt-4">
          {folders.length > 0 && (
            <SubfolderCards items={folders} basePath={currentPath} onNavigate={handleNavigate} />
          )}
          {images.length > 0 && (
            <ImageGallery images={images} basePath={currentPath} />
          )}
        </div>
        {images.length > 0 && (
          <SidebarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="folder-upload"
        className="flex h-[512px] w-[512px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        onClick={() => handleFolderSelect()}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to select a folder</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Select a folder containing files</p>
        </div>
      </Label>
    </div>
  );
}

export default FileUpload;