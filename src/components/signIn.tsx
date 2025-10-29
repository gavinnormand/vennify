interface SignInProps {
  large: boolean;
}

const SignIn: React.FC<SignInProps> = ({ large }) => {
  const handleRedirect = async () => {
    try {
      const response = await fetch("/api/redirectToAuth");
      const { url } = await response.json();
      document.location = url;
    } catch (error: unknown) {
      console.error("Error Redirecting:", error);
    }
  };

  return (
    <button
      onClick={handleRedirect}
      className={
        `bg-accent transition-all cursor-pointer rounded-lg font-semibold text-black hover:bg-green-500` +
        (large ? " px-12 py-3 text-xl" : " px-8 py-2")
      }
    >
      Sign In
    </button>
  );
};

export default SignIn;
