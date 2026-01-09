const ForWhom = () => {
  return (
    <section className="px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-10">
        Для кого цей сайт
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-medium mb-2">Гравці</h3>
          <p className="text-gray-600">
            Швидко знаходьте потрібні карти та версії
            для збірки й оптимізації дек
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-medium mb-2">Колекціонери</h3>
          <p className="text-gray-600">
            Відстежуйте видання, арти та фойлу
            для точної й усвідомленої колекції
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
