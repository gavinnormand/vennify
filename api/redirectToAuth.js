export default function handler(req, res) {
  const params = new URLSearchParams();
  params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
  params.append("response_type", "code");
  //params.append("redirect_uri", "https://vennify.vercel.app/");
  params.append("redirect_uri", "http://127.0.0.1:3000/");
  params.append(
    "scope",
    "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private",
  );
  params.append("show_dialog", "false");

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

  res.status(200).json({ url });
}
