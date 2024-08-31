import React, { useEffect, useState } from "react";
import Order from "./Order";

function EventDetails(props) {
  const event = props.event;
  const descriptions = props.descriptions;
  const [showOrder, setShowOrder] = useState(false);
  const [yesbook, setYesbook] = useState([]);
  const [nobook, setNobook] = useState([]);
  const [option, setOption] = useState("yes");
  const [paragraph, setParagraph] = useState(false);
  const getResponse = async (event) => {
    const response = await fetch(`${process.env.SERVER}/events/orderbook`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event }),
    });
    const json = await response.json();

    setYesbook(json.yes_copy);

    setNobook(json.no_copy);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getResponse(event);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className="w-full h-full bg-white absolute left-0 top-20 p-10 flex flex-col gap-10 ">
        <div
          className=" absolute top-2 left-1 w-10"
          onClick={() => {
            props.setEventDetail(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="back-arrow"
          >
            <g>
              <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
            </g>
          </svg>
        </div>
        <div
          className={`sm:[${
            !paragraph ? " h-[300px] overflow-hidden  " : "h-screen"
          }]   `}
        >
          <h1 className="text-4xl p-2 font-bold ">{event.title}</h1>
          {descriptions.map((description, index) => (
            <p key={index} className="h-fit ">
              {description.id === event._id ? description.data : ""}
            </p>
          ))}
        </div>
        {!paragraph ? (
          <span
            className="text-blue-500 -mt-10 cursor-pointer"
            onClick={() => {
              setParagraph(true);
            }}
          >
            Read More
          </span>
        ) : (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setParagraph(false);
            }}
          >
            Hide
          </span>
        )}
        <div className="bg-slate-50 w-full p-4 rounded-lg shadow-md text-center gap-5 flex flex-col lg:w-1/2 self-center">
          <div className="text-2xl text-blue-300 font-semibold text-center">
            Order Book
          </div>
          <div className="flex gap-2 border-2 border-blue-50 font-semibold">
            <table className="w-1/2 text-center ">
              <tbody className="*:border-b-2 ">
                <tr>
                  <th>
                    Orders at <span className="text-green-300">Yes</span>
                  </th>
                  <th>
                    Quantity <span className="text-green-300">Yes</span>
                  </th>
                </tr>
                {yesbook.map((order, index) => (
                  <tr key={index}>
                    <td>₹ {order.price}</td>
                    <td>{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-1/2  text-center">
              <tbody className="*:border-b-2 ">
                <tr>
                  <th>
                    Orders at <span className="text-red-300">No</span>
                  </th>
                  <th>
                    Quantity at <span className="text-red-300">No</span>
                  </th>
                </tr>
                {nobook.map((order, index) => (
                  <tr key={index}>
                    <td>₹ {order.price}</td>
                    <td>{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" w-full h-fit -ml-10 bottom-0 absolute">
          <div
            className="flex   w-full    justify-evenly   p-5 gap-5 bg-gray-50 shadow-md  md:absolute
        "
          >
            <button
              onClick={() => {
                setShowOrder(true);
                setOption("yes");
              }}
              className="shadow-md bg-green-100 text-green-700 rounded-md w-52 p-2 font-bold active:bg-green-200   hover:cursor-pointer self-center"
            >
              Yes ₹{event.yes}
            </button>
            <button
              onClick={() => {
                setShowOrder(true);
                setOption("no");
              }}
              className="shadow-md bg-red-100 text-red-700 rounded-md w-52 p-2 font-bold active:bg-red-200   hover:cursor-pointer self-center"
            >
              No ₹{event.no}
            </button>
          </div>
        </div>
      </div>
      {showOrder ? (
        <Order setShowOrder={setShowOrder} event={event} option={option} />
      ) : (
        ""
      )}
    </>
  );
}

export default EventDetails;
