import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import Lander from "./pages/Lander/Lander";
import Home from "./pages/Home/Home";
import ClassNotes from "./pages/Notes/Class/ClassNotes";
import UserNotes from "./pages/Notes/User/UserNotes";
import Profile from "./pages/User/Profile";
import Canvas from "./pages/Canvas/Canvas";
import Sidebar from "./components/SidebarComponent/Sidebar";
import Title from "./components/TitleComponent/Title";
import Signin from "./pages/User/Signin";

export default function App() {
  useEffect(() => {
    const onLoadFunction = () => {
      const mode = localStorage.getItem("theme");
      document.body.dataset.theme = mode!;
    };

    onLoadFunction();
  }, []);

  return (
    <Router>
      <Sidebar />
      {/* <Title /> */}
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path="/login" element={<Signin />} />
        {/* <Route path="/home" element={<Home />} /> for signed users*/}
        <Route path="/class-notes" element={<ClassNotes />} />
        <Route path="/user-notes" element={<UserNotes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}
