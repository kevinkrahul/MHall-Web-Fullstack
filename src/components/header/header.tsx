"use client";

import Image from "next/image";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-theme/theme-switch";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const SHEET_SIDES = ["left"] as const;
const useGetTheme = () => {
  const resolvedTheme = useTheme();
  return resolvedTheme;
};

const Header = () => {
  const Navigation = ["Home", "About", "Gallery", "Guidlines", "Contact"];
  const { resolvedTheme } = useGetTheme();
  const [logo, setLogo] = useState(Logo);
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogo(Logo);
    } else {
      setLogo(Logo);
    }
  }, [resolvedTheme]);

  return (
    <header className="bg-pink-50 p-4 flex justify-center items-center">
      <a className="mr-2 md:hidden">
        <div className="">
          {SHEET_SIDES.map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <svg
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M3 5H11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3 12H16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3 19H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Kv Mahal</SheetTitle>
                  <SheetDescription>
                    We are welcome you to make your day special
                  </SheetDescription>
                </SheetHeader>
                <div>
                  {Navigation.map((item, index) => (
                    <div key={index}>
                      <Link href={`/${item.toLowerCase()}`}>
                        <Button variant={"ghost"}>{item}</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </a>

      <Link href="/" className="w-full justify-start items-center">
        <Image src={Logo} alt={"Kv logo"} width={35} height={35} />
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="gap-6">
          {Navigation.map((items, index) => (
            <NavigationMenuItem key={index}>
              <Link href={`/${items.toLowerCase()}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {items}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex w-full justify-end ">
        <ModeToggle />
      </aside>
    </header>
  );
};

export default Header;
