// app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import CartItemsList from "@/components/cart/CartItemsList/CartItemsList";
import OrderSummary from "@/components/cart/OrderSummary/OrderSummary";

const CartPage = () => {
  const { items } = useCartStore();
  console.log("Cart items:", items); // Debug: log cart items

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <CartItemsList />
          <OrderSummary />
        </div>
      )}
    </div>
  );
};

export default CartPage;