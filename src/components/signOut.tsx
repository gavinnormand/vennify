interface SignOutProps {
  handleLogOut: () => void;
}

const SignOut: React.FC<SignOutProps> = ({ handleLogOut }) => {
  return (
    <button
      onClick={handleLogOut}
      className={`cursor-pointer rounded-lg bg-red-400 px-8 py-2 font-semibold text-black transition-all hover:bg-red-500`}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
