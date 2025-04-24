import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Overview() {
  return (
    <div>
      <Sidebar />
      <h1>Overview</h1>
      <Link to="/">
        <button>Home Test</button>
      </Link>
    </div>
  );
}
