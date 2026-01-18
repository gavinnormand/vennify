export default async function handler(req, res) {
  const { token, id } = req.body;

   const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

  const data = await result.json();

  res.status(200).json(data);
}