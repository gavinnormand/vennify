import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/home";
import Footer from "./components/footer";
import Compare from "./pages/compare";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <div className="flex flex-1 bg-primary flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
