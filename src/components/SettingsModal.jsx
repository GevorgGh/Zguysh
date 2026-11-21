import React, { useState, useEffect } from 'react';
import { 
  X, Check, ExternalLink, Cpu, AlertCircle, 
  RefreshCw, Eye, EyeOff, ShieldCheck 
} from 'lucide-react';
import { 
  getNvidiaApiKey, setNvidiaApiKey, 
  getNvidiaModel, setNvidiaModel,
  isAiEnabled, setAiEnabled,
  SUPPORTED_MODELS, DEFAULT_MODEL, 
  analyzeWithNemotron 
} from '../utils/aiClient';

export default function SettingsModal({ isOpen, onClose, onApiKeySaved }) {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [enabled, setEnabled] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getNvidiaApiKey());
      setSelectedModel(getNvidiaModel());
      setEnabled(isAiEnabled());
      setTestResult(null);
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setNvidiaApiKey(apiKey);
    setNvidiaModel(selectedModel);
    setAiEnabled(enabled);
    setIsSaved(true);
    setTestResult(null);
    if (onApiKeySaved) onApiKeySaved();
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    setNvidiaApiKey('');
    setApiKey('');
    setTestResult(null);
    if (onApiKeySaved) onApiKeySaved();
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Նախ մուտքագրեք API բանալին (nvapi-...)։' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    setNvidiaApiKey(apiKey);
    setNvidiaModel(selectedModel);

    try {
      const res = await analyzeWithNemotron('HAYPOST: Dzer tsanrotse kasecvel e: haypost-delivery.cc', selectedModel);
      if (res && res.status) {
        setTestResult({
          success: true,
          message: `Կապը հաջողված է (${res.aiModel})։ AI-ն ակտիվ է և աշխատում է անխափան։`
        });
        if (onApiKeySaved) onApiKeySaved();
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Սխալ կապի հաստատման ժամանակ։'
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="ios-sheet-container relative w-full max-w-lg bg-[#161b22] border-t sm:border border-[#30363d] rounded-t-2xl sm:rounded-xl p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        style={{
          paddingBottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom)))',
        }}
      >
        
        {/* iPhone Sheet Grabber */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#58a6ff]" />
            <h3 className="text-base font-semibold text-white">Կարգավորումներ</h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
            title="Փակել"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          
          {/* AI Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div>
              <div className="text-sm font-medium text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#3fb950]" />
                <span>NVIDIA AI Վերլուծություն</span>
              </div>
              <p className="text-xs text-[#8b949e] mt-0.5">
                Խորքային ստուգում NVIDIA NIM նեյրոցանցի միջոցով
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={() => setEnabled(!enabled)}
              className={`min-h-[44px] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                enabled 
                  ? 'bg-[#238636] text-white' 
                  : 'bg-[#21262d] text-[#8b949e] border border-[#30363d]'
              }`}
            >
              <span>{enabled ? 'Միացված' : 'Անջատված'}</span>
            </button>
          </div>

          {enabled && (
            <div className="space-y-3.5 p-3.5 bg-[#0d1117] rounded-lg border border-[#30363d]">
              {/* Model selection */}
              <div>
                <label className="text-xs font-medium text-[#c9d1d9] block mb-1.5">
                  Ընտրեք AI Մոդելը
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md bg-[#161b22] border border-[#30363d] text-white text-base focus:outline-none focus:border-[#58a6ff] min-h-[44px]"
                >
                  {SUPPORTED_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* API Key */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#c9d1d9]">
                    NVIDIA NIM Token (API Key)
                  </label>
                  <a
                    href="https://build.nvidia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#58a6ff] hover:underline flex items-center gap-1 text-[11px] min-h-[30px]"
                  >
                    <span>build.nvidia.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative flex items-center">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="nvapi-..."
                    className="w-full px-3 py-2.5 pr-11 rounded-md bg-[#161b22] border border-[#30363d] text-white text-base font-mono placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="min-h-[44px] min-w-[44px] absolute right-0 flex items-center justify-center text-[#8b949e] hover:text-white"
                    title={showKey ? 'Թաքցնել' : 'Ցուցադրել'}
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-[11px] text-[#8b949e] mt-1.5 leading-relaxed">
                  Ձեր API բանալին պահպանվում է բացառապես ձեր սարքի հիշողության մեջ (Local Storage)։
                </p>
              </div>

              {/* Test connection result */}
              {testResult && (
                <div className={`p-3 rounded-md text-xs flex items-start gap-2 border ${
                  testResult.success
                    ? 'bg-[#3fb950]/10 text-[#3fb950] border-[#3fb950]/30'
                    : 'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/30'
                }`}>
                  {testResult.success ? (
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{testResult.message}</span>
                </div>
              )}

              {/* Test Button */}
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !apiKey.trim()}
                className="min-h-[44px] w-full px-4 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs sm:text-sm font-medium text-[#c9d1d9] border border-[#30363d] flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
              >
                {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4 text-[#58a6ff]" />}
                <span>Փորձարկել AI կապը</span>
              </button>
            </div>
          )}

          {/* Local Zero-Trust Status */}
          <div className="p-3.5 bg-[#0d1117] rounded-lg border border-[#30363d] flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#3fb950] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-white block mb-0.5">
                Տեղական Zero-Trust պաշտպանություն՝ Ակտիվ
              </span>
              <p className="text-[#8b949e] leading-relaxed">
                Հայաստանի բանկերի, Հայփոստի և պետական մարմինների 100+ հավաստագրված դոմենների ցանկը և իմաստային ֆիլտրերը գործում են նաև առանց ինտերնետի կամ AI բանալու։
              </p>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#30363d]">
            {apiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="min-h-[44px] px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium text-[#f85149] hover:bg-[#f85149]/10 transition-colors"
              >
                Ջնջել բանալին
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2 rounded-md text-xs sm:text-sm font-medium text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
              >
                Չեղարկել
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="min-h-[44px] px-5 py-2 bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded-md text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {isSaved ? <Check className="w-4 h-4" /> : null}
                <span>{isSaved ? 'Պահպանված է' : 'Պահպանել'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
