export default async function redirectToAuthCodeFlow() {
  const params = new URLSearchParams();
  params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://vennify.vercel.app/");
  params.append(
    "scope",
    "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private",
  );
  params.append("show_dialog", "false");

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
