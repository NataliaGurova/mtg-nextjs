import { notFound } from "next/navigation";

const SingleReview = async ({
  params
}: {
    params: Promise<{
      singleId: string, reviewId: string
    }>;
  }) => {
  
  const { singleId, reviewId } = await params
  if (parseInt(reviewId) > 1000) {
    notFound();
  }
  
  return (
    <div>
      <h1>Review {reviewId} for {singleId}</h1>
    </div>
  )
}

export default SingleReview
