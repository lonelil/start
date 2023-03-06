import { useState, useEffect } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
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
