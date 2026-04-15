import Breadcrums from "@/components/Breadcrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import axios from "axios";
import React, { useEffect, useState } from "react"; // Added useState
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const params = useParams();
  const productId = params.id; // Your variable is called productId
  const { products } = useSelector((store) => store.product);

  // Create a local state to hold the product data
  const [localProduct, setLocalProduct] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      // 1. Check if the product exists in Redux first
      const productFromRedux = products?.find((p) => p._id === productId);

      if (productFromRedux) {
        setLocalProduct(productFromRedux);
      } else {
        // 2. If Redux is empty (Array 0), fetch directly from API
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/products/${productId}`,
          );
          if (response.data.success) {
            setLocalProduct(response.data.product);
          }
        } catch (error) {
          console.log("Error fetching product details:", error);
        }
      }
    };

    if (productId) {
      getProductData();
    }
  }, [productId, products]);

  // Use localProduct for rendering
  if (!localProduct) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  return (
    <div className="pt-10 py-10 max-w-7xl mx-auto">
      <Breadcrums product={localProduct} />
      <div className="mt-10 grid grid-cols-2 items-start">
        <ProductImg images={localProduct?.productImg} />
        <ProductDesc product={localProduct} />
      </div>
    </div>
  );
}

export default SingleProduct;
