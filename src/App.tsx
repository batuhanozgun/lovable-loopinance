
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import About from "./pages/About";
import StyleGuide from "./pages/StyleGuide";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/style-guide" element={<StyleGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
