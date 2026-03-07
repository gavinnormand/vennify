import { Link, useLocation } from "react-router-dom";
import Auth from "./auth";

function Nav() {
  const param = new URLSearchParams(window.location.search);
  const code = param.get("code");

  const location = useLocation();

  const loggedIn = code !== null || location.pathname === "/compare";
  console.log("Logged in:", loggedIn);
  return (
    <nav className="bg-secondary sticky top-0 z-50">
      <div className="border-accent shadow-accent flex items-center justify-between border-b-2 px-4 py-4 shadow-md md:px-8">
        <Link to="/" state={{ clearCache: true }}>
          <img src="/vennify/logo-green.png" className="h-10"></img>
        </Link>
        <Auth loggedIn={loggedIn} />
      </div>
    </nav>
  );
}

export default Nav;
