interface TrackProps {
  track: SpotifyApi.TrackObjectFull;
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const cover = track.album.images
    ? track.album.images[0].url
    : "/spotify/default-cover.png";
  return (
    <div className="flex w-80 flex-row items-center gap-2 md:w-96 bg-secondary p-2 rounded-lg">
      <img className="h-12 w-12" src={cover}></img>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="truncate text-left text-lg font-semibold">
          {track.name}
        </h3>
        <p className="text-sm truncate">{track.artists.map((a) => a.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default Track;
