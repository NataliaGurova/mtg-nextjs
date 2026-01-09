const SinglesPreview = () => {
  return (
    <section className="px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold">
        MTG Singles
      </h2>

      <p className="mt-2 text-gray-500">
        Поточна основа проєкту
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* превʼю карт */}
        <div className="h-40 bg-gray-100 rounded-lg" />
        <div className="h-40 bg-gray-100 rounded-lg" />
        <div className="h-40 bg-gray-100 rounded-lg" />
        <div className="h-40 bg-gray-100 rounded-lg" />
      </div>
    </section>
  );
};

export default SinglesPreview;
