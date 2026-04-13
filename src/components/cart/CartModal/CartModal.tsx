// components/cart/CartModal/CartModal.tsx для отображения содержимого корзины в layout.tsx
// "use client";

// import { useCartStore } from "@/store/cartStore";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetFooter,
// } from "@/components/ui/sheet";
// import { useRouter } from "next/navigation";

// export const CartModal = () => {
//   const { items, isOpen, setCartOpen, closeCart } = useCartStore();
//   const router = useRouter();

//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const hasScroll = items.length > 3;

//   return (
//     <Sheet open={isOpen} onOpenChange={setCartOpen}>
//       <SheetContent side="right" className="flex flex-col w-80 p-0 gap-0 rounded-[4px] top-[276px]">

//         {/* HEADER — неподвижный */}
//         <SheetHeader className="px-6 py-4 border-b shrink-0">
//           <SheetTitle>Cart ({items.length})</SheetTitle>
//         </SheetHeader>

//         {/* ITEMS */}
//         <div className={`px-6 py-4 ${hasScroll ? "overflow-y-auto" : ""}`}>
//           {items.length === 0 ? (
//             <p className="text-muted-foreground text-sm">Your cart is empty</p>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-3 border p-3 rounded-[4px] relative"
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={50}
//                     height={70}
//                     className="rounded shrink-0"
//                   />

//                   <div className="flex-1 flex flex-col gap-0.5 min-w-0">
//                     <p className="font-medium text-sm leading-tight truncate">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {item.language.toUpperCase()} • {item.condition}
//                       {item.foil && item.foil !== "nonfoil" && ` • ${item.foil}`}
//                     </p>
//                     <p className="text-sm font-medium mt-1">
//                       {item.quantity} × {item.price} ₴
//                     </p>
//                   </div>

//                   {/* <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="absolute top-2 right-2 opacity-40 hover:opacity-100 transition-opacity"
//                   >
//                     <X size={14} />
//                   </button> */}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* FOOTER — неподвижный */}
//         {/* <SheetFooter className="flex flex-col gap-3 px-6 py-4 border-t shrink-0 mt-0"> */}
//         <SheetFooter className="px-6 flex justify-between">
//           {items.length > 0 && (
//             <div className="flex justify-between text-sm font-medium w-full mb-2">
//               <span>Total</span>
//               <span>{total} ₴</span>
//             </div>
//           )}
//           {/* <div className="flex gap-2 w-full"> */}
          
//             <Button
//               variant="more"
//               // className="flex-1"
//               onClick={() => {
//                 closeCart();
//                 router.push("/cart");
//               }}
//               disabled={items.length === 0}
//             >
//               Go to Cart
//             </Button>
//             <Button variant="outline" onClick={closeCart}>
//               Continue
//             </Button>
          
//         </SheetFooter>

//       </SheetContent>
//     </Sheet>
//   );
// };



// components/cart/CartModal/CartModal.tsx для отображения содержимого корзины в layout.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styles from "./CartModal.module.css";

export const CartModal = () => {
  const { items, isOpen, closeCart } = useCartStore();
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasScroll = items.length > 3;

  // Если корзина не открыта — не рендерим ничего
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Cart ({items.length})</h2>
      </div>

      {/* ITEMS */}
      <div className={`${styles.body} ${hasScroll ? styles.bodyScroll : ""}`}>
        {items.length === 0 ? (
          <p className={styles.emptyText}>Your cart is empty</p>
        ) : (
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.id} className={styles.itemCard}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={70}
                  className={styles.itemImage}
                />

                <div className={styles.itemInfo}>
                  <p className={styles.itemName} title={item.name}>
                    {item.name}
                  </p>
                  <p className={styles.itemMeta}>
                    {item.language.toUpperCase()} • {item.condition}
                    {item.foil && item.foil !== "nonfoil" && ` • ${item.foil}`}
                  </p>
                  <p className={styles.itemPrice}>
                    {item.quantity} × {item.price} ₴
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        {items.length > 0 && (
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>{total} ₴</span>
          </div>
        )}
        
        <div className={styles.actions}>
          <Button
            variant="more"
            className={styles.flexBtn}
            onClick={() => {
              closeCart();
              router.push("/cart");
            }}
            disabled={items.length === 0}
          >
            Go to Cart
          </Button>
          <Button 
            variant="outline" 
            className={styles.flexBtn} 
            onClick={closeCart}
          >
            Continue ...
          </Button>
        </div>
      </div>
    </div>
  );
};