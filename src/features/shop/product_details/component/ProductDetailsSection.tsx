import React from "react";
import { Product } from "@/types/Product";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import PrimaryButton from "@/component/ui/button";

interface ProductDetailsSectionProps {
  product: Product;
  selectedColor: string | undefined;
  onSelectColor: (color: string) => void;
  selectedSize: string | undefined;
  onSelectSize: (size: string) => void;
  quantity: number;
  onSetQuantity: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  product,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
  quantity,
  onSetQuantity,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col gap-5 p-4 w-[704px]">
      <h1 className="text-poppins-semibold-32">
        {product.name}
      </h1>
      <p className="text-poppins-semibold-32 ">
        ${product.price}
      </p>

      {product.description && (
        <p className="text-[16px] text-gray-700">{product.description}</p>
      )}


      <div className="flex items-center gap-2 text-[14px] text-gray-500">
        <p className="font-medium">Brand:</p>
        <span className="font-semibold text-gray-700">
          {product.brand.name}
        </span>
        {product.brand.image && (
          <img
            src={product.brand.image}
            alt={product.brand.name}
            className="h-6 w-auto ml-2 object-contain"
          />
        )}
      </div>


      <div className="flex flex-col gap-4 mt-4">
        <ColorSelector
          availableColors={product.available_colors}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
        <SizeSelector
          availableSizes={product.available_sizes}
          selectedSize={selectedSize}
          onSelectSize={onSelectSize}
        />
      </div>

      <QuantitySelector
        quantity={quantity}
        onSetQuantity={onSetQuantity}
        maxQuantity={product.quantity}
      />


      <PrimaryButton
        onClick={onAddToCart}
        className="mt-6 w-full max-w-xs"
        disabled={!selectedColor || !selectedSize || product.quantity <= 0}
      >
        {product.quantity <= 0
          ? "Out of stock"
          : !selectedColor || !selectedSize
          ? "Select options"
          : "Add to Cart"}
      </PrimaryButton>

      {product.release_year && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-[20px] font-semibold mb-3">Product Details</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Release year: {product.release_year}</li>
            <li>Material: High quality cotton blend</li>
            <li>Care: Machine washable</li>
            <li>Origin: Made in Italy</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsSection;
