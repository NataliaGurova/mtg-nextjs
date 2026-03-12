// "use client";

// import { useCartStore } from "@/store/cartStore";
// import { CardListItem } from "@/types/cards";


// interface AddToCartButtonProps {
//   card: CardListItem;
// }

// const AddToCartButton = ({ card }: AddToCartButtonProps) => {
//   const addToCart = useCartStore((s) => s.addToCart);

//   return (
//     <button
//       onClick={() =>
//         addToCart({
//           id: card._id,
//           name: card.name,
//           image: card.imageUrl,
//           quantity: 1,
//         })
//       }
//       className="px-4 py-2 bg-green-600 text-white rounded-md"
//     >
//       Add to cart
//     </button>
//   );
//   }

//   export default AddToCartButton;