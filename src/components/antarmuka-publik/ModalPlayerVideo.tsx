"use client";

import * as React from "react";
import { X, ExternalLink, Play, AlertCircle } from "lucide-react";
import { konversiTautanVideo } from "@/lib/penyematan-video";

interface ModalPlayerVideoProps {
  terbuka: boolean;
  onTutup: () => void;
  judulProyek: string;
  tautanVideo: string;
}

export function ModalPlayerVideo({
  terbuka,
  onTutup,
  judulProyek,
  tautanVideo,
}: ModalPlayerVideoProps) {
  React.useEffect(() => {
    const tanganiEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onTutup();
    };
    if (terbuka) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", tanganiEscape);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", tanganiEscape);
    };
  }, [terbuka, onTutup]);

  if (!terbuka) return null;

  const dataEmbed = konversiTautanVideo(tautanVideo);

  return (
    <div
      id="modal-player-video"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="flex flex-col w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-white">
        
        {/* Header Modal Video */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold truncate">{judulProyek}</h3>
              <p className="text-[11px] text-slate-400">
                Penyematan Video ({dataEmbed.tipePenyedia.replace("_", " ")})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={dataEmbed.urlAsli}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <span>Buka Tautan Asli</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onTutup}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pemutar Video */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {dataEmbed.valid && dataEmbed.embedUrl ? (
            <iframe
              src={dataEmbed.embedUrl}
              title={`Pemutar Video - ${judulProyek}`}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400" />
              <p className="text-sm font-medium text-slate-300">
                Tautan video tidak valid atau dibatasi oleh izin privasi.
              </p>
              <a
                href={dataEmbed.urlAsli}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white"
              >
                Buka Langsung di Browser
              </a>
            </div>
          )}
        </div>

        {/* Footer Modal Note */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Tekan tombol Esc atau tombol X untuk keluar</span>
          <span className="font-mono text-[11px] text-slate-500">Video Integration Hub</span>
        </div>

      </div>
    </div>
  );
}
