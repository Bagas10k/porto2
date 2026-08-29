"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PropsKomponenMagnetik {
  children: React.ReactNode;
  kekuatan?: number;
  className?: string;
}

export function KomponenMagnetik({
  children,
  kekuatan = 0.35,
  className = "",
}: PropsKomponenMagnetik) {
  const ref = React.useRef<HTMLDivElement>(null);

  const posisiX = useMotionValue(0);
  const posisiY = useMotionValue(0);

  // Fisika pegas halus
  const pegasX = useSpring(posisiX, { stiffness: 350, damping: 20, mass: 0.2 });
  const pegasY = useSpring(posisiY, { stiffness: 350, damping: 20, mass: 0.2 });

  function tanganiGerak(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const titikTengahX = left + width / 2;
    const titikTengahY = top + height / 2;

    const jarakX = (e.clientX - titikTengahX) * kekuatan;
    const jarakY = (e.clientY - titikTengahY) * kekuatan;

    posisiX.set(jarakX);
    posisiY.set(jarakY);
  }

  function tanganiKeluar() {
    posisiX.set(0);
    posisiY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={tanganiGerak}
      onMouseLeave={tanganiKeluar}
      style={{ x: pegasX, y: pegasY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
