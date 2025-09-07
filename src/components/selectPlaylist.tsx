import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface SelectPlaylistProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylist: SpotifyApi.PlaylistObjectSimplified | null;
  setSelectedPlaylist: React.Dispatch<
    React.SetStateAction<SpotifyApi.PlaylistObjectSimplified | null>
  >;
}

const SelectPlaylist: React.FC<SelectPlaylistProps> = ({
  playlists,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <button
      className="bg-secondary w-96 rounded-lg p-4"
      onClick={() => setSelectOpen(!selectOpen)}
    >
      <div className="flex flex-row justify-between">
        <p>
          {selectedPlaylist
            ? selectedPlaylist.name
            : "Please Select a Playlist"}
        </p>
        <ChevronLeft
          className={
            `transition-all cursor-pointer ` + (selectOpen ? "-rotate-90" : "rotate-0")
          }
        />
      </div>
    </button>
  );
};

export default SelectPlaylist;
