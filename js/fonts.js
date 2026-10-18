/**
 * Khmer Fonts Database & Direct PC System Fonts Manager (Supercharged & Ultra-Fast)
 * 
 * Features:
 * 1. Native Windows Khmer System Fonts (Khmer OS Muol Light, Battambang, etc.) with auto-detection
 * 2. Instant Local Font Access API (window.queryLocalFonts) with localStorage caching
 * 3. High-speed custom font file upload (.ttf, .otf, .woff, .woff2) with IndexedDB persistence
 * 4. Asynchronous Google Khmer Fonts loader (display=swap, non-blocking)
 */

// 1. Google Fonts List
const KHMER_FONTS = [
  { id: 'Moul', name: 'អក្សរមូល (Khmer Moul)', family: "'Moul', cursive", category: 'title', googleFont: 'Moul' },
  { id: 'Moulpali', name: 'មូលបាលី (Khmer Moulpali)', family: "'Moulpali', cursive", category: 'title', googleFont: 'Moulpali' },
  { id: 'Koulen', name: 'គូលេន (Khmer Koulen)', family: "'Koulen', cursive", category: 'title', googleFont: 'Koulen' },
  { id: 'Angkor', name: 'អង្គរ (Khmer Angkor)', family: "'Angkor', cursive", category: 'title', googleFont: 'Angkor' },
  { id: 'Bayon', name: 'បាយ័ន (Khmer Bayon)', family: "'Bayon', cursive", category: 'decorative', googleFont: 'Bayon' },
  { id: 'Preahvihear', name: 'ព្រះវិហារ (Khmer Preahvihear)', family: "'Preahvihear', cursive", category: 'title', googleFont: 'Preahvihear' },
  { id: 'Battambang', name: 'បាត់ដំបង (Khmer Battambang)', family: "'Battambang', sans-serif", category: 'body', googleFont: 'Battambang:wght@400;700;900' },
  { id: 'Siemreap', name: 'សៀមរាប (Khmer Siemreap)', family: "'Siemreap', sans-serif", category: 'body', googleFont: 'Siemreap' },
  { id: 'Kantumruy Pro', name: 'កណ្ដុំរុយ ប្រូ (Kantumruy Pro)', family: "'Kantumruy Pro', sans-serif", category: 'modern', googleFont: 'Kantumruy+Pro:wght@400;600;700' },
  { id: 'Kdam Thmor Pro', name: 'ក្ដាមថ្ម ប្រូ (Kdam Thmor Pro)', family: "'Kdam Thmor Pro', sans-serif", category: 'modern', googleFont: 'Kdam+Thmor+Pro' },
  { id: 'Dangrek', name: 'ដងរែក (Khmer Dangrek)', family: "'Dangrek', cursive", category: 'decorative', googleFont: 'Dangrek' },
  { id: 'Bokor', name: 'បូកគោ (Khmer Bokor)', family: "'Bokor', cursive", category: 'decorative', googleFont: 'Bokor' },
  { id: 'Chenla', name: 'ចេនឡា (Khmer Chenla)', family: "'Chenla', cursive", category: 'title', googleFont: 'Chenla' },
  { id: 'Fasthand', name: 'ដៃលឿន (Khmer Fasthand)', family: "'Fasthand', cursive", category: 'handwriting', googleFont: 'Fasthand' },
  { id: 'Freehand', name: 'ដៃសេរី (Khmer Freehand)', family: "'Freehand', cursive", category: 'handwriting', googleFont: 'Freehand' },
  { id: 'Hanuman', name: 'ហនុមាន (Khmer Hanuman)', family: "'Hanuman', serif", category: 'serif', googleFont: 'Hanuman:wght@400;700;900' },
  { id: 'Nokora', name: 'នគរ (Khmer Nokora)', family: "'Nokora', serif", category: 'serif', googleFont: 'Nokora:wght@400;700' },
  { id: 'Odor Mean Chey', name: 'ឧត្តរមានជ័យ (Odor Mean Chey)', family: "'Odor Mean Chey', cursive", category: 'decorative', googleFont: 'Odor+Mean+Chey' },
  { id: 'Taprom', name: 'តាព្រហ្ម (Khmer Taprom)', family: "'Taprom', cursive", category: 'decorative', googleFont: 'Taprom' },
  { id: 'Suwannaphum', name: 'សុវណ្ណភូមិ (Suwannaphum)', family: "'Suwannaphum', serif", category: 'serif', googleFont: 'Suwannaphum:wght@400;700' }
];

// 2. Pre-configured Windows/PC Khmer System Fonts
const WINDOWS_KHMER_SYSTEM_FONTS = [
  { id: 'Khmer OS Muol Light', baseName: 'Khmer OS Muol Light', name: '💻 Khmer OS Muol Light (អក្សរមូលស្រាល)', family: "'Khmer OS Muol Light', 'Moul', cursive", isSystem: true, category: 'title' },
  { id: 'Khmer OS Muol', baseName: 'Khmer OS Muol', name: '💻 Khmer OS Muol (អក្សរមូលដិត)', family: "'Khmer OS Muol', 'Moul', cursive", isSystem: true, category: 'title' },
  { id: 'Khmer OS Muol Pali', baseName: 'Khmer OS Muol Pali', name: '💻 Khmer OS Muol Pali (មូលបាលី)', family: "'Khmer OS Muol Pali', 'Moulpali', cursive", isSystem: true, category: 'title' },
  { id: 'Khmer OS Battambang', baseName: 'Khmer OS Battambang', name: '💻 Khmer OS Battambang (បាត់ដំបង)', family: "'Khmer OS Battambang', 'Battambang', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS Bokor', baseName: 'Khmer OS Bokor', name: '💻 Khmer OS Bokor (បូកគោ)', family: "'Khmer OS Bokor', 'Bokor', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer OS Content', baseName: 'Khmer OS Content', name: '💻 Khmer OS Content (អត្ថបទ)', family: "'Khmer OS Content', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS Fasthand', baseName: 'Khmer OS Fasthand', name: '💻 Khmer OS Fasthand (ដៃលឿន)', family: "'Khmer OS Fasthand', cursive", isSystem: true, category: 'handwriting' },
  { id: 'Khmer OS Freehand', baseName: 'Khmer OS Freehand', name: '💻 Khmer OS Freehand (ដៃសេរី)', family: "'Khmer OS Freehand', cursive", isSystem: true, category: 'handwriting' },
  { id: 'Khmer OS Metal Chrieng', baseName: 'Khmer OS Metal Chrieng', name: '💻 Khmer OS Metal Chrieng (ឆ្លាក់ជ្រៀង)', family: "'Khmer OS Metal Chrieng', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer OS Siemreap', baseName: 'Khmer OS Siemreap', name: '💻 Khmer OS Siemreap (សៀមរាប)', family: "'Khmer OS Siemreap', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS System', baseName: 'Khmer OS System', name: '💻 Khmer OS System (ប្រព័ន្ធ)', family: "'Khmer OS System', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS', baseName: 'Khmer OS', name: '💻 Khmer OS', family: "'Khmer OS', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer UI', baseName: 'Khmer UI', name: '💻 Khmer UI (Windows UI)', family: "'Khmer UI', 'Leelawadee UI', sans-serif", isSystem: true, category: 'modern' },
  { id: 'Khmer UI Bold', baseName: 'Khmer UI Bold', name: '💻 Khmer UI Bold (Windows ដិត)', family: "'Khmer UI Bold', 'Khmer UI', sans-serif", isSystem: true, category: 'modern' },
  { id: 'DaunPenh', baseName: 'DaunPenh', name: '💻 DaunPenh (ដូនពេញ)', family: "'DaunPenh', cursive", isSystem: true, category: 'title' },
  { id: 'Leelawadee UI', baseName: 'Leelawadee UI', name: '💻 Leelawadee UI', family: "'Leelawadee UI', sans-serif", isSystem: true, category: 'modern' },
  { id: 'Leelawadee UI Semibold', baseName: 'Leelawadee UI Semibold', name: '💻 Leelawadee UI Semibold', family: "'Leelawadee UI Semibold', 'Leelawadee UI', sans-serif", isSystem: true, category: 'modern' },
  { id: 'Tacteing', baseName: 'Tacteing', name: '💻 Tacteing (ក្បាច់)', family: "'Tacteing', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer Busra', baseName: 'Khmer Busra', name: '💻 Khmer Busra (ប៊ូស្រា)', family: "'Khmer Busra', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer Kep', baseName: 'Khmer Kep', name: '💻 Khmer Kep (កែប)', family: "'Khmer Kep', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer Mondulkiri', baseName: 'Khmer Mondulkiri', name: '💻 Khmer Mondulkiri (មណ្ឌលគិរី)', family: "'Khmer Mondulkiri', cursive", isSystem: true, category: 'decorative' }
];

// 3. Custom Loaded and Scanned Fonts Arrays
const CUSTOM_LOCAL_FONTS = [];
const SCANNED_SYSTEM_FONTS = [];

// ==========================================
// IndexedDB Font Store (Persistent User Fonts)
// ==========================================
const FontStorageDB = {
  dbName: 'KhmerBookCoverFontsDB',
  storeName: 'fonts',
  version: 1,

  async getDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async saveFont(fontRecord) {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        store.put(fontRecord);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      console.warn('FontStorageDB save error:', e);
    }
  },

  async getAllFonts() {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('FontStorageDB get error:', e);
      return [];
    }
  },

  async deleteFont(id) {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      console.warn('FontStorageDB delete error:', e);
    }
  }
};

// ==========================================
// Detect Windows/PC Installed Fonts Instantly
// ==========================================
function isFontInstalledOnPC(fontName) {
  try {
    const testString = 'កខគឃង ព្រះរាជាណាចក្រកម្ពុជា Wwmi0';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    for (const baseFont of baseFonts) {
      ctx.font = `72px ${baseFont}`;
      const baseWidth = ctx.measureText(testString).width;

      ctx.font = `72px "${fontName}", ${baseFont}`;
      const testWidth = ctx.measureText(testString).width;

      if (Math.abs(baseWidth - testWidth) > 0.5) {
        return true;
      }
    }
  } catch (e) {
    // Canvas measure fallback
  }
  return false;
}

function detectInstalledKhmerFonts() {
  WINDOWS_KHMER_SYSTEM_FONTS.forEach(font => {
    const installed = isFontInstalledOnPC(font.baseName);
    font.isInstalled = installed;
    if (installed) {
      font.name = `✅ 💻 ${font.baseName} (មានក្នុង PC)`;
    } else {
      font.name = `💻 ${font.baseName}`;
    }
  });

  // Sort installed fonts to the top
  WINDOWS_KHMER_SYSTEM_FONTS.sort((a, b) => {
    if (a.isInstalled && !b.isInstalled) return -1;
    if (!a.isInstalled && b.isInstalled) return 1;
    return 0;
  });
}

// ==========================================
// Google Fonts Loader (Asynchronous, Fast, display=swap)
// ==========================================
function loadAllKhmerFonts() {
  if (typeof document === 'undefined') return;
  const linkId = 'khmer-google-fonts-loader';
  if (!document.getElementById(linkId)) {
    // Preconnect to Google Fonts for lightning-fast handshake
    if (!document.getElementById('preconnect-gfonts-1')) {
      const pre1 = document.createElement('link');
      pre1.id = 'preconnect-gfonts-1';
      pre1.rel = 'preconnect';
      pre1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(pre1);
    }
    if (!document.getElementById('preconnect-gfonts-2')) {
      const pre2 = document.createElement('link');
      pre2.id = 'preconnect-gfonts-2';
      pre2.rel = 'preconnect';
      pre2.href = 'https://fonts.gstatic.com';
      pre2.crossOrigin = 'anonymous';
      document.head.appendChild(pre2);
    }

    const fontFamilies = KHMER_FONTS.map(f => `family=${f.googleFont}`).join('&');
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&family=Outfit:wght@400;500;600;700;800&display=swap`;
    document.head.appendChild(link);
  }
}

// ==========================================
// Scan Local System Fonts (window.queryLocalFonts)
// ==========================================
async function scanLocalSystemFonts() {
  if (!('queryLocalFonts' in window)) {
    throw new Error('Browser របស់អ្នកមិនទាន់បើក Local Font Access API ទេ។ សូមជ្រើសរើស Font Windows ដែលមានស្រាប់ ឬចុច "បញ្ចូលឯកសារ Font (.ttf)" ពីកុំព្យូទ័រ!');
  }

  const fonts = await window.queryLocalFonts();
  const uniqueFamilies = new Map();

  for (const font of fonts) {
    if (!uniqueFamilies.has(font.family)) {
      uniqueFamilies.set(font.family, font);
    }
  }

  const khmerPattern = /khmer|moul|koulen|angkor|bayon|siemreap|battambang|bokor|daunpenh|leelawadee|tacteing|kbach|chenla|hanuman|nokora/i;
  const khmerGroup = [];
  const otherGroup = [];

  uniqueFamilies.forEach((f, familyName) => {
    const isKhmer = khmerPattern.test(familyName);
    const item = {
      id: familyName,
      name: isKhmer ? `✨ 🖥️ ${familyName} (Khmer)` : `🖥️ ${familyName}`,
      family: `'${familyName}', 'Khmer OS Muol Light', sans-serif`,
      isSystemScanned: true,
      isKhmerDetected: isKhmer
    };
    if (isKhmer) {
      khmerGroup.push(item);
    } else {
      otherGroup.push(item);
    }
  });

  SCANNED_SYSTEM_FONTS.length = 0;
  // Put Khmer fonts first, then others
  SCANNED_SYSTEM_FONTS.push(...khmerGroup, ...otherGroup);

  // Cache names in localStorage for instantaneous restore
  try {
    const cacheData = SCANNED_SYSTEM_FONTS.map(f => ({ id: f.id, name: f.name, isKhmer: f.isKhmerDetected }));
    localStorage.setItem('khmer_scanned_pc_fonts', JSON.stringify(cacheData));
  } catch (e) {
    // Ignore cache error
  }

  return SCANNED_SYSTEM_FONTS;
}

// Restore cached scanned PC fonts on startup
function restoreCachedScannedFonts() {
  try {
    const cached = localStorage.getItem('khmer_scanned_pc_fonts');
    if (cached) {
      const list = JSON.parse(cached);
      if (Array.isArray(list) && list.length > 0) {
        SCANNED_SYSTEM_FONTS.length = 0;
        list.forEach(item => {
          SCANNED_SYSTEM_FONTS.push({
            id: item.id,
            name: item.name || `🖥️ ${item.id}`,
            family: `'${item.id}', 'Khmer OS Muol Light', sans-serif`,
            isSystemScanned: true,
            isKhmerDetected: !!item.isKhmer
          });
        });
      }
    }
  } catch (e) {
    console.warn('Failed to restore cached scanned fonts', e);
  }
}

// ==========================================
// High-Speed Font File Loader (.ttf, .otf, .woff, .woff2)
// Uses native ArrayBuffer and IndexedDB (No slow Base64 stringification!)
// ==========================================
async function registerCustomFontFile(fontFile) {
  if (!fontFile) throw new Error('គ្មានឯកសារ Font ត្រូវបានជ្រើសរើសទេ');

  const rawName = fontFile.name.replace(/\.[^/.]+$/, '').trim();
  const cleanId = 'LocalFont_' + rawName.replace(/[^a-zA-Z0-9_\u1780-\u17FF]/g, '_') + '_' + Date.now();
  const displayName = `📁 ${rawName}`;

  try {
    const arrayBuffer = await fontFile.arrayBuffer();
    const fontFace = new FontFace(cleanId, arrayBuffer);
    await fontFace.load();
    document.fonts.add(fontFace);

    // Create persistent object URL for SVG / Canvas export
    const blob = new Blob([arrayBuffer], { type: fontFile.type || 'font/truetype' });
    const fontBlobUrl = URL.createObjectURL(blob);

    const fontEntry = {
      id: cleanId,
      name: displayName,
      rawName: rawName,
      family: `'${cleanId}', 'Khmer OS Muol Light', 'Moul', cursive`,
      category: 'local',
      isLocal: true,
      blobUrl: fontBlobUrl,
      arrayBuffer: arrayBuffer
    };

    CUSTOM_LOCAL_FONTS.push(fontEntry);

    // Save to IndexedDB so it stays permanently
    await FontStorageDB.saveFont({
      id: cleanId,
      name: displayName,
      rawName: rawName,
      arrayBuffer: arrayBuffer,
      createdAt: Date.now()
    });

    return fontEntry;
  } catch (err) {
    console.error('Error loading custom font file:', err);
    throw new Error('បរាជ័យក្នុងការតម្លើង Font: ' + err.message);
  }
}

// Support batch font files upload
async function registerCustomFontFiles(fileList) {
  const loaded = [];
  for (const file of fileList) {
    if (/\.(ttf|otf|woff|woff2)$/i.test(file.name)) {
      try {
        const item = await registerCustomFontFile(file);
        loaded.push(item);
      } catch (err) {
        console.warn(`Failed to load ${file.name}:`, err);
      }
    }
  }
  return loaded;
}

// Delete custom uploaded font
async function deleteCustomLocalFont(fontId) {
  const idx = CUSTOM_LOCAL_FONTS.findIndex(f => f.id === fontId);
  if (idx >= 0) {
    CUSTOM_LOCAL_FONTS.splice(idx, 1);
  }
  await FontStorageDB.deleteFont(fontId);
}

// Restore saved fonts from IndexedDB on startup
async function initSavedLocalFonts() {
  try {
    const savedFonts = await FontStorageDB.getAllFonts();
    for (const item of savedFonts) {
      if (item.arrayBuffer) {
        try {
          const fontFace = new FontFace(item.id, item.arrayBuffer);
          await fontFace.load();
          document.fonts.add(fontFace);

          const blob = new Blob([item.arrayBuffer], { type: 'font/truetype' });
          const blobUrl = URL.createObjectURL(blob);

          CUSTOM_LOCAL_FONTS.push({
            id: item.id,
            name: item.name,
            rawName: item.rawName || item.name,
            family: `'${item.id}', 'Khmer OS Muol Light', 'Moul', cursive`,
            category: 'local',
            isLocal: true,
            blobUrl: blobUrl,
            arrayBuffer: item.arrayBuffer
          });
        } catch (fontErr) {
          console.warn('Failed restoring font face:', item.id, fontErr);
        }
      }
    }
  } catch (e) {
    console.warn('Failed restoring saved local fonts from IndexedDB:', e);
  }
}

// ==========================================
// Initialization on Page Load
// ==========================================
detectInstalledKhmerFonts();
restoreCachedScannedFonts();
loadAllKhmerFonts();

// Load persistent custom fonts in background
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initSavedLocalFonts().then(() => {
      // Trigger event if UI is already listening
      window.dispatchEvent(new CustomEvent('khmerFontsLoaded'));
    });
  });
}
