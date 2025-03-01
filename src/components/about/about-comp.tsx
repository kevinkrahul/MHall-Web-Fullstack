"use client";

import { useEffect, useState } from "react";
import { AuroraText } from "../magicui/aurora-text";

const whowe = ["Companian", "Partner", "DreamMaker"];

const Aboutcomp = () => {
  const [index, setindex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setindex((prev) => (prev + 1) % whowe.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <h1 className="text-[clamp(5vh,4vw,6rem)] font-medium p-3 md:p-3">
          About Us
        </h1>
      </div>
      <div>
        <h1 className="text-[clamp(3vh,2vw,4rem)] font-medium text-center p-3 md:p-3 max-sm:mt-6 min-h-[7rem] sm:h-auto">
          We are your{" "}
          <span className="transition-all duration-500 ease-in-out">
            <AuroraText key={index}> {whowe[index]}</AuroraText>
          </span>
        </h1>
      </div>
    </>
  );
};

export default Aboutcomp;
