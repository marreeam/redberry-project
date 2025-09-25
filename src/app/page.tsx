// ProductsPage.tsx
"use client";

import React, { useState } from "react";
import { useProducts } from "@/hook/product/useProducts";
import SortByFilter, { SortOption } from "@/component/sortByFilter";
import Loading from "@/component/ui/loading";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [priceFrom, setPriceFrom] = useState<number | undefined>();
  const [priceTo, setPriceTo] = useState<number | undefined>();
  const [sort, setSort] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);

  const { data, isLoading, isError } = useProducts({
    page,
    priceFrom,
    priceTo,
    sort,
  });

  if (isLoading) return <Loading/>;
  if (isError) return <p>Error loading products</p>;

  const products = data?.data || [];
  const { current_page, last_page, per_page, total } = data?.meta || {};

  const startIndex = (current_page - 1) * per_page + 1;
  const endIndex = Math.min(current_page * per_page, total);

  const sortOptions: SortOption[] = [

    { label: "New Products First", value: "created_at" },
    { label: "Price, low to high", value: "price" },
    { label: "Price, high to low", value: "-price" },
  ];

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handleFilterApply = (from?: number, to?: number) => {
    setPriceFrom(from);
    setPriceTo(to);
    setPage(1);
  };

  return (
    <div className="pr-[100px] pl-[100px] pt-[72px]">
      <div className="flex justify-between mb-8">
        <h1 className="font-semibold text-[42px] leading-[100%] tracking-[0%]">
          Products
        </h1>

        <div className="flex gap-8 justify-center items-center">
          <p className="font-normal text-[12px] leading-[100%] tracking-[0%] text-[#3E424A]">
            Showing {startIndex}–{endIndex} of {total} results
          </p>

          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 font-normal text-[16px] leading-[100%] tracking-[0%]"
          >
            <img src="/svg/filter.svg" alt="Filter icon" width={24} height={24} />
            Filter
          </button>

          <div className="flex gap-2 items-center">
            <SortByFilter
              selected={sortOptions.find(o => o.value === sort)}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-3">
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
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={current_page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {current_page} of {last_page}
        </span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, last_page))}
          disabled={current_page === last_page}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
