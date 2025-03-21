"use client";
import { DayPicker } from "react-day-picker";
import { ArrowRightIcon, Calendar } from "lucide-react";
import "react-day-picker/dist/style.css";
import useDateEvent from "@/app/admin/Actions/useDateEvent";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import Link from "next/link";

const today = new Date();

// const isPastDate = (date: Date) => date < today;

export function DatePicker() {
  const { dateEvents } = useDateEvent();
  const bookedDates = useMemo(
    () => dateEvents.map((date) => new Date(date.date)),
    [dateEvents]
  );
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="relative mt-16 sm:mt-[calc(navbar-height+10px)] p-4 sm:p-3 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md mx-auto transition-colors overflow-hidden">
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Hall Availability
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
        View our current hall bookings. For reservations, please contact us.
      </p>

      {/* Date Picker */}
      <div className="border dark:border-gray-700 rounded-lg p-2 sm:p-3 md:p-4 w-full">
        <div className="overflow-hidden max-h-[350px] h-400px sm:max-h-[350px] max-[425px]:overflow-scroll">
          <DayPicker
            className="w-full flex justify-center tems-center min-h-[22em]"
            mode="single"
            disabled={[{ before: today }]}
            selected={selected}
            onSelect={setSelected}
            modifiersClassNames={{
              booked: "border border-red-500 text-red-500 text-center",
            }}
            modifiers={{ booked: bookedDates }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-500 rounded-full"></div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Booked Dates
          </span>
        </div>
      </div>

      <div>
        {dateEvents.map(
          (date) =>
            date.date.toLocaleDateString() ===
              selected?.toLocaleDateString() && (
              <div key={date.id} className="flex flex-col mx-2 gap-3 mt-3">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{selected.toLocaleDateString()} - {date.eventname}</span>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Info - {date.notes}</span>
              </div>
            )
        )}
      </div>

      {/* Contact */}
      <div className="mt-4 p-3 ">
      <Link
        href={"/contact"}
        className={cn(
          "group mb-[7vh] text-base text-white transition-all ease-in hover:cursor-pointer"
        )}
      >
        <AnimatedShinyText className="inline-flex  neon-pink rounded-full items-center justify-center px-4  transition ease-out hover:text-neutral-900 hover:duration-300 hover:dark:text-pink-300 ">
          Contact Us
          <ArrowRightIcon className="ml-1 size-9 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </Link>
      </div>
    </div>
  );
}
