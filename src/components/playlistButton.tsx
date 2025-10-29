interface PlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  base: SpotifyApi.PlaylistObjectSimplified | null;
  setBase: React.Dispatch<
    React.SetStateAction<SpotifyApi.PlaylistObjectSimplified | null>
  >;
}

const PlaylistButton: React.FC<PlaylistCardProps> = ({
  playlist,
  base,
  setBase,
}) => {
  const isBase = base?.id === playlist.id;
  const handleClick = () => {
    if (!isBase) {
      setBase(playlist);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex w-fit cursor-pointer flex-col items-center rounded-lg px-2 py-2 transition-all duration-100 ${isBase ? "bg-white text-black" : "bg-secondary text-white"}`}
    >
      <p className="w-32 truncate text-center">{playlist.name}</p>
    </div>
  );
};

export default PlaylistButton;
