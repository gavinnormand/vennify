import SelectPlaylist from "./selectPlaylist";
import SearchPlaylist from "./searchPlaylist";
import Playlist from "./playlist";
import { X } from "lucide-react";

interface SearchPlaylistProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylist: SpotifyApi.PlaylistObjectSimplified | null;
  setSelectedPlaylist: React.Dispatch<
    React.SetStateAction<SpotifyApi.PlaylistObjectSimplified | null>
  >;
  token: string;
  index: number;
}

const ChoosePlaylist: React.FC<SearchPlaylistProps> = ({
  playlists,
  selectedPlaylist,
  setSelectedPlaylist,
  token,
  index,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg">Playlist {index}</p>
      {selectedPlaylist && (
        <div className="bg-secondary flex w-80 flex-row items-center justify-between gap-2 rounded-lg p-4 text-left md:w-96">
          <Playlist playlist={selectedPlaylist} />
          <X
            className="shrink-0 cursor-pointer"
            onClick={() => setSelectedPlaylist(null)}
          />
        </div>
      )}
      {!selectedPlaylist && (
        <div className="flex flex-col items-center gap-3">
          <SelectPlaylist
            playlists={playlists}
            selectedPlaylist={selectedPlaylist}
            setSelectedPlaylist={setSelectedPlaylist}
          />
          <p>or</p>
          <SearchPlaylist
            token={token}
            setSelectedPlaylist={setSelectedPlaylist}
          />
        </div>
      )}
    </div>
  );
};

export default ChoosePlaylist;
