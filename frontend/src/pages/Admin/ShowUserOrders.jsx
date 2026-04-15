import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowUserOrders() {
  const params = useParams();
  const [userOrder, setUserOrder] = useState([]);

  const getUserOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Fetching orders for userId:", params.userId);
    console.log("Access token exists:", !!accessToken);

    const res = await axios.get(
      `${import.meta.env.VITE_URL}/orders/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.success) {
      console.log("Orders found:", res.data.orders);
      setUserOrder(res.data.orders);
    }
  };
  useEffect(() => {
    if (params.userId) {
      console.log("User ID from params:", params.userId);
      getUserOrder();
    }
  }, [params.userId]);
  console.log(userOrder);
  return (
    <>
      {userOrder && userOrder.length > 0 ? (
        <OrderCard userOrder={userOrder} />
      ) : userOrder && userOrder.length === 0 ? (
        <div className="text-center py-10">This user has no orders yet.</div>
      ) : (
        <div className="text-center py-10">Loading User Orders...</div>
      )}
    </>
  );
}

export default ShowUserOrders;
