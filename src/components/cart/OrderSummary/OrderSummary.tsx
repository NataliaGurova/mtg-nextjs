// components/cart/OrderSummary/OrderSummary.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

const SHIPPING = 10;

const OrderSummary = () => {
  const { items } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING;

  return (
    <div className="w-full lg:w-80 shrink-0 rounded-[4px] border bg-muted/40 overflow-hidden">

      <div className="px-6 py-4 border-b bg-muted/60">
        <h2 className="font-semibold text-sm uppercase tracking-wide">
          Order Summary
        </h2>
      </div>

      <div className="px-6 py-5 flex flex-col gap-4">

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{subtotal} ₴</span>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p>Standard Shipping</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Free when your order is over 10 000 ₴
            </p>
          </div>
          <span>{SHIPPING} ₴</span>
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold">
          <div>
            <p>Total</p>

          </div>
          <span>{total} ₴</span>
        </div>



        <Button
          variant={"more"}
          // className="w-full h-11 font-semibold tracking-wide"
          // className="w-full h-11 tracking-wide"
          onClick={() => console.log("checkout")}
        >
          Proceed to Checkout
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 border-t" />
          Or
          <div className="flex-1 border-t" />
        </div>

        {/* <Button className="w-full border rounded-lg py-3 text-sm font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-1"> */}
        <Button variant="outline" className="py-2">
  <span className="text-[#231f20] font-black text-base tracking-tight">LIQPAY</span>
  <span className="flex">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 3L9 8L4 13" stroke="#6dc52d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 3L13 8L8 13" stroke="#6dc52d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
</Button>

        {/* <button className="w-full border rounded-lg py-3 text-sm font-semibold hover:bg-muted transition-colors">
          <span className="text-blue-600">Pay</span>
          <span className="text-blue-800">Pal</span>
        </button> */}

        {/* <button className="w-full border rounded-lg py-3 text-sm font-semibold hover:bg-muted transition-colors">
          Klarna. Express Checkout
        </button> */}

      </div>
    </div>
  );
};

export default OrderSummary;