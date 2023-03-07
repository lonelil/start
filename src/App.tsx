import { useState, useEffect } from "react";
//import axios from "axios";
import Clock from "./components/ui/Clock";
import { FiHome, FiImage, FiMusic } from "react-icons/fi";

export default function App() {
  const [wallpaperLoading, setWallpaperLoading] = useState(true);
  const [wallpaper, setWallpaper] = useState({
    image: "",
    credit: "",
    url: "",
  });

  /*useEffect(function () {
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
  }, []);*/

  const handleWallpaperChange = () => {
    fetch(
      "https://api.unsplash.com/photos/random?count=1&collections=1053828",
      {
        headers: {
          authorization:
            "Client-ID 1351e7003b0e869c6d7b221fe548c25216b16571ad28866446c06196ba1902d7",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data = data[0];
        setWallpaper({
          image: data.urls.full,
          credit: `${data.user.name}`,
          url: data.links.html,
        });
        setWallpaperLoading(false);
      });
  };

  useEffect(function () {
    handleWallpaperChange();
  }, []);

  return (
    <>
      <div className="absolute z-[1] h-screen w-screen overflow-y-hidden text-white">
        <div className="fixed bottom-0 flex w-screen justify-center pb-4 text-center">
          <div
            className={`absolute bottom-40 flex flex-row gap-2 rounded-xl p-2 drop-shadow-lg backdrop-blur-lg`}
          >
            <button className="rounded-lg p-2 hover:bg-white hover:bg-opacity-25">
              <FiHome size={24} />
            </button>
            <button className="rounded-lg p-2 hover:bg-white hover:bg-opacity-25">
              <FiMusic size={24} />
            </button>
            <button
              className="rounded-lg p-2 hover:bg-white hover:bg-opacity-25"
              onClick={() => handleWallpaperChange()}
            >
              <FiImage size={24} />
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
          src={wallpaper.image}
          alt={`${wallpaper.credit}, ${wallpaper.url}.`}
          className="h-screen w-screen object-cover"
        ></img>
      )}
    </>
  );
}
