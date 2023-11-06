import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname.includes("/products");
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-slate-200 shadow-md ">
      <div className="p-5 text-2xl font-bold">Realtime Store</div>

      {isHomePage && (
        <div className="relative">
          <Input
            placeholder="Search items..."
            className="w-64  py-2 pl-2 pr-10 outline-none"
          />
          <span className="absolute right-2 top-2 text-2xl">
            <AiOutlineSearch />
          </span>
        </div>
      )}

      <div className="flex ">
        <div className="m-3 font-semibold">Home</div>
        <div className="m-3 font-semibold">Products</div>
        <div className="m-3 font-semibold">Auction</div>
        <div className="m-3 font-semibold">Register</div>
      </div>
    </div>
  );
};

export default Navbar;
