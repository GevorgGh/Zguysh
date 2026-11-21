import React from 'react';
import { X, Users, TrendingUp, DollarSign, BookOpen, Presentation } from 'lucide-react';

export default function BusinessPresentationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="ios-sheet-container relative w-full max-w-3xl glass-panel border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 shadow-elevated-lg my-0 sm:my-6 max-h-[90vh] overflow-y-auto"
        style={{
          paddingBottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom)))',
        }}
      >
        
        {/* iPhone Sheet Grabber */}
        <div className="w-10 h-1.5 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" />

        {/* Փակել */}
        <button
          onClick={onClose}
          className="apple-press min-h-[44px] min-w-[44px] absolute top-4 right-4 flex items-center justify-center rounded-xl text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
          title="Փակել"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Վերնագիր */}
        <div className="pb-4 border-b border-white/[0.08] pr-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1f6feb]/15 flex items-center justify-center text-[#58a6ff]">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">«Զգույշ» (SafeArm) Նախագծի Հայեցակարգը</h2>
            <p className="text-xs text-[#8b949e]">Հասարակագիտական, բիզնես և տեխնոլոգիական վերլուծություն</p>
          </div>
        </div>

        {/* 4 Բաժիններ */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm leading-relaxed">

          {/* 1. Թիրախ */}
          <div className="glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-[#58a6ff] font-semibold text-xs sm:text-sm mb-2.5">
              <Users className="w-4 h-4" />
              <span>Երկկողմանի շուկա (Two-Sided Market)</span>
            </div>
            <ul className="text-[#8b949e] space-y-2">
              <li><strong className="text-[#c9d1d9]">Հիմնական օգտատերեր (55+ տարեկան).</strong> Տատիկ-պապիկներ և ծնողներ, որոնք քիչ են տիրապետում տեղեկատվական անվտանգությանը։</li>
              <li><strong className="text-[#c9d1d9]">Գնորդներ (20-45 տարեկան).</strong> Զավակները, որոնք ցանկանում են հեռավար պաշտպանել ծնողների միջոցները։</li>
            </ul>
          </div>

          {/* 2. Մասշտաբավորում */}
          <div className="glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-[#3fb950] font-semibold text-xs sm:text-sm mb-2.5">
              <TrendingUp className="w-4 h-4" />
              <span>SaaS Մոդել</span>
            </div>
            <ul className="text-[#8b949e] space-y-2">
              <li><strong className="text-[#c9d1d9]">Բազմահարթակ.</strong> Հավելվածն աշխատում է Web, Android և iOS միջավայրերում։</li>
              <li><strong className="text-[#c9d1d9]">Զրոյական լրացուցիչ ծախս.</strong> Յուրաքանչյուր նոր օգտատիրոջ ավելացումը չի բերում լրացուցիչ ծախսերի (Zero Marginal Cost)։</li>
            </ul>
          </div>

          {/* 3. Գնագոյացում */}
          <div className="glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-[#d29922] font-semibold text-xs sm:text-sm mb-2.5">
              <DollarSign className="w-4 h-4" />
              <span>Freemium Եկամուտների Մոդել</span>
            </div>
            <ul className="text-[#8b949e] space-y-2">
              <li><strong className="text-[#c9d1d9]">Անվճար.</strong> Ամսական մինչև 5 ստուգում յուրաքանչյուր քաղաքացու համար։</li>
              <li><strong className="text-[#c9d1d9]">Ընտանեկան փաթեթ.</strong> 1,500 - 2,000 դրամ/ամիս՝ անսահմանափակ ստուգումներ և ահազանգ զավակի հեռախոսին։</li>
            </ul>
          </div>

          {/* 4. Հասարակագիտություն */}
          <div className="glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-[#f85149] font-semibold text-xs sm:text-sm mb-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Հասարակագիտական Կապը</span>
            </div>
            <ul className="text-[#8b949e] space-y-2">
              <li><strong className="text-[#c9d1d9]">Տեղեկատվական անհավասարություն.</strong> Խարդախներն օգտագործում են թվային անհավասարությունը՝ թիրախավորելով ավագ սերնդին։</li>
              <li><strong className="text-[#c9d1d9]">Սոցիալական ինժեներիա.</strong> Մանիպուլացվում են մարդկային վախն ու հեղինակության նկատմամբ վստահությունը։</li>
            </ul>
          </div>

        </div>

        {/* Փակել կոճակ (Apple HIG 44pt touch target) */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="apple-press min-h-[44px] px-6 py-2 bg-[#21262d]/80 hover:bg-[#30363d] text-[#c9d1d9] hover:text-white rounded-xl text-xs sm:text-sm font-medium border border-white/10 shadow-elevated-sm"
          >
            Փակել
          </button>
        </div>

      </div>
    </div>
  );
}
