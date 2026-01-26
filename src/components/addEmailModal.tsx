import React, { useState } from "react";
import SignIn from "./signIn";

const AddEmailModal: React.FC<{ large?: boolean }> = ({ large }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailAdded, setEmailAdded] = useState(false);

  const handleAddEmail = async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://aws.gavinnormand.com:3333/addUserToDashboard",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (
        !data.success &&
        !data.body?.message.includes(
          "There already is a user with the provided email for this client",
        )
      ) {
        setError(data.body?.message || "Unknown error");
        setLoading(false);
        return;
      }

      setEmailAdded(true);
      setLoading(false);
    } catch (err: unknown) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={`bg-accent cursor-pointer rounded-lg font-semibold text-black transition-all hover:bg-green-500 ${
          large ? "px-12 py-3 text-xl" : "px-8 py-2"
        }`}
      >
        Sign In
      </button>

      {modalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center bg-secondary border-accent w-96 rounded-lg border-2 p-6">
            {!emailAdded ? (
              <>
                <h2 className="mb-4 text-lg font-bold">Enter your email</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="focus:outline-accent mb-4 w-full rounded-md border border-gray-300 p-2"
                />
                {error && <p className="mb-2 text-red-500">{error}</p>}
                <div className="flex gap-2 w-full justify-center">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-primary hover:bg-primary/50 rounded px-4 py-2 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEmail}
                    disabled={!email || loading}
                    className="rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600 disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add Email"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 font-semibold text-green-600">
                  Email added! Click below to sign in.
                </p>
                <div className="flex justify-end">
                  <SignIn />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmailModal;
