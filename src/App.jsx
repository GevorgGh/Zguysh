import React, { useState, useEffect } from 'react';
import { 
  Shield, Copy, Image as ImageIcon, FileText, RefreshCw, 
  Info, X, Settings, Cpu
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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    setHasAi(isAiConfigured());
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
    <div className={`min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col font-sans ${isElderlyMode ? 'text-lg' : 'text-sm sm:text-base'}`}>
      
      {/* Գլխավոր Մենյու (iPhone Safe-Area Top Compliant) */}
      <header 
        className="border-b border-[#30363d] bg-[#161b22]/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between"
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: '0.75rem',
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1f6feb] flex items-center justify-center text-white shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base sm:text-lg text-white">Զգույշ</span>
              <span className="text-xs text-[#8b949e]">SafeArm</span>
              {hasAi && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
                  <Cpu className="w-3 h-3" />
                  <span>Nemotron AI</span>
                </span>
              )}
            </div>
            <p className="text-xs text-[#8b949e] hidden sm:block">
              Ֆիշինգի և խարդախության ստուգման համակարգ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Կարգավորումներ (Apple HIG 44pt touch target) */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className={`min-h-[44px] px-3 py-2 rounded-md text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-colors ${
              hasAi
                ? 'bg-[#21262d] text-[#58a6ff] border-[#388bfd]/40 hover:bg-[#30363d]'
                : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-white'
            }`}
            title="NVIDIA Nemotron AI Կարգավորումներ"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">AI Բանալի</span>
          </button>

          <ElderlyModeToggle 
            isElderlyMode={isElderlyMode} 
            onToggle={() => setIsElderlyMode(!isElderlyMode)} 
          />

          <button
            onClick={() => setIsBusinessModalOpen(true)}
            className="min-h-[44px] px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium text-[#c9d1d9] hover:text-white hover:bg-[#21262d] border border-[#30363d] flex items-center justify-center"
          >
            Հայեցակարգ
          </button>
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
        <div className="mb-6 sm:mb-8">
          <h1 className={`${isElderlyMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-semibold text-white tracking-tight leading-snug`}>
            Ստուգեք կասկածելի հաղորդագրությունը
          </h1>
          <p className="mt-2 text-[#8b949e] leading-relaxed">
            Տեղադրեք ստացված SMS-ը, հղումը կամ նկարը։ Համակարգը{hasAi ? ' (NVIDIA Nemotron AI-ի աջակցությամբ)' : ''} կստուգի հասցեի իսկությունը և կտա հստակ եզրակացություն։
          </p>
        </div>

        {/* Փորձարկման Օրինակներ (Apple HIG 44pt touch target) */}
        <div className="mb-6">
          <div className="text-xs font-medium text-[#8b949e] mb-2.5">
            Օրինակներ՝
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="min-h-[44px] px-3.5 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs sm:text-sm text-[#c9d1d9] border border-[#30363d] transition-colors flex items-center justify-center text-center"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Մուտքագրման Բլոկ */}
        <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4 sm:p-5 shadow-sm">
          
          {/* Ներդիրներ (Tabs - Apple HIG 44pt touch target) */}
          <div className="flex items-center gap-2 border-b border-[#30363d] pb-3 mb-4">
            <button
              onClick={() => setActiveTab('text')}
              className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'text'
                  ? 'bg-[#21262d] text-white'
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Տեքստ կամ SMS</span>
            </button>

            <button
              onClick={() => setActiveTab('screenshot')}
              className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'screenshot'
                  ? 'bg-[#21262d] text-white'
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
                  className={`w-full p-3.5 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors resize-none leading-relaxed ${
                    isElderlyMode ? 'text-lg' : 'text-base'
                  }`}
                />

                {inputText && (
                  <button
                    onClick={handleClear}
                    className="min-h-[44px] min-w-[44px] absolute top-2 right-2 flex items-center justify-center rounded text-[#8b949e] hover:text-white hover:bg-[#21262d]"
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
                  className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4 text-[#8b949e]" />
                  <span>Տեղադրել ստեղնաշարից</span>
                </button>

                <button
                  onClick={() => handleAnalyze()}
                  disabled={!inputText.trim() || isAnalyzing}
                  className={`min-h-[44px] w-full sm:w-auto px-7 py-2.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isElderlyMode ? 'text-base min-h-[50px] px-8' : ''
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{hasAi ? 'Վերլուծվում է Nemotron AI-ով...' : 'Ստուգվում է...'}</span>
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
              <label className="border border-dashed border-[#30363d] hover:border-[#58a6ff] rounded-md p-8 flex flex-col items-center justify-center cursor-pointer bg-[#0d1117] transition-colors min-h-[160px]">
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
                      className="max-h-56 rounded border border-[#30363d] object-contain"
                    />
                    <span className="text-xs text-[#58a6ff]">
                      Սեղմեք՝ նոր նկար ընտրելու համար
                    </span>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-[#8b949e] mb-2" />
                    <div className="font-medium text-white text-sm mb-1">
                      Ընտրեք սքրինշոթը կամ նկարը
                    </div>
                    <p className="text-xs text-[#8b949e] text-center max-w-sm">
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
        <div className="mt-8 sm:mt-10 border border-[#30363d] rounded-lg bg-[#161b22] p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-sm font-semibold text-white">
              Հիմնական կանոններ՝ խարդախությունից խուսափելու համար
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-xs leading-relaxed text-[#8b949e]">
            <div className="p-3 bg-[#0d1117] rounded border border-[#30363d]">
              <span className="font-semibold text-[#f85149] block mb-1">1. Հայփոստ</span>
              Իրական Հայփոստի հասցեն միայն <strong>haypost.am</strong>-ն է։ Ուրիշ վերջավորություններով (.cc, .top) կայքերը կեղծ են։
            </div>

            <div className="p-3 bg-[#0d1117] rounded border border-[#30363d]">
              <span className="font-semibold text-[#d29922] block mb-1">2. Բանկեր և Իդրամ</span>
              Ոչ մի բանկ կամ վճարային համակարգ հեռախոսով չի հարցնում քարտի CVV կոդը կամ SMS-ով եկած գաղտնաբառը։
            </div>

            <div className="p-3 bg-[#0d1117] rounded border border-[#30363d]">
              <span className="font-semibold text-[#58a6ff] block mb-1">3. Հեռավար մուտք</span>
              Երբեք մի տեղադրեք AnyDesk կամ TeamViewer հավելվածները՝ անծանոթի զանգով ինչ-որ բան «կարգավորելու» համար։
            </div>
          </div>
        </div>

      </main>

      {/* Ստորոտ (iPhone Safe-Area Bottom Compliant) */}
      <footer 
        className="border-t border-[#30363d] py-6 px-4 text-center text-xs text-[#8b949e] mt-auto"
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
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onApiKeySaved={() => setHasAi(isAiConfigured())}
      />

    </div>
  );
}
