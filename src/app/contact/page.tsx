import Mahal from "../../../public/Mahal.jpg";
import Image from "next/image";
import Congrid from "../../components/contact-grid/congrid";
import { Ripple } from "@/components/magicui/ripple";

export default function contact() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto mb-10 overflow-hidden">
      <div className="relative w-full max-sm:h-[30vh] md:h-[40vw] lg:h-[30vw]">
        <Ripple 
        className="w-full h-full object-cover object-bottom" 
        />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background"></div>
        <h1
          className="absolute inset-0 flex text-black dark:text-white justify-center items-center font-medium text-center p-3 md:p-3"
          style={{ fontSize: "clamp(35px, 5vw, 60px)" }}
        >
          Celebrate Love with Us
        </h1>
      </div>
      <Congrid />
    </section>
  );
}
