import { Link } from "react-router-dom";
import Auth from "./auth";

interface NavProps {
  loggedIn: boolean;
  handleLogOut: () => void;
  handleGuestLogin: (token: string) => void;
}

const Nav: React.FC<NavProps> = ({
  loggedIn,
  handleLogOut,
  handleGuestLogin,
}) => {
  return (
    <nav className="bg-secondary sticky top-0 z-50">
      <div className="border-accent shadow-accent flex items-center justify-between border-b-2 px-4 py-4 shadow-md md:px-8">
        <Link to="/" state={{ clearCache: true }}>
          <img src="/vennify/logo-green.png" className="h-10"></img>
        </Link>
        <Auth
          loggedIn={loggedIn}
          handleLogout={handleLogOut}
          handleGuestLogin={handleGuestLogin}
        />
      </div>
    </nav>
  );
};

export default Nav;
