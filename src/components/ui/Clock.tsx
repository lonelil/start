import { useState, useEffect, useRef } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (!document.hidden) {
      intervalRef.current = setInterval(() => {
        setDate(new Date());
      }, 1000);
    }

    const visibilityChangeHandler = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setDate(new Date());
        }, 1000);
      }
    };

    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  });

  return (
    <>
      {localStorage.getItem("12hour") === "true"
        ? date.toLocaleTimeString()
        : date.toLocaleString("en-GB").slice(12)}
    </>
  );
}
