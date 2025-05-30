import "./sidebar.css";
import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Theme from "../ThemeComponent/Theme";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const token: string | null = localStorage.getItem("token");

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <button onClick={toggleMenu}>
          <FiMenu
            size={50}
            className={`transition duration-150 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`transition duration-300 delay-150 ${
          isMenuOpen ? "fixed inset-0 bg-black/40 z-40 overlay-class" : ""
        }`}
      />

      <div
        className={`transition duration-300 delay-75 ease-in-out ${
          isMenuOpen ? "" : "translate-x-[100%]"
        }`}
      >
        <nav className="sidebar-class">
          {token ? (
            <ul className="mt-10" onClick={() => setIsMenuOpen(false)}>
              <Link to={"/overview"}>
                <button className="nav-button">home.</button>
              </Link>

              <Link to={"/class-notes"}>
                <button className="nav-button">class.</button>
              </Link>

              <Link to={"/user-notes"}>
                <button className="nav-button">notes.</button>
              </Link>

              <Link to={"/profile"}>
                <button className="nav-button border-none">profile.</button>
              </Link>
            </ul>
          ) : (
            <ul className="mt-10" onClick={() => setIsMenuOpen(false)}>
              <Link to={"/"}>
                <button className="nav-button">home.</button>
              </Link>

              <button className="nav-button">about.</button>
              <button className="nav-button">contact.</button>

              <div className="flex flex-row">
                <Link to={"/sign-up"}>
                  <button className="nav-button-auth">signup.</button>
                </Link>

                <div className="ml-2 border-l-1" />

                <Link to={"/login"}>
                  <button className="nav-button-auth">login.</button>
                </Link>
              </div>
            </ul>
          )}
          <div className="theme-button">
            <Theme />
          </div>
        </nav>
      </div>
    </>
  );
}
