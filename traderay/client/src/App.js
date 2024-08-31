import React, { useEffect } from "react";
import { useState } from "react";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./components/admin/AllEvents";
//function starts here
function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const getResponse = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(JSON.parse(storedToken));

    const response = await fetch(`${process.env.SERVER}/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    if (response.status === 200) {
      const json = await response.json();

      setUser(json.user);
      setRole(json.role);
    }
  };
  useEffect(() => {
    getResponse();
  }, [token]);
  useEffect(() => {
    setTimeout(() => {
      const tokenCreatedAt = localStorage.getItem("tokenCreatedAt");

      if (Date.now() - tokenCreatedAt > 1 * 15 * 60 * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenCreatedAt");
      }
    }, 5000);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {role === "admin" ? (
            <Route index element={<Events />} />
          ) : (
            <Route index element={<Home user={user} />} />
          )}
          <Route path="Login" element={<Login setToken={setToken} />} />
          <Route path="Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
