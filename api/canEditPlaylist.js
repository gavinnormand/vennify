export default async function handler(req, res) {
  const { token, playlist_id } = req.body;

  const result = await fetch("/api/addSongToPlaylist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      playlist_id: playlist_id,
      uri: "",
    }),
  });

  const data = await result.json();

  const canEdit = data.error.message != "Forbidden";

  console.log("test" + data.error.message);

  res.status(200).json({ can_edit: canEdit });
}
