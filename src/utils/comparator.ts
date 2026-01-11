function compare(
  trackA: SpotifyApi.PlaylistTrackObject,
  trackB: SpotifyApi.TrackObjectFull,
): boolean {
  return (
    trackA.track === trackB ||
    (trackA.track?.name === trackB.name &&
      trackA.track?.artists[0].name === trackB.artists[0].name)
  );
}

export function customContains(
  tracks: SpotifyApi.PlaylistTrackObject[],
  target: SpotifyApi.TrackObjectFull,
): boolean {
  for (const track of tracks) {
    if (compare(track, target)) {
      return true;
    }
  }
  return false;
}