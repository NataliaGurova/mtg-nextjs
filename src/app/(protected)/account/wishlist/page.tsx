// const WishlistPage = () => {
//   return (
//     <div>
//       Wishlist
//     </div>
//   )
// }

// export default WishlistPage;

// // src/app/(protected)/account/wishlist/page.tsx
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";
// import Card from "@/db/models/Card";
// import { DbCard } from "@/types/types";
// import CardItem from "@/components/cards/CardItem/CardItem";


// export default async function WishlistPage() {
//   const session = await getServerSession(authConfig);
//   await connectDB();

//   // // Достаем юзера и раскрываем его сохраненные карточки
//   // const user = await User.findOne({ email: session?.user?.email }).populate({
//   //   path: "wishlist",
//   //   model: Card,
//   // });

  
//   // 1. Добавляем .lean() в конце запроса
//   const user = await User.findOne({ email: session?.user?.email }).populate({
//     path: "wishlist",
//     model: Card,
//   }).lean();

//   // 2. Очищаем данные от любых остатков BSON-объектов MongoDB
//   const rawCards = user?.wishlist || [];
//   const savedCards = JSON.parse(JSON.stringify(rawCards)) as DbCard[];


//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-[#041e3a]">My Wishlist</h2>
      
//       {savedCards.length === 0 ? (
//         <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
//           <p className="text-lg">Your wishlist is currently empty.</p>
//           <p className="text-sm mt-2">Find cards you love and click the heart icon to save them here.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {savedCards.map((card: DbCard) => (
//             <CardItem
//             key={card._id.toString()}
//             card={card}
//             variant="glass" // 👈 Включаем магию стекла только здесь!
//           />
//             // <CardItem key={card._id.toString()} card={card} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// <div className="text-center py-20 text-gray-500 bg-[#eff2f8] rounded-[4px] border border-dashed border-gray-300">
    

// src/app/(protected)/account/wishlist/page.tsx
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { connectDB } from "@/db/db";
import User from "@/db/models/User";
import Card from "@/db/models/Card"; 
import { DbCard } from "@/types/types";
import Wishlist from "@/components/account/Wishlist/Wishlist";


export default async function WishlistPage() {
  const session = await getServerSession(authConfig);
  await connectDB();
  
  // Достаем юзера, карточки из wishlist и используем .lean() для скорости
  const user = await User.findOne({ email: session?.user?.email }).populate({
    path: "wishlist",
    model: Card, 
  }).lean();

  // Очищаем данные от остатков BSON-объектов MongoDB
  const rawCards = user?.wishlist || [];
  const savedCards = JSON.parse(JSON.stringify(rawCards)) as DbCard[];

  // Передаем готовые данные в клиентский/UI компонент
  return <Wishlist savedCards={savedCards} />;
}