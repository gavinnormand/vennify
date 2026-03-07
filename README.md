# Vennify
_Compare Spotify playlists and discover where they meet — or split._

## What is Vennify?

Vennify is a web app that lets you visually compare two Spotify playlists using a Venn diagram interface. Select any two playlists, see which tracks they share, and which are unique to each, then curate songs across playlists in a single click.

## Features

- **Playlist Comparison** — Compare any two public or private Spotify playlists side by side
- **Venn Diagram UI** — Interactively toggle the left, center, and right sections to filter tracks by overlap or difference
- **Track Curation** — Add songs from one playlist to another directly from the comparison view
- **Spotify OAuth** — Sign in with your Spotify account to access your private playlists and edit them
- **Guest Mode** — No account needed to compare public playlists, powered by Spotify's Client Credentials flow

> ⚠️ Due to [Spotify's February 2026 API changes](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide), sign-in may not be available. Guest Mode can be used to browse and compare public playlists.


## Tech Stack

- **Frontend** — React, TypeScript, Tailwind CSS, React Router
- **Backend** — Next.js, Vercel Serverless Functions
- **Auth** — Spotify OAuth 2.0 (Authorization Code flow) + Client Credentials for guests
- **Deployment** — Vercel

### A Note on the Spotify API

It is really devastating how Spotify is gutting their public API. Restricting Development Mode apps to 5 users effectively kills any small passion project or open source tool built on their platform. This is the kind of community-driven work that made Spotify's ecosystem so rich in the first place.
