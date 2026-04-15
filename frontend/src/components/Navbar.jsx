import { ShoppingBag } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { toast } from "sonner";
import { SetCart } from "@/redux/productSlice";

function Navbar() {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false;

  useEffect(() => {
    console.log("REDUX USER STATE:", user);
  }, [user]);

  // Add this useEffect after your other useEffects

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.data.success) {
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cart);
  return (
    <header className="bg-pink-50 sticky top-0 w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* {"Logo Section"} */}
        <div>
          <img src="/logo.png" alt="" className="w-[100px]" />
        </div>
        {/* nav Section */}
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>
            {user && (
              <Link to={`/profile/${user?.id || user?._id}`}>
                <li>Hello {user.firstName}</li>
              </Link>
            )}
            {admin && (
              <Link to="/dashboard/sales">
                <li>Dashboard</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <HugeiconsIcon
              icon={ShoppingBag}
              className="w-6 h-6 text-gray-800"
            />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {cart?.items?.length || 0}
            </span>
          </Link>
          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-pink-600 text-white cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
