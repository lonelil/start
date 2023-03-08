import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SettingsButton from "../SettingsButtons";
import { FaSpotify } from "react-icons/fa";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";

const spotifyApi = new SpotifyWebApi();
export default function MusicPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentTrackLoaded, setCurrentTrackLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] =
    useState<SpotifyApi.CurrentlyPlayingResponse>();
  const [playStatus, setPlatStatus] = useState("play");

  useEffect(function () {
    if (window.localStorage.getItem("spotify_token")) {
      spotifyApi.setAccessToken(window.localStorage.getItem("spotify_token"));
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((data) => {
          setCurrentTrack(data);
        })
        .catch((err) => {
          console.error(err);
          window.localStorage.removeItem("spotify_token");
          location.reload();
        });

      setLoggedIn(true);
      setCurrentTrackLoaded(true);
      var timer = setInterval(() => {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
          setCurrentTrack(data);
        });
      }, 5000);
      return function cleanup() {
        clearInterval(timer);
      };
    }
  }, []);
  return (
    <>
      {!loggedIn ? (
        <>
          <p className="text-2xl">Please login to continue.</p>
          <div className="flex justify-center">
            <SettingsButton
              Icon={FaSpotify}
              text={`Login to Spotify`}
              onClick={() =>
                location.replace(
                  `https://accounts.spotify.com/authorize?response_type=token&redirect_uri=${encodeURIComponent(
                    `https://start.lonelil.dev/spotify-callback/`
                  )}&client_id=359ca61f4326438393898d34501d4907&scope=user-read-playback-position+user-modify-playback-state+user-read-playback-state+user-read-currently-playing`
                )
              }
            />
          </div>
        </>
      ) : (
        <>
          {currentTrackLoaded ? (
            <>
              <div className="flex items-center space-x-3">
                <img
                  src={currentTrack?.item?.album.images[0].url}
                  width={69}
                  height={69}
                  alt={currentTrack?.item?.album.name}
                  className="rounded"
                />
                <div className="text-left">
                  <p className="text-xl">{currentTrack?.item?.name}</p>
                  <p className="text-sm">
                    {currentTrack?.item?.artists.map(
                      (artist, i: number, { length }) => {
                        return (
                          <span key={i}>
                            {artist.name}
                            {length - 1 !== i && (
                              <span className="mr-1">,</span>
                            )}
                          </span>
                        );
                      }
                    )}
                  </p>
                  <div className="flex  justify-evenly text-2xl">
                    <button onClick={() => spotifyApi.skipToPrevious()}>
                      <IoPlaySkipBack />
                    </button>
                    {playStatus == "play" ? (
                      <button
                        onClick={() => {
                          spotifyApi.pause();
                          setPlatStatus("pause");
                        }}
                      >
                        <IoPauseCircle size={36} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          spotifyApi.play();
                          setPlatStatus("play");
                        }}
                      >
                        <IoPlayCircle size={36} />
                      </button>
                    )}
                    <button onClick={() => spotifyApi.skipToNext()}>
                      <IoPlaySkipForward />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>You are not playing anything!</p>
          )}
        </>
      )}
    </>
  );
}
