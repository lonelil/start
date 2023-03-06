import { useState, useEffect } from "react";
import axios from "axios";
import Clock from "./components/ui/Clock";

export default function App() {
  const [wallpaper, setWallpaper] = useState({
    image: "",
    credit: "",
    url: "",
  });

  useEffect(function () {
    async function getWallpaper() {
      const data = (
        await axios.get(
          "https://api.unsplash.com/photos/random?count=1&collections=1053828",
          {
            headers: {
              authorization:
                "Client-ID 1351e7003b0e869c6d7b221fe548c25216b16571ad28866446c06196ba1902d7",
            },
          }
        )
      ).data[0];

      setWallpaper({
        image: data.urls.full,
        credit: `${data.user.name}`,
        url: data.links.html,
      });
    }
    getWallpaper();
  }, []);

  return (
    <>
      <div className="absolute  z-[1] w-screen h-screen text-white overflow-y-hidden">
        <div className="fixed bottom-0 pb-4 w-screen flex justify-center text-center">
          <div className="bg-zinc-900 p-6 bg-opacity-90 rounded-xl">
            <h1 className="text-6xl font-semibold">
              <Clock />
            </h1>
            <p className="ml-[3px]">
              {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
                new Date()
              )}{" "}
              {new Date().getDate()}{" "}
              {new Intl.DateTimeFormat("en-US", { month: "short" }).format(
                new Date()
              )}
            </p>
          </div>
        </div>
      </div>

      <img
        loading="lazy"
        src={wallpaper.image}
        className="h-screen w-screen object-cover"
      ></img>
    </>
  );
}
