// components/cart/CartItemsList/CartItemsList.tsx для cart/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

const CartItemsList = () => {
  const { items, removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="flex-1 flex flex-col divide-y">
      {items.map((item) => {
        const isMaxReached = item.quantity >= item.stock;
        const itemTotal = item.price * item.quantity;

        return (
          <div
            key={item.id}
            className="relative flex items-start gap-5 py-6 first:pt-0"
          >
            {/* IMAGE — кликабельное */}
            <Link
              href={`/singles/${item.scryfallId}`}
              className="shrink-0 hover:opacity-80 transition-opacity"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={167}
                className="rounded w-[120px]"
              />
            </Link>

            <div className="flex-1 min-w-0">
              {/* NAME + FOIL + TOTAL */}
              <div className="flex items-start gap-2 mb-2 flex-wrap pr-10">
                <Link
                  href={`/singles/${item.scryfallId}`}
                  className="font-semibold hover:underline underline-offset-2"
                >
                  {item.name}
                </Link>

                {item.foil && item.foil !== "nonfoil" && (
                  <div className="px-2 py-0.5 text-xs font-semibold text-white bg-gradient-to-r from-yellow-400 to-red-500 rounded">
                    {item.foil}
                  </div>
                )}

                <span className="ml-auto font-semibold">{itemTotal} ₴</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Set: {item.set_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.language.toUpperCase()} • {item.condition}
              </p>
              <p className="text-sm mt-1">{item.price} ₴</p>

              {/* QTY CONTROL */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => {
                    if (item.quantity <= 1) {
                      removeFromCart(item.id);
                    } else {
                      updateQuantity(item, item.quantity - 1);
                    }
                  }}
                  className="px-2 py-1 border rounded hover:bg-muted"
                >
                  <Minus size={14} />
                </button>

                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  disabled={isMaxReached}
                  className="px-2 py-1 border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* REMOVE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="absolute bottom-4 right-8 opacity-70 hover:opacity-100"
              // className="absolute top-5 right-0 opacity-50 hover:opacity-100"
            >
              <X size={16} />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemsList;