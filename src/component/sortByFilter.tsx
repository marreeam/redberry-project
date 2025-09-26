"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { Fragment } from "react";

export interface SortOption {
  label: string;
  value: string;
}

interface SortByFilterProps {
  selected?: SortOption;
  options: SortOption[];
  onChange: (value: string) => void;
}

const SortByFilter = ({ selected, options, onChange }: SortByFilterProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center gap-1 text-[#10151F]  .text-poppins-normal-16">
        {selected ? selected.label : "Sort By"}
        <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-[223px] origin-top-right bg-white border gap-2 pb-4  .text-poppins-normal-16 border-[#E1DFE1] rounded-[8px] shadow-lg focus:outline-none z-10">
          <div className="flex flex-col">
            <p className="pl-4 pb-2 pt-4   .text-poppins-semibold-16">
              Sort by
            </p>
            {options.map((option) => (
              <MenuItem  key={option.value}>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={() => onChange(option.value)}
                    className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm`}
                  >
                    {option.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default SortByFilter;
