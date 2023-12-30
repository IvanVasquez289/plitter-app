"use client"
import { useRouter } from "next/navigation";
import React from "react";
import {FaFeather} from 'react-icons/fa'
const SidebarTweetButton = () => {
  const router = useRouter()
  return (
    <div onClick={()=> router.push('/')}>
        <div
        className="
                mt-6 
                lg:hidden 
                rounded-full 
                w-14 h-14 
                p-4 flex 
                items-center 
                justify-center 
                bg-sky-500 
                hover:bg-opacity-80 
                transition 
                cursor-pointer
            "
        >
            <FaFeather size={24} color='white'/>
        </div>
        <div
            className="
                hidden lg:block 
                bg-sky-500 
                text-center 
                rounded-full 
                px-4 
                py-2 
                hover:bg-opacity-80 
                transition 
                cursor-pointer
            "
        >
            <p className=" text-white text-xl">Tweet</p>
        </div>
    
    </div>
  );
};

export default SidebarTweetButton;
