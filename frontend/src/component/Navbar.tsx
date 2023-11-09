import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../facilities/productSlice";
import { setUserInfo } from "@/facilities/userSlice";
import { setLogin } from "@/facilities/loginSlice";
import type { RootState } from "../facilities/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { getMyProfile, logout } from "@/apis";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  //search query
  const [query, setQuery] = useState("");

  //handle search and set it to redux state
  const handleSearch = () => {
    dispatch(setKeyword(query));
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(getMyProfile(), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setUserInfo(data.user));
      dispatch(setLogin(true));
    } catch (error) {
      console.log(error);
      dispatch(
        setUserInfo({
          _id: "",
          name: "",
          email: "",
          password: "",
          soldItems: [],
          purchasedItems: [],
        })
      );
      dispatch(setLogin(false));
    }
  };
  useEffect(() => {
    console.log("first");
    fetchProfile();
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname.includes("/product");

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(logout(), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(
        setUserInfo({
          _id: "",
          name: "",
          email: "",
          password: "",
          soldItems: [],
          purchasedItems: [],
        })
      );
      dispatch(setLogin(false));
      navigate("/register");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
          Products
        </Link>
        <Link to={"/auction"} className="m-3 font-semibold">
          Auction
        </Link>
        <Link to={"/add/product"} className="m-3 font-semibold">
          Add Product
        </Link>
        <Link to={"/my/product"} className="m-3 font-semibold">
          My Product
        </Link>
        {userInfo.name != "" ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="m-3 font-semibold">{userInfo.name}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
