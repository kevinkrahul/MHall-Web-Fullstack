"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ReactNode } from "react";
import { AuroraText } from "../magicui/aurora-text";
import useCustomer from "@/app/admin/Actions/useCustomer";


export function customerReview(){
const {customer}=useCustomer();
const firstRow = customer.slice(0, customer.length / 2);
const secondRow = customer.slice(customer.length / 2);

return{
  firstRow,
  secondRow,
  customer
}

}


const ReviewCard = ({
    // id,
    // img,
    name,
    email,
    comments,
  }: {
    // id:number;
    // img?: string;
    name: string;
    email?: string;
    comments: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-rose-900/[.1] bg-rose-300/[.05] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-pink-300/[.2]",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-left dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{email}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{comments}</blockquote>
      </figure>
    );
  };


const Testimonial=({children}:{children:ReactNode})=>{

  const {firstRow,secondRow}=customerReview();

    return(
        <section className="flex flex-col  items-center w-full pb-10">
        <h1 className="font-medium p-3 md:p-3" style={{ fontSize: "clamp(35px, 3vw, 45px)" }}>
          <AuroraText className="text-3xl">{children}</AuroraText>
        </h1>
        <p className="text-center dark:text-white mb-[7vh] text-gray-500 max-w-3xl p-2" style={{ fontSize: "clamp(15px, 2vw, 25px)" }}>
          Discover the perfect venue for your special day. We
        </p>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:25s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </section>
    )
}


  export default Testimonial;




//   <AuroraText className="text-3xl">Testimonials</AuroraText>