"use client";

import { useProduct } from "@/hook/product/useProduct";
import Loading from "@/component/ui/loading";
import React from "react";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
    const { id } = React.use(params);
  const { data: product, isLoading, isError } = useProduct({ id });

  if (isLoading) return <Loading />;
  if (isError || !product) return <p>Product not found</p>;

  return (
    <div className="pr-[100px] pl-[100px] pt-[72px]">
      <div className="flex gap-8">
        <img
          src={product.cover_image}
          alt={product.name}
          className="w-[400px] h-[400px] object-contain rounded-[10px]"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] font-semibold">{product.name}</h1>
          <p className="text-[24px] font-medium">${product.price}</p>
          <p className="text-[16px] text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
