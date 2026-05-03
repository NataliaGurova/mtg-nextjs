// src/app/loading.tsx

import Loader from '@/components/Loader/Loader';
import React from 'react'

const Loading = () => {
  return (
    // <div className="flex items-center justify-center py-30">
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader />
    </div>
  )
}

export default Loading;
