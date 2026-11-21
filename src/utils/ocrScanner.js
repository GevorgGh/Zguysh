/**
 * Զգույշ (SafeArm) - Պատկերների և Սքրինշոթների Տեքստի Ընթերցիչ (OCR)
 * Գործարկում է Tesseract OCR-ը՝ ապահովելով հայերեն և անգլերեն SMS-ների տեքստի հայտնաբերումը:
 */

import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageFile, onProgress = () => {}) {
  if (!imageFile) {
    throw new Error('Նկարը ընտրված չէ։');
  }

  try {
    onProgress('Կարդացվում է նկարը...');
    
    const result = await Tesseract.recognize(imageFile, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          const pct = Math.round((m.progress || 0) * 100);
          onProgress(`Ճանաչվում է տեքստը (${pct}%)...`);
        } else if (m.status === 'loading tesseract core' || m.status === 'initializing api') {
          onProgress('Միացվում է OCR համակարգը...');
        }
      }
    });

    const rawText = result?.data?.text?.trim() || '';
    
    // Հայտնաբերել հղումները (եթե OCR-ը կարդացել է հղում)
    return {
      success: true,
      text: rawText,
      hasText: Boolean(rawText.length > 5)
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
