"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type EventItem = {
  title: string;
  start: Date;
  booker: string;
};

type ContextType = {
  events: EventItem[];
  setItems: (events: EventItem[]) => void;
};

const initialContext: ContextType = {
  events: [],
  setItems: () => null,
};

const context = [
  {
    title: "Machine 1",
    start: new Date("December 1, 2023 14:00:00"),
    booker: "Linda",
  },
  {
    title: "Machine 2",
    start: new Date("December 5, 2023 15:00:00"),
    booker: "Milla",
  },
  {
    title: "Machine 4",
    start: new Date("December 7, 2023 12:00:00"),
    booker: "Niklas",
  },
  {
    title: "Machine 5",
    start: new Date("December 4, 2023 14:00:00"),
    booker: "Tuomas",
  },
  {
    title: "Machine 6",
    start: new Date("December 7, 2023 09:00:00"),
    booker: "Tuomas",
  },
  {
    title: "Machine 7",
    start: new Date("December 8, 2023 10:00:00"),
    booker: "Juho",
  },
  {
    title: "Machine 8",
    start: new Date("December 8, 2023 10:00:00"),
    booker: "Antti",
  },
  {
    title: "Machine 1",
    start: new Date("December 26, 2023 14:00:00"),
    booker: "Anna",
  },
  {
    title: "Machine 3",
    start: new Date("December 26, 2023 14:00:00"),
    booker: "Mia",
  },
  {
    title: "Machine 3",
    start: new Date("December 4, 2023 14:00:00"),
    booker: "Anna",
  },
  {
    title: "Machine 3",
    start: new Date("December 3, 2023 14:00:00"),
    booker: "Anna",
  },
  {
    title: "Machine 3",
    start: new Date("December 1, 2023 14:00:00"),
    booker: "Anna",
  },
];
export const BookingContext = createContext<ContextType>(initialContext);

export const useBookingContext = () => useContext(BookingContext);

type Props = {
  children: ReactNode;
};

const BookingProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<EventItem[]>(context);

  const setItems = (newEvents: EventItem[]) => {
    setEvents(newEvents);
  };
  return (
    <BookingContext.Provider value={{ events, setItems }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
