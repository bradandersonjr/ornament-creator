import React from 'react';
import { Card } from 'flowbite-react';

interface SubfolderCardsProps {
  subfolders: string[];
  basePath: string;
}

function SubfolderCards({ subfolders, basePath }: SubfolderCardsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Subfolders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subfolders.map((subfolder, index) => (
          <a
            key={index}
            href={`#${encodeURIComponent(`${basePath}/${subfolder}`)}`}
            className="block"
          >
            <Card className="h-0 pb-[100%] relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  {subfolder}
                </h5>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SubfolderCards;