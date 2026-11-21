/**
 * NVIDIA NIM (build.nvidia.com) AI Client
 * Powered by NVIDIA Nemotron-3 Ultra (550B)
 */

import { AI_CONFIG } from '../config/aiConfig.js';

export const SUPPORTED_MODELS = [
  { id: 'nvidia/nemotron-3-ultra-550b-a55b', name: 'NVIDIA Nemotron-3 Ultra (550B)' },
  { id: 'nvidia/nemotron-3-super-120b-a12b', name: 'NVIDIA Nemotron-3 Super (120B)' },
  { id: 'meta/llama-3.3-70b-instruct', name: 'Meta Llama 3.3 (70B Instruct)' },
];

export const DEFAULT_MODEL = AI_CONFIG.model;
const DIRECT_URL = AI_CONFIG.directUrl;
const PROXY_URL = AI_CONFIG.proxyUrl;

export function isAiEnabled() {
  try {
    if (typeof localStorage !== 'undefined') {
      const val = localStorage.getItem('safearm_ai_enabled');
      if (val !== null) return val === 'true';
    }
  } catch {}
  return true; // default enabled
}

export function setAiEnabled(enabled) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('safearm_ai_enabled', enabled ? 'true' : 'false');
    }
  } catch {}
}

export function getNvidiaApiKey() {
  let key = '';

  // 1. Check browser localStorage override (user configured in Settings)
  try {
    if (typeof localStorage !== 'undefined') {
      key = localStorage.getItem('safearm_nvidia_api_key') || '';
    }
  } catch {}

  // 2. Check import.meta.env (from .env or GitHub Action secret)
  if (!key) {
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        key = import.meta.env.VITE_NVIDIA_API_KEY || '';
      }
    } catch {}
  }

  // 3. Check central AI_CONFIG
  if (!key && AI_CONFIG.apiKey) {
    key = AI_CONFIG.apiKey;
  }

  // 4. Check process.env (Node / testing environment)
  if (!key) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        key = process.env.VITE_NVIDIA_API_KEY || '';
      }
    } catch {}
  }

  return key.trim();
}

export function setNvidiaApiKey(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      if (!key || !key.trim()) {
        localStorage.removeItem('safearm_nvidia_api_key');
      } else {
        localStorage.setItem('safearm_nvidia_api_key', key.trim());
      }
    }
  } catch {}
}

export function getNvidiaModel() {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('safearm_nvidia_model') || DEFAULT_MODEL;
    }
  } catch {}
  return DEFAULT_MODEL;
}

export function setNvidiaModel(modelId) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('safearm_nvidia_model', modelId || DEFAULT_MODEL);
    }
  } catch {}
}

export function isAiConfigured() {
  return isAiEnabled() && Boolean(getNvidiaApiKey());
}

const SYSTEM_PROMPT = `Դուք «Զգույշ» (SafeArm) հայաստանյան կիբեռանվտանգության համակարգի գլխավոր AI վերլուծաբանն եք։
Ձեր նպատակն է ստուգել հաղորդագրությունը (SMS, Viber, WhatsApp, Telegram, էլ․ փոստ) և հայտնաբերել ֆիշինգը, խարդախությունը կամ սոցիալական ինժեներիան։

Կարևոր կոնտեքստ Հայաստանի համար.
1. Հայփոստի պաշտոնական կայքը ՄԻԱՅՆ haypost.am-ն է: Ցանկացած .cc, .info, .top, .live կամ փոփոխված հղում (haypost-track.com) 100% ֆիշինգ է։
2. Բանկերը և Իդրամը (Idram) ԵՐԲԵՔ SMS-ով չեն ուղարկում հղում գաղտնաբառը կամ քարտի CVV-ն փոխելու համար, և չեն սպառնում հաշիվը 24 ժամում արգելափակել։
3. 5G միացնելու կամ կապի որակը բարելավելու համար AnyDesk / TeamViewer ներբեռնելու պահանջը 100% հեռավար մուտքի խարդախություն է։
4. Գազպրոմի կամ պետական ներդրումների անվան տակ օրական 50,000 դրամ խոստացող հղումները խարդախություն են։
5. «Քվեարկիր երեխայիս/զարմուհուս օգտին» (vote contest) հաղորդագրությունները WhatsApp/Telegram հաշիվներ գողանալու թակարդ են։
6. Կեղծ աշխատանքի առաջարկները (2 ժամ, 400,000 դրամ) կանխավճարի կորզում են:
7. Պետական, համայնքային կամ հարկային պաշտոնական ծանուցումները (օր.՝ Երևանի քաղաքապետարանի yerevan.am, ՀՀ Կառավարության gov.am, e-gov.am, taxservice.am, e-payments.am, պաշտոնական բանկերը) ԱՆՎՏԱՆԳ ԵՆ (green), եթե հղումը տանում է պաշտոնական կայք։ Նման դեպքում badgeText-ում և explanation-ում հստակ նշեք, որ սա պաշտոնական ծանուցում է (օր.՝ Երևանի քաղաքապետարանի հարկային ծանուցում), իսկ advice-ում տվեք կոնտեքստային խորհուրդ (օր.՝ վճարումը կատարել միայն պաշտոնական կայքում կամ բանկի միջոցով)։
8. Հաղորդագրությունը կարող է լինել մեսրոպատառ հայերեն, լատինատառ հայերեն (Armglish/translit, օր.՝ "Dzer hashivy kasecvel e"), ռուսերեն կամ անգլերեն։

ՊԱՏԱՍԽԱՆԻ ՁԵՎԱՉԱՓ.
Դուք ՊԵՏՔ Է պատասխանեք ԲԱՑԱՌԱՊԵՍ վավեր JSON ֆորմատով՝ առանց որևէ ավելորդ նախաբանի կամ markdown \`\`\`json պիտակների.
{
  "status": "red" կամ "yellow" կամ "green",
  "badgeText": "Հակիրճ եզրակացություն (օր.՝ Ֆինանսական ֆիշինգ / Վտանգավոր խարդախություն / Պաշտոնական անվտանգ հաղորդագրություն)",
  "riskScore": 0-ից 100 թվային գնահատական (օր.՝ 95),
  "explanation": "1-2 պարզ և հասկանալի նախադասություն հայերենով, հատկապես մատչելի ավագ սերնդի համար",
  "reasons": [
    "Կոնկրետ պատճառ 1 (ինչն է կասկածելի)",
    "Կոնկրետ պատճառ 2"
  ],
  "advice": [
    "Անհապաղ խորհուրդ 1 (օր.՝ Ոչ մի դեպքում չսեղմել հղմանը)",
    "Անհապաղ խորհուրդ 2"
  ],
  "shareText": "Կարճ նախազգուշացում հարազատներին ուղարկելու համար"
}`;

/**
 * Ուղարկում է հարցում NVIDIA Nemotron մոդելին
 */
export async function analyzeWithNemotron(text, selectedModel = null) {
  const apiKey = getNvidiaApiKey();
  if (!apiKey) {
    throw new Error('AI բանալին կարգավորված չէ։');
  }

  const modelToUse = selectedModel || getNvidiaModel() || DEFAULT_MODEL;

  const payload = {
    model: modelToUse,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Խնդրում եմ վերլուծել այս հաղորդագրությունը.\n\n"""\n${text}\n"""` }
    ],
    temperature: 0.1,
    top_p: 0.9,
    max_tokens: 800
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const isBrowserLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const primaryUrl = isBrowserLocalhost ? PROXY_URL : DIRECT_URL;

  let response;
  try {
    response = await fetch(primaryUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
  } catch (err) {
    if (primaryUrl !== DIRECT_URL) {
      try {
        response = await fetch(DIRECT_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      } catch (directErr) {
        throw new Error('Կապի խնդիր NVIDIA NIM սերվերի հետ։ Համոզվեք, որ ինտերնետ կապը ակտիվ է։');
      }
    } else {
      throw new Error(`Կապի խնդիր NVIDIA NIM սերվերի հետ: ${err.message}`);
    }
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson?.detail || errJson?.message || JSON.stringify(errJson);
    } catch {
      errorDetail = await response.text();
    }

    if (response.status === 401) {
      throw new Error('NVIDIA API Key-ը սխալ է կամ անվավեր (401 Unauthorized)։');
    }
    if (response.status === 410) {
      throw new Error(`Նշված մոդելը (${modelToUse}) այլևս ակտիվ չէ (410 EOL)։`);
    }
    if (response.status === 403) {
      throw new Error(`Մուտքն արգելված է (${modelToUse}): Ստուգեք բանալու թույլտվությունը։`);
    }
    if (response.status === 429) {
      throw new Error('Հարցումների քանակը գերազանցել է սահմանաչափը (429 Rate Limit)։');
    }

    throw new Error(`NVIDIA API Error (${response.status}): ${errorDetail || 'Անհայտ սխալ'}`);
  }

  const data = await response.json();
  const rawContent = data?.choices?.[0]?.message?.content?.trim() || '';

  let cleanJson = rawContent;
  if (cleanJson.startsWith('```json')) {
    cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  } else if (cleanJson.startsWith('```')) {
    cleanJson = cleanJson.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }

  let parsed;
  try {
    parsed = JSON.parse(cleanJson);
  } catch (jsonErr) {
    throw new Error('AI-ի պատասխանը հնարավոր չեղավ մշակել (Invalid JSON): ' + rawContent.slice(0, 100));
  }

  return {
    status: parsed.status || 'yellow',
    badgeText: parsed.badgeText || 'Վերլուծված է AI-ով',
    riskScore: typeof parsed.riskScore === 'number' ? parsed.riskScore : 50,
    explanation: parsed.explanation || 'Հաղորդագրությունը վերլուծվել է AI-ի կողմից։',
    reasons: Array.isArray(parsed.reasons) ? parsed.reasons : ['Կասկածելի բովանդակություն'],
    advice: Array.isArray(parsed.advice) ? parsed.advice : ['Զգուշացեք անծանոթ հղումներից'],
    shareText: parsed.shareText || `Զգուշացում: ${parsed.explanation}`,
    isAiVerified: true,
    aiModel: modelToUse.split('/')[1] || 'Nemotron-3'
  };
}
