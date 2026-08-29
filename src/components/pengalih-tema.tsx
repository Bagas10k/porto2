"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function PengalihTema() {
  const { theme, setTheme } = useTheme();
  const [sudahDimuat, setSudahDimuat] = React.useState(false);

  React.useEffect(() => {
    setSudahDimuat(true);
  }, []);

  if (!sudahDimuat) {
    return (
      <button
        id="tombol-tema-placeholder"
        aria-label="Memuat tema"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 opacity-60 cursor-default"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const apakahGelap = theme === "dark";

  return (
    <button
      id="tombol-pengalih-tema"
      type="button"
      onClick={() => setTheme(apakahGelap ? "light" : "dark")}
      aria-label={apakahGelap ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      title={apakahGelap ? "Mode Terang" : "Mode Gelap"}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {apakahGelap ? (
        <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
