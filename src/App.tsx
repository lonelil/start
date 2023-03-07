import { useState, useEffect } from "react";
import axios from "axios";
import Clock from "./components/ui/Clock";

export default function App() {
  const [wallpaperLoading, setWallpaperLoading] = useState(true);
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
      setWallpaperLoading(false);
    }
    getWallpaper();
  }, []);

  return (
    <>
      <div className="absolute  z-[1] h-screen w-screen overflow-y-hidden text-white">
        <div className="fixed bottom-0 flex w-screen justify-center pb-4 text-center">
          <div
            className={`absolute bottom-40 flex flex-col rounded-xl p-2 drop-shadow-lg backdrop-blur-lg`}
          >
            <button className="rounded-lg p-2 hover:backdrop-blur-2xl">
              test
            </button>
          </div>
          <div className="rounded-xl p-6 drop-shadow-lg backdrop-blur-lg">
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

      {!wallpaperLoading && (
        <img
          loading="lazy"
          src={wallpaper.image}
          className="h-screen w-screen object-cover"
        ></img>
      )}
    </>
  );
}
