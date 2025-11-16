
import React from 'react';

interface ImageCardProps {
  imageUrl: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-500/50">
      <img
        src={imageUrl}
        alt="Generated AI"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <a 
          href={imageUrl} 
          download="generated-image.jpg" 
          className="bg-white text-black font-bold py-2 px-4 rounded-full transition-colors hover:bg-blue-200"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
