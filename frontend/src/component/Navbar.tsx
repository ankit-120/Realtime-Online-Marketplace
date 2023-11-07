import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../facilities/productSlice";
import type { RootState } from "../facilities/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  //search query
  const [query, setQuery] = useState("");

  //handle search and set it to redux state
  const handleSearch = () => {
    dispatch(setKeyword(query));
  };

  useEffect(() => {
    // console.log("cjeck");
  });

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span
            onClick={handleSearch}
            className="absolute right-2 top-2 text-2xl"
          >
            <AiOutlineSearch />
          </span>
        </div>
      )}

      <div className="flex ">
        <Link to={"/"} className="m-3 font-semibold">
          Home
        </Link>
        <Link to={"/products"} className="m-3 font-semibold">
          Products
        </Link>
        <Link to={"/add/product"} className="m-3 font-semibold">
          Add Product
        </Link>
        <Link to={"/auction"} className="m-3 font-semibold">
          Auction
        </Link>
        {userInfo.name != "" ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="m-3 font-semibold">{userInfo.name}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="m-3 font-semibold">
            <Link to={"/register"}>Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
