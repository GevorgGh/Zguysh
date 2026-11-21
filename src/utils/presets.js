/**
 * Իրական հայաստանյան խարդախությունների օրինակներ փորձարկման համար։
 */

export const DEMO_PRESETS = [
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
  }
];
