"use client";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import "react-day-picker/dist/style.css";
import useDateEvent from "@/app/admin/Actions/useDateEvent";
import { useMemo, useState } from "react";


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
              <div key={date.id} className="flex flex-col mx-2 gap-3 mt-3 bg-slate-200">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{selected.toLocaleDateString()} - {date.eventname}</span>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Info - {date.notes}</span>
              </div>
            )
        )}
      </div>

      {/* Contact */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors text-xs sm:text-sm">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Contact Information
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          To make a booking, please contact us:
        </p>
        <ul className="mt-1 space-y-1">
          <li>📞 91+ 98977xxxxx</li>
          <li>✉️ bookings@marriagehall.com</li>
          <li>⏰ 9:00 AM - 6:00 PM</li>
        </ul>
      </div>
    </div>
  );
}
