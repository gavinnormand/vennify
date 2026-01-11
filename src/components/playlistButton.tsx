import type { PlaylistAndTracks } from "../types";

interface PlaylistCardProps {
  playlistAndTracks: PlaylistAndTracks;
  base: SpotifyApi.PlaylistObjectSimplified | null;
  setBase: React.Dispatch<React.SetStateAction<PlaylistAndTracks | null>>;
}

const PlaylistButton: React.FC<PlaylistCardProps> = ({
  playlistAndTracks,
  base,
  setBase,
}) => {
  const isBase = base?.id === playlistAndTracks.playlist.id;
  const handleClick = () => {
    if (!isBase) {
      setBase(playlistAndTracks);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex w-fit cursor-pointer flex-col items-center rounded-lg px-2 py-2 transition-all duration-100 ${isBase ? "bg-white text-black" : "bg-secondary text-white"}`}
    >
      <p className="w-32 truncate text-center">
        {playlistAndTracks.playlist.name}
      </p>
    </div>
  );
};

export default PlaylistButton;
