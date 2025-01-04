"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import Error404 from "../error/Error404";

export function Spiner() {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 20000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      {showError ? (
        <>
          <Error404 />
        </>
      ) : (
        <div className="h-[10rem] w-[10rem] mx-auto my-auto mt-[50vh]">
          <Spinner />
        </div>
      )}
    </div>
  );
}
