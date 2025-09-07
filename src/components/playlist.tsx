interface PlaylistProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
  const cover = playlist.images
    ? playlist.images[0].url
    : "/spotify/default-cover.png";
  return (
    <div className="flex flex-row items-center gap-2">
      <img className="h-14 w-14" src={cover}></img>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h3 className="text-left text-lg font-semibold truncate">{playlist.name}</h3>
        <div className="flex flex-row items-center gap-1">
          <p className="text-sm">{playlist.owner.display_name}</p>
          <p>•</p>
          <p className="text-sm">{playlist.tracks.total} songs</p>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
