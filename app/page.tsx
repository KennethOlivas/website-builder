import ColorBends from "@/components/Aurora";
import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";

export default function Home() {
  return (
    <div>
         <ColorBends
            className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden"
            colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
            rotation={0}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
            transparent
          />
      <Header />
      <Hero />
    </div>
  );
}
