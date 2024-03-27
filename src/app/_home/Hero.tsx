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
        <p className="text-base leading-6 md:text-[20px] md:leading-8 mb-8 md:mb-12 text-center md:text-start">
          {hero.description}
        </p>
        <div className="flex gap-4">
          <Link href={buttons[0].href}>
            <Button size="lg">{buttons[0].title}</Button>
          </Link>
          <Link href={buttons[1].href}>
            <Button size="lg" variant={"white"}>
              {buttons[1].title}
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-w-[500px] md:w-full h-full md:h-auto md:justify-self-end mx-auto md:mx-0">
        <HeroImage height={"full"} width={"full"} />
      </div>
    </section>
  );
};

export default Hero;
