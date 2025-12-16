// src/components/LanguageToggle.jsx

import React from "react";

const BLUE_COLOR = "#444546ff";

// Komponen SVG Bendera Indonesia (Merah Putih)
const FlagID = () => (
  <svg
    width="20"
    height="15"
    viewBox="0 0 100 67"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    {/* Bagian Merah */}
    <rect width="100" height="33.5" fill="#EE1A20" />
    {/* Bagian Putih */}
    <rect width="100" height="33.5" y="33.5" fill="#FFFFFF" />
    {/* Border tipis agar terlihat jelas di latar belakang */}
    <rect width="100" height="67" fill="none" stroke="#ccc" strokeWidth="0.5" />
  </svg>
);

// Komponen SVG Bendera Inggris Raya (Union Jack)
const FlagEN = () => (
  // Menggunakan SVG Union Jack yang disederhanakan
  <svg
    width="20"
    height="15"
    viewBox="0 0 60 30"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    <clipPath id="union_jack_clipping">
      <rect width="60" height="30" />
    </clipPath>
    <rect width="60" height="30" fill="#012169" />
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      stroke="#FFFFFF"
      strokeWidth="6"
      clipPath="url(#union_jack_clipping)"
    />
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      stroke="#C8102E"
      strokeWidth="4"
      clipPath="url(#union_jack_clipping)"
    />
    <path d="M30,0 L30,30 M0,15 L60,15" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const LanguageToggle = ({ currentLang, toggleLang }) => {
  let label;
  let flagComponent; // Variabel baru untuk menampung Komponen SVG

  if (currentLang === "EN") {
    label = "ID";
    flagComponent = <FlagID />;
  } else {
    label = "EN";
    flagComponent = <FlagEN />;
  }

  return (
    <button
      onClick={toggleLang}
      style={{
        backgroundColor: BLUE_COLOR,
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "0.9em",
        transition: "background-color 0.2s",
        marginLeft: "15px",

        // Style untuk menata teks dan SVG
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#64b5f6")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BLUE_COLOR)}
    >
      {/* Teks ID/EN */}
      <div>{label}</div>

      {/* Komponen Bendera (SVG) */}
      {flagComponent}
    </button>
  );
};

export default LanguageToggle;
