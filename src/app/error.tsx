
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Щось пішло не так 🙈</h2>
      <p className="text-sm opacity-80">
        Спробуй перезавантажити сторінку або повторити дію ще раз.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium"
      >
        Повторити
      </button>
    </div>
  );
}
