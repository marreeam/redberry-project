"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCurrentUser } from "@/hook/useCurrentUser";


const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const isHomePage = pathname === "/";
  const isRegisterPage = pathname === "/register";
  const isLoginPage = pathname === "/login";
  const { data: user } = useCurrentUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; 
  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  return (
    <header className="flex justify-between items-center px-[100px] py-2 h-[80px] bg-white sticky top-0 z-50">
      <div
        className="flex items-center cursor-pointer gap-1"
        onClick={() => router.push("/")}
      >
        <img
          src="/svg/HandEye.svg"
          alt="RedSeam Clothing Logo"
          className="h-6 mr-2"
        />
        <span className="font-poppins font-semibold text-base leading-none tracking-normal">
          RedSeam Clothing
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {isHomePage ? (
          <div className="flex items-center gap-5">
            <img
              src="/img/shopping-cart.png"
              alt="Shopping Cart"
              className="w-6 h-6 cursor-pointer"
            />

            <div
              className="w-10 h-10 rounded-full cursor-pointer overflow-hidden"
              onClick={handleProfileClick}
            >
{mounted && user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/svg/user.svg"
                  alt="Default User"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <img
              src="/svg/user.svg"
              alt="User Icon"
              className="w-5 h-5 cursor-pointer"
            />

            {isRegisterPage && (
              <button
                onClick={() => router.push("/login")}
                className="font-poppins font-medium text-[12px] leading-[100%] tracking-[0%]"
              >
                Login
              </button>
            )}

            {isLoginPage && (
              <button
                onClick={() => router.push("/register")}
                className="font-poppins font-medium text-[12px] leading-[100%] tracking-[0%]"
              >
                Register
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
