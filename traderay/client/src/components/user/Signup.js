import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [match, setMatch] = useState("match");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const registerUser = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMatch("noMatch");
      return;
    }

    const response = await fetch(`${process.env.SERVER}/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    }
  };
  return (
    <div className="bg-slate-100 w-screen h-full flex justify-center content-center items-center lg:h-[100svh] ">
      {success ? (
        <div className="w-fit h-fit p-4 bg- bg-slate-200 shadow-lg rounded-md absolute top-0 left-50 z-30 text-green-500 font-bold">
          {" "}
          ✅ success
        </div>
      ) : (
        <></>
      )}
      <div className="absolute opacity-70 z-0 top-0 left-1 w-52 h-52   ">
        <div className=" w-1/2 h-1/2 absolute bg-green-300 rounded-full left-8"></div>
        <div className=" w-11/12 h-full absolute bg-green-300 rounded-full top-9  left-20"></div>
      </div>

      <form
        className="  bg-slate-100 shadow-slate-800 shadow-lg w-11/12  p-7 rounded-xl gap-4 flex flex-col z-10 mt-10 h-fit mb-10 md:w-1/2 "
        onSubmit={registerUser}
      >
        <label htmlFor="email" className="block p-1 ">
          Enter your email:
        </label>
        <input
          name="email"
          type="email "
          id="email"
          className="rounded-md border-2 w-full p-1 focus:outline-none text-black "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="username" className="block p-1 ">
          Enter your username:
        </label>
        <input
          name="username"
          type="text"
          className="rounded-md border-2  w-full  p-1 focus:outline-none text-black "
          maxLength={8}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" className="block p-1  ">
          Enter your password:
        </label>
        <input
          name="password"
          type="password"
          className="rounded-md border-2 w-full p-1 focus:outline-none text-black  "
          // minLength={8}
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setMatch("match");
          }}
        />
        {match === "noMatch" ? (
          <div className="relative -top-4 text-xs left-2 text-red-500  ">
            ! password do not not match
          </div>
        ) : (
          <></>
        )}

        <label htmlFor="confirmPassword" className="block p-1">
          Confirm your password:
        </label>
        <input
          name="confirmPassword"
          type="password"
          className="rounded-md border-2 w-full p-1 focus:outline text-black"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setMatch("match");
          }}
          minLength={8}
          required
        />
        <input
          type="submit"
          className="bg-blue-400 p-3 rounded-md border-1 shadow-lg border-black active:bg-blue-400 m-10 font-semibold "
          value="Sign up"
        />
        <h1 className="text-center">OR</h1>
        <Link
          className="bg-blue-400 p-3 rounded-md border-1 shadow-lg  border-black active:bg-blue-400 m-10 font-semibold text-center"
          to="/Login"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
