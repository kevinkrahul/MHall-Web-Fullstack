import Image from "next/image";
import myicon from "../../public/wedding.svg";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col justify-center text-center w-full min-h-[calc(100vh-69px)] items-center">
        <h1 className="text-[clamp(6vh,5vw,7rem)] font-medium p-3 md:p-3">
          Your <AuroraText>Dream Wedding</AuroraText> Begins Here
        </h1>
        <div>
          <Image src={myicon} alt="wedding" width={500} height={500} />
        </div>
        <p className="text-[clamp(2vh,1em,2em)]  max-w-3xl p-2">
          Discover the perfect venue for your special day. We provide a
          spacious, elegant marriage mahal designed to turn your wedding into an
          unforgettable celebration.
        </p>
        <div className="z-10 flex m-4 items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-900 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Mark Us</span>
              <ArrowRightIcon className="ml-1 size-9 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
      </section>

      <section className="flex justify-center text-center items-center w-full min-h-[calc(100vh-69px)]">
        <div>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
          <p>ssqsaas</p>
        </div>
      </section>
      <section className="flex justify-center text-center items-center w-full min-h-[calc(100vh-69px)]">
        <div>
          
        </div>
      </section>
    </div>
  );
}

{
  /* <section class="flex flex-col items-center justify-center min-h-screen text-center">
  <h1 class="text-5xl font-bold mb-4">Your Dream Wedding Begins Here</h1>
  <p class="text-lg text-gray-600 max-w-xl">
    Discover the perfect venue for your special day. We provide a spacious, elegant marriage mahal designed to turn your wedding into an unforgettable celebration.  
  </p>
</section> */
}
