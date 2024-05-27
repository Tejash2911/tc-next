"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { publicRequest, userRequest } from "@/utils/axiosRequestMethods";
import { logoutUser } from "@/lib/features/user/userSlilce";
import { setProduct } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state?.user?.currentUser);
  const cartSize = useAppSelector((state) => state?.cart?.quantity);

  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState();

  const handleSearch = async (e) => {
    if (!e.target.value) {
      return setSearchProducts([]);
    }
    try {
      const { data } = await publicRequest.get(`/api/products/search/${e.target.value}`);
      setSearchProducts(data);
    } catch (error) {
      const errorMessage = error.response?.status === 404 ? "No Products Found" : "Unable To Find Products";
      setSearchProducts([{ title: errorMessage }]);
    }
  };

  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!user) return;
    setIsAuthenticated(true);
    const fetchCartSize = async () => {
      try {
        const { data } = await userRequest.get("api/cart/size");
        dispatch(setProduct(data.size));
      } catch (error) {
        console.error("Error fetching cart size:", error);
      }
    };
    fetchCartSize();
  }, [dispatch, user, isAuthenticated]);

  return (
    <div className="shadow-md sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md font-Urbanist">
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="flex-1 hidden md:flex items-center">
          <h1 className="font-semibold text-center md:text-left text-3xl tracking-tight">
            <Link href="/">Title.</Link>
          </h1>
        </div>
        <div className="flex-1">
          <div className="border border-gray-500 flex items-center justify-center rounded-lg p-[5px] relative">
            <input type="text" name="search" className="w-full outline-none bg-transparent" placeholder="Search" onChange={handleSearch}></input>
            <SearchIcon className="text-gray-500 text-lg cursor-pointer" />
            <ul className="absolute w-full top-10 bg-white rounded-b-[1vmax] backdrop:blur-lg shadow-md overflow-hidden">
              {searchProducts?.map((p) => {
                return (
                  <li key={p._id} className="list-none text-left p-1 w-full cursor-pointer hover:bg-[#ededeb]" onClick={() => handleClick(p._id)}>
                    {p.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          {!isAuthenticated ? (
            <>
              <div className="cursor-pointer ml-5 md:ml-1 px-2">
                <Link href="/register">Sign Up</Link>
              </div>
              <div className="cursor-pointer ml-5 md:ml-1 px-2">
                <Link href="/login">Log In</Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col cursor-pointer select-none" onClick={() => setOptionIsOpen(!optionIsOpen)}>
                <span className="text-base font-normal">hello, {user?.firstName} </span>
                <span className="font-bold relative flex items-center">Account{optionIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                <div className={`${optionIsOpen ? "block" : "hidden"}`}>
                  <div className="bg-gray-100 top-16 shadow-lg border border-gray-200 flex flex-col absolute transform -translate-x-1/3 w-40">
                    <div className="absolute left-1/2 top-1 w-2.5 h-2.5 bg-gray-100 transform -translate-x-1/2 -translate-y-full rotate-45"></div>
                    <span className="z-10 py-2 px-4 bg-transparent text-black flex items-center justify-start gap-2 hover:font-semibold" onClick={() => router.push("/setting")}>
                      <SettingsIcon /> Setting
                    </span>
                    <span className="z-10 py-2 px-4 bg-transparent text-black flex items-center justify-start gap-2 hover:font-semibold" onClick={() => router.push("/orders")}>
                      <LocalMallIcon /> Orders
                    </span>
                    <span className="z-10 py-2 px-4 bg-transparent text-black flex items-center justify-start gap-2 hover:font-semibold" onClick={handleLogout}>
                      <LogoutIcon /> Logout
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="ml-5 cursor-pointer relative">
            <ShoppingCartOutlinedIcon onClick={() => router.push("/cart")} />
            <span className="absolute top-0 right-0 bg-black transform translate-x-1/2 -translate-y-1/2 text-white rounded-full w-5 h-5 grid place-content-center">{cartSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
