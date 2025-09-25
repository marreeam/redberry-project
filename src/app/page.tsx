"use client";

import React, { useState } from "react";
import { useProducts } from "@/hook/product/useProducts";
import SortByFilter, { SortOption } from "@/component/sortByFilter";

import Loading from "@/component/ui/loading";
import ProductsList from "@/component/ui/ProductsList";
import Pagination from "@/component/ui/pagination";
import FilterDropdown  from "@/component/ui/FilterDropdown";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [priceFrom, setPriceFrom] = useState<number | undefined>();
  const [priceTo, setPriceTo] = useState<number | undefined>();
  const [sort, setSort] = useState<string>("created_at");
  const [showFilter, setShowFilter] = useState(false);

  const { data, isLoading, isError } = useProducts({ page, priceFrom, priceTo, sort });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading products</p>;

  const products = data?.data || [];
  const { current_page, last_page, total, per_page } = data.meta;
  const startIndex = (current_page - 1) * per_page + 1;
  const endIndex = Math.min(current_page * per_page, total);

  const sortOptions: SortOption[] = [
    { label: "New Products First", value: "created_at" },
    { label: "Price, low to high", value: "price" },
    { label: "Price, high to low", value: "-price" },
  ];

  return (
    <div className="pr-[100px] pl-[100px] pt-[72px]">
      <div className="flex justify-between mb-8">
        <h1 className="font-semibold text-[42px] leading-[100%] tracking-[0%]">Products</h1>

        <div className="flex gap-8 justify-center items-center">
          <p className="font-normal text-[12px] leading-[100%] tracking-[0%] text-[#3E424A]">
            Showing {startIndex}–{endIndex} of {total} results
          </p>

          <FilterDropdown
    priceFrom={priceFrom}
    priceTo={priceTo}
    onApply={(from, to) => {
      setPriceFrom(from);
      setPriceTo(to);
      setPage(1);
    }}
  />

          <SortByFilter
            selected={sortOptions.find((o) => o.value === sort)}
            options={sortOptions}
            onChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <ProductsList products={products} />

      <Pagination
        currentPage={current_page}
        lastPage={last_page}
        onPageChange={setPage}
      />


    </div>
  );
};

export default ProductsPage;
