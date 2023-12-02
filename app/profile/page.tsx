"use client";

import { useBookingContext } from "../context";

export default function Profile() {
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

  const filteredEventsPast = events.filter(
    (element) =>
      element.booker.toLocaleLowerCase() === "anna" &&
      element.start.getTime() < new Date().getTime()
  );

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="mb-4">Upcoming bookings for Anna</h1>
      <div className="mb-8">
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

      {filteredEventsPast.length > 0 && (
        <div className="text-gray-700">
          <h1>Past bookings</h1>
          {filteredEventsPast.map((element, index) => {
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
      )}
    </main>
  );
}
