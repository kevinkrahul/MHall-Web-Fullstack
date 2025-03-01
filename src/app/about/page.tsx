import Image from "next/image";
import demo from "../../../public/wedding-planner-animate.svg";
import Aboutcomp from "@/components/about/about-comp";

export default function About() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto max-md:pb-[10vw]">
      <Aboutcomp />
      <div className="flex max-md:flex-col gap-6 justify-center my-10 w-full h-auto items-center p-[10px]">
        <div className="flex flex-col gap-4 px-[40px] py-5 rounded-3xl  border border-slate-300 dark:border-pink-300 hover:bg-pink-50 dark:hover:bg-neutral-900 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
          <h2 className="text-center text-2xl font-semibold">Our Mission</h2>
          <p>
            To provide a spacious, elegant marriage mahal designed to turn your
            wedding into an unforgettable celebration.To provide a spacmahal
            designed to turn your wedding into an unforgettable celebration.To
            provide a spacious, elegant marriage mahal designed to turn your
            wedding into an unforgettable celebration.ious, elegant marriage
            mahal designed to turn your wedding into an unforgettable
            celebration.To provide a spacious, elegant marriage mahal designed
            to turn your wedding into an unforgettable celebration.To provide a
            spacious, elegant marriage mahal designed to turn your wedding into
            an unforgettable celebration.mahal designed to turn your wedding
            into an unforgettable celebration.To provide a spacious, elegant
            marriage mahal designed to turn your wedding into an unforgettable
            celebration.mahal designed to turn your wedding into an
            unforgettable celebration.To provide a spacious, elegant marriage
            mahal designed to turn your wedding into an unforgettable
            celebration.
          </p>
        </div>
        <div>
          <Image src={demo} alt="wedding" width={400} height={400}></Image>
        </div>
      </div>
      <div className="flex max-md:flex-col gap-6 mb-10 justify-center w-full h-auto items-center p-[10px]">
        <div>
          <Image src={demo} alt="wedding" width={400} height={400}></Image>
        </div>
        <div className="flex flex-col gap-4 px-[40px] py-5 rounded-3xl  border border-slate-300 dark:border-pink-300 hover:bg-pink-50 dark:hover:bg-neutral-900 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
          <h2 className="text-center text-2xl font-semibold">Our Goal</h2>
          <p>
            To provide a spacious, elegant marriage mahal designed to turn your
            wedding into an unforgettable celebration.To provide a spacmahal
            designed to turn your wedding into an unforgettable celebration.To
            provide a spacious, elegant marriage mahal designed to turn your
            wedding into an unforgettable celebration.ious, elegant marriage
            mahal designed to turn your wedding into an unforgettable
            celebration.To provide a spacious, elegant marriage mahal designed
            to turn your wedding into an unforgettable celebration.To provide a
            spacious, elegant marriage mahal designed to turn your wedding into
            an unforgettable celebration.mahal designed to turn your wedding
            into an unforgettable celebration.To provide a spacious, elegant
            marriage mahal designed to turn your wedding into an unforgettable
            celebration.mahal designed to turn your wedding into an
            unforgettable celebration.To provide a spacious, elegant marriage
            mahal designed to turn your wedding into an unforgettable
            celebration.
          </p>
        </div>
      </div>
    </section>
    // className="text-[clamp(6vh,5vw,7rem)] text-center font-medium  pt-2 md:p-3 max-sm:mt-6
  );
}
