import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ReactNode } from "react";
import { AuroraText } from "../magicui/aurora-text";


const reviews =[
    {
        id:1,
      name:"Kevin",
      username:"@kevin",
      img: "https://avatar.vercel.sh/jane",
      body:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
        id:2,
      name:"Rahul",
      // username:"@kevin",
      img: "https://avatar.vercel.sh/jane",
      body:"lorem ipsum dolor sit amet,lorem ipsum dolor sit amet, consectetur adipiscing elit,lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    
    {
        id:3,
      name:"Mervin",
      img: "https://avatar.vercel.sh/jane",
      username:"@Mervin",
      body:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
        id:4,
      name:"kumar",
      img: "https://avatar.vercel.sh/jane",
      username:"@Kumara",
      body:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
        id:5,
      name:"Jhon",
      img: "https://avatar.vercel.sh/jane",
      username:"Kevinkrahul@gmail.com",
      body:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
        id:6,
      name:"don",
      // username:"@kevin",
      img: "https://avatar.vercel.sh/jane",
      body:"lorem ipsum dolor sit amet,lorem ipsum dolor sit amet, consectetur adipiscing elit,lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
  ]
  export const firstRow = reviews.slice(0, reviews.length / 2);
  export const secondRow = reviews.slice(reviews.length / 2);
  





const ReviewCard = ({
    // id,
    // img,
    name,
    username,
    body,
  }: {
    // id:number;
    // img?: string;
    name: string;
    username?: string;
    body: string;
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
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };


const Testimonial=({children}:{children:ReactNode})=>{

    return(
        <section className="flex flex-col  items-center w-full min-h-[calc(100vh-69px)]">
        <h1 className="text-[clamp(6vh,5vw,7rem)] font-medium p-3 md:p-3">
          <AuroraText className="text-3xl">{children}</AuroraText>
        </h1>
        <p className="text-[clamp(2vh,1em,2em)] text-center dark:text-white mb-[7vh] text-gray-500 max-w-3xl p-2">
          Discover the perfect venue for your special day. We
        </p>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s]">
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