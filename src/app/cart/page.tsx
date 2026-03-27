

// "use client";

// // import CardStockItem from '@/components/CardStockItem/CardStockItem';
// import { Button } from '@/components/ui/button';
// import { useCartStore } from '@/store/cartStore';
// import Image from 'next/image';

// import { Minus, Plus, X } from "lucide-react";



// const CartPage = () => {
//   const { items, removeFromCart, updateQuantity } = useCartStore();

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Cart</h1>

//       {items.length === 0 && <p>Your cart is empty</p>}

//       <div className="space-y-4">
//         {items.map((item) => {
//           const isMaxReached = item.quantity >= item.stock;
//           const itemTotal = item.price * item.quantity;

//           return (
//             <div
//               key={item.id}
//               className="relative flex items-start gap-4 border p-4 rounded-xl shadow-sm"
//             >
//               <Image
//                 src={item.image}
//                 className="w-20 rounded-md"
//                 alt={item.name}
//                 width={80}
//                 height={110}
//               />

//               <div className="flex-1">
//                 {/* NAME + FOIL + TOTAL */}
//                 <div className="flex items-center gap-2 mb-1 flex-wrap">
//                   <p className="font-semibold">{item.name}</p>

//                   {item.foil !== "nonfoil" && (
//                     <div className="px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-400 to-red-500 rounded">
//                       {item.foil}
//                     </div>
//                   )}

//                   <span className="ml-auto font-semibold">
//                     {itemTotal} ₴
//                   </span>
//                 </div>

//                 <p className="text-sm">Set {item.set_name}</p>

//                 <p className="text-sm text-muted-foreground">
//                   {item.language.toUpperCase()} • {item.condition}
//                 </p>

//                 <p className="text-sm mt-1">
//                   {item.price} ₴
//                 </p>

//                 {/* 🔥 QTY CONTROL */}
//                 <div className="flex items-center gap-2 mt-3">
//                   <button
//                     onClick={() => {
//                       if (item.quantity <= 1) {
//                         removeFromCart(item.id);
//                       } else {
//                         updateQuantity(item, item.quantity - 1);
//                       }
//                     }}
//                     className="px-2 py-1 border rounded hover:bg-gray-100"
//                   >
//                     <Minus size={14} />
//                   </button>

//                   <span className="w-8 text-center font-medium">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() =>
//                       updateQuantity(item, item.quantity + 1)
//                     }
//                     disabled={isMaxReached}
//                     className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
//                   >
//                     <Plus size={14} />
//                   </button>
//                 </div>
//               </div>

//               {/* ❌ REMOVE (правый нижний угол) */}
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={() => removeFromCart(item.id)}
//                 className="absolute bottom-2 right-2 opacity-70 hover:opacity-100"
//               >
//                 <X size={16} />
//               </Button>
//             </div>
//           );
//         })}
//       </div>



//       {items.length > 0 && (
//         <div className="mt-10 border-t pt-6 space-y-4">
    
//     {/* 💰 TOTAL */}
//     <div className="flex justify-between items-center">
//       <p className="text-lg">Subtotal:</p>
//       <p className="text-lg font-medium">{total} ₴</p>
//     </div>

//     <div className="flex justify-between items-center">
//       <p className="text-xl font-semibold">Total:</p>
//       <p className="text-xl font-bold">{total} ₴</p>
//     </div>

//     {/* CHECKOUT BUTTON */}
//     <Button
//       className="w-full h-12 text-lg font-semibold mt-4"
//       onClick={() => {
//         // пока просто логика-заглушка
//         console.log("Checkout clicked");
//       }}
//     >
//       💳 Checkout
//     </Button>

//   </div>
// )}

//     </div>
//   );
// };

// export default CartPage;



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