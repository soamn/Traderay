import React, { useEffect, useState } from "react";
import CreateEvent from "./createEvent";
import { Link } from "react-router-dom";

function Events() {
  const [eventDialog, setEventDialog] = useState(false);
  const [events, setEvents] = useState([]);

  const getResponse = async () => {
    const response = await fetch(`${process.env.PORT}/worker/event`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const json = await response.json();
    setEvents(json.events);
  };
  useEffect(() => {
    getResponse();
  }, [eventDialog]);
  return (
    <>
      <div className="absolute h-screen w-full "></div>

      <div className="p-5 indent-4  text-black absolute flex-wrap flex flex-col ">
        <h1>Hello Admin</h1>

        <button
          onClick={() => {
            setEventDialog(true);
          }}
          className="bg-blue-400 rounded-md w-56 p-3 font-bold active:bg-blue-300  hover:bg-blue-500 hover:cursor-pointer self-center"
        >
          Create Event
        </button>
        <div className="flex text-blue-500 font-semibold">
          <Link to="Login">Login</Link>
          <Link to="Signup">Signup</Link>
        </div>
        <div className="flex flex-row w-full flex-wrap gap-2 p-3 ">
          {events.map((event, index) => (
            <div
              key={index}
              className="h-34 w-52 bg-zinc-700 text-white flex flex-col p-3 gap-1 rounded-lg "
            >
              <h1 className="font-extrabold indent-2 ">{event.title}</h1>
              <div className="bg-blue-200 w-full h-32 rounded-xl"></div>
              <h1 className="font-bold indent-2">Yes-{event.yes}</h1>
              <h1 className="font-bold indent-2">No-{event.no}</h1>

              <h1 className="font-bold indent-2">
                StartTime-{event.startTime}
              </h1>
              <h1 className="font-bold indent-2">endTime-{event.endTime}</h1>
            </div>
          ))}
        </div>
        {eventDialog ? <CreateEvent setEventDialog={setEventDialog} /> : <></>}
      </div>
    </>
  );
}

export default Events;
