import InputSelectorIA from "../InputSelectorIA";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center h-[90vh] justify-center px-4 md:px-0 overflow-hidden">
      {/* Hero Section */}

      <h2 className="font-bold text-6xl">What should I build today?</h2>
      <p className="mt-2 text-xl text-gray-500">
        Generate a new website in minutes with our AI-powered website builder.
      </p>

      <InputSelectorIA />
    </section>
  );
};

export default Hero;
