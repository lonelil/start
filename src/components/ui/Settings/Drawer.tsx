import { FiSettings } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function SettingsDrawer() {
  const { register, watch } = useForm();

  useEffect(() => {
    if (watch("12hour") !== "DEFAULT")
      localStorage.setItem("12hour", watch("12hour"));
  }, [watch("12hour")]);

  useEffect(() => {
    if (watch("weather-lat") && watch("weather-lon"))
      localStorage.setItem(
        "weather",
        JSON.stringify([watch("weather-lat"), watch("weather-lon")])
      );
  }, [watch("weather-lat"), watch("weather-lon")]);

  return (
    <div className="drawer drawer-end">
      <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="settings-drawer"
          className="drawer-button fixed bottom-0 right-0 cursor-pointer p-4"
        >
          <FiSettings />
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="settings-drawer" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-zinc-800 p-4 text-base-content">
          <div className="px-4 py-2">
            <p className="text-lg">12 Hour</p>
            <span className="block text-sm text-zinc-400">
              Changes the clock to show time in 12 Hour instead of 24 hours.
            </span>
            <select
              className="select mt-4 w-full max-w-xs bg-zinc-900"
              defaultValue={"DEFAULT"}
              {...register("12hour")}
            >
              <option disabled value="DEFAULT">
                Choose a option...
              </option>
              <option value={"true"}>Enable</option>
              <option value={"false"}>Disable</option>
            </select>
          </div>

          <div className="px-4 py-2">
            <p className="text-lg">Weather</p>
            <span className="block text-sm text-zinc-400">
              Set the location of the weather to show.
            </span>

            <div className="form-control w-full max-w-xs">
              <span className="mt-2 mb-1 text-sm text-zinc-400">Latitude</span>
              <input
                type="text"
                placeholder="Latitude"
                className="input-bordered input w-full max-w-xs bg-zinc-900"
                {...register("weather-lat")}
              />
              <span className="mt-2 mb-1 text-sm text-zinc-400">Longitude</span>
              <input
                type="text"
                placeholder="Longitude"
                className="input-bordered input w-full max-w-xs bg-zinc-900"
                {...register("weather-lon")}
              />
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
