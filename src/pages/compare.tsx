import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Track from "../components/track";
import Venn from "../components/venn";
import PlaylistButton from "../components/playlistButton";
import { customContains, filterDuplicates } from "../utils/comparator";
import type { PlaylistAndTracks } from "../types";
import ChoosePlaylist from "../components/choosePlaylist";

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

  const [canEditLeft, setCanEditLeft] = useState(false);
  const [canEditRight, setCanEditRight] = useState(false);

  const [basePlaylistAndTracks, setBasePlaylistAndTracks] =
    useState<PlaylistAndTracks | null>(null);

  const [vennSelection, setVennSelection] = useState({
    left: false,
    center: false,
    right: false,
  });

  const toggleVenn = (section: "left" | "center" | "right") => {
    setVennSelection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

    if (vennSelection.left) {
      result.push(...leftNotRight);
    }

    if (vennSelection.right) {
      result.push(...rightNotLeft);
    }

    if (vennSelection.center) {
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
      setLeftTracks(filterDuplicates(data.items));
    })();

    (async () => {
      const res = await fetch("/api/getTracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, link: rightPlaylist.tracks.href }),
      });

      const data = await res.json();
      setRightTracks(filterDuplicates(data.items));
    })();

    (async () => {
      const res = await fetch("/api/addSongToPlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          playlist_id: leftPlaylist.id,
          uri: "",
        }),
      });

      const data = await res.json();
      setCanEditLeft(data.error.message !== "Forbidden");
    })();

    (async () => {
      const res = await fetch("/api/addSongToPlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          playlist_id: rightPlaylist.id,
          uri: "",
        }),
      });

      const data = await res.json();
      setCanEditRight(data.error.message !== "Forbidden");
    })();
  }, [confirmed, leftPlaylist, rightPlaylist, token]);

  const trackAddedHandler = (track: SpotifyApi.PlaylistTrackObject) => {
    if (basePlaylistAndTracks?.playlist.id === leftPlaylist?.id) {
      setLeftTracks((prev) => (prev ? [...prev, track] : [track]));
      setBasePlaylistAndTracks((prev) =>
        prev ? { ...prev, tracks: [...prev.tracks, track] } : null,
      );
    } else if (basePlaylistAndTracks?.playlist.id === rightPlaylist?.id) {
      setRightTracks((prev) => (prev ? [...prev, track] : [track]));
      setBasePlaylistAndTracks((prev) =>
        prev ? { ...prev, tracks: [...prev.tracks, track] } : null,
      );
    }
  };

  return (
    <div className="p-8">
      {!confirmed && (
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <ChoosePlaylist
              playlists={playlists}
              selectedPlaylist={leftPlaylist}
              setSelectedPlaylist={setLeftPlaylist}
              token={token}
            />
            <ChoosePlaylist
              playlists={playlists}
              selectedPlaylist={rightPlaylist}
              setSelectedPlaylist={setRightPlaylist}
              token={token}
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
            left={vennSelection.left}
            center={vennSelection.center}
            right={vennSelection.right}
            toggleLeft={() => toggleVenn("left")}
            toggleCenter={() => toggleVenn("center")}
            toggleRight={() => toggleVenn("right")}
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
                  canEdit={canEditLeft}
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
                  canEdit={canEditRight}
                />
              </div>
            </div>
            {!basePlaylistAndTracks && (
              <p className="text-center">
                {(canEditLeft || canEditRight) &&
                  "Select which playlist to add songs too!"}
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
                  <Track
                    track={t}
                    base={basePlaylistAndTracks}
                    token={token}
                    onTrackAdded={trackAddedHandler}
                  />
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}

export default Compare;
