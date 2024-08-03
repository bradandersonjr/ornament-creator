import React from 'react';
import { Card } from 'flowbite-react';

interface SubfolderCardsProps {
  items: string[];
  basePath: string;
  onNavigate: (newPath: string) => void;
}

function SubfolderCards({ items, basePath, onNavigate }: SubfolderCardsProps) {
  const handleClick = (item: string) => {
    const newPath = `${basePath}/${item}`;
    onNavigate(newPath);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)} className="cursor-pointer">
            <Card className="h-0 pb-[100%] relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  {item}
                </h5>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubfolderCards;