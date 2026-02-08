"use client"

import { usePathname } from "next/navigation"

const NotFound = () => {

  const pathname = usePathname();
  const singleId =pathname.split("/")[2]
  const reviewId =pathname.split("/")[4]
  return (
    <div>
      <h2>Review {reviewId} Not Found for {singleId}</h2>

    </div>
  )
}

export default NotFound