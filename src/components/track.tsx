import type { PlaylistAndTracks } from "../types";
import { customContains } from "../utils/comparator";

interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
  base?: PlaylistAndTracks | null;
}

const Track: React.FC<TrackProps> = ({ track, base }) => {
  const cover = track.album.images
    ? track.album.images[0].url
    : "/spotify/default-cover.png";
  return (
    <div className="bg-secondary flex w-80 flex-row items-center gap-2 rounded-lg p-2 md:w-96">
      <img className="h-12 w-12" src={cover} />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="truncate text-left text-lg font-semibold">
          {track.name}
        </h3>
        <p className="truncate text-sm">
          {track.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
      {base && !customContains(base.tracks, track) && (
        <img className="mr-2 h-5 w-5" src="/spotify/like-icon.svg" />
      )}
    </div>
  );
};

export default Track;
