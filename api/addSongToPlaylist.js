export default async function handler(req, res) {
  const { token, playlist_id, uri } = req.body;

   const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "POST", headers: {  Authorization: `Bearer ${token}`, }, body: JSON.stringify({ uris: [uri] })
    });

  const data = await result.json();

  res.status(200).json(data);
}