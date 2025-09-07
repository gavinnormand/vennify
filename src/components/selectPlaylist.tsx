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
    <div className="flex w-80 flex-col md:w-96">
      <button
        className={
          "bg-secondary w-full rounded-lg p-4" +
          (selectOpen ? " rounded-b-none" : "")
        }
        onClick={() => setSelectOpen(!selectOpen)}
      >
        <div className="flex cursor-pointer flex-row items-center justify-between gap-2 text-left">
          <div className="min-w-0 flex-1">
            {selectedPlaylist ? (
              <Playlist playlist={selectedPlaylist} />
            ) : (
              "Please Select a Playlist"
            )}
          </div>
          <ChevronLeft
            className={
              `shrink-0 transition-all ` +
              (selectOpen ? "-rotate-90" : "rotate-0")
            }
          />
        </div>
      </button>
      {selectOpen && (
        <div className="bg-secondary w-full max-h-80 overflow-y-auto rounded-b-lg">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={
                "hover:bg-accent cursor-pointer px-4 py-2 hover:text-black " +
                (selectedPlaylist?.id === playlist.id
                  ? "bg-accent text-black"
                  : "")
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
