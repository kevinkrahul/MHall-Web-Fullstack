'use client';
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import {motion} from "framer-motion";
import {useImageStore} from "@/app/services/imageStore";

import im1 from "../../../public/gal/1.jpeg";
import im2 from "../../../public/gal/2.jpeg";
import im3 from "../../../public/gal/3.jpeg";
import im4 from "../../../public/gal/4.jpeg";
import im5 from "../../../public/gal/5.jpeg";
import im6 from "../../../public/gal/6.jpeg";
import im7 from "../../../public/gal/7.jpeg";
import im8 from "../../../public/gal/8.webp";

const image = [im1, im2, im3, im4, im5, im6, im7, im8];

interface Props{
  reverse?:boolean;
}

const Galcard = ({reverse=false}:Props) => {

  const setSelectedImage = useImageStore((state)=>state.setSelectedImage); 
  // const [selectedImage,setSelectedImage]=useState<StaticImageData | null>(null);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-10">
      <Marquee pauseOnHover reverse={reverse} className="[--duration:40s]">
        {image.map((review, index) => (
          <motion.figure key={index}
          whileHover={{ scale: 1.05}}
          transition={{ duration: 0.5 }}
          onClick={()=>setSelectedImage(review)}
            className={cn(
              "relative h-[250px] w-[250px] sm:w-[300px] sm:h-[300px] cursor-pointer overflow-hidden rounded-xl border",
              // light styles
              "border-rose-900/[.1] bg-rose-300/[.05] hover:bg-gray-950/[.05]",
              // dark styles
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-pink-300/[.2]"
            )}
          >
            
            <Image
              className="w-full h-full object-cover opacity-0 animate-fadeIn"
              width="300"
              height="300"
              alt={`Gallery Image ${index + 1}`}
              src={review}
            />
          </motion.figure>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 md:w-1/4 w-1/6  bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 md:w-1/4 w-1/6 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default Galcard;
