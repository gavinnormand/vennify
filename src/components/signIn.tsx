import redirectToAuthCodeFlow from "../../api/redirectToAuth.js";

function SignIn() {
  return (
    <button
      onClick={redirectToAuthCodeFlow}
      className="bg-accent rounded-full px-8 py-2 font-semibold text-black"
    >
      Sign In
    </button>
  );
}

export default SignIn;
