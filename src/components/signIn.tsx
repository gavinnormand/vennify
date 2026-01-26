const SignIn: React.FC = () => {
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
      className={`bg-accent cursor-pointer rounded-lg px-8 py-2 font-semibold text-black transition-all hover:bg-green-500`}
    >
      Sign In
    </button>
  );
};

export default SignIn;
