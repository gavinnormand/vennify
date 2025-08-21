function Home() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  return (
    <div className="flex flex-col items-center justify-center px-8 py-12">
      <h1 className="mb-6 text-center text-5xl leading-tight font-bold md:text-7xl">
        See Where Your Playlists
        <br />
        <span className="text-accent">Meet</span> … or{" "}
        <span className="text-slate-400">Split</span>
      </h1>
    </div>
  );
}

export default Home;
