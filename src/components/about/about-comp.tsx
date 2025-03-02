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
        <h1 className="font-medium p-3 md:p-3" style={{ fontSize: "clamp(40px, 5vw, 60px)" }}>
          About Us
        </h1>
      </div>
      <div>
        <h1 className="font-medium text-center p-3 md:p-3 max-sm:mt-4 max-md:h-[6rem] sm:h-auto" style={{ fontSize: "clamp(35px, 3vw, 45px)" }}>
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
