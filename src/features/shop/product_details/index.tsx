"use client";

import React, { useEffect, useState } from "react";
import { useProduct } from "@/features/shop/product_details/hook/useProduct";
import { useParams } from "next/navigation";
import Loading from "@/component/ui/loading";
import ProductDetailsSection from "./component/ProductDetailsSection";
import { useAddToCart } from "../cartModal/hook/useAddToCart";
const ProductDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data: currentProduct, isLoading, isError } = useProduct({ id });
  const { addToCart, loading: addingToCart, error } = useAddToCart(id);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (currentProduct) {
      console.log("Fetched product:", currentProduct); 
    }
  }, [currentProduct]);


  useEffect(() => {
    if (!currentProduct) return;

    if (currentProduct.available_colors.length > 0) {
      setSelectedColor(currentProduct.available_colors[0]);
    }
    if (currentProduct.available_sizes.length > 0) {
      setSelectedSize(currentProduct.available_sizes[0]);
    }

    const initialColorIndex = 0;
    if (currentProduct.images[initialColorIndex]) {
      setSelectedImage(currentProduct.images[initialColorIndex]);
    } else {
      setSelectedImage(currentProduct.cover_image);
    }
  }, [currentProduct]);


  useEffect(() => {
    if (!currentProduct || !selectedColor) return;

    const colorIndex = currentProduct.available_colors.findIndex(
      (c) => c.toLowerCase() === selectedColor.toLowerCase()
    );

    if (colorIndex >= 0 && currentProduct.images[colorIndex]) {
      setSelectedImage(currentProduct.images[colorIndex]);
    }
  }, [selectedColor, currentProduct]);

  if (isLoading) return <Loading />;
  if (isError || !currentProduct) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;

    addToCart({
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };


  return (
    <div className="pr-[100px] pl-[100px] pt-[72px] flex gap-8">
      <div className="flex  gap-4">
      <div className="flex flex-col gap-2">
          {currentProduct.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={currentProduct.name}
              className={`w-[121px] h-[161px] object-contain rounded cursor-pointer border ${
                selectedImage === img ? "border-orange-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <img
          src={selectedImage || currentProduct.cover_image}
          alt={currentProduct.name}
          className="w-[703px] h-[837px] object-contain rounded-[10px]"
        />
       
      </div>

      <ProductDetailsSection
        product={currentProduct}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        quantity={quantity}
        onSetQuantity={setQuantity}
        onAddToCart={handleAddToCart} 
        addingToCart={addingToCart}   
        error={error}     
      />
    </div>
  );
};

export default ProductDetailPage;
