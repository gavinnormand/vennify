import { Link } from "react-router-dom";
import SignIn from "./signIn";

function Nav() {
  return (
    <nav className="bg-secondary sticky top-0 z-50">
      <div className="border-accent shadow-accent flex items-center justify-between border-b-2 px-4 py-4 shadow-md md:px-8">
        <Link to="/">
          <img src="/logo-green.svg" className="h-10"></img>
        </Link>
        <SignIn />
      </div>
    </nav>
  );
}

export default Nav;
