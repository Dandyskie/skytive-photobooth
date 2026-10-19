"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#191919]/10 bg-[#FAF9F5] py-4 sm:py-5 px-4 sm:px-6 text-center mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 font-body text-xs text-[#737373]">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#191919] bg-[#ECEAE4] border border-[#191919]/10 px-2 py-0.5 rounded">
            VOL. 02 ARCHIVE
          </span>
          <span className="font-semibold text-[#191919] tracking-tight">
            SKYTIVE PHOTOBOOTH STUDIO
          </span>
          <span className="hidden sm:inline text-[#737373]">•</span>
          <span className="hidden sm:inline">Contemporary Editorial Experience</span>
        </div>
        <p className="font-mono text-[10px] text-[#8E8D8A] tracking-wider uppercase">
          © {new Date().getFullYear()} SKYTIVE STUDIO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

