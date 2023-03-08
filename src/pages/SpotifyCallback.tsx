import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function SpotifyCallback() {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");
    /*const tokenType = params.get("token_type");
    const expiresIn = params.get("expires_in");*/

    if (accessToken) {
      window.localStorage.setItem("spotify_token", accessToken);
      location.replace("/");
    }
  }, []);

  return (
    <>
      <h1>loading</h1>
    </>
  );
}
