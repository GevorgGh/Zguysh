/**
 * Զգույշ (SafeArm) - AI Իմաստային Վերլուծության Շարժիչ (Semantic Intent Engine)
 * Վերլուծում է հաղորդագրության ենթատեքստն ու նպատակը՝ անկախ լեզվից և տառասխալներից։
 */

export const INTENT_VECTORS = {
  CREDENTIAL_THEFT: {
    name: 'Գաղտնի տվյալների կորզում (Credential Theft)',
    weight: 95,
    patterns: [
      /sms\s*կոդ/i, /sms\s*kod/i, /միանգամյա/i, /miangamya/i, /4-նիշ/i, /4-nishan/i, 
      /6-նիշ/i, /6-nishan/i, /cvv/i, /cvc/i, /pin\s*կոդ/i, /qarti\s*pin/i, /քարտի\s*pin/i,
      /գաղտնաբառ/i, /gaghtnabar/i, /пароль/i, /код\s*из\s*смс/i, /otp/i, /verification\s*code/i,
      /քարտի\s*ժամկետ/i, /qarti\s*zhamket/i, /վավերականության/i, /գաղտնի\s*կոդ/i
    ],
    advice: 'Երբեք ոչ մեկի մի՛ ասեք և որևէ կայքում մի՛ լրացրեք հեռախոսին եկած SMS կոդը կամ քարտի CVV-ն։'
  },

  REMOTE_TAKEOVER: {
    name: 'Հեռավար հասանելիության / Էկրանի կիսման խարդախություն (Remote Takeover)',
    weight: 95,
    patterns: [
      /anydesk/i, /teamviewer/i, /rustdesk/i, /5g/i, /էկրանի\s*կիսում/i, /կիսվել\s*էկրանով/i,
      /ekrani\s*kisum/i, /kisvel\s*ekranov/i, /հեռավար\s*մուտք/i, /heravar\s*mutq/i,
      /трансляция\s*экрана/i, /демонстрация\s*экрана/i, /screen\s*share/i, /nerbernel\s*anydesk/i
    ],
    advice: 'Ոչ մի օպերատոր չի պահանջում AnyDesk ներբեռնել կամ էկրանով կիսվել 5G կարգավորելու համար։ Անմիջապես անջատեք զանգը։'
  },

  ADVANCE_FEE_JOB_SCAM: {
    name: 'Կեղծ աշխատանքի առաջարկ և կանխավճարի կորզում (Job Offer / Advance-Fee Scam)',
    weight: 95,
    patterns: [
      /ինքնակենսագրական/i, /inqnakensagrakan/i, /\bcv\b/i, /հեռավար\s*աշխատանք/i, /heravar\s*ashxatanq/i,
      /օրական\s*\d+\s*ժամ/i, /orakan\s*\d+\s*zham/i, /գրանցման\s*վճար/i, /grancman\s*vchar/i,
      /ծրագիրն\s*ակտիվացնել/i, /tsragirn\s*aktivacnel/i, /ծրագրի\s*ակտիվաց/i, /կվերադարձվի\s*առաջին/i,
      /kveradardzvi/i, /փոխանցել\s*[\d,\.]+\s*դրամ/i, /poxancel/i, /հաշվեհամարին/i, /hashvehamarin/i,
      /աշխատանքային\s*պայմանագիր/i, /ashxatanqayin\s*paymanagir/i, /աշխատավարձը\s*[\d,\.]+/i,
      /вакансия/i, /удаленная\s*работа/i, /взнос\s*за\s*регистрацию/i, /job\s*offer/i, /registration\s*fee/i
    ],
    advice: 'Ոչ մի օրինական գործատու աշխատանքի ընդունելու, պայմանագիր կնքելու կամ «ծրագիր ակտիվացնելու» համար գումար չի պահանջում։ Ոչ մի դրամ մի՛ փոխանցեք։'
  },

  FINANCIAL_BAIT: {
    name: 'Կեղծ եկամտի / Ներդրումային թակարդ (Financial Bait)',
    weight: 85,
    patterns: [
      /գազպրոմ/i, /gazprom/i, /զանգեզուր/i, /zangezur/i, /կոմբինատ/i, /kombinat/i,
      /ներդրում/i, /nerdrum/i, /օրական\s*50/i, /orakan\s*50/i, /շահել\s*եք/i, /shahel\s*eq/i,
      /պետական\s*ներդրում/i, /petakan\s*nerdrum/i, /պարգևավճար/i, /pargevavchar/i,
      /выигрыш/i, /инвестиц/i, /daily\s*income/i, /օրական\s*եկամուտ/i
    ],
    advice: 'Մի՛ հավատացեք արագ հարստանալու և օրական տասնյակ հազարավոր դրամների խոստումներին։'
  },

  ACCOUNT_TAKEOVER_VOTE: {
    name: 'Telegram/WhatsApp հաշիվների գողություն (Account Hijacking / Fake Contest)',
    weight: 90,
    patterns: [
      /քվեարկ/i, /qveark/i, /զարմուհ/i, /zarmuh/i, /զարմիկ/i, /zarmik/i, /երեխայ/i, /erexay/i,
      /աղջկաս/i, /axjkas/i, /մրցույթ/i, /mrcuyt/i, /ձայն\s*տուր/i, /dzayn\s*tur/i, /ձայներ/i,
      /հաղթանակ/i, /haghtanak/i, /շատ\s*քիչ\s*է\s*մնացել/i, /shat\s*qich\s*e\s*mnacel/i,
      /проголосуй/i, /конкурс/i, /детский\s*конкурс/i, /vote/i, /contest/i, /poll/i
    ],
    advice: 'Ոչ մի դեպքում մի՛ քվեարկեք անծանոթ հղումներով և մի՛ մուտքագրեք ձեր Telegram/WhatsApp SMS կոդը։'
  },

  URGENT_DELIVERY_SCAM: {
    name: 'Կեղծ ծանրոց / Առաքման վճարման թակարդ (Fake Delivery)',
    weight: 75,
    patterns: [
      /ծանրոց/i, /tsanroc/i, /առաքում/i, /araqum/i, /չի\s*հաջողվել/i, /chi\s*hajoghvel/i,
      /հասցեի\s*սխալ/i, /hascei\s*sxal/i, /թարմացրեք/i, /tarmacreq/i,
      /առաքման\s*վճար/i, /պահեստ/i, /pahest/i, /посылка/i, /доставка/i
    ],
    advice: 'Եթե իրոք ծանրոցի եք սպասում, այցելեք միայն պաշտոնական haypost.am կամ մոտեցեք փոստային բաժանմունք։'
  },

  MUNICIPALITY_FINE_SCAM: {
    name: 'Երևանի քաղաքապետարանի / տուգանքների կեղծ ծանուցում (Municipality Fine Scam)',
    weight: 95,
    patterns: [
      /(?:erevani|yerevani|երևանի)\s+(?:hamaynqi?|qaghaqapetaran|քաղաքապետարան)/i,
      /(?:partavorutyun|պարտավորություն|tuganq|տուգանք).*(?:vcharel|vcharman|վճարել|վճարման)/i,
      /(?:harge'?li\s+qaghaqaci|հարգելի\s+քաղաքացի).*(?:partavorutyun|tuganq|տուգանք|վճար)/i
    ],
    advice: 'Երևանի քաղաքապետարանը SMS-ներում չհավաստագրված հղումներով վճարումներ չի պահանջում։ Տուգանքները կամ պարտավորությունները ստուգեք միայն yerevan.am կամ roadpolice.am պաշտոնական կայքերում։'
  },

  DECEPTIVE_URGENCY: {
    name: 'Հոգեբանական ճնշում և շտապողականություն (Social Engineering Urgency)',
    weight: 35,
    patterns: [
      /արգելափակվել\s*է/i, /kargelapakvi/i, /argelapakvel/i, /կասեցվել\s*է/i, /kasecvel\\s*\u0567/i,
      /դատական/i, /datakan/i, /ոստիկան/i, /vostikan/i, /տուգանք/i, /tugank/i, /անմիջապես/i,
      /anmijapes/i, /24\s*ժամ/i, /24\s*zham/i, /12\s*ժամ/i, /շտապ/i, /срочно/i, /заблокирован/i
    ],
    advice: 'Մի՛ շտապեք և խուճապի մի՛ մատնվեք։ Խարդախները հատուկ են ստեղծում շտապողականություն։'
  }
};

/**
 * Իմաստային Վերլուծիչ
 */
export function analyzeSemanticIntent(text) {
  if (!text) return { detectedIntents: [], totalRisk: 0, reasons: [], advice: [] };

  const detectedIntents = [];
  const reasons = [];
  const advice = [];
  let totalRisk = 0;

  for (const [key, vector] of Object.entries(INTENT_VECTORS)) {
    const matched = vector.patterns.some(p => p.test(text));
    if (matched) {
      detectedIntents.push(key);
      totalRisk += vector.weight;
      reasons.push(`${vector.name}`);
      advice.push(vector.advice);
    }
  }

  return {
    detectedIntents,
    totalRisk: Math.min(totalRisk, 100),
    reasons,
    advice
  };
}
