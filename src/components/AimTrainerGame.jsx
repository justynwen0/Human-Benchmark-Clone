// src/components/AimTrainerGame.jsx

import React, { useState, useRef } from "react";
import statistikGraph from "../assets/images/statisticAim.png";

// ===================================
// KONSTANTA & UTILITAS
// ===================================

const MAX_TARGETS = 30;
const TARGET_SIZE = 90;

const getRandomPosition = (areaWidth, areaHeight) => {
  const x = Math.random() * (areaWidth - TARGET_SIZE);
  const y = Math.random() * (areaHeight - TARGET_SIZE);
  return { x: Math.floor(x), y: Math.floor(y) };
};

const calculateAverageReactionTime = (times) => {
  if (times.length === 0) return 0;
  const totalTime = times.reduce((sum, time) => sum + time, 0);
  return Math.round(totalTime / times.length);
};

// ===================================
// STYLES INLINE UNTUK TARGET PLACEHOLDER (IKON SVG PUTIH)
// ===================================

const placeholderStyles = {
  targetPlaceholder: {
    width: `${TARGET_SIZE}px`,
    height: `${TARGET_SIZE}px`,
    borderRadius: "50%",
    border: "5px solid white",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    margin: "20px auto",
    cursor: "pointer",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="5"/><circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="white" stroke="white" stroke-width="1"/></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  clickTitle: {
    fontSize: "3em",
    marginBottom: "10px",
  },
};

// ===================================
// KOMPONEN TARGET
// ===================================

const Target = ({ position, onHit }) => {
  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    width: `${TARGET_SIZE}px`,
    height: `${TARGET_SIZE}px`,
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "5px solid white",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="5"/><circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="white" stroke="white" stroke-width="1"/></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "absolute",
    cursor: "pointer",
    transition: "transform 0.1s ease-out",
    zIndex: 10,
  };
  return <div style={style} onClick={onHit} />;
};

// ===================================
// KOMPONEN UTAMA GAME
// ===================================

const AimTrainerGame = () => {
  // ... (State dan Logic Game tetap sama)
  const [gameStatus, setGameStatus] = useState("idle");
  const [targetsHit, setTargetsHit] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [reactionTimes, setReactionTimes] = useState([]);
  const startTime = useRef(0);

  const gameAreaRef = useRef(null);
  const averageTime = calculateAverageReactionTime(reactionTimes);

  const startGame = () => {
    if (!gameAreaRef.current) return;
    const areaWidth = gameAreaRef.current.offsetWidth;
    const areaHeight = gameAreaRef.current.offsetHeight;

    setReactionTimes([]);
    setTargetsHit(0);
    setTargetPosition(getRandomPosition(areaWidth, areaHeight));
    startTime.current = Date.now();
    setGameStatus("running");
  };

  const handleTargetHit = () => {
    const endTime = Date.now();
    const reaction = endTime - startTime.current;

    setReactionTimes((prevTimes) => [...prevTimes, reaction]);

    const newTargetsHit = targetsHit + 1;
    setTargetsHit(newTargetsHit);

    if (newTargetsHit >= MAX_TARGETS) {
      setGameStatus("gameOver");
      return;
    }

    const areaWidth = gameAreaRef.current.offsetWidth;
    const areaHeight = gameAreaRef.current.offsetHeight;
    setTargetPosition(getRandomPosition(areaWidth, areaHeight));
    startTime.current = Date.now();
  }; // =================================== // RENDER LOGIC UTAMA // ===================================

  return (
    <>
      {/* 1. AREA KLIK / MAIN GAME / GAME OVER (Layar Biru - DIATAS) */}
      <div
        ref={gameAreaRef}
        className="game-area-running"
        style={{
          margin: "0",
          display: gameStatus !== "running" ? "flex" : "block",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Panel Statistik di Dalam Area Biru (Running/Game Over) */}
        {(gameStatus === "running" || gameStatus === "gameOver") && (
          <div className="stats-panel-in-game">
            <p>
              Targets Hit:
              <strong>
                {targetsHit} / {MAX_TARGETS}
              </strong>
            </p>
            <p>
              Avg. Reaction Time: <strong>{averageTime} ms</strong>
            </p>
          </div>
        )}

        {/* Mode Idle (Tombol Mulai di Layar Biru) */}
        {gameStatus === "idle" && (
          <div style={{ textAlign: "center" }}>
            <h1 style={placeholderStyles.clickTitle}>Aim Trainer</h1>
            <div
              style={placeholderStyles.targetPlaceholder}
              onClick={startGame}
            />
            <p style={{ fontSize: "1.2em" }}>
              Hit 30 targets as quickly as you can.
            </p>
            <p style={{ fontSize: "1.2em" }}>
              Click the target above to begin.
            </p>
          </div>
        )}

        {/* Mode Bermain Target */}
        {gameStatus === "running" && (
          <Target position={targetPosition} onHit={handleTargetHit} />
        )}

        {/* Mode Game Over */}
        {gameStatus === "gameOver" && (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* // Logo Target Placeholder di Atas Teks Game Over */}
            <div
              style={{
                ...placeholderStyles.targetPlaceholder,
                // Override/kecilkan ukuran logo agar tidak terlalu besar di Game Over
                width: "70px",
                height: "70px",
                border: "3px solid white",
                marginBottom: "4px",
                cursor: "default", // Pastikan tidak bisa diklik
                // Hapus margin auto karena kita sudah menggunakan flexbox center
                margin: "0 auto 20px auto",
              }}
            />

            <h2 style={{ fontSize: "1.5em", fontWeight: "300" }}>
              Average Time Per Target
            </h2>
            <h1 style={{ fontSize: "4em", margin: "10px 0" }}>
              {averageTime} ms
            </h1>
            <h3 style={{ fontSize: "1em" }}>
              Save your score to see how you compare.
            </h3>
            {/* Dua Tombol SAVE SCORE dan TRY AGAIN */}
            <div style={{ marginTop: "25px" }}>
              <button
                onClick={() => alert("Fitur Save Score belum diimplementasi.")}
                style={{
                  padding: "10px 25px",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#ffc107",
                  color: "#302d2dff",
                  marginRight: "15px",
                }}
              >
                SAVE SCORE
              </button>
              <button
                onClick={startGame} // Memanggil ulang game
                style={{
                  padding: "10px 25px",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#98dffcff", // Warna merah yang kontras
                  color: "#302d2dff",
                }}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. KETERANGAN & STATISTIK (Dua Kartu Putih - DI BAWAH) */}

      <div className="game-intro-screen">
        {/* Kartu Kiri - Deskripsi Game */}

        <div className="intro-card-left">
          <h3>Aim Trainer</h3>

          <p>Click the targets as quickly and accurately as you can.</p>

          <p>This tests reflexes and hand-eye coordination.</p>

          <p>
            Once you've clicked 30 targets, your score and average time per
            target will be displayed.
          </p>

          <p>
            This test is best taken with a mouse or tablet screen. Trackpads are
            difficult to score well with.
          </p>
        </div>

        {/* Kartu Kanan - Statistik */}

        <div className="intro-card-right">
          <h3>Statistics</h3>

          <div style={{ textAlign: "center" }}>
            <img
              src={statistikGraph}
              alt="Reaction Time Distribution Graph"
              style={{
                maxWidth: "100%",

                height: "auto",

                display: "block",

                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. FOOTER (Link Biru Rata Kanan) */}
      <div className="app-footer">
        <p>Copyright 2007-2025 Human Benchmark</p>
        <p>
          <a href="#">contact@humanbenchmark.com</a>
          <br />
          <a href="#">Privacy Policy</a>
          <br />
          <a href="#">Licensing</a>
        </p>
      </div>
    </>
  );
};

export default AimTrainerGame;
