import Image from "next/image";
import myicon from "../../public/wedding.svg";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Marquee } from "@/components/magicui/marquee";
import Testimonial from "@/components/ui/testimonialcard";
import FeaturesSectionDemo from "@/components/ui/aminities";
import CalendarButton from "@/components/Calender/cal-button";

export default function Home() {
  return (
    <div>
      {/* Landing page */}
      <section className="flex flex-col justify-center text-center w-full min-h-[calc(100vh-69px)] items-center">
        <h1 className="text-[clamp(6vh,5vw,7rem)] font-medium p-3 md:p-3">
          Your <AuroraText>Dream Wedding</AuroraText> Begins Here
        </h1>
        <div className="relative inline-block" >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
        <Image src={myicon} alt="wedding" width={500} height={500} />
        </div>
        <p className="text-[clamp(2vh,1em,2em)] dark:text-white text-gray-500 max-w-3xl p-2">
          Discover the perfect venue for your special day. We provide a
          spacious, elegant marriage mahal designed to turn your wedding into an
          unforgettable celebration.
        </p>
        <div className="z-10 flex m-4 items-center justify-center">
        <CalendarButton />
          {/* <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-900 hover:duration-300 hover:dark:text-pink-300 ">
              <span>✨ Mark Us</span>
              <ArrowRightIcon className="ml-1 size-9 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div> */}
        </div>
      </section>
            {/* Aminities */}
      <section className=" items-center w-full min-h-[calc(100vh-69px)]">
      <div>
      <h1 className="text-[clamp(6vh,5vw,7rem)] text-center font-medium  pt-2 md:p-3 max-sm:mt-6">
      <AuroraText className="text-3xl ">Why Us?</AuroraText>
      </h1>
    </div>
        <div className=" relative z-0">
          <FeaturesSectionDemo />
        </div>
      </section>

      {/* Testimonial */}
      <Testimonial
        children={<AuroraText className="text-3xl">Testimonials</AuroraText>}
      />
    </div>
  );
}
