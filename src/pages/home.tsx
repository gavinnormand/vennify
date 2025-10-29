import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignIn from "../components/signIn";
import InfoCard from "../components/infoCard";

function Home() {
  const params = new URLSearchParams(window.location.search);
  const location = useLocation();

  const [code, setCode] = useState<string | null>(params.get("code"));

  const [token, setToken] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!code || fetchedRef.current) return;

    fetchedRef.current = true;

    (async () => {
      const res = await fetch("/api/requestToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const { access_token } = await res.json();
      console.log("Access Token:", access_token);
      setToken(access_token);
    })();
  }, [code]);

  useEffect(() => {
    if (location.state?.clearCache) {
      setToken(null);
      setCode(null);
    }
  }, [location.state]);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-12 px-12 py-6 text-center">
      <h1 className="text-5xl leading-tight font-bold md:text-7xl">
        See Where Your Playlists
        <br />
        <span className="text-accent">Meet</span> … or{" "}
        <span className="text-slate-400">Split</span>
      </h1>
      <div className="grid w-full grid-cols-1 justify-center gap-12 md:grid-cols-2 lg:px-16">
        <InfoCard
          icon={
            <img
              className="h-10 w-14 text-white"
              src="/vennify/icon-white.svg"
            />
          }
          title={"Compare Playlists"}
          text={
            "Choose any public or private Spotify playlists and compare them either by their similarities or differences!"
          }
        />
        <InfoCard
          icon={
            <img
              className="h-10 w-10 text-white"
              src="/spotify/like-icon.svg"
            />
          }
          title={"Curate Your Songs"}
          text={
            "Add songs from one playlist to another in a single click, or instantly create new playlists from your comparisons!"
          }
        />
      </div>
      {!token && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">
            In order to continue, please sign in.
          </h1>
          <SignIn large={true} />
        </div>
      )}
      {token && (
        <Link
          className="bg-accent cursor-pointer rounded-lg px-12 py-3 text-xl font-semibold text-black transition-all hover:bg-green-500"
          to="/compare"
          state={{ token: token }}
        >
          Continue
        </Link>
      )}
    </div>
  );
}

export default Home;
