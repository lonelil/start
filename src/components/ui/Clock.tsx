import { useState, useEffect, useRef } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());
  const intervalRef = useRef<number>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return (
    <>
      {localStorage.getItem("12hour")
        ? date.toLocaleTimeString()
        : date.toLocaleString("en-GB").slice(12)}
    </>
  );
}
