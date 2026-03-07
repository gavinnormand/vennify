export type PlaylistAndTracks = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  tracks: SpotifyApi.PlaylistTrackObject[];
};

export type AuthTypes = "USER" | "GUEST" | null;
