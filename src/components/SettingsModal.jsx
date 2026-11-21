import React, { useState, useEffect } from 'react';
import { X, Check, ExternalLink, Cpu, AlertCircle, RefreshCw } from 'lucide-react';
import { 
  getNvidiaApiKey, setNvidiaApiKey, 
  getNvidiaModel, setNvidiaModel, 
  SUPPORTED_MODELS, DEFAULT_MODEL, 
  analyzeWithNemotron 
} from '../utils/aiClient';

export default function SettingsModal({ isOpen, onClose, onApiKeySaved }) {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getNvidiaApiKey());
      setSelectedModel(getNvidiaModel());
      setTestResult(null);
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setNvidiaApiKey(apiKey);
    setNvidiaModel(selectedModel);
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
      setTestResult({ success: false, message: 'Նախ մուտքագրեք API բանալին։' });
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
          message: `Կապը հաջողված է (${res.aiModel})։ AI-ը ակտիվ է և ճիշտ աշխատում է։`
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="ios-sheet-container relative w-full max-w-lg bg-[#161b22] border-t sm:border border-[#30363d] rounded-t-2xl sm:rounded-lg p-5 sm:p-6 shadow-2xl overflow-hidden"
        style={{
          paddingBottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom)))',
        }}
      >
        
        {/* iPhone Sheet Grabber */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#58a6ff]" />
            <h3 className="text-base font-semibold text-white">AI Կարգավորումներ</h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded text-[#8b949e] hover:text-white hover:bg-[#21262d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="mt-4">
          <p className="text-xs text-[#8b949e] leading-relaxed">
            SafeArm-ը միանում է <strong>NVIDIA NIM (build.nvidia.com)</strong> հարթակի հզորագույն մոդելներին՝ ֆիշինգի և սոցիալական ինժեներիայի խորքային վերլուծության համար։
          </p>

          {/* Model selection */}
          <div className="mt-3.5">
            <label className="text-xs font-medium text-[#c9d1d9] block mb-1">
              Ընտրեք AI Մոդելը
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white text-base focus:outline-none focus:border-[#58a6ff] min-h-[44px]"
            >
              {SUPPORTED_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div className="mt-3.5">
            <label className="text-xs font-medium text-[#c9d1d9] block mb-1.5 flex items-center justify-between">
              <span>NVIDIA NIM API Key</span>
              <a
                href="https://build.nvidia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline flex items-center gap-1 text-[11px] min-h-[30px]"
              >
                <span>build.nvidia.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>

            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="nvapi-..."
                className="w-full px-3 py-2.5 rounded bg-[#0d1117] border border-[#30363d] text-white text-base font-mono placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] min-h-[44px]"
              />
            </div>
          </div>

          {/* Test connection result */}
          {testResult && (
            <div className={`mt-3 p-3 rounded text-xs flex items-start gap-2 border ${
              testResult.success
                ? 'bg-[#3fb950]/10 text-[#3fb950] border-[#3fb950]/30'
                : 'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/30'
            }`}>
              {testResult.success ? <Check className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
              <span className="leading-snug">{testResult.message}</span>
            </div>
          )}

          {/* Buttons (Apple HIG 44pt touch target) */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-[#30363d]">
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !apiKey.trim()}
              className="min-h-[44px] px-4 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-xs sm:text-sm font-medium text-[#c9d1d9] border border-[#30363d] flex items-center gap-2 disabled:opacity-50"
            >
              {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
              <span>Փորձարկել կապը</span>
            </button>

            <div className="flex items-center gap-2">
              {apiKey && (
                <button
                  onClick={handleClear}
                  className="min-h-[44px] px-3.5 py-2 rounded text-xs sm:text-sm text-[#f85149] hover:bg-[#f85149]/10"
                >
                  Ջնջել
                </button>
              )}

              <button
                onClick={handleSave}
                className="min-h-[44px] px-5 py-2 bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded text-xs sm:text-sm font-medium flex items-center gap-1.5"
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
