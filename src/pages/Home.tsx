import { useState, useEffect } from "react";
import { FiHome, FiImage, FiMusic } from "react-icons/fi";
import SettingsButton from "../components/dynamicIsland/SettingsButtons";
import HomePage from "../components/dynamicIsland/pages/Home";
import WallpaperPage from "../components/dynamicIsland/pages/Wallpaper";
import MusicPage from "../components/dynamicIsland/pages/Music";

export default function Home() {
  const [wallpaperLoading, setWallpaperLoading] = useState(true);
  const [wallpaper, setWallpaper] = useState({
    image: "",
    credit: "",
    url: "",
    alt_description: "",
  });
  const [dynamicIslandPage, setDyanmicIslandPage] = useState("home");

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
          alt_description: data.alt_description,
        });
        setWallpaperLoading(false);
      });
  };

  useEffect(function () {
    handleWallpaperChange();
  }, []);

  return (
    <>
      <div className="absolute z-[1] h-screen w-screen overflow-y-hidden">
        <div className="fixed bottom-0 flex w-screen justify-center pb-4 text-center">
          <div
            className={`absolute bottom-40 flex flex-row gap-2 rounded-xl p-2 drop-shadow-lg backdrop-blur-lg`}
          >
            <SettingsButton
              Icon={FiHome}
              onClick={() => setDyanmicIslandPage("home")}
            />
            <SettingsButton
              Icon={FiMusic}
              onClick={() => setDyanmicIslandPage("music")}
            />
            <SettingsButton
              Icon={FiImage}
              onClick={() => setDyanmicIslandPage("wallpaper")}
            />
          </div>
          <div className="max-h-[135px] min-w-[300px] rounded-xl p-6 drop-shadow-lg backdrop-blur-lg">
            {dynamicIslandPage === "home" ? <HomePage /> : null}
            {dynamicIslandPage === "music" ? <MusicPage /> : null}
            {dynamicIslandPage === "wallpaper" ? (
              <WallpaperPage
                wallpaper={wallpaper}
                handleWallpaperChange={handleWallpaperChange}
              />
            ) : null}
          </div>
        </div>
      </div>

      {!wallpaperLoading && (
        <img
          src={wallpaper.image}
          alt={wallpaper.alt_description}
          className="h-screen w-screen object-cover"
        ></img>
      )}
    </>
  );
}
