import Account from "./account";
import AddEmailModal from "./addEmailModal";

interface AuthProps {
  loggedIn: boolean;
}

const Auth: React.FC<AuthProps> = ({ loggedIn }) => {
  return (
    <div>
      {!loggedIn && <AddEmailModal large={false} />}
      {loggedIn && <Account />}
    </div>
  );
};

export default Auth;
