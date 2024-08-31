import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Order(props) {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [Quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const [option, setOption] = useState(props.option);
  const [success, setSuccess] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (Quantity > 5) {
      setQuantity(5);
    } else if (Quantity < 1) {
      setQuantity(1);
    }
    if (price > 9.9) {
      setPrice(9.9);
    } else if (price < 0.1) {
      setPrice(0.1);
    }
  }, [Quantity, price]);
  useEffect(() => {
    if (option === "yes") {
      setPrice(props.event.yes);
    } else {
      setPrice(props.event.no);
    }
  }, [option]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(JSON.parse(storedToken));
  }, []);

  const placeOrder = async () => {
    const response = await fetch(`${process.env.SERVER}/events/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify({
        option: option,
        quantity: Quantity,
        price: price.toFixed(1),
        event: props.event,
      }),
    });
    if (response.status === 401) {
      setUnauthorized(true);
    }
    if (response.status === 201) {
      setSuccess(true);
      setTimeout(() => {
        props.setShowOrder(false);
      }, 1000);
    }
  };
  return (
    <>
      <div className="  justify-center flex w-full  ">
        <div className="p-5 w-fit shadow-2xl bg-slate-200 rounded-xl fixed top-2/3 h-full  flex flex-col gap-5 items-center md:w-full">
          {success ? (
            <div className="w-fit h-fit p-3 bg- bg-slate-200 shadow-xl shadow-slate-800 rounded-md absolute -top-16 left-50 z-30 text-green-500 font-bold">
              {" "}
              ✅ Placed
            </div>
          ) : (
            <></>
          )}
          {unauthorized ? (
            <>
              <div className="w-fit h-fit p-3 bg- bg-slate-200 shadow-xl shadow-slate-800 rounded-md absolute -top-16 left-50 z-30 text-red-500 font-bold">
                {" "}
                ❌ Unauthorized please Log in
              </div>
            </>
          ) : (
            <></>
          )}

          <div
            className=" absolute top-2 left-1 w-10"
            onClick={() => {
              props.setShowOrder(false);
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
          <div className="flex text-center  gap-10">
            <div>
              <input
                id="yes"
                className="appearance-none peer/yes "
                name="option"
                type="radio"
                value="yes"
                checked={option === "yes"}
                onChange={(e) => {
                  setOption(e.target.value);
                }}
              />
              <label
                htmlFor="yes"
                className=" peer-checked/yes:ring-2 ring-green-700 peer-checked/yes:bg-green-100  shadow-md bg-slate-100  rounded-md w-32 p-2 font-bold   hover:cursor-pointer self-center"
              >
                Yes {props.event.yes}
              </label>
            </div>
            <div>
              <input
                id="no"
                className="appearance-none peer/no "
                name="option"
                type="radio"
                value="no"
                checked={option === "no"}
                onChange={(e) => {
                  setOption(e.target.value);
                }}
              />
              <label
                htmlFor="no"
                className="  peer-checked/no:ring-2 ring-red-700 peer-checked/no:bg-red-100 shadow-md bg-slate-100 rounded-md  p-2 font-bold   hover:cursor-pointer self-center"
              >
                No {props.event.no}
              </label>
            </div>
          </div>

          <hr className="h-1 w-full bg-black "></hr>
          <div className="flex flex-row gap-2 items-center  ">
            <div className="text-lg">Set Price :</div>
            <div className="flex w-fit">
              <button
                onClick={() => {
                  setPrice(price - 0.1);
                }}
                className=" text-black text-3xl bg-white  h-7   rounded-xl w-10  active:bg-slate-100 "
              >
                -
              </button>
              <input
                type="number"
                className="rounded-xl w-20 text-center outline-none"
                min={0.1}
                max={9.9}
                value={price.toFixed(1)}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
              />
              <button
                onClick={() => {
                  setPrice(price + 0.1);
                }}
                className="text-black   text-3xl bg-white  h-7   rounded-xl w-10 active:bg-slate-100   "
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center  ">
            <div className="text-lg">Quantity :</div>
            <div className="flex w-fit">
              <button
                onClick={() => {
                  setQuantity(Quantity - 1);
                }}
                className=" text-black text-3xl bg-white  h-7   rounded-xl w-10  active:bg-slate-100 "
              >
                -
              </button>
              <input
                className="rounded-xl w-20 text-center outline-none"
                min={1}
                max={5}
                value={Quantity}
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
              />
              <button
                onClick={() => {
                  setQuantity(Quantity + 1);
                }}
                className="text-black   text-3xl bg-white  h-7   rounded-xl w-10 active:bg-slate-100   "
              >
                +
              </button>
            </div>
          </div>
          <div>
            {" "}
            <button
              onClick={() => {
                placeOrder();
              }}
              className="shadow-md bg-yellow-500 text-black rounded-lg w-52 p-1 font-bold active:bg-yellow-600   hover:cursor-pointer self-center -mt-1"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
