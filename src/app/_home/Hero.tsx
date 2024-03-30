import { buttons, hero } from "@/assets/data/home/hero";
import { Leaf } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroImage from "../_home/HeroImage";

const Hero: React.FC = () => {
  return (
    <section className="max-w-[1340px] w-full h-[calc(100vh-80px)] pt-10 md:pt-0 px-5 mx-auto grid md:grid-cols-2 justify-center md:justify-between items-center gap-16 md:gap-24">
      <div className="flex flex-col items-center md:block">
        <div className="relative inline-block mb-5 md:mb-8">
          <h1 className="relative heading-primary z-20">{hero.title}</h1>
          <Leaf className="absolute -top-[70%] md:-top-[calc(100%+5px)] left-1/3 w-8 md:w-16 h-auto" />
        </div>
        <div className="max-w-[540px]">
          <h3 className="heading-tertiary text-center md:text-start mb-4 md:mb-6">
            {hero.description[0]}
          </h3>
          <p className="text-medium text-center md:text-start leading-7 text-gray-500 font-medium">
            {hero.description[1]}
          </p>
        </div>
      </div>
      <div className="max-w-[500px] md:w-full h-full md:h-auto md:justify-self-end mx-auto md:mx-0">
        <HeroImage height={"full"} width={"full"} />
      </div>
    </section>
  );
};

export default Hero;
