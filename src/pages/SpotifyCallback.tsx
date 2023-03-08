import { useEffect } from "react";

export default function SpotifyCallback() {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      window.localStorage.setItem("spotify_token", accessToken);
      location.replace("/");
    }
  }, []);

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-8xl font-semibold">Loading...</h1>
    </div>
  );
}
