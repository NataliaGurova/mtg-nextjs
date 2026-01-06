

const Docs = async ({
  params
}: {
  params: Promise<{ slug: string[] }>;
  }) => {
  
  const { slug } = await params;
  if (slug?.length === 2) {
    return <h1>Viewing doc for aaa {slug[0]} and bbb {slug[1]}</h1>
  } else if (slug?.length === 1) {
    return <h1>Viewing doc for aaa {slug[0]}</h1>
  }
  
  return (
    <div>
      <h1>Docs home</h1>
    </div>
  )
}

export default Docs