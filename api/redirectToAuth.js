export default async function redirectToAuthCodeFlow() {
  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://vennify.vercel.app/");
  params.append(
    "scope",
    "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private",
  );
  params.append("show_dialog", "false");

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
