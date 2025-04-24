import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Overview from "./pages/Overview/Overview";
import Class from "./pages/Class/Class";
import Notes from "./pages/Notes/Notes";
import Profile from "./pages/Profile/Profile";
import { useDarkMode } from "./hooks/useDarkMode";
import Canvas from "./pages/Canvas/Canvas";

export default function App() {
  const [isDarkMode] = useDarkMode();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/class" element={<Class />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}
