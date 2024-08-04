import React from 'react';

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

  const folderName = basePath.split(/[/\\]/).pop() || 'Contents';

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-base-content">{folderName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)} className="cursor-pointer">
            <div className="card bg-base-200 hover:bg-base-300 transition-colors h-0 pb-[100%] relative">
              <div className="card-body absolute inset-0 flex items-center justify-center p-4">
                <h5 className="card-title text-base-content text-center">
                  {item}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubfolderCards;