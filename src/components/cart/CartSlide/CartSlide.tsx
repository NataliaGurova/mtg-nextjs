// // Модальное окно корзины

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

// export const CartSlide = () => {
//   const { items, removeFromCart, isOpen, setCartOpen, closeCart } = useCartStore();

//   return (
//     <Sheet open={isOpen} onOpenChange={setCartOpen}>
//       <SheetContent side="right" className="w-96 p-6">
//         <SheetHeader>
//           <SheetTitle>Cart ({items.length})</SheetTitle>
//         </SheetHeader>

//         {items.length === 0 ? (
//           <p className="mt-4">Your cart is empty</p>
//         ) : (
//           <div className="flex flex-col gap-4 mt-4">
//             {items.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 border p-2 rounded-md"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   width={60}
//                   height={90}
//                   className="rounded"
//                 />
//                 <div className="flex-1 flex flex-col">
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {item.language.toUpperCase()} • {item.condition}{" "}
//                     {item.foil !== "nonfoil" && `• ${item.foil}`}
//                   </p>
//                   <p className="font-medium">
//                     {item.quantity} × {item.price} ₴
//                   </p>
//                 </div>
//                 {/* <Button
//                   variant="more"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   Remove
//                 </Button> */}
//               </div>
//             ))}
//           </div>
//         )}

//         <SheetFooter className="mt-4 flex justify-between">
//           <Button variant="more" onClick={() => (window.location.href = "/cart")}>
//             Go to Cart
//           </Button>
//           <Button variant="outline" onClick={closeCart}>
//             Continue Shopping
//           </Button>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };




