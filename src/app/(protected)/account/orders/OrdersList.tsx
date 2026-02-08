"use client";

import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: {
    title: string;
    price: number;
    quantity: number;
  }[];
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (!orders.length) {
    return <p className="text-gray-500">You don’t have any orders yet.</p>;
  }

  return (
    <section className="space-y-4">
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </section>
  );
};

export default OrdersList;
