import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Nointernet from "../error/Nointernet";
import Signup from "../../Page/Signup/Signup";
import Login from "../../Page/Login/Login";
import App from "../../App";
import Error404 from "../error/Error404";
import { Spiner } from "../layout/Spiner";

export default function AppRouter() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<Error404 />} />
        {isConnected ? (
          <Route path="/Nointernet" element={<Error404 />} />
        ) : (
          <Route path="/Nointernet" element={<Nointernet />} />
        )}
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
}
