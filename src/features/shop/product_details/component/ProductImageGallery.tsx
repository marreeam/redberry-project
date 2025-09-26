import React from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedImage: string | undefined;
  onSelectImage: (imageUrl: string) => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  selectedImage,
  onSelectImage,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            alt={`${productName} thumbnail`}
            className={`w-[121px] h-[161px] object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
              selectedImage === img ? "border-orange-500 scale-105" : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => onSelectImage(img)}
          />
        ))}
      </div>

      <div className="flex-shrink-0">
        <img
          src={selectedImage}
          alt={productName}
          className="w-[500px] h-[500px] object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;