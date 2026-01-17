import type { PlaylistAndTracks } from "../types";
import { customContains } from "../utils/comparator";

interface TrackProps {
  track: SpotifyApi.PlaylistTrackObject;
  base: PlaylistAndTracks | null;
  token: string;
  onTrackAdded: (track: SpotifyApi.PlaylistTrackObject) => void;
}

const Track: React.FC<TrackProps> = ({ track, base, token, onTrackAdded }) => {
  const t = track.track!;

  const cover = t.album.images
    ? t.album.images[0].url
    : "/spotify/default-cover.png";

  async function handleAdd() {
    const res = await fetch("/api/addSongToPlaylist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        playlist_id: base?.playlist.id,
        uri: t.uri,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Added "${t.name}" to "${base!.playlist.name}"!`);
      onTrackAdded(track);
    } else {
      alert(`Failed to add "${t.name}": ${data.error.message}`);
    }
  }

  return (
    <div className="bg-secondary flex w-80 flex-row items-center gap-2 rounded-lg p-2 md:w-96">
      <img className="h-12 w-12" src={cover} />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="truncate text-left text-lg font-semibold">{t.name}</h3>
        <p className="truncate text-sm">
          {t.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
      {base && !customContains(base.tracks, t) && (
        <img
          className="mr-2 h-5 w-5 hover:cursor-pointer"
          src="/spotify/like-icon.svg"
          onClick={handleAdd}
        />
      )}
    </div>
  );
};

export default Track;
