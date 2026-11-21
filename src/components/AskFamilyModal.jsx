import React, { useState } from 'react';
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';
import { X, Check, Copy, Share2, Send, MessageSquare } from 'lucide-react';

export default function AskFamilyModal({ isOpen, onClose, shareText }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const defaultText = 'Զգուշացում կասկածելի հաղորդագրության մասին:';
  const textToSend = shareText || defaultText;
  const encodedText = encodeURIComponent(textToSend);

  const handleNativeShare = async () => {
    try {
      const canShare = await Share.canShare();
      if (canShare.value) {
        await Share.share({
          title: 'Զգույշ (SafeArm) Զգուշացում',
          text: textToSend,
          dialogTitle: 'Կիսվել հարազատի հետ'
        });
        return;
      }
    } catch {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Զգույշ (SafeArm) Զգուշացում',
            text: textToSend
          });
          return;
        } catch {}
      }
    }
  };

  const handleCopy = async () => {
    try {
      await Clipboard.write({ string: textToSend });
    } catch {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToSend);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="ios-sheet-container relative w-full max-w-lg glass-panel border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 shadow-elevated-lg overflow-hidden"
        style={{
          paddingBottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom)))',
        }}
      >
        
        {/* iPhone Sheet Grabber */}
        <div className="w-10 h-1.5 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" />

        {/* Վերնագիր */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#58a6ff]/15 flex items-center justify-center text-[#58a6ff]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">Ուղարկել հարազատին</h3>
              <p className="text-xs text-[#8b949e]">Կիսվեք այս եզրակացությամբ ընտանիքի անդամների հետ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="apple-press min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
            title="Փակել"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Տեքստ */}
        <div className="mt-4">
          <label className="text-xs text-[#8b949e] block mb-1.5 font-medium">
            Նախապատրաստված հաղորդագրություն՝
          </label>
          <div className="p-3.5 bg-[#0b0f17]/90 border border-white/10 rounded-xl text-xs font-mono text-[#c9d1d9] leading-relaxed max-h-32 overflow-y-auto shadow-inner">
            {textToSend}
          </div>
        </div>

        {/* Կոճակներ (Apple HIG 44pt touch target) */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-press min-h-[44px] flex items-center justify-center gap-2 px-3 rounded-xl bg-[#21262d]/80 hover:bg-[#30363d] text-xs sm:text-sm font-medium text-[#c9d1d9] hover:text-white border border-white/10 shadow-elevated-sm"
          >
            <MessageSquare className="w-4 h-4 text-[#3fb950]" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`viber://forward?text=${encodedText}`}
            className="apple-press min-h-[44px] flex items-center justify-center gap-2 px-3 rounded-xl bg-[#21262d]/80 hover:bg-[#30363d] text-xs sm:text-sm font-medium text-[#c9d1d9] hover:text-white border border-white/10 shadow-elevated-sm"
          >
            <Send className="w-4 h-4 text-[#a371f7]" />
            <span>Viber</span>
          </a>

          <button
            onClick={handleCopy}
            className="apple-press min-h-[44px] flex items-center justify-center gap-2 px-3 rounded-xl bg-[#21262d]/80 hover:bg-[#30363d] text-xs sm:text-sm font-medium text-[#c9d1d9] hover:text-white border border-white/10 shadow-elevated-sm"
          >
            {copied ? <Check className="w-4 h-4 text-[#3fb950]" /> : <Copy className="w-4 h-4 text-[#8b949e]" />}
            <span>{copied ? 'Պատճենված է' : 'Պատճենել'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="apple-press min-h-[44px] flex items-center justify-center gap-2 px-3 rounded-xl bg-gradient-to-r from-[#1f6feb] to-[#2f81f7] hover:from-[#388bfd] hover:to-[#58a6ff] text-xs sm:text-sm font-medium text-white shadow-[0_4px_16px_rgba(31,111,235,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            <Share2 className="w-4 h-4" />
            <span>Կիսվել այլ կերպ</span>
          </button>
        </div>

      </div>
    </div>
  );
}
