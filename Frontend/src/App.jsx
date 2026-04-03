import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Features from "./components/Features";
import Working from "./components/Working";
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Layout (Nested Routes) */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home />} />
          <Route path="/home/features" element={<Features />} />
          <Route path="/home/how-it-works" element={<Working />} />
          <Route path="/home/about" element={<About />} />
        </Route>

        {/* External Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
