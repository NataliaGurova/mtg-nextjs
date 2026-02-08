'use client';

import { useRouter } from 'next/navigation';
import { FC, startTransition } from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const ErrorBoundary: FC<ErrorProps> = ({ error, reset }) => {

  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    })
  }
  return (
    <div>
      <h2>Щось пішло не так!</h2>
      <p>{error.message}</p>
      <button onClick={reload}>Спробувати ще раз</button>
    </div>
  );
};

export default ErrorBoundary;
