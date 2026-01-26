import express from "express";
import { chromium } from "playwright";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "https://vennify.vercel.app"],
  }),
);

app.post("/addUserToDashboard", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "email required" });

  try {
    const browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const context = await browser.newContext({
      storageState: "spotify-auth.json", // <-- use local file directly
    });

    const page = await context.newPage();
    await page.goto(
      "https://developer.spotify.com/dashboard/b9d28c8fff414c3da013a349151e51ed/users",
      { waitUntil: "networkidle" },
    );

    await page.waitForSelector("#email");
    await page.fill("#name", new Date().toISOString());
    await page.fill("#email", email);

    const addButton = page.getByRole("button", { name: "Add user" });

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes("/users")),
      addButton.click(),
    ]);

    const status = response.status();
    const body = await response.json().catch(() => null);

    await browser.close();

    res.json({ success: status === 200, status, body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3333, () => console.log("Server running on port 3333"));
