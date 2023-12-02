"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useBookingContext } from "../context";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Booking() {
  const { events, setItems } = useBookingContext();

  type EventInfo = {
    event: {
      title: string;
      extendedProps: {
        booker: string;
      };
    };
  };

  const renderEventContent = (eventInfo: EventInfo) => {
    return (
      <div className="flex flex-col">
        <span>{eventInfo.event.title}</span>
        <span>{eventInfo.event.extendedProps.booker}</span>
      </div>
    );
  };

  const allMachines = [
    "Machine 1",
    "Machine 2",
    "Machine 3",
    "Machine 4",
    "Machine 5",
    "Machine 6",
    "Machine 7",
    "Machine 8",
  ];

  const [open, setOpen] = useState(false);
  const [availableMachines, setAvailableMachines] = useState([...allMachines]);
  const [booking, setBooking] = useState({
    title: "",
    start: new Date(),
    booker: "",
  });

  const handleOpen = (confirm: boolean) => {
    setOpen(!open);
    if (confirm) {
      setItems([...events, booking]);
      setBooking({
        title: "",
        start: new Date(),
        booker: "",
      });
    } else {
      setAvailableMachines([...allMachines]);
      setBooking({
        title: "",
        start: new Date(),
        booker: "",
      });
    }
  };

  const newBooking = (event: { date: Date }) => {
    setOpen(true);
    const milliseconds = 60 * 60 * 1000;
    const roundedDate = new Date(
      Math.floor(event.date.getTime() / milliseconds) * milliseconds
    );
    setBooking({
      ...booking,
      start: roundedDate,
    });

    const filtered = events
      .filter((element) => element.start.getTime() === roundedDate.getTime())
      .map((a) => a.title);

    setAvailableMachines(
      [...availableMachines].filter((item) => !filtered.includes(item))
    );
  };

  return (
    <main className="w-full px-8">
      <div className="flex flex-col items-center">
        <h2 className="mb-8">
          Book your washing machine by clicking the calendar where you want to
          book!
        </h2>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        height={600}
        dateClick={(event) => newBooking(event)}
        slotMinTime={"09:00:00"}
        slotMaxTime={"17:00:00"}
        duration={"01:00:00"}
        firstDay={1}
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Booking for {booking.start.getDate()}.{booking.start.getMonth() + 1}.
          {booking.start.getFullYear()}
        </DialogHeader>
        <DialogBody className="flex gap-4 flex-col">
          <Input
            label="Name"
            color="gray"
            id="name"
            name="name"
            onChange={(event) => {
              setBooking({ ...booking, booker: event.target.value });
            }}
            value={booking.booker}
            crossOrigin={""}
          />
          <Select
            label="Select machine"
            onChange={(choice) =>
              setBooking({ ...booking, title: choice ? choice : "" })
            }
            value={booking.title}
          >
            {availableMachines.map((element, index) => {
              return (
                <Option key={index} value={element}>
                  {element}
                </Option>
              );
            })}
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(true)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </main>
  );
}
