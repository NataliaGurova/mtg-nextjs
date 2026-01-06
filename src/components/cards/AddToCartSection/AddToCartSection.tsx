
"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  cardId: string;
  stock: number;
};

export const AddToCartSection = ({ cardId, stock }: Props) => {
  const [qty, setQty] = useState(1);

  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => Math.min(stock, v + 1));

  const handleAdd = () => {
    console.log("ADD TO CART", { cardId, qty });
  };

  return (
    <div className="flex items-center gap-4">
      
      {/* QTY */}
      <div className="flex items-center border rounded-[4px]">
        <button
          type="button"
          className="px-3 py-2"
          onClick={dec}
        >
          <Minus size={16} />
        </button>

        <span className="px-4 w-[48px] select-none">{qty}</span>

        <button
          type="button"
          className="px-3 py-2"
          onClick={inc}
          disabled={qty >= stock}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* ADD */}
      <Button
        variant="more"
        className="w-[220px]"
        onClick={handleAdd}
        disabled={stock === 0}
      >
        <ShoppingBag size={18} />
        Add to cart
      </Button>
    </div>
  );
};
