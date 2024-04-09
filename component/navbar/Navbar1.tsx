"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from '../../pages/logo.png'
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar1 = () => {
  const [active, setActive] = React.useState<string | null>(null);

  const toggleNavbar = (): void => {
    setActive(!active ? "active" : null);
  };
  return (
    <nav className="bg-transparent w-full py-4 border-b-transparent left-0 fixed top-0 shadow-lg shadow-[#2A0E61]/50 backdrop-blur-3xl z-50 px-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-around">
          <div className="flex items-center">
            <div className="flex items-center justify-center flex-shrink-0 gap-4">
          
                <Link href="https://basegains.com/">
                  <Image
                    src={logo}
                    width={30}
                    height={30}
                    className="lg:w-16 rounded-full border-4 border-black"
                    alt=""
                  />
                </Link>
            
            
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-10">
                
            <ConnectButton />
              <Link
                href="/claimBaseGains"
                className="text-lg lg:text-2xl px-6 py-2 rounded-full border-[2px]  border-orange-500"
              >
                claim
              </Link>
              
            </div>
          </div>
          <div className="md:hidden flex items-center ">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {active ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {active && (
        <div className="md-hidden">
          <div className="flex flex-col justify-center items-center p-5 gap-4 sm:px-3">
          <Link
                href="/Claim"
                className="text-lg lg:text-2xl px-6 py-2 rounded-full border-[2px] border-orange-500"
              >
                claim
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar1;
