import Image from "next/image";
import faq from "../../../public/faq.svg";
import { AuroraText } from "@/components/magicui/aurora-text";
import Faq from "@/components/ui/Faq";

export default function Guidlines() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto mb-10">
      <div>
        <h1
          className="font-medium text-center p-3 md:p-3"
          style={{ fontSize: "clamp(35px, 5vw, 60px)" }}
        >
          Do You Have Questions?
        </h1>
      </div>
      <div>
        <h1
          className="font-medium text-center p-3 md:p-3"
          style={{ fontSize: "clamp(20px, 4vw, 40px)" }}
        >
          <AuroraText>We have answers! :)</AuroraText>
        </h1>
        <p className="px-[10vw] text-center text-neutral-900 dark:text-white">
          Marriage is a journey filled with love, challenges, and countless
          questions. Whether you're preparing for your big day, navigating
          married life, or seeking guidance, we have the answers you need. From
          relationship advice to wedding planning tips, we’re here to support
          you at every step. 💍❤️
        </p>
      </div>
      <div className="mb-6">
        <Image src={faq} alt="wedding" width={200} height={200} />
      </div>
      <Faq />
    </section>
  );
}
