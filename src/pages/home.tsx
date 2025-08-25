import { useEffect, useRef, useState } from "react";
import SignIn from "../components/signIn";

function Home() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const [token, setToken] = useState("");
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

  return (
    <div className="flex flex-col items-center justify-center px-8 py-12">
      <h1 className="mb-6 text-center text-5xl leading-tight font-bold md:text-7xl">
        See Where Your Playlists
        <br />
        <span className="text-accent">Meet</span> … or{" "}
        <span className="text-slate-400">Split</span>
      </h1>
      {token.length === 0 && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold">
            In order to continue, please sign in.
          </h1>
          <SignIn />
        </div>
      )}
      {token.length > 0 && <button></button>}
    </div>
  );
}

export default Home;
