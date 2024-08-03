import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubfolderCards from './SubfolderCards';

interface FolderItem {
  name: string;
  type: 'folder' | 'image';
}

function FolderContent() {
  const { '*': folderPath } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<FolderItem[]>([]);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const fullPath = `/${folderPath}`;
        const contents = await window.electron.readDir(fullPath);
        setItems(contents);
        setCurrentPath(fullPath);
      } catch (error) {
        console.error('Error reading folder contents:', error);
      }
    };

    fetchFolderContents();
  }, [folderPath]);

  const handleBackClick = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    navigate(`/folder${parentPath}`);
  };

  const subfolders = items.filter(item => item.type === 'folder').map(item => item.name);
  const images = items.filter(item => item.type === 'image');

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={handleBackClick} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
      <SubfolderCards subfolders={subfolders} basePath={currentPath} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={`file://${currentPath}/${image.name}`}
              alt={image.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FolderContent;