"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useImageStore } from "@/app/services/imageStore";
import useImage from "@/app/admin/Actions/useImage";

const gridClasses = [
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
  "col-span-6 row-span-4 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-6 md:row-span-3",
  "col-span-12 row-span-2 md:col-span-3 md:row-span-6",
  "col-span-6 row-span-2 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-4 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-8 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
];

const GalGrid = () => {
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);
  const { image } = useImage();
  return (
    <div className=" flex w-full items-center justify-center overflow-hidden mb-10">
      <div className="grid grid-flow-row p-2 w-[90vw] md:w-[70vw] h-[150vh] md:h-[95vh] grid-cols-12 grid-rows-12 md:gap-4 gap-2">
        {image.filter((img)=>img.catid==2).map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7 }}
            onClick={() =>
              setSelectedImage(
                img.url.startsWith("http") ? img.url : `/${img.url}`
              )
            }
            className={`flex items-center justify-center rounded-xl overflow-hidden ${gridClasses[index]}`}
          >
            <Image
              src={img.url.startsWith("http") ? img.url : `/${img.url}`}
              alt=""
              width={900}
              height={1200}
              className="w-full h-full object-cover opacity-0 animate-fadeIn"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalGrid;
