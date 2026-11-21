import { OFFICIAL_ARMENIAN_BRANDS, isDomainOfficiallyVerified } from './whitelist.js';

const SUSPICIOUS_TLDS = [
  '.cc', '.top', '.xyz', '.info', '.site', '.online', '.work', 
  '.click', '.buzz', '.space', '.pw', '.club', '.fit', '.rest', 
  '.me', '.live', '.monster', '.store', '.pro'
];

const SHORTENERS = ['bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 't.me', 'rb.gy', 'clck.ru'];

/**
 * Դոմենի Կառուցվածքային և Խաբեբայական Վերլուծիչ
 */
export function analyzeDomainStructure(hostname) {
  if (!hostname) return null;
  const host = hostname.toLowerCase();

  const isVerified = isDomainOfficiallyVerified(host);
  if (isVerified) {
    return {
      hostname: host,
      isVerified: true,
      isBrandImpersonation: false,
      isSuspiciousTld: false,
      isShortener: false,
      riskMultiplier: 0,
      reasons: [`Դոմենը (${host}) գտնվում է Հայաստանի պաշտոնական հավաստագրված ցանկում։`]
    };
  }

  // 1. Ստուգել Բրենդի Կեղծում (Brand Impersonation / Typo-Squatting)
  let impersonatedBrand = null;
  for (const brand of OFFICIAL_ARMENIAN_BRANDS) {
    for (const kw of brand.keywords) {
      if (host.includes(kw)) {
        // Հոսթը պարունակում է բրենդի անունը (օրինակ՝ idbank կամ haypost), բայց պաշտոնական դոմենը չէ!
        impersonatedBrand = brand;
        break;
      }
    }
    if (impersonatedBrand) break;
  }

  // 2. Կասկածելի TLD-ներ
  const matchedTld = SUSPICIOUS_TLDS.find(tld => host.endsWith(tld));

  // 3. Կրճատ հղումներ
  const isShortener = SHORTENERS.some(s => host.includes(s));

  // 4. Խաբեբայական գծիկներ և ենթադոմեններ (օրինակ՝ idbank-am-verify.com կամ haypost.track.info)
  const hyphenCount = (host.match(/-/g) || []).length;
  const dotCount = (host.match(/\./g) || []).length;
  const isDeceptiveStructure = hyphenCount >= 2 || dotCount >= 3;

  const reasons = [];
  let riskScore = 0;

  if (impersonatedBrand) {
    riskScore += 95;
    reasons.push(
      `Բրենդի կեղծում (Brand Impersonation). «${host}» դոմենը կեղծում է «${impersonatedBrand.name}»-ը։ Իրական կայքերն են միայն՝ ${impersonatedBrand.domains.join(', ')}։`
    );
  }

  if (isShortener) {
    riskScore += 45;
    reasons.push(`Անանուն կրճատ հղում (${host})։ Թաքցնում է իրական կայքի հասցեն և հաճախ օգտագործվում է ֆիշինգում։`);
  }

  if (matchedTld) {
    riskScore += 50;
    reasons.push(`Կասկածելի միջազգային դոմենային վերջավորություն՝ «${matchedTld}» (${host})։`);
  }

  if (isDeceptiveStructure && !impersonatedBrand) {
    riskScore += 40;
    reasons.push(`Խաբուսիկ դոմենային կառուցվածք՝ բազմաթիվ գծիկներով կամ ենթադոմեններով (${host})։`);
  }

  return {
    hostname: host,
    isVerified: false,
    isBrandImpersonation: !!impersonatedBrand,
    impersonatedBrandName: impersonatedBrand ? impersonatedBrand.name : null,
    isSuspiciousTld: !!matchedTld,
    isShortener,
    riskScore,
    reasons
  };
}
