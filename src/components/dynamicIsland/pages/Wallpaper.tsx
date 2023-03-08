import { FiImage } from "react-icons/fi";
import SettingsButton from "../SettingsButtons";

export default function WallpaperPage({
  wallpaper,
  handleWallpaperChange,
}: {
  wallpaper: {
    credit: string;
    url: string;
    alt_description: string;
  };
  handleWallpaperChange: () => void;
}) {
  return (
    <>
      <a
        href={wallpaper.url}
        className="text-2xl font-semibold"
        target="_blank"
      >
        {wallpaper.alt_description}
      </a>
      <p className="text-lg">by {wallpaper.credit}</p>
      <div className="flex justify-center">
        <SettingsButton
          Icon={FiImage}
          onClick={() => handleWallpaperChange()}
          text={"Next Image"}
        />
      </div>
    </>
  );
}
