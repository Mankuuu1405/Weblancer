import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminPanel from "./AdminPanel/AdminPanel";
import "./AdminPanel/AdminPanel.css";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "admin") {
    return <AdminPanel onHome={() => setPage("home")} />;
  }

  return (
    <div className="font-sans antialiased">
      <Navbar onAdminClick={() => setPage("admin")} />
      <Hero onAdminClick={() => setPage("admin")} />
    </div>
  );
}