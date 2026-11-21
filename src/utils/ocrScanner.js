/**
 * Զգույշ (SafeArm) - Պատկերների և Սքրինշոթների Տեքստի Ընթերցիչ (OCR)
 * Գործարկում է Tesseract OCR-ը և հայերեն տառերի ավտոմատ վերականգնումը:
 */

import Tesseract from 'tesseract.js';

/**
 * Լատինատառ/ANSI աղավաղված հայերեն տառերի վերականգնում
 * (Tesseract-ի կողմից անգլերեն տառատեսակներով ընթերցված հայերեն տեքստերի մաքրում)
 */
export function cleanAndNormalizeArmenianOcr(text) {
  if (!text) return '';

  const dictionary = [
    [/S[w\s]ngb[ij]+h/gi, 'Հարգելի'],
    [/S[w\s]ngt[ij]+h[”"]*/gi, 'Հարգելի'],
    [/Sw[ij]ngb[ij]+h/gi, 'Հարգելի'],
    [/pwnwpwgh/gi, 'քաղաքացի'],
    [/Gpluwu/gi, 'Երևան'],
    [/Eplewy/gi, 'Երևան'],
    [/Epliw/gi, 'Երևան'],
    [/Awdwjuph/gi, 'համայնքի'],
    [/y[w\s]ndwdp/gi, 'նկատմամբ'],
    [/uy[w\s]ndwdp/gi, 'նկատմամբ'],
    [/wugwnd/gi, 'անշարժ'],
    [/gn[ij]jph/gi, 'գույքի'],
    [/Awnyh/gi, 'հարկի'],
    [/wwnuwdnpnieinLuutpp/gi, 'պարտավորությունները'],
    [/wuwpuwynpnieiniuubpp/gi, 'պարտավորությունները'],
    [/wwpuwynpnieinLuubpu/gi, 'պարտավորությունները'],
    [/Ywpnn\s*bp/gi, 'կարող եք'],
    [/Ywipnn\s*tp/gi, 'կարող եք'],
    [/ybuwipbi/gi, 'վճարել'],
    [/ytwipb/gi, 'վճարել'],
    [/Ybwpnudp/gi, 'Վճարումը'],
    [/Yunwintb/gi, 'կատարել'],
    [/Yuwnwnptbp/gi, 'կատարել'],
    [/Andwup/gi, 'հղմամբ'],
    [/Anup/gi, 'հղումը'],
    [/TunpAwlwinLeinLu/gi, 'Շնորհակալություն'],
    [/SunphwlwinLejnLu/gi, 'Շնորհակալություն'],
    [/TunpAwlwinLpinLu/gi, 'Շնորհակալություն'],
    [/Uhusle/gi, 'մինչև'],
    [/ubpwnjw[|*]*/gi, 'ներառյալ'],
    [/ninydtnhg/gi, 'տույժերից'],
    [/winijdtinh/gi, 'տույժերի'],
    [/funtuwthGint/gi, 'խուսափելու'],
    [/funLuwthbint/gi, 'խուսափելու'],
    [/Awdwin/gi, 'համար'],
    [/pjnLotih/gi, 'բյուջեի'],
    [/wnjw/gi, 'առկա'],
    [/sywinwpyws/gi, 'չկատարված'],
    [/wufpwdtiaun\s*k\s*Jwnbpuhusle/gi, 'անհրաժեշտ է մարել մինչև'],
    [/Awdwnynwudhg/gi, 'հաշվարկումից'],
    [/Uwwinwyny/gi, 'նպատակով'],
    [/wnguiug/gi, 'առցանց']
  ];

  let cleaned = text;
  for (const [regex, replacement] of dictionary) {
    cleaned = cleaned.replace(regex, replacement);
  }

  // Կտրված հղումների վերականգնում (օր.՝ https:/\nwww.yerevan.am -> https://www.yerevan.am)
  cleaned = cleaned.replace(/https?:\s*\/\s*\n\s*/gi, 'https://');
  cleaned = cleaned.replace(/https?:\s*\/\s*(www\.[a-z0-9.-]+)/gi, 'https://$1');

  return cleaned.trim();
}

export async function extractTextFromImage(imageFile, onProgress = () => {}) {
  if (!imageFile) {
    throw new Error('Նկարը ընտրված չէ։');
  }

  try {
    onProgress('Կարդացվում է նկարը...');
    
    // Փորձել hye+eng (հայերեն + անգլերեն)
    let rawText = '';
    try {
      const result = await Tesseract.recognize(imageFile, 'hye+eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round((m.progress || 0) * 100);
            onProgress(`Ճանաչվում է տեքստը (${pct}%)...`);
          } else if (m.status === 'loading language traineddata') {
            onProgress('Բեռնվում են հայերեն տառատեսակները...');
          }
        }
      });
      rawText = result?.data?.text?.trim() || '';
    } catch (hyeErr) {
      console.warn('hye+eng OCR failed, falling back to eng:', hyeErr);
      const fallbackResult = await Tesseract.recognize(imageFile, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round((m.progress || 0) * 100);
            onProgress(`Ճանաչվում է տեքստը (${pct}%)...`);
          }
        }
      });
      rawText = fallbackResult?.data?.text?.trim() || '';
    }

    // Մաքրել և վերականգնել հայերեն տեքստը
    const normalizedText = cleanAndNormalizeArmenianOcr(rawText);

    return {
      success: true,
      text: normalizedText || rawText,
      rawText,
      hasText: Boolean((normalizedText || rawText).length > 5)
    };
  } catch (err) {
    console.warn('Tesseract OCR failed:', err);
    return {
      success: false,
      text: '',
      error: err.message || 'Չհաջողվեց կարդալ նկարի տեքստը'
    };
  }
}
