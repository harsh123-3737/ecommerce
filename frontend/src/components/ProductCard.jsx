import React from "react";
import { Button } from "./ui/Button";
import { ShoppingBag } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { ConsoleFreeIcons } from "@hugeicons/core-free-icons";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetCart } from "@/redux/productSlice";

function ProductCard({ product, loading }) {
  const { productImg, productPrice, productName } = product;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addtoCart = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product added to Cart");
        dispatch(SetCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max ">
      <div className="w-full h-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <img
            onClick={() => navigate(`/products/${product._id}`)}
            src={productImg[0]?.url}
            alt=""
            className="w-full h-full transition-transform duration-300 hover:scale-105"
          ></img>
        )}
      </div>
      {loading ? (
        <div className="px-2 space-y-2 my-2">
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[100px] h-4" />
          <Skeleton className="w-[150px] h-8" />
        </div>
      ) : (
        <div className="px-2 space-y-1">
          <h1 className="font-semibold h-12 line-clamp-2">{productName}</h1>
          <h2 className="font-bold">₹{productPrice}</h2>
          <Button
            onClick={() => addtoCart(product._id)}
            className="bg-pink-600 mb-3 w-full"
          >
            <ShoppingBag />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
