import { useState } from "react";

interface SearchPlaylistProps {
  token: string;
  setSelectedPlaylist: React.Dispatch<
    React.SetStateAction<SpotifyApi.PlaylistObjectSimplified | null>
  >;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({
  token,
  setSelectedPlaylist,
}) => {
  const [playlistLink, setPlaylistLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractPlaylistId = (link: string): string | null => {
    const match = link.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleSearch = async () => {
    setError("");
    const playlistId = extractPlaylistId(playlistLink);

    if (!playlistId) {
      setError("Invalid Spotify playlist link");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/getPlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, id: playlistId }),
      });

      console.log(playlistId);
      console.log(res);

      if (!res.ok) {
        setError("Playlist not found");
        return;
      }

      const data = await res.json();
      setSelectedPlaylist(data);
      setPlaylistLink("");
    } catch {
      setError("Error fetching playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-80 flex-col gap-3 md:w-96">
      <div className="flex h-14 w-full flex-row justify-between gap-2">
        <input
          type="text"
          placeholder="Paste Spotify playlist link..."
          value={playlistLink}
          onChange={(e) => setPlaylistLink(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="bg-secondary focus:ring-accent w-full rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !playlistLink}
          className="bg-accent rounded-lg px-4 py-2 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SearchPlaylist;