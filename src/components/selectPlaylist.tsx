import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import Playlist from "./playlist";

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
    <div className="flex flex-col w-80">
    <button
      className={"bg-secondary w-full rounded-lg p-4" + (selectOpen ? " rounded-b-none" : "")}
      onClick={() => setSelectOpen(!selectOpen)}
    >
      <div className="flex flex-row items-center justify-between">
        <p>
          {selectedPlaylist
            ? <Playlist playlist={selectedPlaylist} />
            : "Please Select a Playlist"}
        </p>
        <ChevronLeft
          className={
            `transition-all cursor-pointer ` + (selectOpen ? "-rotate-90" : "rotate-0")
          }
        />
      </div>
    </button>
    {selectOpen && (
      <div className="bg-secondary w-full  overflow-y-auto rounded-b-lg">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={
              "p-2 hover:bg-accent hover:text-black cursor-pointer " +
              (selectedPlaylist?.id === playlist.id ? "bg-accent text-black" : "")
            }
            onClick={() => {
              setSelectedPlaylist(playlist);
              setSelectOpen(false);
            }}
          >
            <Playlist playlist={playlist} />
          </div>
        ))}
      </div>
    )}
    </div>
  );
};

export default SelectPlaylist;
