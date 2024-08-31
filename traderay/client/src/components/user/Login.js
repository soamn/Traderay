import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const loginUser = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (response.status === 200) {
      props.setToken(json.token);
      localStorage.setItem("token", JSON.stringify(json.token));
      localStorage.setItem("tokenCreatedAt", JSON.stringify(Date.now()));
      setInvalid(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } else {
      setInvalid(true);
    }
  };
  return (
    <>
      <div className="bg-slate-100 w-screen h-screen flex justify-center content-center items-center  ">
        {success ? (
          <div className="w-fit h-fit p-4 bg- bg-slate-200 shadow-lg rounded-md absolute top-0 left-50 z-30 text-green-500 font-bold">
            {" "}
            ✅ success
          </div>
        ) : (
          <></>
        )}
        <div className="absolute opacity-70 z-0 top-0 left-1 w-52 h-52">
          <div className=" w-1/2 h-1/2 absolute bg-green-300 rounded-full left-8"></div>
          <div className=" w-11/12 h-full absolute bg-green-300 rounded-full top-9  left-20"></div>
        </div>
        <form
          className=" bg-slate-100 shadow-slate-800 shadow-lg w-full  p-7 rounded-xl gap-4 flex flex-col z-10 md:w-1/2"
          onSubmit={loginUser}
        >
          <label htmlFor="email" className="block p-1 ">
            Enter your email:
          </label>
          <input
            name="email"
            type="email "
            id="email"
            required
            className="rounded-md border-2 w-full p-1 focus:outline-none text-black  "
            onChange={(e) => {
              setEmail(e.target.value);
              setInvalid(false);
            }}
          />

          <label htmlFor="password" className="block p-1  ">
            Enter your password:
          </label>
          <input
            name="password"
            type="password"
            className="rounded-md border-2 w-full p-1 focus:outline-none text-black  "
            minLength={8}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setInvalid(false);
            }}
          />
          {invalid ? (
            <div className="relative  text-xs -top-4 left-2 text-red-500  ">
              Invalid Credentials !!
            </div>
          ) : (
            <></>
          )}
          <input
            type="submit"
            className="bg-blue-400 p-3 rounded-md border-1 shadow-lg border-black active:bg-blue-600 m-10 font-semibold"
            value="Login"
          />
          <h1 className="text-center">OR</h1>
          <Link
            className="bg-blue-400 p-3 rounded-md border-1 shadow-lg border-black active:bg-blue-600 m-10 font-semibold text-center"
            to="/Signup"
          >
            Signup
          </Link>
        </form>
      </div>
    </>
  );
}
