import React from 'react';
import { Type } from 'lucide-react';

export default function ElderlyModeToggle({ isElderlyMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-colors ${
        isElderlyMode
          ? 'bg-[#1f6feb] text-white border-[#1f6feb]'
          : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]'
      }`}
      title="Մեծացնել տեքստի չափը"
    >
      <Type className="w-3.5 h-3.5" />
      <span>{isElderlyMode ? 'Խոշոր տառեր (Ակտիվ)' : 'Խոշոր տառեր'}</span>
    </button>
  );
}
