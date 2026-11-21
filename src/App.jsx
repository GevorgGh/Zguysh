import React, { useState, useEffect } from 'react';
import { 
  Shield, Copy, Image as ImageIcon, FileText, RefreshCw, 
  Info, X, Cpu, Presentation, Settings
} from 'lucide-react';

import { analyzeMessageAsync } from './utils/analyzer';
import { isAiConfigured } from './utils/aiClient';
import { DEMO_PRESETS } from './utils/presets';
import TrafficLight from './components/TrafficLight';
import AskFamilyModal from './components/AskFamilyModal';
import BusinessPresentationModal from './components/BusinessPresentationModal';
import SettingsModal from './components/SettingsModal';
import ElderlyModeToggle from './components/ElderlyModeToggle';

export default function App() {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'screenshot'
  const [inputText, setInputText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isElderlyMode, setIsElderlyMode] = useState(false);
  const [hasAi, setHasAi] = useState(false);
  
  // Modals
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setHasAi(isAiConfigured());

    // iOS Device and Standalone PWA detection to guarantee zero status-bar overlap
    if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (isIOSDevice) {
        document.documentElement.classList.add('is-ios');
      }
    }
  }, []);

  // Ստուգել հաղորդագրությունը (Nemotron AI + Տեղական ֆիլտրեր)
  const handleAnalyze = async (textToAnalyze = inputText) => {
    if (!textToAnalyze || !textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await analyzeMessageAsync(textToAnalyze);
      setAnalysisResult(res);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Տեղադրել Clipboard-ից
  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputText(text);
          handleAnalyze(text);
        }
      }
    } catch {
      alert('Տեքստը տեղադրեք ստեղնաշարի միջոցով (Ctrl+V)։');
    }
  };

  // Օրինակ ընտրել
  const handleSelectPreset = (preset) => {
    setActiveTab('text');
    setInputText(preset.text);
    handleAnalyze(preset.text);
  };

  // Սքրինշոթի վերբեռնում
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setIsAnalyzing(true);
      setTimeout(async () => {
        const simulatedDetectedText = 'HAYPOST: Dzer tsanrotse kasecvel e: Hascei sxal: Xndrum enq mutqagrel haypost-delivery.cc ev vcharel 650 dram:';
        setInputText(simulatedDetectedText);
        const res = await analyzeMessageAsync(simulatedDetectedText);
        setAnalysisResult(res);
        setIsAnalyzing(false);
      }, 500);
    }
  };

  const handleClear = () => {
    setInputText('');
    setImagePreview(null);
    setAnalysisResult(null);
  };

  return (
    <div className={`min-h-screen text-[#e6edf3] flex flex-col font-sans selection:bg-[#1f6feb]/30 selection:text-white ${isElderlyMode ? 'text-lg' : 'text-sm sm:text-base'}`}>
      
      {/* Գլխավոր Մենյու (iPhone Dynamic Island & Notch Protected) */}
      <header className="border-b border-white/[0.08] bg-[#161b22]/80 backdrop-blur-xl sticky top-0 z-30 flex flex-col shadow-sm">
        
        {/* iOS Native Status Bar Spacer: Ensures zero collision with Dynamic Island, clock, and battery */}
        <div className="ios-status-bar-spacer w-full shrink-0" />

        {/* Navigation Bar Row */}
        <div 
          className="flex items-center justify-between px-3 sm:px-8 py-2.5 sm:py-3 w-full"
          style={{
            paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
            paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-b from-[#2f81f7] to-[#1f6feb] flex items-center justify-center text-white shrink-0 shadow-[0_2px_8px_rgba(31,111,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-sm sm:text-lg text-white tracking-tight">Զգույշ</span>
                <span className="text-[11px] sm:text-xs text-[#8b949e] font-medium">SafeArm</span>
                {hasAi && (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                    <span>AI ակտիվ</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8b949e] hidden md:block">
                Կիբեռանվտանգության և ֆիշինգի պաշտպանություն
              </p>
            </div>
          </div>

          {/* Action Buttons: Clean & Standard */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Խոշոր տառեր */}
            <ElderlyModeToggle 
              isElderlyMode={isElderlyMode} 
              onToggle={() => setIsElderlyMode(!isElderlyMode)} 
            />

            {/* Հայեցակարգ */}
            <button
              onClick={() => setIsBusinessModalOpen(true)}
              className="apple-press min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#c9d1d9] hover:text-white bg-[#161b22]/60 hover:bg-[#21262d] border border-white/10 flex items-center justify-center gap-1.5 shadow-elevated-sm"
              title="Նախագծի հայեցակարգ"
            >
              <Presentation className="w-4 h-4 text-[#8b949e]" />
              <span className="hidden sm:inline">Հայեցակարգ</span>
            </button>

            {/* Կարգավորումներ (Settings: AI Token, Model, etc.) */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="apple-press min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#c9d1d9] hover:text-white bg-[#161b22]/60 hover:bg-[#21262d] border border-white/10 flex items-center justify-center gap-1.5 shadow-elevated-sm"
              title="Կարգավորումներ"
            >
              <Settings className="w-4 h-4 text-[#8b949e]" />
              <span className="hidden sm:inline">Կարգավորումներ</span>
            </button>
          </div>
        </div>

      </header>

      {/* Գլխավոր Բովանդակություն */}
      <main 
        className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col"
        style={{
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        
        {/* Ներածություն */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f6feb]/10 border border-[#1f6feb]/25 text-[#58a6ff] text-xs font-medium mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Ազգային կիբեռպաշտպանության հարթակ</span>
          </div>
          <h1 className={`${isElderlyMode ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-3xl'} font-bold text-white tracking-tight leading-tight`}>
            Ստուգեք կասկածելի հաղորդագրությունը
          </h1>
          <p className="mt-2 text-[#8b949e] leading-relaxed max-w-2xl">
            Տեղադրեք ստացված SMS-ը, հղումը կամ նկարը։ Համակարգը կստուգի հասցեի իսկությունը և կտա հստակ անվտանգության եզրակացություն։
          </p>
        </div>

        {/* Փորձարկման Օրինակներ (Apple HIG 44pt touch target) */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2.5">
            Տարածված օրինակներ՝
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="apple-press min-h-[44px] px-3.5 py-2 rounded-full bg-[#161b22]/70 hover:bg-[#21262d] text-xs sm:text-sm text-[#c9d1d9] hover:text-white border border-white/10 hover:border-[#58a6ff]/40 shadow-elevated-sm flex items-center justify-center text-center"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Մուտքագրման Բլոկ */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 shadow-elevated-md">
          
          {/* Ներդիրներ (Segmented Control - Apple HIG 44pt touch target) */}
          <div className="inline-flex p-1 rounded-xl bg-[#0b0f17]/80 border border-white/[0.08] mb-4 gap-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`apple-press min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'text'
                  ? 'bg-[#21262d] text-white shadow-sm border border-white/10'
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Տեքստ կամ SMS</span>
            </button>

            <button
              onClick={() => setActiveTab('screenshot')}
              className={`apple-press min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-[#21262d] text-white shadow-sm border border-white/10'
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Սքրինշոթ</span>
            </button>
          </div>

          {/* Տեքստային Մուտք */}
          {activeTab === 'text' && (
            <div>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Տեղադրեք այստեղ ստացված SMS-ը, Viber կամ WhatsApp հաղորդագրությունը..."
                  rows={4}
                  className={`w-full p-4 rounded-xl bg-[#0b0f17]/90 border border-white/10 text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-2 focus:ring-[#1f6feb]/25 transition-all resize-none leading-relaxed shadow-inner ${
                    isElderlyMode ? 'text-lg' : 'text-base'
                  }`}
                />

                {inputText && (
                  <button
                    onClick={handleClear}
                    className="apple-press min-h-[44px] min-w-[44px] absolute top-2 right-2 flex items-center justify-center rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                    title="Մաքրել"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Կառավարման Կոճակներ (Apple HIG 44pt touch target) */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handlePaste}
                  className="apple-press min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#21262d]/80 hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-white/10 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-elevated-sm"
                >
                  <Copy className="w-4 h-4 text-[#8b949e]" />
                  <span>Տեղադրել ստեղնաշարից</span>
                </button>

                <button
                  onClick={() => handleAnalyze()}
                  disabled={!inputText.trim() || isAnalyzing}
                  className={`apple-press min-h-[44px] w-full sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#1f6feb] to-[#2f81f7] hover:from-[#388bfd] hover:to-[#58a6ff] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(31,111,235,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] ${
                    isElderlyMode ? 'text-base min-h-[50px] px-8' : ''
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{hasAi ? 'Վերլուծվում է AI-ով...' : 'Վերլուծվում է...'}</span>
                    </>
                  ) : (
                    <span>Ստուգել հաղորդագրությունը</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Նկարի Մուտք */}
          {activeTab === 'screenshot' && (
            <div>
              <label className="border border-dashed border-white/15 hover:border-[#58a6ff] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-[#0b0f17]/60 hover:bg-[#0b0f17]/90 transition-all min-h-[170px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img 
                      src={imagePreview} 
                      alt="Ներբեռնված սքրինշոթ" 
                      className="max-h-56 rounded-lg border border-white/10 object-contain shadow-elevated-sm"
                    />
                    <span className="text-xs text-[#58a6ff] font-medium">
                      Սեղմեք՝ նոր նկար ընտրելու համար
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-[#1f6feb]/10 flex items-center justify-center text-[#58a6ff] mb-3">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="font-semibold text-white text-sm mb-1">
                      Ընտրեք սքրինշոթը կամ նկարը
                    </div>
                    <p className="text-xs text-[#8b949e] text-center max-w-sm leading-relaxed">
                      Համակարգը կկարդա նկարում եղած տեքստը և կստուգի հղումները։
                    </p>
                  </>
                )}
              </label>
            </div>
          )}

        </div>

        {/* Եզրակացության Բլոկ */}
        <TrafficLight 
          result={analysisResult} 
          onAskFamily={() => setIsAskModalOpen(true)}
          isElderlyMode={isElderlyMode}
        />

        {/* Կանոններ */}
        <div className="mt-8 sm:mt-10 glass-panel rounded-2xl p-5 sm:p-6 shadow-elevated-md">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-sm font-semibold text-white">
              Հիմնական կանոններ՝ խարդախությունից խուսափելու համար
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-xs leading-relaxed text-[#8b949e]">
            <div className="glass-panel-subtle p-3.5 rounded-xl border border-white/5">
              <span className="font-semibold text-[#f85149] block mb-1">1. Հայփոստ</span>
              Իրական Հայփոստի հասցեն միայն <strong>haypost.am</strong>-ն է։ Ուրիշ վերջավորություններով (.cc, .top) կայքերը կեղծ են։
            </div>

            <div className="glass-panel-subtle p-3.5 rounded-xl border border-white/5">
              <span className="font-semibold text-[#d29922] block mb-1">2. Բանկեր և Իդրամ</span>
              Ոչ մի բանկ կամ վճարային համակարգ հեռախոսով չի հարցնում քարտի CVV կոդը կամ SMS-ով եկած գաղտնաբառը։
            </div>

            <div className="glass-panel-subtle p-3.5 rounded-xl border border-white/5">
              <span className="font-semibold text-[#58a6ff] block mb-1">3. Հեռավար մուտք</span>
              Երբեք մի տեղադրեք AnyDesk կամ TeamViewer հավելվածները՝ անծանոթի զանգով ինչ-որ բան «կարգավորելու» համար։
            </div>
          </div>
        </div>

      </main>

      {/* Ստորոտ (iPhone Safe-Area Bottom Compliant) */}
      <footer 
        className="border-t border-white/[0.08] bg-[#0b0f17]/80 backdrop-blur-md py-6 px-4 text-center text-xs text-[#8b949e] mt-auto"
        style={{
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        <p className="font-medium text-[#c9d1d9]">«Զգույշ» (SafeArm) © 2026</p>
        <p className="mt-1">
          Հասարակագիտական և կրթական նախագիծ՝ ուղղված Հայաստանում տեղեկատվական անվտանգության բարձրացմանը։
        </p>
      </footer>

      {/* Մոդալներ */}
      <AskFamilyModal 
        isOpen={isAskModalOpen} 
        onClose={() => setIsAskModalOpen(false)} 
        shareText={analysisResult?.shareText} 
      />

      <BusinessPresentationModal 
        isOpen={isBusinessModalOpen} 
        onClose={() => setIsBusinessModalOpen(false)} 
      />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onApiKeySaved={() => setHasAi(isAiConfigured())} 
      />

    </div>
  );
}
