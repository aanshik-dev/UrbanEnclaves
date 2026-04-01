import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Features from "./components/Features";
import Working from "./components/Working";
import About from "./components/About";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Layout (Nested Routes) */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="how-it-works" element={<Working />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* External Routes */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
