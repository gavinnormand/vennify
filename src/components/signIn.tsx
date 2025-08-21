function SignIn() {
  const handleRedirect = async () => {
    try {
      fetch("/api/redirectToAuth");
    } catch (error: unknown) {
      console.error("Error Redirecting:", error);
    }
  };

  return (
    <button
      onClick={handleRedirect}
      className="bg-accent rounded-full px-8 py-2 font-semibold text-black"
    >
      Sign In
    </button>
  );
}

export default SignIn;
