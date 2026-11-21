import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Share2, Cpu } from 'lucide-react';

export default function TrafficLight({ result, onAskFamily, isElderlyMode }) {
  if (!result) return null;

  const { status, badgeText, riskScore, explanation, reasons, advice, isAiVerified, aiModel } = result;

  const statusConfig = {
    red: {
      badgeBg: 'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/30',
      barColor: 'bg-[#f85149]',
      borderColor: 'border-[#f85149]/40',
      icon: ShieldAlert,
    },
    yellow: {
      badgeBg: 'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/30',
      barColor: 'bg-[#d29922]',
      borderColor: 'border-[#d29922]/40',
      icon: AlertTriangle,
    },
    green: {
      badgeBg: 'bg-[#3fb950]/10 text-[#3fb950] border-[#3fb950]/30',
      barColor: 'bg-[#3fb950]',
      borderColor: 'border-[#3fb950]/40',
      icon: CheckCircle,
    }
  }[status] || {
    badgeBg: 'bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/30',
    barColor: 'bg-[#58a6ff]',
    borderColor: 'border-[#30363d]',
    icon: CheckCircle,
  };

  const IconComponent = statusConfig.icon;

  return (
    <div className={`mt-6 rounded-lg border ${statusConfig.borderColor} bg-[#161b22] p-5 sm:p-6 shadow-sm`}>
      
      {/* Վերնագիր և Կարգավիճակ */}
      <div className="pb-5 border-b border-[#30363d]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border ${statusConfig.badgeBg}`}>
              <IconComponent className="w-4 h-4" />
              <span>{badgeText}</span>
            </span>

            {isAiVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#1f6feb]/15 text-[#58a6ff] border border-[#1f6feb]/30">
                <Cpu className="w-3 h-3" />
                <span>{aiModel || 'Nemotron AI'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8b949e]">
            <span>Ռիսկի աստիճան՝</span>
            <div className="w-28 h-2 bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
              <div 
                className={`h-full ${statusConfig.barColor}`} 
                style={{ width: `${Math.max(riskScore, 5)}%` }}
              />
            </div>
            <span className="font-semibold text-white">{riskScore}%</span>
          </div>
        </div>

        <p className={`mt-3 text-[#c9d1d9] leading-relaxed ${isElderlyMode ? 'text-lg font-medium' : 'text-sm'}`}>
          {explanation}
        </p>
      </div>

      {/* Մանրամասն Վերլուծություն */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        
        {/* Հայտնաբերված կետեր */}
        <div className="p-4 rounded bg-[#0d1117] border border-[#30363d]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2.5">
            Հայտնաբերված նշաններ
          </h3>
          <ul className="space-y-2">
            {reasons.map((r, idx) => (
              <li key={idx} className={`text-[#c9d1d9] flex items-start gap-2 ${isElderlyMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                <span className="text-[#f85149] mt-0.5">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Խորհուրդներ */}
        <div className="p-4 rounded bg-[#0d1117] border border-[#30363d]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2.5">
            Խորհուրդ
          </h3>
          <ul className="space-y-2">
            {advice.map((a, idx) => (
              <li key={idx} className={`text-white flex items-start gap-2 ${isElderlyMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                <span className="text-[#3fb950] mt-0.5">✓</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Ուղարկել Հարազատին */}
      <div className="mt-5 pt-4 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left text-xs text-[#8b949e]">
          Եթե վստահ չեք, հարցրեք ընտանիքի անդամներին կամ զավակներին։
        </div>

        <button
          onClick={onAskFamily}
          className={`w-full sm:w-auto px-4 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-[#30363d] text-xs sm:text-sm font-medium flex items-center justify-center gap-2 ${
            isElderlyMode ? 'text-base py-3 px-6' : ''
          }`}
        >
          <Share2 className="w-4 h-4 text-[#58a6ff]" />
          <span>Ուղարկել հարազատին</span>
        </button>
      </div>

    </div>
  );
}
