"use client";

import { useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import { ArrowRightIcon, X } from "lucide-react";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-2  top-2 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <DatePicker />
        </div>
      </div>
    </div>
  );
}

export default function CalendarButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-900 hover:duration-300 hover:dark:text-pink-300 "
        >
          <span>✨ Mark Us</span>
          <ArrowRightIcon className="ml-1 size-9 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <CalendarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}






{/* <DayPicker
          mode="single"
          disabled={[...BOOKED_DATES, { before: today }]} // Disable past and booked dates
          // footer={footer}
          modifiersClassNames={{
            booked: "bg-red-100 text-red-500 rounded-full",
          }}
          modifiers={{ booked: BOOKED_DATES }}
        /> */}