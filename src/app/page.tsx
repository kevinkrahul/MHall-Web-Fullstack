import Image from "next/image";
import myicon from "../../public/wedding.svg";
import { AuroraText } from "@/components/magicui/aurora-text";
import Testimonial from "@/components/ui/testimonialcard";
import FeaturesSectionDemo from "@/components/ui/aminities";
import CalendarButton from "@/components/Calender/cal-button";

export default function Home() {
  return (
    <div>
      {/* Landing page */}
      <section className="flex flex-col justify-center text-center w-full h-auto max-md:pb-[10vw] items-center">
        <h1 className="font-medium p-3 md:p-3" style={{ fontSize: "clamp(40px, 5vw, 90px)" }}>
          Your <AuroraText>Dream Wedding</AuroraText> Begins Here
        </h1>
        <div className="relative inline-block" >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
        <Image src={myicon} alt="wedding" width={500} height={500} />
        </div>
        {/*  */}
        <p className="dark:text-white text-gray-500 w-[70vw] max-w-7xl p-2" style={{ fontSize: "clamp(15px, 2vw, 25px)" }}>
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
      <section className=" items-center w-full max-md:pb-[10vw]">
      <div>
      <h1 className="text-center font-medium  pt-2 md:p-3 max-sm:mt-6" style={{ fontSize: "clamp(35px, 3vw, 45px)" }}>
      <AuroraText className="text-3xl ">Why Us?</AuroraText>
      </h1>
    </div>
        <div className=" relative z-0">
          <FeaturesSectionDemo />
        </div>
      </section>

      {/* Testimonial */}
      <div className=" grid grid-cols-12 bg-transparent shadow-none ">
        <div className="col-span-full md:col-start-2 md:col-end-12 shadow-none bg-transparent rounded-5xl">
          <Testimonial>Testimonials</Testimonial>
        </div>
      </div>
    </div>
  );
}
