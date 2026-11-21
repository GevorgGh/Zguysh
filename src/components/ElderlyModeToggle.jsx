import React from 'react';
import { Type } from 'lucide-react';

export default function ElderlyModeToggle({ isElderlyMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`apple-press min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center justify-center gap-1.5 transition-all shadow-elevated-sm ${
        isElderlyMode
          ? 'bg-[#1f6feb] text-white border-transparent shadow-[0_2px_8px_rgba(31,111,235,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
          : 'bg-[#161b22]/60 text-[#c9d1d9] hover:text-white border-white/10 hover:bg-[#21262d]'
      }`}
      title={isElderlyMode ? 'Անջատել խոշոր տառերը' : 'Միացնել խոշոր տառերը'}
    >
      <Type className="w-4 h-4" />
      <span className="hidden sm:inline">Խոշոր տառեր</span>
    </button>
  );
}
