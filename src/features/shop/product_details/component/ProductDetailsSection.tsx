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
      <div className="flex flex-col gap-[21px]">
      <h1 className="text-poppins-semibold-32">
        {product.name}
      </h1>
      <p className="text-poppins-semibold-32 ">
        ${product.price}
      </p>
      </div>
   


      <div className="flex flex-col gap-12 mt-4">
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
           <QuantitySelector
        quantity={quantity}
        onSetQuantity={onSetQuantity}
        maxQuantity={product.quantity}
      />
      </div>

   


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
    </div>
  );
};

export default ProductDetailsSection;
