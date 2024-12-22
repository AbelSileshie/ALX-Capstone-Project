import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../../Page/Login/Login";
import App from "../../App";
import { Spiner } from "../layout/Spiner";
import Error404 from "../error/Error404";
import Signup from "../../Page/Signup/Signup";

const AppRoutes = () => (
  <Suspense fallback={<Spiner />}>
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
