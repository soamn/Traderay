import React, { useState } from "react";

export default function CreateEvent(props) {
  const [title, setTitle] = useState("");
  const [yes, setYes] = useState("");
  const [no, setNo] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const eventSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.SERVER}/worker/event`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, yes, no, startTime, endTime, description }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    } else {
      props.setEventDialog(false);
      console.log(json.message);
    }
  };
  return (
    <>
      <div className=" absolute top-0 left-0 bg-black bg-opacity-50  hover:cursor-not-allowed   w-screen h-[100svh] p-20 flex justify-center  flex-wrap ">
        <div className="bg-zinc-800 h-fit   w-fit  p-5 rounded-2xl hover:cursor-default text-slate-100  ">
          <button
            onClick={() => {
              props.setEventDialog(false);
            }}
            className="relative right-7 -top-5 text-2xl p-1 font-semibold w-8 text-center hover:text-zinc-400 active:text-black"
          >
            x
          </button>
          <form
            className="font-sans flex flex-col gap-10 "
            onSubmit={eventSubmit}
          >
            <input
              autoFocus
              type="text"
              className="block w-full capitalize bg-transparent   border-b-2  border-zinc-900  p-2 text-xl focus: outline-none placeholder:text-2xl  "
              placeholder="enter Event Name"
              name="title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              className="resize-none block w-full capitalize bg-transparent   border-b-2  border-zinc-900  p-2 text-xl focus: outline-none placeholder:text-2xl  "
              placeholder="enter Event Description"
              name="title"
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="flex justify-evenly gap-1">
              <label htmlFor="yes" className="place-self-center text-lg">
                Yes% :
              </label>
              <input
                type="number"
                className=" w-32 bg-transparent  border-b-2  border-zinc-900  p-2 text-xl focus: outline-none  "
                placeholder="Yes"
                name="yes"
                min={1}
                max={99}
                required
                onChange={(e) => {
                  setYes(e.target.value);
                }}
              />
              <label htmlFor="no" className="self-center text-lg">
                No% :
              </label>

              <input
                type="number"
                className="w-32 border-b-2 bg-transparent   border-zinc-900  p-2 text-xl focus: outline-none   "
                placeholder="No"
                name="no"
                required
                min={1}
                max={99}
                onChange={(e) => {
                  setNo(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-1">
              <label htmlFor="startTime" className="self-center text-lg">
                Start Time
              </label>
              <input
                name="startTime"
                type="time"
                className="w-22  p-2  text-sm focus: outline-none  bg-blue-400 rounded-xl "
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
              <label htmlFor="endTime" className="self-center text-lg">
                End Time
              </label>
              <input
                name="endTime"
                type="time"
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                className="w-22  p-2  text-sm focus: outline-none  bg-blue-400 rounded-xl "
              />
            </div>

            <input
              type="submit"
              value="create"
              className="bg-yellow-400 rounded-md w-24 p-3 font-bold active:bg-yellow-300  hover:bg-yellow-500 hover:cursor-pointer self-center"
            />
          </form>
        </div>
      </div>
    </>
  );
}
