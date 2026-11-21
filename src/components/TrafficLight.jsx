import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Share2, Cpu } from 'lucide-react';

export default function TrafficLight({ result, onAskFamily, isElderlyMode }) {
  if (!result) return null;

  const { status, badgeText, riskScore, explanation, reasons, advice, isAiVerified, aiModel } = result;

  const statusConfig = {
    red: {
      badgeBg: 'bg-[#f85149]/15 text-[#f85149] border-[#f85149]/40',
      barColor: 'from-[#da3633] to-[#f85149]',
      borderColor: 'border-[#f85149]/40',
      glow: 'shadow-[0_0_30px_rgba(248,81,73,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]',
      icon: ShieldAlert,
    },
    yellow: {
      badgeBg: 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/40',
      barColor: 'from-[#bf8700] to-[#d29922]',
      borderColor: 'border-[#d29922]/40',
      glow: 'shadow-[0_0_30px_rgba(210,153,34,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]',
      icon: AlertTriangle,
    },
    green: {
      badgeBg: 'bg-[#3fb950]/15 text-[#3fb950] border-[#3fb950]/40',
      barColor: 'from-[#238636] to-[#3fb950]',
      borderColor: 'border-[#3fb950]/40',
      glow: 'shadow-[0_0_30px_rgba(63,185,80,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]',
      icon: CheckCircle,
    }
  }[status] || {
    badgeBg: 'bg-[#58a6ff]/15 text-[#58a6ff] border-[#58a6ff]/40',
    barColor: 'from-[#1f6feb] to-[#58a6ff]',
    borderColor: 'border-white/10',
    glow: 'shadow-elevated-md',
    icon: CheckCircle,
  };

  const IconComponent = statusConfig.icon;

  return (
    <div className={`mt-6 rounded-2xl border ${statusConfig.borderColor} ${statusConfig.glow} glass-panel p-5 sm:p-7 transition-all duration-300 animate-fade-in`}>
      
      {/* Վերնագիր և Կարգավիճակ */}
      <div className="pb-5 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${statusConfig.badgeBg} shadow-sm`}>
              <IconComponent className="w-4 h-4" />
              <span>{badgeText}</span>
            </span>

            {isAiVerified && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1f6feb]/15 text-[#58a6ff] border border-[#1f6feb]/35 shadow-sm">
                <Cpu className="w-3.5 h-3.5" />
                <span>{aiModel || 'Nemotron AI'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 text-xs text-[#8b949e]">
            <span className="font-medium">Ռիսկի գնահատական՝</span>
            <div className="w-28 h-2.5 bg-[#0b0f17] rounded-full overflow-hidden border border-white/10 shadow-inner">
              <div 
                className={`h-full bg-gradient-to-r ${statusConfig.barColor} transition-all duration-500 ease-out`} 
                style={{ width: `${Math.max(riskScore, 5)}%` }}
              />
            </div>
            <span className="font-bold text-white text-sm">{riskScore}%</span>
          </div>
        </div>

        <p className={`mt-3.5 text-[#e6edf3] leading-relaxed ${isElderlyMode ? 'text-lg font-medium' : 'text-sm sm:text-base'}`}>
          {explanation}
        </p>
      </div>

      {/* Մանրամասն Վերլուծություն */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        
        {/* Հայտնաբերված կետեր */}
        <div className="glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f85149]" />
            <span>Հայտնաբերված նշաններ</span>
          </h3>
          <ul className="space-y-2.5">
            {reasons.map((r, idx) => (
              <li key={idx} className={`text-[#c9d1d9] flex items-start gap-2.5 leading-relaxed ${isElderlyMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                <span className="text-[#f85149] font-bold mt-0.5">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Խորհուրդներ */}
        <div className="glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
            <span>Անվտանգության խորհուրդ</span>
          </h3>
          <ul className="space-y-2.5">
            {advice.map((a, idx) => (
              <li key={idx} className={`text-white flex items-start gap-2.5 leading-relaxed ${isElderlyMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                <span className="text-[#3fb950] font-bold mt-0.5">✓</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Ուղարկել Հարազատին (Apple HIG 44pt touch target) */}
      <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left text-xs text-[#8b949e]">
          Եթե վստահ չեք, հարցրեք ընտանիքի անդամներին կամ զավակներին։
        </div>

        <button
          onClick={onAskFamily}
          className={`apple-press min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#21262d]/80 hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-white/10 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-elevated-sm ${
            isElderlyMode ? 'text-base min-h-[50px] px-7' : ''
          }`}
        >
          <Share2 className="w-4 h-4 text-[#58a6ff]" />
          <span>Ուղարկել հարազատին</span>
        </button>
      </div>

    </div>
  );
}
