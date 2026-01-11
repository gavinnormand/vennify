import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectPlaylist from "../components/selectPlaylist";
import Track from "../components/track";
import Venn from "../components/venn";
import PlaylistButton from "../components/playlistButton";
import { customContains } from "../utils/comparator";
import type { PlaylistAndTracks } from "../types";

function Compare() {
  const location = useLocation();
  const token = location.state.token;
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [leftPlaylist, setLeftPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

  const [rightPlaylist, setRightPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

  const [leftTracks, setLeftTracks] = useState<
    SpotifyApi.PlaylistTrackObject[] | null
  >(null);
  const [rightTracks, setRightTracks] = useState<
    SpotifyApi.PlaylistTrackObject[] | null
  >(null);

  const [confirmed, setConfirmed] = useState(false);

  const [basePlaylistAndTracks, setBasePlaylistAndTracks] =
    useState<PlaylistAndTracks | null>(null);

  const [left, setLeft] = useState(false);
  const [center, setCenter] = useState(false);
  const [right, setRight] = useState(false);

  const toggleLeft = () => setLeft((prev) => !prev);
  const toggleCenter = () => setCenter((prev) => !prev);
  const toggleRight = () => setRight((prev) => !prev);

  const computedTracks = () => {
    const result = [];
    if (!leftTracks || !rightTracks) return [];

    const leftNotRight = leftTracks.filter(
      (t) => !customContains(rightTracks, t.track!),
    );
    const rightNotLeft = rightTracks.filter(
      (t) => !customContains(leftTracks, t.track!),
    );
    const leftAndRight = leftTracks.filter((t) =>
      customContains(rightTracks, t.track!),
    );

    if (left) {
      result.push(...leftNotRight);
    }

    if (right) {
      result.push(...rightNotLeft);
    }

    if (center) {
      result.push(...leftAndRight);
    }

    return result;
  };

  useEffect(() => {
    if (playlists.length != 0) return;
    (async () => {
      const res = await fetch("/api/getPlaylists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Playlists", data.items);
      setPlaylists(data.items);
    })();
  }, [playlists.length, token]);

  useEffect(() => {
    if (!confirmed || !leftPlaylist || !rightPlaylist) return;
    (async () => {
      const res = await fetch("/api/getTracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, link: leftPlaylist.tracks.href }),
      });

      const data = await res.json();
      setLeftTracks(data.items);
    })();

    (async () => {
      const res = await fetch("/api/getTracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, link: rightPlaylist.tracks.href }),
      });

      const data = await res.json();
      setRightTracks(data.items);
    })();
  }, [confirmed, leftPlaylist, rightPlaylist, token]);

  return (
    <div className="p-8">
      {!confirmed && (
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <SelectPlaylist
              playlists={playlists}
              selectedPlaylist={leftPlaylist}
              setSelectedPlaylist={setLeftPlaylist}
            />
            <SelectPlaylist
              playlists={playlists}
              selectedPlaylist={rightPlaylist}
              setSelectedPlaylist={setRightPlaylist}
            />
          </div>
          <button
            className={
              "bg-accent rounded-lg px-6 py-3 font-semibold text-black " +
              (leftPlaylist && rightPlaylist
                ? "cursor-pointer hover:bg-green-500"
                : "opacity-50")
            }
            disabled={!(leftPlaylist && rightPlaylist)}
            onClick={() => setConfirmed(true)}
          >
            Confirm
          </button>
        </div>
      )}

      {confirmed && (
        <div className="flex flex-col items-center gap-4">
          <Venn
            left={left}
            center={center}
            right={right}
            toggleLeft={toggleLeft}
            toggleCenter={toggleCenter}
            toggleRight={toggleRight}
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-center gap-4">
              <div className="flex justify-end">
                <PlaylistButton
                  playlistAndTracks={{
                    playlist: leftPlaylist!,
                    tracks: leftTracks!,
                  }}
                  base={basePlaylistAndTracks?.playlist || null}
                  setBase={setBasePlaylistAndTracks}
                />
              </div>
              <div className="flex justify-start">
                <PlaylistButton
                  playlistAndTracks={{
                    playlist: rightPlaylist!,
                    tracks: rightTracks!,
                  }}
                  base={basePlaylistAndTracks?.playlist || null}
                  setBase={setBasePlaylistAndTracks}
                />
              </div>
            </div>
            {!basePlaylistAndTracks && (
              <p className="text-center">
                Select which playlist to add songs too!
              </p>
            )}
          </div>
          <h1 className="text-2xl font-semibold">Songs:</h1>
          {(!leftTracks || !rightTracks) && <p>Loading…</p>}
          {leftTracks && rightTracks && computedTracks().length === 0 && (
            <p>No songs selected</p>
          )}
          {computedTracks().map(
            (t) =>
              t.track && (
                <div key={t.track.id} className="flex flex-col gap-2">
                  <Track track={t.track} base={basePlaylistAndTracks} />
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}

export default Compare;