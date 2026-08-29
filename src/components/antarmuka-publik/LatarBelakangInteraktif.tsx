"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { KanvasPartikelGeneratif } from "./KanvasPartikelGeneratif";

export function LatarBelakangInteraktif() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  React.useEffect(() => {
    function tanganiGerakMouse(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", tanganiGerakMouse, { passive: true });
    return () => window.removeEventListener("mousemove", tanganiGerakMouse);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      style={{ background: "#04060b" }}
    >
      {/* Kanvas Partikel Generatif 60 FPS */}
      <KanvasPartikelGeneratif />

      {/* Cahaya Mengikuti Mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Pendaran Gradien Statis Dinamis */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] animasi-denyut-cahaya" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-violet-600/8 rounded-full blur-[110px] animasi-denyut-cahaya" style={{ animationDelay: "4s" }} />
      <div className="absolute top-1/2 -left-20 w-[350px] h-[350px] bg-emerald-600/6 rounded-full blur-[90px] animasi-denyut-cahaya" style={{ animationDelay: "8s" }} />

      {/* Lapisan Noise Tekstur Halus */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
