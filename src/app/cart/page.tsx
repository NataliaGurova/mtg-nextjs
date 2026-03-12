

"use client";

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

const CartPage = () => {
  const { items, removeFromCart } = useCartStore();

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Cart
      </h1>

      {items.length === 0 && <p>Your cart is empty</p>}

      <div className="space-y-4">

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-md"
          >
            <Image
              src={item.image}
              className="w-20 rounded"
              alt={item.name}
              width={80}
              height={80}
            />

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p>Qty: {item.quantity}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default CartPage;