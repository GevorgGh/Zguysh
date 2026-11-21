/**
 * Զգույշ (SafeArm) - Հիմնական Կիբեռանվտանգության Վերլուծիչ
 * Միավորում է 3 հիմնական շերտերը՝
 * 1. Zero-Trust Whitelist (Զրոյական Վստահություն)
 * 2. Domain Structure & Typo-Squatting Analyzer (Բրենդի կեղծման և դոմենի վերլուծություն)
 * 3. AI Semantic Intent Engine (Իմաստային և սոցիալական ինժեներիայի վերլուծություն)
 * + 4. NVIDIA Nemotron AI Integration (Deep Contextual & Psychological Fraud Reasoning)
 */

import { isDomainOfficiallyVerified, getVerifiedBrandForHost } from './whitelist.js';
import { analyzeDomainStructure } from './domainAnalyzer.js';
import { analyzeSemanticIntent } from './semanticEngine.js';
import { isAiConfigured, analyzeWithNemotron } from './aiClient.js';

/**
 * Ճկուն URL հայտնաբերիչ
 */
export function extractUrls(text) {
  if (!text) return [];

  const normalized = text
    .replace(/\[\.\]/g, '.')
    .replace(/\(\.\)/g, '.')
    .replace(/hxxps?:\/\//gi, 'https://')
    .replace(/՝/g, ' ');

  const fullUrlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  const fullMatches = normalized.match(fullUrlRegex) || [];

  const bareDomainRegex = /\b(?:[a-zA-Z0-9-]+\.)+(?:am|com|org|net|cc|top|xyz|info|site|online|me|ru|co|io|ly|buzz|space|work|app|biz)(?:\/[^\s]*)?/gi;
  const bareMatches = normalized.match(bareDomainRegex) || [];

  const combined = Array.from(new Set([...fullMatches, ...bareMatches]));

  const rawUrls = combined.map(u => {
    let clean = u.replace(/[.,!?;:()՝։«»]+$/, '');
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'http://' + clean;
    }
    return clean;
  });

  // Կանխել նույն URL-ի կրկնությունը http/https տարբերակներով
  const deduplicated = [];
  for (const url of rawUrls) {
    const stripped = url.replace(/^https?:\/\//i, '');
    const exists = deduplicated.some(existing => existing.replace(/^https?:\/\//i, '') === stripped);
    if (!exists) {
      deduplicated.push(url);
    }
  }

  return deduplicated;
}

export function parseHostname(urlStr) {
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname.toLowerCase();
  } catch (e) {
    return '';
  }
}

/**
 * Տեղական կանոնների վրա հիմնված վերլուծություն (Deterministic Heuristic Engine)
 */
export function analyzeMessage(text) {
  if (!text || !text.trim()) {
    return null;
  }

  const urls = extractUrls(text);
  const semanticResult = analyzeSemanticIntent(text);

  const reasons = [];
  const adviceList = [...semanticResult.advice];
  let riskScore = 0;

  let allUrlsVerified = true;
  let hasBrandImpersonation = false;
  let hasSuspiciousDomain = false;

  if (urls.length > 0) {
    for (const url of urls) {
      const hostname = parseHostname(url);
      const domainAnalysis = analyzeDomainStructure(hostname);

      if (domainAnalysis) {
        if (!domainAnalysis.isVerified) {
          allUrlsVerified = false;
        }

        if (domainAnalysis.isBrandImpersonation) {
          hasBrandImpersonation = true;
          riskScore = Math.max(riskScore, 100);
          reasons.push(...domainAnalysis.reasons);
          adviceList.push('Ոչ մի դեպքում չմուտքագրել բանկային քարտի տվյալներ կամ հասցե։');
        } else if (domainAnalysis.isShortener || domainAnalysis.isSuspiciousTld) {
          hasSuspiciousDomain = true;
          riskScore = Math.max(riskScore, 65);
          reasons.push(...domainAnalysis.reasons);
        } else if (!domainAnalysis.isVerified) {
          reasons.push(`Անհայտ, չհավաստագրված հղում (${hostname})։ Գտնված չէ Հայաստանի պաշտոնական կայքերի ցանկում։`);
        }
      }
    }
  }


  // Իmasdtayin risk-i hashvarkum: verified URL-neri depqum semantic risk-y sahmanapakum enq
  if (semanticResult.detectedIntents.length > 0) {
    if (allUrlsVerified && urls.length > 0) {
      // Boloor URL-nery havastagrvats en (or. yerevan.am, gov.am)
      // "Vcharel", "partavorutyun" barery normal en petakan/bankayin SMS-nerum
      // Risk-y sahmanapakum enq 10-ov, vorpeszi GREEN mna
      riskScore = Math.max(riskScore, Math.min(semanticResult.totalRisk, 10));
    } else {
      // Chhavastagrvats URL-ner - lriv semantic risk
      riskScore = Math.max(riskScore, semanticResult.totalRisk);
      reasons.push(...semanticResult.reasons);
    }
  }

  if (!allUrlsVerified && semanticResult.detectedIntents.length > 0) {
    riskScore = Math.max(riskScore, 95);
  }

  let status = 'green';
  let badgeText = 'ԱՆՎՏԱՆԳ Է';
  let explanation = '';

  if (riskScore >= 60 || hasBrandImpersonation) {
    status = 'red';
    badgeText = 'ԽԱՐԴԱԽՈՒԹՅՈՒՆ Է (ՎՏԱՆԳԱՎՈՐ Է)';
    explanation = 'Համակարգը հայտնաբերել է կիբեռխարդախության և ֆիշինգի ակնհայտ վտանգավոր նշաններ։ Այս հաղորդագրությունը ստեղծված է ձեր գումարը, բանկային տվյալները կամ սոցիալական էջերը հափշտակելու համար։';
  } else if (!allUrlsVerified || riskScore > 15 || hasSuspiciousDomain) {
    status = 'yellow';
    badgeText = 'ԿԱՍԿԱԾԵԼԻ Է (ՈՒՇԱԴԻ՛Ր ԵՂԵՔ)';
    explanation = 'Հաղորդագրությունը պարունակում է անհայտ հղում կամ կասկածելի տարրեր։ «Զրոյական վստահության» կանոնով՝ չհավաստագրված հղումներին սեղմել խորհուրդ չի տրվում։';
    adviceList.push('Խորհուրդ հարցրեք ձեր երեխաներից կամ հարազատներից՝ «Հարցնել հարազատին» կոճակով։');
  } else {
    status = 'green';
    if (urls.length > 0 && allUrlsVerified) {
      const verifiedBrands = urls
        .map(u => getVerifiedBrandForHost(parseHostname(u)))
        .filter(Boolean);
      const uniqueBrandNames = Array.from(new Set(verifiedBrands.map(b => b.name)));
      const brandNamesStr = uniqueBrandNames.length > 0 
        ? uniqueBrandNames.join(', ') 
        : 'պաշտոնական պետական կամ բանկային համակարգի';

      const uniqueHostnames = Array.from(new Set(urls.map(u => parseHostname(u)).filter(Boolean)));

      badgeText = 'ՊԱՇՏՈՆԱԿԱՆ ԾԱՆՈՒՑՈՒՄ (ԱՆՎՏԱՆԳ Է)';
      explanation = `Հաղորդագրությունը պարունակում է ${brandNamesStr} հավաստագրված պաշտոնական հղումը։ Ֆիշինգի կամ խարդախության նշաններ չեն հայտնաբերվել։`;
      reasons.push(`Հղումը համապատասխանում է պաշտոնական հավաստագրված ցանկին (${uniqueHostnames.join(', ')})։`);
      adviceList.push('Վճարումները կամ գործարքները կատարեք միայն պաշտոնական կայքում։');
      adviceList.push('Միշտ ուշադիր եղեք, որ բրաուզերի հասցեի տողում գրված լինի ճիշտ պաշտոնական դոմենը։');
    } else {
      badgeText = 'ՎՏԱՆԳԱՎՈՐ ՆՇԱՆՆԵՐ ՉԵՆ ԳՏՆՎԵԼ';
      explanation = 'Հաղորդագրության մեջ կասկածելի հղումներ, գաղտնի տվյալների կամ վճարման կեղծ պահանջներ չեն հայտնաբերվել։';
      adviceList.push('Եթե հաղորդագրությունը ստացել եք ծանոթից, այն անվտանգ է։');
    }
  }

  const uniqueReasons = Array.from(new Set(reasons));
  const uniqueAdvice = Array.from(new Set(adviceList));

  const shareText = `Ողջույն։ Ստացել եմ այս հաղորդագրությունը՝
«${text.slice(0, 140)}${text.length > 140 ? '...' : ''}»

«Զգույշ» հավելվածը վերլուծել է և տվել ${status === 'red' ? 'ԿԱՐՄԻՐ (ԽԱՐԴԱԽՈՒԹՅՈՒՆ)' : status === 'yellow' ? 'ԴԵՂԻՆ (ԿԱՍԿԱԾԵԼԻ)' : 'ԿԱՆԱՉ'} զգուշացում։
Խնդրում եմ նայիր՝ արդյո՞ք սա անվտանգ է, նախքան որևէ հղման սեղմելս։`;

  return {
    status,
    badgeText,
    riskScore: Math.min(riskScore, 100),
    explanation,
    reasons: uniqueReasons.length > 0 ? uniqueReasons : ['Հաղորդագրության մեջ կասկածելի բառեր կամ կեղծ հղումներ չկան։'],
    advice: uniqueAdvice.length > 0 ? uniqueAdvice : ['Միշտ ստուգեք ուղարկողի իսկությունը։'],
    shareText,
    urls,
    isAiVerified: false
  };
}

/**
 * Ասինխրոն վերլուծություն՝ NVIDIA Nemotron AI-ի գործարկմամբ
 */
export async function analyzeMessageAsync(text) {
  if (!text || !text.trim()) {
    return null;
  }

  // 1. Եթե միացված է NVIDIA NIM բանալին՝ միշտ ուղարկում ենք Nemotron AI-ին խորքային վերլուծության համար
  if (isAiConfigured()) {
    try {
      const aiResult = await analyzeWithNemotron(text);
      return aiResult;
    } catch (err) {
      console.warn('Nemotron AI failed, falling back to local analyzer:', err);
      const fallbackResult = analyzeMessage(text);
      fallbackResult.aiError = err.message;
      return fallbackResult;
    }
  }

  // 2. Եթե AI բանալի չկա (օֆլայն ռեժիմ)՝ օգտագործում ենք տեղական շարժիչը
  return analyzeMessage(text);
}
