"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Brain, Workflow, Bot, Zap, Code2, GitBranch, Cpu, Sparkles } from "lucide-react";

const daftarKeahlianAI = [
  {
    ikon: Brain,
    judul: "LLM Integration",
    deskripsi: "GPT-4, Claude, Gemini API",
    warnaHex: "#3b82f6",
  },
  {
    ikon: Workflow,
    judul: "Workflow Automation",
    deskripsi: "N8N, Make, Zapier flows",
    warnaHex: "#10b981",
  },
  {
    ikon: Bot,
    judul: "AI Agent Builder",
    deskripsi: "LangChain, CrewAI agents",
    warnaHex: "#a78bfa",
  },
  {
    ikon: Code2,
    judul: "Custom Automation",
    deskripsi: "Python scripts & bots",
    warnaHex: "#f59e0b",
  },
];

// Animasi teks terminal typing
function TeksTerminal({ teks }: { teks: string }) {
  const [tampil, setTampil] = React.useState("");
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (idx < teks.length) {
      const timer = setTimeout(() => {
        setTampil((prev) => prev + teks[idx]);
        setIdx((prev) => prev + 1);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [idx, teks]);

  return (
    <span className="font-mono">
      {tampil}
      {idx < teks.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-px h-3 bg-emerald-400 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

export function BagianKeahlianAI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      {/* Header mini */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">AI & Automation Expert</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
      </div>

      {/* Terminal block */}
      <div className="relative rounded-xl kaca-gelap border border-emerald-500/15 overflow-hidden mb-5">
        {/* Terminal top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-amber-500/60" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-[10px] font-mono text-slate-600 ml-2">ai_agent_skills.sh</span>
          <Sparkles className="w-3 h-3 text-emerald-500/40 ml-auto" />
        </div>

        {/* Konten terminal */}
        <div className="p-4 font-mono text-[11px] space-y-1.5">
          <div className="text-slate-600">
            <span className="text-emerald-500">$</span> bagas --expertise
          </div>
          <div className="text-slate-400 pl-2">
            <TeksTerminal teks='["LLM Integration", "AI Agents", "Workflow Automation", "Custom Bots", "Data Pipeline"]' />
          </div>
          <div className="text-slate-600 mt-2">
            <span className="text-blue-400">$</span> status --availability
          </div>
          <div className="text-emerald-400 pl-2">Ready to automate your business processes ✓</div>
        </div>

        {/* Scan line pasif */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Grid skill mini */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {daftarKeahlianAI.map((item, idx) => {
          const IkonKomponen = item.ikon;
          return (
            <motion.div
              key={item.judul}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="relative rounded-xl p-3 group cursor-default overflow-hidden"
              style={{
                background: `${item.warnaHex}08`,
                border: `1px solid ${item.warnaHex}20`,
              }}
            >
              {/* Glow hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${item.warnaHex}10, transparent 70%)` }}
              />
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                style={{ background: `${item.warnaHex}15` }}
              >
                <IkonKomponen className="w-4 h-4" style={{ color: item.warnaHex }} />
              </div>
              <p className="text-[11px] font-black text-white/80 leading-tight mb-0.5">{item.judul}</p>
              <p className="text-[9px] text-slate-600 font-mono">{item.deskripsi}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
