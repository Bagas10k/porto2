"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function KursorMagnetikInteraktif() {
  const [terlihat, setTerlihat] = React.useState(false);
  const [sedangKlik, setSedangKlik] = React.useState(false);
  const [modeHover, setModeHover] = React.useState<"normal" | "tautan" | "tombol" | "kartu" | "kanvas">("normal");
  const [labelKursor, setLabelKursor] = React.useState<string>("");

  const posisiX = useMotionValue(-100);
  const posisiY = useMotionValue(-100);

  // Fisika pegas halus berbasis Framer Motion
  const pegasX = useSpring(posisiX, { stiffness: 500, damping: 28, mass: 0.4 });
  const pegasY = useSpring(posisiY, { stiffness: 500, damping: 28, mass: 0.4 });

  const titikX = useSpring(posisiX, { stiffness: 1200, damping: 40 });
  const titikY = useSpring(posisiY, { stiffness: 1200, damping: 40 });

  React.useEffect(() => {
    // Nonaktifkan pada perangkat sentuh (touchscreen)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    function tanganiGerakMouse(e: MouseEvent) {
      if (!terlihat) setTerlihat(true);
      posisiX.set(e.clientX);
      posisiY.set(e.clientY);

      // Deteksi elemen di bawah kursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const elemenTerdekat = target.closest("a, button, [role='button'], input, textarea, [data-kursor]");

      if (elemenTerdekat) {
        const atributKustom = elemenTerdekat.getAttribute("data-kursor");
        if (atributKustom) {
          setLabelKursor(atributKustom);
          setModeHover("kartu");
        } else if (elemenTerdekat.tagName.toLowerCase() === "button" || elemenTerdekat.getAttribute("role") === "button") {
          setModeHover("tombol");
          setLabelKursor("");
        } else if (elemenTerdekat.tagName.toLowerCase() === "a") {
          setModeHover("tautan");
          setLabelKursor("");
        }
      } else {
        setModeHover("normal");
        setLabelKursor("");
      }
    }

    function tanganiMouseDown() {
      setSedangKlik(true);
    }

    function tanganiMouseUp() {
      setSedangKlik(false);
    }

    function tanganiMouseLeave() {
      setTerlihat(false);
    }

    window.addEventListener("mousemove", tanganiGerakMouse, { passive: true });
    window.addEventListener("mousedown", tanganiMouseDown);
    window.addEventListener("mouseup", tanganiMouseUp);
    document.addEventListener("mouseleave", tanganiMouseLeave);

    return () => {
      window.removeEventListener("mousemove", tanganiGerakMouse);
      window.removeEventListener("mousedown", tanganiMouseDown);
      window.removeEventListener("mouseup", tanganiMouseUp);
      document.removeEventListener("mouseleave", tanganiMouseLeave);
    };
  }, [posisiX, posisiY, terlihat]);

  if (!terlihat) return null;

  const ukuranCincin = sedangKlik
    ? 24
    : modeHover === "kartu"
    ? 68
    : modeHover === "tombol" || modeHover === "tautan"
    ? 44
    : 32;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* 1. Titik Inti Kursor (Lead Dot) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none shadow-[0_0_12px_rgba(6,182,212,0.9)]"
        style={{
          x: titikX,
          y: titikY,
          translateX: "-50%",
          translateY: "-50%",
          scale: sedangKlik ? 0.6 : 1,
        }}
      />

      {/* 2. Cincin Pegas Magnetik (Trailing Spring Ring) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[1px] transition-colors duration-200"
        style={{
          x: pegasX,
          y: pegasY,
          width: ukuranCincin,
          height: ukuranCincin,
          translateX: "-50%",
          translateY: "-50%",
          borderColor:
            modeHover === "kartu"
              ? "rgba(6, 182, 212, 0.7)"
              : modeHover === "tombol" || modeHover === "tautan"
              ? "rgba(59, 130, 246, 0.8)"
              : "rgba(255, 255, 255, 0.25)",
          background:
            modeHover === "kartu"
              ? "rgba(6, 182, 212, 0.12)"
              : modeHover === "tombol" || modeHover === "tautan"
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(255, 255, 255, 0.02)",
          boxShadow:
            modeHover === "kartu"
              ? "0 0 25px rgba(6, 182, 212, 0.3)"
              : modeHover === "tombol" || modeHover === "tautan"
              ? "0 0 20px rgba(59, 130, 246, 0.25)"
              : "none",
        }}
        animate={{
          scale: sedangKlik ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Label Teks Mikro saat hover kartu */}
        {labelKursor && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono font-bold text-cyan-300 tracking-wider uppercase"
          >
            {labelKursor}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
