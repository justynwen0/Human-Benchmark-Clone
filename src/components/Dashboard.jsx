// src/components/Dashboard.jsx

import React from "react";

// --- KONSTANTA LOGO & WARNA ---
const THUNDERBOLT_SVG_PATH =
  "M0.719527 59.616L32.8399 2.79148C33.8149 1.06655 35.6429 0 37.6243 0H94.4947C98.9119 0 101.524 4.94729 99.0334 8.59532L71.201 49.357C68.7101 53.0051 71.3225 57.9524 75.7397 57.9524H82.2118C87.3625 57.9524 89.6835 64.4017 85.7139 67.6841L14.34 126.703C9.85287 130.413 3.43339 125.513 5.82845 120.206L25.9709 75.5735C27.6125 71.936 24.9522 67.8166 20.9615 67.8166H5.50391C1.29539 67.8166 -1.35146 63.2798 0.719527 59.616Z";
const BLUE_COLOR = "#42a5f5"; // Warna biru link / hero Human Benchmark
const GOLD_COLOR = "#ffc107"; // Warna tombol Start/Save Score

// Ikon Aim Trainer (di tengah)
const AimTrainerIcon = ({ size = "30px", color = BLUE_COLOR }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke={color}
    strokeWidth="5"
    style={{ color: color, margin: "0 auto", display: "block" }}
  >
    <circle cx="50" cy="50" r="45" />
    <circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="15" fill={color} />
  </svg>
);

// Ikon Visual Memory (di tengah)
const VisualMemoryIcon = ({ size = "30px", color = BLUE_COLOR }) => (
  <div
    style={{
      width: size,
      height: size,
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "4px",
      margin: "0 auto",
      padding: "2px",
    }}
  >
    <div style={{ backgroundColor: color, borderRadius: "3px" }} />
    <div style={{ backgroundColor: color, borderRadius: "3px" }} />
    <div style={{ backgroundColor: color, borderRadius: "3px" }} />
    <div style={{ backgroundColor: color, borderRadius: "3px" }} />
  </div>
);

const Dashboard = ({ setCurrentGame }) => {
  // Game Card Component
  const GameCard = ({
    title,
    description,
    icon,
    gameKey,
    iconColor = BLUE_COLOR,
  }) => (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center", // Agar judul dan deskripsi juga di tengah
        width: "300px",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
      }}
      onClick={() => setCurrentGame(gameKey)}
    >
      <div style={{ marginBottom: "10px" }}>
        {React.cloneElement(icon, { color: iconColor })}
      </div>
      <h3 style={{ margin: "5px 0", fontSize: "1.2em", color: "#303030" }}>
        {title}
      </h3>
      <p style={{ margin: "0", fontSize: "0.9em", color: "#555" }}>
        {description}
      </p>
    </div>
  );

  return (
    // Container utama dengan background abu-abu/putih
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* --- HERO SECTION (FULL BLUE BACKGROUND) --- */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          backgroundColor: BLUE_COLOR, // << MASALAH #1: HERO SECTION WARNA BIRU
          color: "white", // Teks menjadi putih agar terlihat
        }}
      >
        <svg
          viewBox="0 0 102 130"
          width="60px"
          height="75px"
          fill="currentColor"
          style={{ color: "white", margin: "0 auto" }} // Petir Putih
        >
          <path d={THUNDERBOLT_SVG_PATH}></path>
        </svg>
        <h1 style={{ fontSize: "3em", margin: "15px 0 5px 0" }}>
          Human Benchmark
        </h1>
        <p style={{ fontSize: "1.2em", margin: "0 0 30px 0" }}>
          Measure your abilities with brain games and cognitive tests.
        </p>
        <button
          style={{
            padding: "10px 25px",
            fontSize: "1em",
            backgroundColor: GOLD_COLOR,
            color: "#303030",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onClick={() => setCurrentGame("AimTrainer")}
        >
          Get Started
        </button>
      </div>

      {/* --- CARD GAME (DI TENGAH) --- */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
          padding: "40px 20px",
          maxWidth: "640px",
          margin: "0 auto",
          fontSize: "18px",
        }}
      >
        <GameCard
          title="Aim Trainer"
          description="How quickly can you hit all the targets?"
          icon={<AimTrainerIcon size="50px" color="#42a5f5" />}
          gameKey="AimTrainer"
          iconColor="#42a5f5"
        />
        <GameCard
          title="Visual Memory"
          description="Remember an increasingly large board of squares."
          icon={<VisualMemoryIcon size="50px" color="#42a5f5" />}
          gameKey="VisualMemory"
          iconColor="#42a5f5"
        />
      </div>

      {/* --- FOOTER (SEMUA RATA KANAN) --- */}
      <div
        className="app-footer"
        style={{
          padding: "20px 40px",
          textAlign: "right", // << MASALAH #2: SEMUA KONTEN RATA KANAN
          color: "#999",
          fontSize: "0.9em",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Copyright di baris pertama */}
        <p style={{ margin: "0 0 15px 0" }}>
          Copyright 2007-2025 Human Benchmark
        </p>

        {/* Links biru di baris berikutnya */}
        <div>
          <a href="#" style={{ color: BLUE_COLOR, textDecoration: "none" }}>
            contact@humanbenchmark.com
          </a>
          <br />
          <a href="#" style={{ color: BLUE_COLOR, textDecoration: "none" }}>
            Privacy Policy
          </a>
          <br />
          <a href="#" style={{ color: BLUE_COLOR, textDecoration: "none" }}>
            Licensing
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
