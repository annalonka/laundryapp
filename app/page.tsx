"use client";

import Image from "next/image";
import myGif from "../public/washing_machine.gif";
import { useBookingContext } from "./context";

export default function Home() {
  const { events } = useBookingContext();

  const filteredEventsFuture = events
    .filter(
      (element) =>
        element.booker.toLocaleLowerCase() === "anna" &&
        element.start.getTime() > new Date().getTime()
    )
    .sort((a, b) => {
      return a.start.getTime() - b.start.getTime();
    });

  return (
    <main className="flex flex-col items-center justify-center gap-8">
      <h1>Laundry Service</h1>
      <Image src={myGif} alt="my gif" width={200} className="h-full" />
      <div>
        <h2 className="mb-4">Upcoming bookings for Anna</h2>
        <div className="flex flex-col gap-4 mb-8">
          {filteredEventsFuture.map((element, index) => {
            return (
              <div
                key={index}
                className="flex gap-4 border-b-2 border-gray-400 border-solid"
              >
                <span>{element.title}</span>
                <span>
                  {element.start.getDate()}.{element.start.getMonth() + 1}.
                  {element.start.getFullYear()}
                </span>
                <span>@ {element.start.getHours()}:00</span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
