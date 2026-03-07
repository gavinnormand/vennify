import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/home";
import Footer from "./components/footer";
import Compare from "./pages/compare";
import { useState } from "react";
import type { AuthTypes } from "./types";

function App() {
  const [loginType, setLoginType] = useState<AuthTypes>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogOut = () => {
    setLoginType(null);
    setToken(null);
  };

  const handleGuestLogin = (token: string) => {
    setLoginType("GUEST");
    setToken(token);
    console.log("Token", token);
  };

  console.log("token", token);

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Nav
          loggedIn={token != null}
          handleLogOut={handleLogOut}
          handleGuestLogin={handleGuestLogin}
        />
        <div className="bg-primary flex flex-1 flex-col">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  token={token}
                  setToken={setToken}
                  loginType={loginType}
                  setLoginType={setLoginType}
                  handleGuestLogin={handleGuestLogin}
                />
              }
            />
            <Route path="/compare" element={<Compare token={token} loginType={loginType} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
