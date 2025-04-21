import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Class from "./pages/Class";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/class" element={<Class />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

/*
<div id="theme-id">
      <h1>NOO!!</h1>
    </div>
*/
