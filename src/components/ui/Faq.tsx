'use client';
import { ElementVisiblity } from "@/app/services/ElementVisiblity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { motion } from "framer-motion";

const Faq = () => {
  const faqs = [
    {
      index: 1,
      question: "How do we plan a wedding on a budget?",
      answer:
        "Prioritize what matters most—venue, food, or decor—and cut costs on non-essentials. DIY and off-season weddings can save money.",
    },
    {
      index: 2,
      question: "What if my partner and I have different wedding expectations?",
      answer:
        "Find a middle ground. Compromise on elements that matter most to each of you.",
    },
    {
      index: 3,
      question: "What if my partner and I have different wedding expectations?",
      answer:
        "Find a middle ground. Compromise on elements that matter most to each of you.",
    },
    {
      index: 4,
      question: "What if my partner and I have different wedding expectations?",
      answer:
        "Find a middle ground. Compromise on elements that matter most to each of you.",
    },
    {
      index: 5,
      question: "What if my partner and I have different wedding expectations?",
      answer:
        "Find a middle ground. Compromise on elements that matter most to each of you.",
    },
    {
      index: 6,
      question: "What if my partner and I have different wedding expectations?",
      answer:
        "Find a middle ground. Compromise on elements that matter most to each of you.",
    },
    {
      index: 7,
      question: "What if my partner and I have different wedding expectations?",
      answer:
        "Find a middle ground. Compromise on elements that matter most to each of you.",
    },
  ];

  return (
    <>
      {faqs.map((qa, index) => (
        <FaqItem key={qa.index} {...qa} index={index} />
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
      className="xl:mb-[5vw]"
      style={{ width: "clamp(280px, 80vw, 1900px)" }}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default Faq;
