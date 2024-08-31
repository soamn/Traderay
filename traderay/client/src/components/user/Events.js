import React, { useEffect, useState } from "react";
import EventDetails from "./EventDetails.js";

function Events(props) {
  const { eventDetail, setEventDetail } = props;
  const [events, setEvents] = useState([""]);
  const [descriptions, setDescriptions] = useState([]);
  const getResponse = async () => {
    const response = await fetch(`${process.env.SERVER}/worker/event`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setEvents(json.events);
      setDescriptions(json.description);
    }
  };
  useEffect(() => {
    getResponse();
  }, []);

  return (
    <div className="w-full h-full mt-14 ">
      <div className="text-center text-2xl font-medium text-blue-500">
        Events
      </div>
      <div
        className={`p-20 w-full  items-center flex  flex-wrap gap-14 justify-center    ${
          eventDetail !== null ? "hidden " : ""
        }`}
      >
        {events.length === 0 ? (
          <p>No Events</p>
        ) : (
          events.map((event, index) => (
            <div
              onClick={() => {
                setEventDetail(event);
              }}
              key={index}
              className="bg-gray-100 shadow-md w-full md:w-1/2 md:ml-1/2 p-4 rounded-xl flex gap-4 flex-col text-center  "
            >
              <h1 className="font-bold text-2xl ">{event.title}</h1>
              <div className="flex gap-10 w-full lg:w-1/2 self-center">
                <button className="shadow-md bg-green-100 text-green-700 rounded-md   w-1/2 p-2  font-bold active:bg-green-200   hover:cursor-pointer self-center">
                  {" "}
                  Yes ₹{event.yes}
                </button>
                <button className="shadow-md bg-red-100 text-red-700 rounded-md w-1/2 p-2 font-bold active:bg-red-200   hover:cursor-pointer self-center">
                  {" "}
                  No ₹{event.no}
                </button>
              </div>
              <p className="text-slate-400">
                Start-time-{event.startTime} end time-{event.endTime}
              </p>
            </div>
          ))
        )}
      </div>

      {eventDetail !== null ? (
        <EventDetails
          event={eventDetail}
          setEventDetail={setEventDetail}
          descriptions={descriptions}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Events;
