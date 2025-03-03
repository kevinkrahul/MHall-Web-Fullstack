import Image from "next/image";
import faq from "../../../public/faq.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Guidlines() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto max-md:pb-[10vw]">
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
      <div className="md:mb-[10vw] xl:mb-[5vw]" style={{ width: "clamp(280px, 80vw, 1900px)" }}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do we plan a wedding on a budget?</AccordionTrigger>
            <AccordionContent>rioritize what matters most—venue, food, or decor—and cut costs on non-essentials. DIY and off-season weddings can save money.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What if my partner and I have different wedding expectations?</AccordionTrigger>
            <AccordionContent>Find a middle ground. Compromise on elements that matter most to each of you.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
