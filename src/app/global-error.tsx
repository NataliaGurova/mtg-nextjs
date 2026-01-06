'use client';


type GlobalErrorProps = {
  error: Error;
};

const GlobalError = ({ error }: GlobalErrorProps) => {

  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-red-50 text-red-700">
        <div className="text-center p-6 border border-grey-400 rounded bg-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Упс! Щось пішло не так!</h2>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Спробувати перезавантажити
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;

// "use client";

// export default function GlobalError({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   return (
//     <html>
//       <body>
//         <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//           <h2 className="text-xl font-semibold">Critical error 🛑</h2>
//           <p className="text-sm opacity-80">
//             Сталася помилка під час завантаження застосунку.
//           </p>
//           <button
//             onClick={() => reset()}
//             className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium"
//           >
//             Спробувати ще раз
//           </button>
//         </div>
//       </body>
//     </html>
//   );
// }

