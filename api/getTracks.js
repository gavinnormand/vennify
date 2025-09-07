export default async function handler(req, res) {
  const { token, link } = req.body;

  let url = link;
  let allItems = [];
  let next = null;
  let firstResponse = null;

  try {
    do {
      const result = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();
      if (!firstResponse) firstResponse = data;
      allItems = allItems.concat(data.items);
      next = data.next;
      url = next;
    } while (next);

    const fullData = { ...firstResponse, items: allItems, next: null };
    res.status(200).json(fullData);
  } catch (error) {
    console.error("Error fetching all tracks:", error);
    res.status(500).json({ error: "Failed to fetch all tracks" });
  }
}
