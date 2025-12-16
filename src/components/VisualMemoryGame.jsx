// src/components/VisualMemoryGame.jsx (REVISI FINAL - STABILITAS LOGIKA NYAWA)

import React, { useState, useEffect, useRef } from "react";
import statistikVisual from "../assets/images/statisticVisual.png";

// ===================================
// KONSTANTA & FUNGSI UTILITAS
// ===================================

const MAX_LIVES = 3;
const FLASH_DURATION = 1000;

const getGridSettings = (level) => {
  // Level 1-3: 3x3 (100px ubin)
  // Level 4-6: 4x4 (70px ubin)
  // Level 7-9: 5x5 (60px ubin)
  // Level 10+: 6x6 (50px ubin)
  if (level <= 3) return { rows: 3, cols: 3, tileSize: "100px" };
  if (level <= 6) return { rows: 4, cols: 4, tileSize: "70px" };
  if (level <= 9) return { rows: 5, cols: 5, tileSize: "60px" };
  return { rows: 6, cols: 6, tileSize: "50px" };
};

const initializeGrid = (level) => {
  const { rows, cols } = getGridSettings(level);
  return Array(rows * cols).fill(false);
};

const generatePattern = (level) => {
  const { rows, cols } = getGridSettings(level);
  let tilesToSelect = level + 2;
  const pattern = new Set();
  const maxIndex = rows * cols;

  if (tilesToSelect > maxIndex) {
    tilesToSelect = maxIndex;
  }

  while (pattern.size < tilesToSelect) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    pattern.add(randomIndex);
  }
  return Array.from(pattern);
};

// ===================================
// KOMPONEN UTAMA
// ===================================

const VisualMemoryGame = () => {
  const [gameState, setGameState] = useState("idle");
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(MAX_LIVES);
  const [gridState, setGridState] = useState(initializeGrid(1));
  const [pattern, setPattern] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameState === "flashing") {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const newPattern = generatePattern(level);
      setPattern(newPattern);

      const flashGrid = initializeGrid(level);
      newPattern.forEach((index) => (flashGrid[index] = true));
      setGridState(flashGrid);

      // Timer pindah ke fase 'selection'
      timerRef.current = setTimeout(() => {
        setGameState("selection");
        setGridState(initializeGrid(level));
      }, FLASH_DURATION);
    }
  }, [gameState, level]);

  const startGame = () => {
    setLevel(1);
    setLives(MAX_LIVES);
    setSelectedTiles([]);
    setGridState(initializeGrid(1));
    setGameState("flashing");
  };

  const advanceLevel = () => {
    setSelectedTiles([]);
    setLevel((prev) => prev + 1);
    setGameState("flashing");
  };

  const handleTileClick = (index) => {
    if (gameState !== "selection") return;
    if (selectedTiles.includes(index)) return;

    const isCorrect = pattern.includes(index);

    if (isCorrect) {
      // KASUS BENAR
      setGridState((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = true;
        return newGrid;
      });

      const newSelected = [...selectedTiles, index];
      setSelectedTiles(newSelected);

      if (newSelected.length === pattern.length) {
        // JEDA 500ms sebelum naik level
        setTimeout(() => {
          advanceLevel();
        }, 500);
      }
    } else {
      // KASUS SALAH: Kurangi nyawa, tampilkan pola, dan ulangi level/Game Over

      // 1. Blokir klik lain
      setGameState("error_pause"); // **STATE BARU**: Untuk memastikan klik diblokir selama animasi

      // 2. Tampilkan kesalahan (merah dan pola benar)
      setGridState(() => {
        const newGrid = initializeGrid(level);
        newGrid[index] = "error";
        pattern.forEach((i) => (newGrid[i] = true));
        return newGrid;
      });

      // 3. Logika Pengurangan Nyawa dan Transisi
      timerRef.current = setTimeout(() => {
        setLives((prevLives) => {
          const newLives = prevLives - 1;

          if (newLives <= 0) {
            setGameState("gameOver");
          } else {
            // Ulangi level yang sama
            setGameState("flashing");
            setSelectedTiles([]);
          }
          return newLives;
        });
      }, 1000);
    }
  };

  // ===================================
  // RENDER LOGIC
  // ===================================

  const Tile = ({ index, state }) => {
    const { tileSize } = getGridSettings(level);
    let backgroundColor = "#303030";
    if (state === true) {
      backgroundColor = "white";
    } else if (state === "error") {
      backgroundColor = "#f04e3c";
    }

    const canClick = gameState === "selection";

    const style = {
      width: tileSize,
      height: tileSize,
      backgroundColor: backgroundColor,
      margin: "5px",
      borderRadius: "5px",
      // Hanya izinkan pointer jika gameState adalah 'selection'
      cursor: canClick ? "pointer" : "default",
      transition: "background-color 0.1s",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    };

    return (
      <div style={style} onClick={() => canClick && handleTileClick(index)} />
    );
  };

  const renderContent = () => {
    if (gameState === "idle") {
      // ... (Kode IDLE Screen)
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <div
            style={{ fontSize: "4em", color: "white", marginBottom: "20px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "5px",
                margin: "0 auto",
                width: "100px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
          <h1 style={{ fontSize: "2.5em" }}>Visual Memory Test</h1>
          <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
            Memorize the squares.
          </p>
          <button
            onClick={startGame}
            className="primary-button"
            style={{
              padding: "12px 30px",
              fontSize: "1.4em",
              backgroundColor: "#ffc107",
              color: "#303030",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Start
          </button>
        </div>
      );
    }

    if (
      gameState === "flashing" ||
      gameState === "selection" ||
      gameState === "error_pause"
    ) {
      const { cols, tileSize } = getGridSettings(level);
      // Hitung lebar max grid: jumlah ubin * (ukuran ubin + margin kiri + margin kanan)
      const maxWidth = cols * (parseFloat(tileSize) + 10);

      const hearts = Array(MAX_LIVES)
        .fill(null)
        .map((_, i) => (
          <span
            key={i}
            style={{
              color: i < lives ? "#f04e3c" : "#555",
              marginRight: "5px",
            }}
          >
            ❤
          </span>
        ));

      return (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ fontSize: "1.5em", margin: "0 20px 0 0" }}>
              Level {level}
            </h2>
            <h2 style={{ fontSize: "1.5em", margin: "0" }}>Lives: {hearts}</h2>
          </div>
          <div
            className="memory-grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: "5px",
              margin: "0 auto",
              maxWidth: `${maxWidth}px`,
            }}
          >
            {gridState.map((state, index) => (
              <Tile key={index} index={index} state={state} />
            ))}
          </div>
          <p
            style={{
              marginTop: "20px",
              fontSize: "1.2em",
              // Hanya tampilkan pesan 'Select' saat game state adalah 'selection'
              opacity: gameState === "selection" ? 1 : 0.5,
            }}
          >
            {gameState === "selection"
              ? "Select the squares you saw."
              : "Memorize the pattern."}
          </p>
        </div>
      );
    }

    if (gameState === "gameOver") {
      // ... (Kode Game Over Screen)
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          {/* Logo VisualMemory*/}
          <div
            style={{ fontSize: "4em", color: "white", marginBottom: "20px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "5px",
                margin: "0 auto",
                width: "100px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
          <h1 style={{ fontSize: "1.5em" }}>Visual Memory</h1>
          <h2 style={{ fontSize: "4em", margin: "8px 0" }}>Level {level}</h2>
          <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
            Save your score to see how you compare.
          </p>
          <div style={{ marginTop: "25px" }}>
            <button
              onClick={() => alert("Fitur Save Score belum diimplementasi.")}
              className="primary-button"
              style={{
                padding: "10px 25px",
                fontSize: "1.2em",
                backgroundColor: "#ffc107",
                color: "#302d2dff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "15px",
              }}
            >
              Save score
            </button>
            <button
              onClick={startGame}
              className="secondary-button"
              style={{
                padding: "10px 25px",
                fontSize: "1.2em",
                backgroundColor: "#98dffcff",
                color: "#302d2dff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="game-area-running"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#42a5f5",
          minHeight: "400px",
          padding: "20px 0",
          width: "100%",
        }}
      >
        {renderContent()}
      </div>

      {/* KETERANGAN & STATISTIK */}
      <div className="game-intro-screen" style={{ marginTop: "20px" }}>
        <div className="intro-card-left">
          <h3>Statistics</h3>
          <div style={{ textAlign: "center" }}>
            <img
              src={statistikVisual}
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

        <div className="intro-card-right">
          <h3>About the test</h3>
          <p>
            Every level, a number of tiles will flash white. Memorize them, and
            pick them again after the tiles are reset!
          </p>
          <p>
            Levels get progressively more difficult, to challenge your skills.
          </p>
          <p>If you miss 3 tiles on a level, you lose one life.</p>
          <p>You have three lives.</p>
          <p>Make it as far as you can!</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="app-footer">
        <p>Copyright 2007-2025 Human Benchmark</p>
        <a href="#">contact@humanbenchmark.com</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Licensing</a>
      </div>
    </>
  );
};

export default VisualMemoryGame;
