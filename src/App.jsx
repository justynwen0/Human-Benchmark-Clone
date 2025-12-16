// src/App.jsx

import React, { useState } from "react";
import AimTrainerGame from "./components/AimTrainerGame";
import VisualMemoryGame from "./components/VisualMemoryGame";
import Dashboard from "./components/Dashboard"; // Pastikan Anda sudah membuat Dashboard.jsx
import "./App.css";

// --- KONSTANTA LOGO (PETIR SVG) ---
// Kita definisikan di sini agar bisa digunakan di header
const THUNDERBOLT_SVG_PATH =
  "M0.719527 59.616L32.8399 2.79148C33.8149 1.06655 35.6429 0 37.6243 0H94.4947C98.9119 0 101.524 4.94729 99.0334 8.59532L71.201 49.357C68.7101 53.0051 71.3225 57.9524 75.7397 57.9524H82.2118C87.3625 57.9524 89.6835 64.4017 85.7139 67.6841L14.34 126.703C9.85287 130.413 3.43339 125.513 5.82845 120.206L25.9709 75.5735C27.6125 71.936 24.9522 67.8166 20.9615 67.8166H5.50391C1.29539 67.8166 -1.35146 63.2798 0.719527 59.616Z";

// Komponen SVG Petir Kecil untuk Header
const HeaderThunderboltIcon = () => (
  <svg
    viewBox="0 0 102 130"
    width="14px" // Ukuran ikon petir di header
    height="18px"
    fill="currentColor"
    style={{ color: "#555", marginRight: "5px", verticalAlign: "middle" }}
  >
    <path d={THUNDERBOLT_SVG_PATH}></path>
  </svg>
);

function App() {
  // State untuk menentukan komponen mana yang akan ditampilkan
  // Nilai: 'Dashboard', 'AimTrainer', 'VisualMemory'
  const [currentGame, setCurrentGame] = useState("Dashboard");

  // Fungsi untuk memilih dan merender komponen Game yang sesuai
  const renderGame = () => {
    switch (currentGame) {
      case "AimTrainer":
        // Catatan: Jika Anda ingin bisa kembali ke Dashboard dari dalam game,
        // Anda harus mengirimkan setCurrentGame sebagai prop ke AimTrainerGame
        return <AimTrainerGame />;
      case "VisualMemory":
        return <VisualMemoryGame />;
      case "Dashboard":
      default:
        // Mengirimkan setCurrentGame agar Dashboard bisa memicu perpindahan game
        return <Dashboard setCurrentGame={setCurrentGame} />;
    }
  };

  return (
    <div className="App">
      {/* HEADER DENGAN LOGIKA NAVIGASI STATE */}
      <header className="app-header">
        <div className="header-content-wrapper">
          {/* Bagian Kiri: Logo & Dashboard */}
          <div className="header-left-nav">
            <div
              className="logo"
              onClick={() => setCurrentGame("Dashboard")} // Klik Logo kembali ke Dashboard
              style={{ cursor: "pointer" }}
            >
              <HeaderThunderboltIcon />
              HUMAN BENCHMARK
            </div>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                setCurrentGame("Dashboard"); // Klik DASHBOARD kembali ke Dashboard
              }}
            >
              DASHBOARD
            </a>
          </div>

          {/* Bagian Kanan: Sign Up & Login */}
          <div className="header-right-nav">
            <a href="#" className="nav-item">
              SIGN UP
            </a>
            <a href="#" className="nav-item">
              LOGIN
            </a>
          </div>
        </div>
      </header>

      {/* TAMPILKAN GAME SESUAI STATE */}
      <main className="main-content">{renderGame()}</main>
    </div>
  );
}

export default App;
