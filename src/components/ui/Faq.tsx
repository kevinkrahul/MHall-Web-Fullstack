"use client";
import { ElementVisiblity } from "@/app/services/ElementVisiblity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { motion } from "framer-motion";
import useFaq from "@/app/admin/Actions/useFaq";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";

const Faq = () => {
  const { faqs } = useFaq();

  return (
    <>
      {faqs.map((qa, index) => (
        <FaqItem
          key={qa.id}
          question={qa.questions}
          answer={qa.answers}
          index={index}
        />
      ))}
    </>
  );
};

const FaqItem = ({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) => {
  const isVisible = ElementVisiblity(`faq-${index}`);

  return (
    <motion.div
      id={`faq-${index}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-1 md:mb-5"
      style={{ width: "clamp(280px, 80vw, 1900px)" }}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>
            {answer.length > 200 ?
            <AnimatedShinyText shimmerWidth={5000}>{answer}</AnimatedShinyText>
          :  <AnimatedShinyText shimmerWidth={300}>{answer}</AnimatedShinyText>
          }</AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default Faq;
