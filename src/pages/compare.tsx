import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import Playlist from "../components/playlist";
import SelectPlaylist from "../components/selectPlaylist";

function Compare() {
  const location = useLocation();
  const token = location.state.token;
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [playlist1, setPlaylist1] =
    useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

  const [playlist2, setPlaylist2] =
    useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

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

  return (
    <div>
      <p>Compare Page</p>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        <SelectPlaylist
          playlists={playlists}
          selectedPlaylist={playlist1}
          setSelectedPlaylist={setPlaylist1}
        />
        <SelectPlaylist
          playlists={playlists}
          selectedPlaylist={playlist2}
          setSelectedPlaylist={setPlaylist2}
        />
      </div>
    </div>
  );
}

export default Compare;
