import InputSelectorIA from "../InputSelectorIA";
import ShinyText from "../ui/shiny-text";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center h-[90vh] justify-center px-4 md:px-0 overflow-hidden">
      {/* Hero Section */}

      <ShinyText
        text="What should I build today?"
        speed={3}
        className=" text-6xl text font-bold"
      />
      <p className="mt-2 text-xl text-gray-200">
        Generate a new website in minutes with our AI-powered website builder.
      </p>

      <InputSelectorIA />
    </section>
  );
};

export default Hero;
