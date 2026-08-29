"use client";

import * as React from "react";
import { X, ExternalLink, RotateCw, Monitor, Tablet, Smartphone, Maximize2 } from "lucide-react";

interface ModalLivePreviewProps {
  terbuka: boolean;
  onTutup: () => void;
  judulProyek: string;
  urlProyek: string;
  slugProyek: string;
}

export function ModalLivePreview({
  terbuka,
  onTutup,
  judulProyek,
  urlProyek,
  slugProyek,
}: ModalLivePreviewProps) {
  const [modeUkuran, setModeUkuran] = React.useState<"full" | "tablet" | "mobile">("full");
  const [kunciIframe, setKunciIframe] = React.useState(0);
  const [sedangMemuat, setSedangMemuat] = React.useState(true);

  React.useEffect(() => {
    const tanganiEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onTutup();
    };
    if (terbuka) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", tanganiEscape);
      setSedangMemuat(true);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", tanganiEscape);
    };
  }, [terbuka, onTutup]);

  if (!terbuka) return null;

  const muatUlangIframe = () => {
    setSedangMemuat(true);
    setKunciIframe((k) => k + 1);
  };

  const dapatkanLebarIframe = () => {
    if (modeUkuran === "mobile") return "max-w-[390px]";
    if (modeUkuran === "tablet") return "max-w-[768px]";
    return "w-full";
  };

  return (
    <div
      id="modal-live-preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="flex flex-col w-full h-[95vh] max-w-7xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header Toolbar Modal */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          
          {/* Info Proyek */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {judulProyek}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono truncate">
                {urlProyek}
              </p>
            </div>
          </div>

          {/* Pengalih Viewport Simulator */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
            <button
              onClick={() => setModeUkuran("full")}
              title="Tampilan Desktop Penuh"
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                modeUkuran === "full"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => setModeUkuran("tablet")}
              title="Tampilan Tablet (768px)"
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                modeUkuran === "tablet"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setModeUkuran("mobile")}
              title="Tampilan Ponsel (390px)"
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                modeUkuran === "mobile"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Tombol Aksi Kanan */}
          <div className="flex items-center gap-2">
            <button
              onClick={muatUlangIframe}
              title="Muat Ulang Preview"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCw className={`w-4 h-4 ${sedangMemuat ? "animate-spin" : ""}`} />
            </button>

            <a
              href={urlProyek}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka di Tab Baru"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <span className="hidden sm:inline">Buka Langsung</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onTutup}
              title="Tutup Modal"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Wadah Iframe Live Serving */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <div
            className={`h-full ${dapatkanLebarIframe()} transition-all duration-300 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-300/80 dark:border-slate-800 overflow-hidden relative`}
          >
            {sedangMemuat && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-slate-900/90 z-10 space-y-2">
                <RotateCw className="w-6 h-6 text-blue-600 animate-spin" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Memuat subpath live preview...
                </span>
              </div>
            )}

            <iframe
              key={kunciIframe}
              src={urlProyek}
              title={`Live Preview - ${judulProyek}`}
              className="w-full h-full border-0"
              onLoad={() => setSedangMemuat(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
