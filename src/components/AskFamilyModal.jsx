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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-lg p-5 sm:p-6 shadow-xl">
        
        {/* Վերնագիր */}
        <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
          <div>
            <h3 className="text-base font-semibold text-white">Ուղարկել հարազատին</h3>
            <p className="text-xs text-[#8b949e]">Կիսվեք այս եզրակացությամբ ընտանիքի անդամների հետ</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b949e] hover:text-white hover:bg-[#21262d]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Տեքստ */}
        <div className="mt-4">
          <label className="text-xs text-[#8b949e] block mb-1">
            Նախապատրաստված հաղորդագրություն՝
          </label>
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded text-xs font-mono text-[#c9d1d9] leading-relaxed max-h-32 overflow-y-auto">
            {textToSend}
          </div>
        </div>

        {/* Կոճակներ */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9] border border-[#30363d]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#3fb950]" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`viber://forward?text=${encodedText}`}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9] border border-[#30363d]"
          >
            <Send className="w-3.5 h-3.5 text-[#bc8cff]" />
            <span>Viber</span>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9] border border-[#30363d]"
          >
            <Send className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Telegram</span>
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9] border border-[#30363d]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5 text-[#8b949e]" />}
            <span>{copied ? 'Պատճենված է' : 'Պատճենել'}</span>
          </button>
        </div>

        {/* Համակարգային Կիսվել */}
        <button
          onClick={handleNativeShare}
          className="mt-2.5 w-full py-2 bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded text-xs font-medium flex items-center justify-center gap-2"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Ուղարկել այլ հավելվածով (Share)</span>
        </button>

      </div>
    </div>
  );
}
