/**
 * Զգույշ (SafeArm) - Պաշտոնական Հավաստագրված Դոմենների Բազա
 * «Զրոյական Վստահության» (Zero-Trust) հիմքը
 */

export const OFFICIAL_ARMENIAN_BRANDS = [
  { name: 'Հայփոստ (HayPost)', keywords: ['haypost', 'hay-post', 'am-post'], domains: ['haypost.am', 'post.am'] },
  { name: 'Իդրամ (Idram)', keywords: ['idram', 'idram-bank'], domains: ['idram.am', 'banking.idram.am'] },
  { name: 'Այդի Բանկ (IDBank)', keywords: ['idbank', 'id-bank'], domains: ['idbank.am'] },
  { name: 'Թելսել (Telcell)', keywords: ['telcell', 'tel-cell', 'telcellwallet'], domains: ['telcell.am', 'telcellwallet.am'] },
  { name: 'Ամերիաբանկ (Ameriabank)', keywords: ['ameria', 'ameriabank'], domains: ['ameriabank.am'] },
  { name: 'Ակբա Բանկ (Acba Bank)', keywords: ['acba', 'akba'], domains: ['acba.am'] },
  { name: 'Ինեկոբանկ (Inecobank)', keywords: ['ineco', 'inecobank'], domains: ['inecobank.am'] },
  { name: 'Արդշինբանկ (Ardshinbank)', keywords: ['ardshin', 'ardshinbank'], domains: ['ardshinbank.am'] },
  { name: 'ՎՏԲ Բանկ (VTB Armenia)', keywords: ['vtb', 'vtb-armenia'], domains: ['vtb.am'] },
  { name: 'Կոնվերս Բանկ (Converse Bank)', keywords: ['converse', 'conversebank'], domains: ['conversebank.am'] },
  { name: 'Էվոկաբանկ (Evocabank)', keywords: ['evoca', 'evocabank'], domains: ['evocabank.am'] },
  { name: 'Արմսվիսբանկ (ArmSwissBank)', keywords: ['armswiss', 'armswissbank'], domains: ['armswissbank.am'] },
  { name: 'Ֆասթ Բանկ (Fast Bank)', keywords: ['fastbank', 'fast-bank'], domains: ['fastbank.am'] },
  { name: 'Արմէկոնոմբանկ (Armeconombank)', keywords: ['aeb', 'armeconombank'], domains: ['aeb.am', 'armeconombank.am'] },
  { name: 'ԱրՔա (ArCa)', keywords: ['arca', 'ar-ca'], domains: ['arca.am'] },
  { name: 'ՀՀ Կառավարություն և Ոստիկանություն', keywords: ['police', 'gov', 'e-gov', 'taxservice'], domains: ['gov.am', 'e-gov.am', 'police.am', 'taxservice.am', 'e-payments.am'] },
  { name: 'Վիվա (Viva / MTS)', keywords: ['viva', 'mts'], domains: ['viva.am', 'vivacell.am'] },
  { name: 'Յուքոմ (Ucom)', keywords: ['ucom'], domains: ['ucom.am'] },
  { name: 'Թիմ Տելեկոմ (Team Telecom Armenia)', keywords: ['telecom', 'teamtelecom'], domains: ['telecom.am'] },
  { name: 'Գազպրոմ Արմենիա (Gazprom Armenia)', keywords: ['gazprom', 'gazpromarmenia'], domains: ['gazpromarmenia.am'] },
  { name: 'Զանգեզուրի Կոմբինատ (ZCMC)', keywords: ['zcmc', 'zangezur'], domains: ['zcmc.am'] },
  { name: 'Համաշխարհային Պաշտոնական Պլատֆորմներ', keywords: [], domains: ['google.com', 'apple.com', 'youtube.com', 'facebook.com', 'instagram.com', 'telegram.org', 'whatsapp.com'] }
];

// Հավաստագրված դոմենների ամբողջական ցանկ
export const VERIFIED_WHITELIST_DOMAINS = OFFICIAL_ARMENIAN_BRANDS.flatMap(b => b.domains);

/**
 * Ստուգում է, արդյո՞ք դոմենը գտնվում է 100% վստահելի պաշտոնական ցանկում
 */
export function isDomainOfficiallyVerified(hostname) {
  if (!hostname) return false;
  const cleanHost = hostname.toLowerCase();
  return VERIFIED_WHITELIST_DOMAINS.some(whitelisted => 
    cleanHost === whitelisted || cleanHost.endsWith('.' + whitelisted)
  );
}
