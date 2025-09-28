"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { useCart } from "@/features/shop/cartModal/hook/useCart";
import cartModal from "@/features/shop/cartModal";
import CartModal from "@/features/shop/cartModal";


const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const isHomePage = pathname === "/";
  const isRegisterPage = pathname === "/register";
  const isLoginPage = pathname === "/login";
  const { data: user } = useCurrentUser();
  // const { data: cart } = useCart({ enabled: !!user });
  const [mounted, setMounted] = useState(false);
  const [isCartModalOpen,setIsCartModalOpen]=useState(false);

  const handleCartClick = () => {
    if (!user) {
      alert("Please log in to view your cart");
      router.push("/login");
      return;
    }
    setIsCartModalOpen(true);
  }
    
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
         
 
          <div className="flex items-center gap-2">


            {isRegisterPage? (
              <button
                onClick={() => router.push("/login")}
                className="font-poppins font-medium text-[12px] leading-[100%] tracking-[0%]"
              >
                Login
              </button>
            )
          :
          isLoginPage? (
            <button
              onClick={() => router.push("/register")}
              className="font-poppins font-medium text-[12px] leading-[100%] tracking-[0%]"
            >
              Register
            </button>
          )
          :
          <div className="flex items-center gap-5">
          <img
            src="/img/shopping-cart.png"
            alt="Shopping Cart"
            className="w-6 h-6 cursor-pointer"
            onClick={handleCartClick}
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
          }

          </div>
      
      </div>
      {
      isCartModalOpen && 
         <CartModal onClose={()=>{setIsCartModalOpen(false)}}/>
        }
      

    </header>
  );
};

export default Header;
