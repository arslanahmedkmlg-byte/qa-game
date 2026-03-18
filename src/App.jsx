import { useState, useEffect } from "react";

const questions = [
  { id: 1,  category: "👁 Raw",     text: "What do you hope people never figure out about you?" },
  { id: 2,  category: "😐 Dry",     text: "What are you currently lying to yourself about?" },
  { id: 3,  category: "🌀 Weird",   text: "Which version of you would you least want to meet?" },
  { id: 4,  category: "👁 Raw",     text: "What's something you stopped wanting — and never told anyone why?" },
  { id: 5,  category: "😐 Dry",     text: "What's a rule you have that sounds insane when you say it out loud?" },
  { id: 6,  category: "🌀 Weird",   text: "What emotion visits you the most — that doesn't have a name?" },
  { id: 7,  category: "👁 Raw",     text: "Who are you when nobody needs anything from you?" },
  { id: 8,  category: "😐 Dry",     text: "What have you quietly given up on — and feel fine about?" },
  { id: 9,  category: "🌀 Weird",   text: "What would your body say if it could text you right now?" },
  { id: 10, category: "👁 Raw",     text: "What's the kindest thing you do that nobody knows about?" },
  { id: 11, category: "😐 Dry",     text: "What do you keep doing even though it clearly isn't working?" },
  { id: 12, category: "🌀 Weird",   text: "What's the most embarrassing thing you find genuinely beautiful?" },
  { id: 13, category: "👁 Raw",     text: "What's a feeling you've been avoiding by staying busy?" },
  { id: 14, category: "😐 Dry",     text: "What are you bad at that you've decided is actually a personality?" },
  { id: 15, category: "🌀 Weird",   text: "If boredom had a color this week — what is it?" },
  { id: 16, category: "👁 Raw",     text: "What have you forgiven someone for — without telling them?" },
  { id: 17, category: "😐 Dry",     text: "What do you want that you're embarrassed to want?" },
  { id: 18, category: "🌀 Weird",   text: "What do you own that owns you back?" },
  { id: 19, category: "👁 Raw",     text: "What part of you are you still waiting for permission to be?" },
  { id: 20, category: "😐 Dry",     text: "What's something you'd never do — that you've already done once?" },
  { id: 21, category: "🌀 Weird",   text: "What's your most useless talent that you're secretly proud of?" },
  { id: 22, category: "👁 Raw",     text: "What's the last thing that genuinely surprised you about yourself?" },
  { id: 23, category: "😐 Dry",     text: "What are you the main character of — that no one else noticed?" },
  { id: 24, category: "🌀 Weird",   text: "What song do you play when you want to feel something — and what are you trying to feel?" },
];

const palette = {
  "👁 Raw":   { accent: "#e8856a", glow: "rgba(232,133,106,0.18)", badge: "rgba(232,133,106,0.12)" },
  "😐 Dry":   { accent: "#78b4d4", glow: "rgba(120,180,212,0.18)", badge: "rgba(120,180,212,0.12)" },
  "🌀 Weird": { accent: "#b49ee8", glow: "rgba(180,158,232,0.18)", badge: "rgba(180,158,232,0.12)" },
};

export default function App() {
  const [current, setCurrent] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [used, setUsed] = useState([]);
  const [fading, setFading] = useState(false);
  const [pressed, setPressed] = useState(false);

  const draw = () => {
    if (fading) return;
    let pool = questions.filter(q => !used.includes(q.id));
    if (!pool.length) { setUsed([]); pool = [...questions]; }
    setFading(true);
    setRevealed(false);
    setTimeout(() => {
      const q = pool[Math.floor(Math.random() * pool.length)];
      setCurrent(q);
      setUsed(p => [...p, q.id]);
      setFading(false);
    }, 260);
  };

  const reveal = () => {
    if (current && !revealed) setRevealed(true);
  };

  const c = current ? palette[current.category] : { accent: "#3a3a4a", glow: "transparent", badge: "transparent" };
  const progress = questions.length > 0 ? (used.length / questions.length) * 100 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      minHeight: "100dvh",
      background: "#0b0b10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // Safe area insets for notch/gesture bar
      paddingTop: "max(env(safe-area-inset-top), 48px)",
      paddingBottom: "max(env(safe-area-inset-bottom), 32px)",
      paddingLeft: "max(env(safe-area-inset-left), 24px)",
      paddingRight: "max(env(safe-area-inset-right), 24px)",
      fontFamily: "Georgia, 'Times New Roman', serif",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      userSelect: "none",
      WebkitUserSelect: "none",
    }}>

      {/* Ambient glow — transitions with category */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse at 65% 25%, ${c.glow} 0%, transparent 65%)`,
        transition: "background 0.8s ease",
      }} />

      {/* ── TOP: header ── */}
      <div style={{ width: "100%", maxWidth: 420, textAlign: "center", zIndex: 1 }}>
        <p style={{
          margin: "0 0 8px",
          fontSize: 10,
          letterSpacing: "0.38em",
          color: "#2e2e3c",
          fontFamily: "monospace",
          textTransform: "uppercase",
        }}>
          a game of honest answers
        </p>
        <h1 style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 400,
          color: "#ddd5c8",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}>
          Say something{" "}
          <em style={{ color: c.accent, fontStyle: "italic", transition: "color 0.5s ease" }}>
            true.
          </em>
        </h1>

        {/* Progress bar */}
        <div style={{ marginTop: 18, height: 2, background: "#1a1a24", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: c.accent,
            borderRadius: 2,
            transition: "width 0.5s ease, background 0.5s ease",
          }} />
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 11, color: "#252530", fontFamily: "monospace" }}>
          {used.length} / {questions.length}
        </p>
      </div>

      {/* ── MIDDLE: card ── */}
      <div
        onTouchStart={reveal}
        onClick={reveal}
        style={{
          width: "100%",
          maxWidth: 420,
          minHeight: 260,
          borderRadius: 24,
          background: "#0f0f18",
          border: `1px solid ${current ? c.accent + "28" : "#1c1c28"}`,
          boxShadow: current
            ? `0 0 70px ${c.glow}, 0 20px 50px rgba(0,0,0,0.55), inset 0 1px 0 ${c.accent}10`
            : "0 20px 50px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "44px 28px",
          boxSizing: "border-box",
          transition: "opacity 0.26s ease, transform 0.26s ease, box-shadow 0.6s ease, border-color 0.6s ease",
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(0.96) translateY(8px)" : "scale(1) translateY(0)",
          position: "relative",
          zIndex: 1,
          cursor: current && !revealed ? "pointer" : "default",
          // Prevent tap highlight on mobile
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
      >
        {!current ? (
          <p style={{ color: "#222230", fontFamily: "monospace", fontSize: 13, letterSpacing: "0.1em", margin: 0 }}>
            draw a card to begin
          </p>
        ) : (
          <>
            {/* Category badge */}
            <span style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: c.accent,
              fontFamily: "monospace",
              padding: "5px 14px",
              border: `1px solid ${c.accent}38`,
              borderRadius: 20,
              background: c.badge,
              marginBottom: 28,
              display: "inline-block",
              transition: "all 0.5s ease",
            }}>
              {current.category}
            </span>

            {/* Question text */}
            <p style={{
              margin: 0,
              fontSize: 20,
              color: "#cfc8be",
              lineHeight: 1.7,
              fontWeight: 400,
              filter: revealed ? "none" : "blur(9px)",
              transition: "filter 0.55s ease",
              WebkitFilter: revealed ? "none" : "blur(9px)",
            }}>
              {current.text}
            </p>

            {/* Tap hint */}
            {!revealed && (
              <p style={{
                position: "absolute",
                bottom: 20,
                margin: 0,
                fontSize: 11,
                color: "#2a2a38",
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                pointerEvents: "none",
              }}>
                tap to reveal
              </p>
            )}
          </>
        )}
      </div>

      {/* ── BOTTOM: draw button + legend ── */}
      <div style={{ width: "100%", maxWidth: 420, zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* Draw button — large touch target */}
        <button
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => { setPressed(false); draw(); }}
          onClick={draw}
          style={{
            width: "100%",
            padding: "18px 0",
            borderRadius: 50,
            background: pressed ? "#ffffff08" : "transparent",
            border: `1px solid ${pressed ? "#ffffff35" : "#ffffff18"}`,
            color: "#aaa49c",
            fontSize: 13,
            fontFamily: "monospace",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.15s ease",
            // Minimum 48px touch target
            minHeight: 52,
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            outline: "none",
          }}
        >
          ✦ draw a card
        </button>

        {/* Legend */}
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", opacity: 0.4 }}>
          {Object.entries(palette).map(([cat, col]) => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "monospace", color: col.accent }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: col.accent, flexShrink: 0 }} />
              {cat}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
