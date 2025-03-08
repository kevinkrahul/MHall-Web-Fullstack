"use client";
import { MagicCard } from "@/components/magicui/magic-card";
import { ElementVisiblity } from "@/app/services/ElementVisiblity";
import { useTheme } from "next-themes";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

const useGetTheme = () => {
  const theme = useTheme();
  return theme;
};

// Main export grid
const Congrid = () => {
  // For Error purpose
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // For Data
  const contactItems = [
    {
      index: 1,
      href: "tel:+918675111878",
      title: "Call Now",
      desc: "Speak With Our Manager",
      contact: "+91928271837201",
      icon: (
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
          clipRule="evenodd"
        />
      ),
    },
    {
      index: 2,
      href: "mailto:senkuresearch@gmail.com?subject=Inquiry&body=Hello, I would like to ask about...",
      title: "Send an Email",
      desc: "Connect with Our Team",
      contact: "SenkuResearch@gmail.com",
      icon: (
        <>
          <path d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
          <path d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
        </>
      ),
    },
    {
      index: 3,
      href: "https://wa.me/8675111878?text=Hello%20there!",
      title: "Message Us",
      desc: "Chat on Whatsapp",
      contact: "+91928271837201",
      icon: (
        <path
          fillRule="evenodd"
          d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
          clipRule="evenodd"
        />
      ),
    },
    {
      index: 4,
      href: "https://maps.app.goo.gl/Dd9RUbqNH9Z3k9DP8",
      title: "Reach Out",
      desc: "Visit our venue and experience elegance firsthand!",
      contact: "Oddanchataram",
      icon: (
        <path
          fillRule="evenodd"
          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          clipRule="evenodd"
        />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-10">
      {contactItems.map((item, index) => (
        <Contact key={index} {...item} />
      ))}
    </div>
  );
};

// Animation Callback function
const Contact = ({
  index,
  href,
  title,
  desc,
  contact,
  icon,
}: {
  index: number;
  href: string;
  title: string;
  desc: string;
  contact: string;
  icon: ReactNode;
}) => {
  const { theme } = useGetTheme();

  const isVisible = ElementVisiblity(`contact-${index}`);
  return (
    <>
      <motion.div
        id={`contact-${index}`}
        initial={{ opacity: 0, x: 50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <a href={href}>
          <Card>
            <MagicCard
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader>
                <CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 "
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                  <h3 className="mt-14">{title}</h3>
                </CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardFooter>{contact}</CardFooter>
            </MagicCard>
          </Card>
        </a>
      </motion.div>
    </>
  );
};

export default Congrid;
