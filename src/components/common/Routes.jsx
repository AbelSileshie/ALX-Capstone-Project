import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Nointernet from "../error/Nointernet";
import Signup from "../../Page/Signup/Signup";
import Login from "../../Page/Login/Login";
import App from "../../App";
import Error404 from "../error/Error404";
import { Spiner } from "../layout/Spiner";
import Moviedetail from "../../Page/Movie/Moviedetail";
import Series from "../specific/Movie/Series";

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
          <Route path="/" element={<App />} />
        ) : (
          <Route path="/Nointernet" element={<Nointernet />} />
        )}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/movie/:id" element={<Moviedetail />} />
        <Route path="/series/:id" element={<Series />} />
      </Routes>
    </Suspense>
  );
}
