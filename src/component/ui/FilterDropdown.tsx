"use client";

import {  Fragment, useRef } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import  PrimaryButton from "./button";
import React, { useState } from "react";
import Input from "./Input";
interface FilterDropdownProps {
  priceFrom?: number;
  priceTo?: number;
  onApply: (from?: number, to?: number) => void;
}

const FilterDropdown = ({ priceFrom, priceTo, onApply }: FilterDropdownProps) => {
  const [from, setFrom] = useState<number | undefined>(priceFrom);
  const [to, setTo] = useState<number | undefined>(priceTo);

  return (
    <Popover className="relative">
  {({ open }: { open: boolean }) => (
        <>
          <PopoverButton className="flex items-center gap-2  .text-poppins-normal-16">
            <img src="/svg/filter.svg" alt="Filter icon" width={24} height={24} />
            Filter
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <PopoverPanel className="absolute z-10 mt-2 w-[392px] right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4">

              <div className="flex flex-col gap-5 pt-2.5">
            <label className=" .text-poppins-semibold-16 ">Select price</label>
              <div className="flex flex-col gap-2.5 items-end">
          
          <div className="flex gap-2.5">
                <Input
                  type="number"
                  value={from ?? ""}
                  onChange={(e) => setFrom(Number(e.target.value))}
                  placeholderText="From"
                  className="border border-[#E1DFE1] rounded-[8px] p-2 w-full h-42px"
                />

  
                <Input
                  type="number"
                  value={to ?? ""}
                  onChange={(e) => setTo(Number(e.target.value))}
                  placeholderText="To"
                  className="border rounded p-2 w-full"
                />
    </div>
          <div className="w-[124px] flex items-end">
                    <PrimaryButton text="Apply" onClick={() => onApply(from, to)} />
            </div>
            </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default FilterDropdown;
