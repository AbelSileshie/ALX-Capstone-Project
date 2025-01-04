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
    <div className="flex items-center justify-center min-h-screen">
      {showError ? (
        <>
          <Error404 />
        </>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner size="xxl" />
        </div>
      )}
    </div>
  );
}
