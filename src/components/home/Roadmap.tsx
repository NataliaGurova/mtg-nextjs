const Roadmap = () => {
  return (
    <section className="px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Що буде далі
      </h2>

      <ul className="grid gap-3 text-gray-700">
        <li>🧱 MTG Sets — повні набори видань</li>
        <li>🪙 MTG Tokens — токени та емблеми</li>
        <li>📦 MTG Sealed — запечатані продукти</li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        Зараз фокус — якість та повнота бази Singles
      </p>
    </section>
  );
};

export default Roadmap;
