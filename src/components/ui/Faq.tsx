"use client";
import { ElementVisiblity } from "@/app/services/ElementVisiblity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Question {
  id: string;
  text: string;
  answers: string;
}

const Faq = () => {
  const [question, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data: Question[] = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <>
      {question.map((qa) => (
        <FaqItem
          key={qa.id}
          question={qa.text}
          answer={qa.answers}
          index={Number(qa.id)}
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
      transition={{ duration: 0.5, delay: 5 * 0.1 }}
      className="mb-1 md:mb-5"
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
