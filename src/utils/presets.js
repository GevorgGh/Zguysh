/**
 * Իրական հայաստանյան խարդախությունների և պաշտոնական ծանուցումների օրինակներ։
 */

export const DEMO_PRESETS = [
  {
    id: 'job_scam',
    title: 'Կեղծ աշխատանքի առաջարկ',
    subtitle: 'Գրանցման վճարի կորզում',
    expectedStatus: 'red',
    text: 'Շնորհավորում ենք, Ձեր ինքնակենսագրականը հաստատվել է միջազգային ընկերությունում հեռավար աշխատանքի համար (օրական 2 ժամ, աշխատավարձը՝ 400,000 դրամ)։ Աշխատանքային պայմանագիրը կնքելու և համակարգչային ծրագիրն ակտիվացնելու համար անհրաժեշտ է փոխանցել 15,000 դրամ գրանցման վճար հետևյալ հաշվեհամարին՝ 0000-0000-0000-0000։ Գումարը կվերադարձվի առաջին աշխատավարձի հետ։'
  },
  {
    id: 'yerevan_fine_scam',
    title: 'Երևանի քաղաքապետարանի տուգանք',
    subtitle: 'Կեղծ պարտավորության ծանուցում',
    expectedStatus: 'red',
    text: "Harge'li qaghaqaci, Erevani hamaynqi nkatmamb unecac partavorutyunnery karogh eq ditel: https://yerevan-pay.cc/sc/38910"
  },
  {
    id: 'vote_scam',
    title: 'Կեղծ քվեարկության մրցույթ',
    subtitle: 'Telegram/WhatsApp գողություն',
    expectedStatus: 'red',
    text: 'Բարև, խնդրում եմ քվեարկիր զարմուհուս օգտին այս մրցույթում, շատ քիչ է մնացել հաղթանակին՝ vote-contest.org'
  },
  {
    id: 'bank_block_scam',
    title: 'Բանկային քարտի արգելափակում',
    subtitle: 'Կեղծ IDBank ֆիշինգ',
    expectedStatus: 'red',
    text: 'Հարգելի հաճախորդ, Ձեր բանկային քարտը ժամանակավորապես արգելափակվել է անվտանգության նկատառումներից ելնելով։ Ապաարգելափակման համար անցեք հետևյալ հղումով՝ idbank-am-verify.com'
  },
  {
    id: 'haypost_scam',
    title: 'Հայփոստի կեղծ SMS',
    subtitle: 'Ծանրոցի կասեցում և կեղծ վճարում',
    expectedStatus: 'red',
    text: 'HAYPOST: Dzer tsanrotse hasel e pahest, sakayn hascei sxali patcharov araqumy kasecvel e. Xndrum enq 24 zhamva yntacqum tarmacnel hascen ev vcharel 650 dram aystegh: https://haypost-delivery.cc/track/AM84920'
  },
  {
    id: 'idram_scam',
    title: 'Իդրամի կեղծ ծանուցում',
    subtitle: 'Հաշվի արգելափակման սպառնալիք',
    expectedStatus: 'red',
    text: 'Hargeli ogtater, dzer Idram hashivy kargelapakvi anvtangutyan nkatarumnerov. Mutqagreq dzer gaghtnabary ev dzer heraxosin ekats 4-nishanoc SMS kody aystegh: http://idram-support.site/auth'
  },
  {
    id: 'screen_share_scam',
    title: '5G և AnyDesk զանգ',
    subtitle: 'Հեռավար մուտքի պահանջ',
    expectedStatus: 'red',
    text: 'Barev dzez, zangum enq kapi operatoric. Dzer heraxosum 5G kargy kargavorelu hamar xndrum enq Play Market-ic nerbernel AnyDesk havelvatsy ev mez tramadrel 9-nishanoc kody, vorpeszi kargavorenq heravar mutqov:'
  },
  {
    id: 'fake_profit',
    title: 'Կեղծ ներդրում (Գազպրոմ)',
    subtitle: 'Արագ հարստանալու խոստում',
    expectedStatus: 'red',
    text: 'Gazprom Armenia ev Zangezuri kombinaty sksel en petakan nerdrumayin tsragir. Yuraqanchyur qaghaqaci karogh e stanal orakan 50,000 dram. Grancveq anmijapes՝ bit.ly/gazprom-armenia-bonus'
  },
  {
    id: 'genuine_post',
    title: 'Պաշտոնական Հայփոստ',
    subtitle: 'Իրական անվտանգ ծանուցում',
    expectedStatus: 'green',
    text: 'HAYPOST: Dzer tsanrotse (AM930214892) hasel e 0010 postayin bazhanmunq: Karogh eq motenal andzy hastatogh pastatghtov: Teghekutyunneri hamar՝ https://www.haypost.am kam zangahareq (010) 514-514:'
  },
  {
    id: 'genuine_bank',
    title: 'Պաշտոնական Բանկային SMS',
    subtitle: 'Գործարքի պաշտոնական տեղեկացում',
    expectedStatus: 'green',
    text: 'Ameriabank: Dzer qartic katarel eq vcharum 4,200 AMD: Mnacord՝ 85,340 AMD: Harceri depqum zangahareq +374 10 561111 kam ayceleq https://ameriabank.am:'
  }
];
