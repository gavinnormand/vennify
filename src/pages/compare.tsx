import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectPlaylist from "../components/selectPlaylist";
import Track from "../components/track";

function Compare() {
  const location = useLocation();
  const token = location.state.token;
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [playlistA, setPlaylistA] =
    useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

  const [playlistB, setPlaylistB] =
    useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

  const [tracksA, setTracksA] = useState<
    SpotifyApi.PlaylistTrackObject[] | null
  >(null);
  const [tracksB, setTracksB] = useState<
    SpotifyApi.PlaylistTrackObject[] | null
  >(null);

  const [confirmed, setConfirmed] = useState(false);

  const [aToggled, setAToggled] = useState(false);
  const [bToggled, setBToggled] = useState(false);
  const [andToggled, setAndToggled] = useState(false);

  const aNotB = () => {
    if (!tracksA || !tracksB) return null;
    const trackNamesB = new Set(tracksB.map((t) => t.track?.name));
    return tracksA.filter((t) => !trackNamesB.has(t.track?.name));
  };

  const bNotA = () => {
    if (!tracksA || !tracksB) return null;
    const trackNamesA = new Set(tracksA.map((t) => t.track?.name));
    return tracksB.filter((t) => !trackNamesA.has(t.track?.name));
  };

  const aAndB = () => {
    if (!tracksA || !tracksB) return null;
    const trackNamesB = new Set(tracksB.map((t) => t.track?.name));
    return tracksA.filter((t) => trackNamesB.has(t.track?.name));
  };

  const computedTracks = () => {
    if (aToggled && !bToggled && !andToggled) return aNotB();
    if (!aToggled && bToggled && !andToggled) return bNotA();
    if (!aToggled && !bToggled && andToggled) return aAndB();
    if (aToggled && bToggled && !andToggled)
      return tracksA?.concat(tracksB || []);
    if (aToggled && !bToggled && andToggled) return tracksA;
    if (!aToggled && bToggled && andToggled) return tracksB;
    if (aToggled && bToggled && andToggled) return aAndB();
    return [];
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
    if (!confirmed || !playlistA || !playlistB) return;
    (async () => {
      const res = await fetch("/api/getTracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, link: playlistA.tracks.href }),
      });

      const data = await res.json();
      setTracksA(data.items);
    })();

    (async () => {
      const res = await fetch("/api/getTracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, link: playlistB.tracks.href }),
      });

      const data = await res.json();
      setTracksB(data.items);
    })();
  }, [confirmed, playlistA, playlistB, token]);

  return (
    <div className="p-8">
      {!confirmed && (
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <SelectPlaylist
              playlists={playlists}
              selectedPlaylist={playlistA}
              setSelectedPlaylist={setPlaylistA}
            />
            <SelectPlaylist
              playlists={playlists}
              selectedPlaylist={playlistB}
              setSelectedPlaylist={setPlaylistB}
            />
          </div>
          <button
            className={
              "bg-accent rounded-lg px-6 py-3 font-semibold text-black " +
              (playlistA && playlistB
                ? "cursor-pointer hover:bg-green-500"
                : "opacity-50")
            }
            disabled={!(playlistA && playlistB)}
            onClick={() => setConfirmed(true)}
          >
            Confirm
          </button>
        </div>
      )}

      {confirmed && (
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <button
              className="h-16 w-16"
              onClick={() => setAToggled(!aToggled)}
            >
              {aToggled ? (
                <img src="/ui/active-left.svg"></img>
              ) : (
                <img src="/ui/inactive-left.svg"></img>
              )}
            </button>
            <button
              className="h-16 w-16"
              onClick={() => setAndToggled(!andToggled)}
            >
              {andToggled ? (
                <img src="/ui/active-middle.svg"></img>
              ) : (
                <img src="/ui/inactive-middle.svg"></img>
              )}
            </button>
            <button
              className="h-16 w-16"
              onClick={() => setBToggled(!bToggled)}
            >
              {bToggled ? (
                <img src="/ui/active-right.svg"></img>
              ) : (
                <img src="/ui/inactive-right.svg"></img>
              )}
            </button>
          </div>
          <h1 className="text-2xl font-semibold">Songs:</h1>
          {!computedTracks() && <p>Loading...</p>}
          {computedTracks() && computedTracks()!.length === 0 && (
            <p>No songs selected</p>
          )}
          {(computedTracks() ?? []).map(
            (t) =>
              t.track && (
                <div key={t.track.id} className="p-2">
                  <Track track={t.track} />
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}

export default Compare;
