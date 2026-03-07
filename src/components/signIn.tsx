interface SignInProps {
  handleGuestLogin: (token: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ handleGuestLogin }) => {
  const handleRedirect = async () => {
    try {
      const response = await fetch("/api/redirectToAuth");
      const { url } = await response.json();
      document.location = url;
    } catch (error: unknown) {
      console.error("Error Redirecting:", error);
    }
  };

  const handleGuest = async () => {
    const response = await fetch("/api/requestGuestToken");
    const { access_token } = await response.json();
    console.log("access_token", access_token);
    handleGuestLogin(access_token);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <button
        onClick={handleRedirect}
        className={`bg-accent cursor-pointer rounded-lg px-8 py-2 font-semibold text-black transition-all hover:bg-green-500`}
      >
        Sign In
      </button>
      <p>or</p>
      <button
        onClick={handleGuest}
        className={`bg-accent cursor-pointer rounded-lg px-4 py-2 font-semibold text-black transition-all hover:bg-green-500`}
      >
        Guest Access
      </button>
    </div>
  );
};

export default SignIn;
