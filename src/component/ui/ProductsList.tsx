"use client";

import React from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: number;
  cover_image: string;
}

interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col gap-3 cursor-pointer">
          <img
            src={product.cover_image}
            alt={product.name}
            className="w-full h-[350px] object-contain rounded-[10px]"
          />
          <h2 className="font-medium text-[18px] leading-[100%] tracking-[0%]">
            {product.name}
          </h2>
          <p className="font-medium text-[18px] leading-[100%] tracking-[0%]">
            ${product.price}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
