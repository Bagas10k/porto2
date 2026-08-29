"use client";

import * as React from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ModalLightboxFotoProps {
  terbuka: boolean;
  onTutup: () => void;
  judulProyek: string;
  daftarGambar: string[];
  indeksAwal?: number;
}

export function ModalLightboxFoto({
  terbuka,
  onTutup,
  judulProyek,
  daftarGambar,
  indeksAwal = 0,
}: ModalLightboxFotoProps) {
  const [indeksAktif, setIndeksAktif] = React.useState(indeksAwal);

  React.useEffect(() => {
    setIndeksAktif(indeksAwal);
  }, [indeksAwal, terbuka]);

  React.useEffect(() => {
    const tanganiKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") onTutup();
      if (e.key === "ArrowLeft") geserSebelumnya();
      if (e.key === "ArrowRight") geserBerikutnya();
    };
    if (terbuka) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", tanganiKeyboard);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", tanganiKeyboard);
    };
  }, [terbuka, daftarGambar.length, onTutup]);

  if (!terbuka || daftarGambar.length === 0) return null;

  const geserSebelumnya = () => {
    setIndeksAktif((prev) => (prev > 0 ? prev - 1 : daftarGambar.length - 1));
  };

  const geserBerikutnya = () => {
    setIndeksAktif((prev) => (prev < daftarGambar.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      id="modal-lightbox-foto"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="flex flex-col w-full max-w-5xl h-[90vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-white">
        
        {/* Header Lightbox */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold truncate">{judulProyek}</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              {indeksAktif + 1} / {daftarGambar.length}
            </span>
          </div>

          <button
            onClick={onTutup}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Area Tampilan Gambar Utama */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-4 overflow-hidden">
          {daftarGambar.length > 1 && (
            <>
              <button
                onClick={geserSebelumnya}
                title="Gambar Sebelumnya"
                className="absolute left-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg border border-slate-700 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={geserBerikutnya}
                title="Gambar Berikutnya"
                className="absolute right-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white shadow-lg border border-slate-700 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={daftarGambar[indeksAktif]}
            alt={`${judulProyek} - Gambar ${indeksAktif + 1}`}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
          />
        </div>

        {/* Thumbnail Bar */}
        {daftarGambar.length > 1 && (
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-950 border-t border-slate-800 overflow-x-auto">
            {daftarGambar.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setIndeksAktif(idx)}
                className={`relative w-14 h-10 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                  idx === indeksAktif
                    ? "border-blue-500 scale-105 shadow-md"
                    : "border-slate-800 opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
