"use client";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";
import { AuroraText } from "../magicui/aurora-text";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

const whowe = ["Companian", "Partner", "DreamMaker"];

const Aboutcomp = () => {
  const [index, setindex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setindex((prev) => (prev + 1) % whowe.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function WordRotate({
    words,
    duration = 2500,
    motionProps = {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.25, ease: "easeOut" },
    },
    className,
  }: WordRotateProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, duration);

      // Clean up interval on unmount
      return () => clearInterval(interval);
    }, [words, duration]);

    return (
      <div className="overflow-hidden py-2">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            className={cn(className)}
            {...motionProps}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1
          className="font-medium p-3 md:p-3"
          style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
        >
          About Us
        </h1>
      </div>
      <div>
        <h1
          className="font-medium text-center p-3 md:p-3 max-sm:mt-4 md:ml-20 max-md:h-[6rem] sm:h-auto"
          style={{ fontSize: "clamp(35px, 3vw, 45px)" }}
        >
          <span>We are your </span>
          <span className="inline-block min-w-[270px] text-center md:text-start ">
            <AuroraText>
              <WordRotate key={index} words={[whowe[index]]} />
            </AuroraText>
          </span>
        </h1>
      </div>
    </>
  );
};

export default Aboutcomp;
