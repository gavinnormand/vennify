import SignIn from "./signIn";
import SignOut from "./signOut";

interface AuthProps {
  loggedIn: boolean;
  handleLogout: () => void;
  handleGuestLogin: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({
  loggedIn,
  handleLogout,
  handleGuestLogin,
}) => {
  return (
    <div>
      {!loggedIn && <SignIn handleGuestLogin={handleGuestLogin} />}
      {loggedIn && <SignOut handleLogOut={handleLogout} />}
    </div>
  );
};

export default Auth;
