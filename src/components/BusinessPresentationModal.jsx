import React from 'react';
import { X, Users, TrendingUp, DollarSign, BookOpen } from 'lucide-react';

export default function BusinessPresentationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#161b22] border border-[#30363d] rounded-lg p-6 sm:p-7 shadow-xl my-6">
        
        {/* Փակել */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded text-[#8b949e] hover:text-white hover:bg-[#21262d]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Վերնագիր */}
        <div className="pb-4 border-b border-[#30363d]">
          <h2 className="text-lg font-semibold text-white">«Զգույշ» (SafeArm) Նախագծի Հայեցակարգը</h2>
          <p className="text-xs text-[#8b949e]">Հասարակագիտական, բիզնես և տեխնոլոգիական վերլուծություն</p>
        </div>

        {/* 4 Բաժիններ */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm leading-relaxed">

          {/* 1. Թիրախ */}
          <div className="p-4 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="flex items-center gap-2 text-[#58a6ff] font-semibold text-xs mb-2">
              <Users className="w-4 h-4" />
              <span>Երկկողմանի շուկա (Two-Sided Market)</span>
            </div>
            <ul className="text-[#8b949e] space-y-1.5">
              <li><strong className="text-[#c9d1d9]">Հիմնական օգտատերեր (55+ տարեկան).</strong> Տատիկ-պապիկներ և ծնողներ, որոնք քիչ են տիրապետում տեղեկատվական անվտանգությանը։</li>
              <li><strong className="text-[#c9d1d9]">Գնորդներ (20-45 տարեկան).</strong> Զավակները, որոնք ցանկանում են հեռավար պաշտպանել ծնողների միջոցները։</li>
            </ul>
          </div>

          {/* 2. Մասշտաբավորում */}
          <div className="p-4 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="flex items-center gap-2 text-[#3fb950] font-semibold text-xs mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>SaaS Մոդել</span>
            </div>
            <ul className="text-[#8b949e] space-y-1.5">
              <li><strong className="text-[#c9d1d9]">Բազմահարթակ.</strong> Հավելվածն աշխատում է Web, Android և iOS միջավայրերում։</li>
              <li><strong className="text-[#c9d1d9]">Զրոյական լրացուցիչ ծախս.</strong> Յուրաքանչյուր նոր օգտատիրոջ ավելացումը չի բերում լրացուցիչ ծախսերի (Zero Marginal Cost)։</li>
            </ul>
          </div>

          {/* 3. Գնագոյացում */}
          <div className="p-4 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="flex items-center gap-2 text-[#d29922] font-semibold text-xs mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Freemium Եկամուտների Մոդել</span>
            </div>
            <ul className="text-[#8b949e] space-y-1.5">
              <li><strong className="text-[#c9d1d9]">Անվճար.</strong> Ամսական մինչև 5 ստուգում յուրաքանչյուր քաղաքացու համար։</li>
              <li><strong className="text-[#c9d1d9]">Ընտանեկան փաթեթ.</strong> 1,500 - 2,000 դրամ/ամիս՝ անսահմանափակ ստուգումներ և ահազանգ զավակի հեռախոսին։</li>
            </ul>
          </div>

          {/* 4. Հասարակագիտություն */}
          <div className="p-4 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="flex items-center gap-2 text-[#f85149] font-semibold text-xs mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Հասարակագիտական Կապը</span>
            </div>
            <ul className="text-[#8b949e] space-y-1.5">
              <li><strong className="text-[#c9d1d9]">Տեղեկատվական անհավասարություն.</strong> Խարդախներն օգտագործում են թվային անհավասարությունը՝ թիրախավորելով ավագ սերնդին։</li>
              <li><strong className="text-[#c9d1d9]">Սոցիալական ինժեներիա.</strong> Մանիպուլացվում են մարդկային վախն ու հեղինակության նկատմամբ վստահությունը։</li>
            </ul>
          </div>

        </div>

        {/* Փակել կոճակ */}
        <div className="mt-5 pt-4 border-t border-[#30363d] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white rounded text-xs font-medium border border-[#30363d]"
          >
            Փակել
          </button>
        </div>

      </div>
    </div>
  );
}
