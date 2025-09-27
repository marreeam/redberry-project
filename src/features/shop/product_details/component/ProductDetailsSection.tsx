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
    <div className="flex flex-col gap-[56px] p-4 w-[704px]">
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
        maxQuantity={10}
      />
      </div>

   


      <PrimaryButton
      text="Add to cart"
        onClick={onAddToCart}
        disabled={!selectedColor || !selectedSize}
      >
       
      </PrimaryButton>

<hr className="text-[#E1DFE1]"/>

<div className="flex flex-col gap-[17px] ">
  <div className="flex justify-between">
  <h3 className="text-popins-20">Details</h3>
  {product.brand.image && (
          <img
            src={product.brand.image}
            alt={product.brand.name}
            className="h-6 w-auto ml-2 object-contain"
          />
        )}

  </div>

  <div className="flex flex-col  gap-[19px] text-[14px] text-[#3E424A]">
    <div className="flex gap-2">
        <p className="text-poppins-normal-16">Brand:</p>
        <span className="text-poppins-normal-16">
          {product.brand.name}
        </span>
        </div>
        {product.description && (
        <p className="font-normal text-[16px] leading-[150%]">{product.description}</p>
      )}
      </div>
    
   
    </div>
    </div>
  );
};

export default ProductDetailsSection;
