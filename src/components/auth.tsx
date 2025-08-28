import Account from "./account";
import SignIn from "./signIn";

interface AuthProps {
  loggedIn: boolean;
}

const Auth: React.FC<AuthProps> = ({ loggedIn }) => {
  return (
    <div>
      {!loggedIn && <SignIn large={false} />}
      {loggedIn && <Account />}
    </div>
  );
};

export default Auth;
