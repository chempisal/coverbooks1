/**
 * Canvas Engine for Khmer Book Cover Creator
 * Handles SVG/Canvas rendering, authentic Khmer frames, typography, drag & drop, and High-Res Export
 */

class BookCoverCanvasEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.width = 600;
    this.height = 850;
    this.scale = 1;

    // State model
    this.state = {
      // General settings
      presetId: 'khmer',
      frameStyle: 'royal-kbach',
      bgColor: '#ffffff',
      bgGradient: 'linear-gradient(135deg, #f0f7ff 0%, #e1effe 100%)',
      showInnerCard: true,
      innerCardBg: '#ffffea',
      innerCardBorderColor: '#c5a059',
      innerCardRadius: 18,
      innerCardShadow: true,

      // Khmer Official Header (ព្រះរាជាណាចក្រកម្ពុជា / ជាតិ សាសនា ព្រះមហាក្សត្រ)
      nationalHeader: {
        visible: true,
        title: 'ព្រះរាជាណាចក្រកម្ពុជា',
        motto: 'ជាតិ  សាសនា  ព្រះមហាក្សត្រ',
        fontFamily: 'Moul',
        color: '#1a365d',
        accentColor: '#b45309',
        fontSize: 16,
        y: 85
      },

      // Custom Uploaded Frame
      customFrame: {
        src: null,
        opacity: 1,
        visible: false
      },

      // Text Layers
      layers: {
        schoolName: {
          id: 'schoolName',
          label: 'ឈ្មោះសាលារៀន (School Name)',
          text: 'សាលាបឋមសិក្សាកោះថ្កូវ',
          x: 300,
          y: 195,
          fontSize: 34,
          fontFamily: 'Moul',
          fill: '#0d47a1',
          gradientFill: true,
          fillColor2: '#1976d2',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#ffeb3b',
          glowBlur: 6,
          isCurved: true,
          curvature: 36, // Positive = arch upward
          letterSpacing: 0,
          visible: true
        },
        grade: {
          id: 'grade',
          label: 'ថ្នាក់ទី / បន្ទប់ (Grade / Class)',
          text: 'ថ្នាក់ទី ៖ ៤(ក)',
          x: 300,
          y: 295,
          fontSize: 30,
          fontFamily: 'Koulen',
          fill: '#d84315',
          gradientFill: true,
          fillColor2: '#f4511e',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#ffccbc',
          glowBlur: 4,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          visible: true
        },
        subject: {
          id: 'subject',
          label: 'មុខវិជ្ជា (Subject / Book)',
          text: 'សៀវភៅ ៖ ភាសាខ្មែរ',
          x: 300,
          y: 410,
          fontSize: 36,
          fontFamily: 'Moul',
          fill: '#1565c0',
          gradientFill: true,
          fillColor2: '#1e88e5',
          stroke: '#ffffff',
          strokeWidth: 4.5,
          glowColor: '#bbdefb',
          glowBlur: 5,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          visible: true
        },
        studentName: {
          id: 'studentName',
          label: 'ឈ្មោះសិស្ស (Student Name)',
          text: 'ឈ្មោះ ៖ រស់ សុវណ្ណរចនា',
          x: 300,
          y: 530,
          fontSize: 32,
          fontFamily: 'Koulen',
          fill: '#2e7d32',
          gradientFill: true,
          fillColor2: '#43a047',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#c8e6c9',
          glowBlur: 4,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          visible: true
        },
        studentInfoExtra: {
          id: 'studentInfoExtra',
          label: 'ភេទ / អត្តលេខ (Gender / ID)',
          text: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០២៤',
          x: 300,
          y: 590,
          fontSize: 22,
          fontFamily: 'Koulen',
          fill: '#00838f',
          gradientFill: false,
          fillColor2: '#00acc1',
          stroke: '#ffffff',
          strokeWidth: 3,
          glowColor: '#b2ebf2',
          glowBlur: 3,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          visible: true
        },
        teacherName: {
          id: 'teacherName',
          label: 'គ្រូបង្រៀន (Teacher Name)',
          text: 'គ្រូបន្ទុកថ្នាក់ ៖ អ្នកគ្រូ គឹម សុផល',
          x: 300,
          y: 650,
          fontSize: 22,
          fontFamily: 'Koulen',
          fill: '#4e342e',
          gradientFill: false,
          fillColor2: '#6d4c41',
          stroke: '#ffffff',
          strokeWidth: 3,
          glowColor: '#d7ccc8',
          glowBlur: 2,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          visible: true
        },
        academicYear: {
          id: 'academicYear',
          label: 'ឆ្នាំសិក្សា (Academic Year)',
          text: 'ឆ្នាំសិក្សា ២០២៥ ~ ២០២៦',
          x: 300,
          y: 710,
          fontSize: 26,
          fontFamily: 'Koulen',
          fill: '#6a1b9a',
          gradientFill: true,
          fillColor2: '#8e24aa',
          stroke: '#ffffff',
          strokeWidth: 3.5,
          glowColor: '#e1bee7',
          glowBlur: 4,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          visible: true
        }
      },

      // Stickers / Clipart list on canvas (Disabled by default)
      stickers: [
        {
          id: 'kbach-flower-tr',
          type: 'kbach-corner-tr',
          x: 520,
          y: 110,
          scale: 1,
          rotation: 0,
          visible: false
        },
        {
          id: 'kbach-flower-bl',
          type: 'kbach-corner-bl',
          x: 80,
          y: 740,
          scale: 1,
          rotation: 0,
          visible: false
        }
      ],

      // Student photo (optional)
      studentPhoto: {
        src: null,
        x: 300,
        y: 470,
        width: 90,
        height: 110,
        borderRadius: 12,
        borderWidth: 3.5,
        borderColor: '#d4af37',
        visible: false
      }
    };

    this.selectedLayerId = 'schoolName';
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.activeElement = null;

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="canvas-wrapper">
        <svg id="cover-svg" viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
          <defs id="svg-defs"></defs>
          <g id="bg-layer"></g>
          <g id="frame-layer"></g>
          <g id="national-layer"></g>
          <g id="decorations-layer"></g>
          <g id="photo-layer"></g>
          <g id="text-layer"></g>
          <g id="interactive-overlay"></g>
        </svg>
      </div>
    `;

    this.svg = document.getElementById('cover-svg');
    this.svgDefs = document.getElementById('svg-defs');
    this.bgLayer = document.getElementById('bg-layer');
    this.frameLayer = document.getElementById('frame-layer');
    this.nationalLayer = document.getElementById('national-layer');
    this.decorLayer = document.getElementById('decorations-layer');
    this.photoLayer = document.getElementById('photo-layer');
    this.textLayer = document.getElementById('text-layer');
    this.overlay = document.getElementById('interactive-overlay');

    this.setupInteractions();
    this.render();
  }

  setupInteractions() {
    const getCoords = (e) => {
      const rect = this.svg.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      return {
        x: ((clientX - rect.left) / rect.width) * this.width,
        y: ((clientY - rect.top) / rect.height) * this.height
      };
    };

    const handlePointerDown = (e) => {
      const coords = getCoords(e);
      let clickedLayer = null;

      // Check text layers
      for (const [key, layer] of Object.entries(this.state.layers)) {
        if (!layer.visible) continue;
        const dist = Math.hypot(coords.x - layer.x, coords.y - layer.y);
        if (dist < 45 || (Math.abs(coords.y - layer.y) < 28 && Math.abs(coords.x - layer.x) < 230)) {
          clickedLayer = key;
          break;
        }
      }

      if (clickedLayer) {
        this.selectedLayerId = clickedLayer;
        this.isDragging = true;
        this.dragStart = { x: coords.x, y: coords.y };
        this.layerStartPos = { ...this.state.layers[clickedLayer] };
        this.render();
        if (this.onLayerSelect) this.onLayerSelect(clickedLayer);
      }
    };

    const handlePointerMove = (e) => {
      if (!this.isDragging || !this.selectedLayerId) return;
      const coords = getCoords(e);
      const dx = coords.x - this.dragStart.x;
      const dy = coords.y - this.dragStart.y;

      const layer = this.state.layers[this.selectedLayerId];
      if (layer) {
        layer.x = Math.round(this.layerStartPos.x + dx);
        layer.y = Math.round(this.layerStartPos.y + dy);
        this.render();
      }
    };

    const handlePointerUp = () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.onStateChange) this.onStateChange();
      }
    };

    this.svg.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    this.svg.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Prevent wheel scrolling on canvas stage so preview stays permanently fixed/stationary
    const preventWheelScroll = (e) => {
      e.preventDefault();
    };
    if (this.container) {
      this.container.addEventListener('wheel', preventWheelScroll, { passive: false });
    }
    const canvasStageEl = document.querySelector('.canvas-stage');
    if (canvasStageEl) {
      canvasStageEl.addEventListener('wheel', preventWheelScroll, { passive: false });
    }
  }

  setSubjectPreset(presetId) {
    const preset = SUBJECT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    this.state.presetId = presetId;
    this.state.layers.subject.text = `សៀវភៅ ៖ ${preset.name}`;

    if (preset.defaultColors) {
      if (preset.defaultColors.schoolName) this.state.layers.schoolName.fill = preset.defaultColors.schoolName;
      if (preset.defaultColors.grade) this.state.layers.grade.fill = preset.defaultColors.grade;
      if (preset.defaultColors.subject) this.state.layers.subject.fill = preset.defaultColors.subject;
      if (preset.defaultColors.name) this.state.layers.studentName.fill = preset.defaultColors.name;
      if (preset.defaultColors.year) this.state.layers.academicYear.fill = preset.defaultColors.year;
    }

    if (preset.defaultFonts) {
      if (preset.defaultFonts.schoolName) this.state.layers.schoolName.fontFamily = preset.defaultFonts.schoolName;
      if (preset.defaultFonts.grade) this.state.layers.grade.fontFamily = preset.defaultFonts.grade;
      if (preset.defaultFonts.subject) this.state.layers.subject.fontFamily = preset.defaultFonts.subject;
      if (preset.defaultFonts.name) this.state.layers.studentName.fontFamily = preset.defaultFonts.name;
      if (preset.defaultFonts.year) this.state.layers.academicYear.fontFamily = preset.defaultFonts.year;
    }

    if (preset.frameStyle) {
      this.state.frameStyle = preset.frameStyle;
    }

    this.render();
  }

  setFrameStyle(frameId) {
    this.state.frameStyle = frameId;
    this.render();
  }

  requestRender() {
    if (this.isRenderPending) return;
    this.isRenderPending = true;
    requestAnimationFrame(() => {
      this.isRenderPending = false;
      this.render();
    });
  }

  render() {
    this.renderDefs();
    this.renderBackground();
    this.renderFrame();
    this.renderNationalHeader();
    this.renderDecorations();
    this.renderPhoto();
    this.renderTextLayers();
    this.renderSelectionOverlay();
    if (this.onRender) this.onRender();
  }

  getFontFamilyString(fontId) {
    if (!fontId) {
      return "'Khmer OS Muol Light', 'Moul', cursive, sans-serif";
    }

    if (typeof CUSTOM_LOCAL_FONTS !== 'undefined') {
      const custom = CUSTOM_LOCAL_FONTS.find(f => f.id === fontId);
      if (custom) return custom.family;
    }

    if (typeof WINDOWS_KHMER_SYSTEM_FONTS !== 'undefined') {
      const winFont = WINDOWS_KHMER_SYSTEM_FONTS.find(f => f.id === fontId || f.baseName === fontId);
      if (winFont) return winFont.family;
    }

    if (typeof KHMER_FONTS !== 'undefined') {
      const gFont = KHMER_FONTS.find(f => f.id === fontId);
      if (gFont) return gFont.family;
    }

    return `'${fontId}', 'Khmer OS Muol Light', 'Khmer OS Battambang', 'Moul', 'Battambang', sans-serif`;
  }

  renderDefs() {
    let defsHtml = '';

    defsHtml += `
      <style>
        text, textPath {
          letter-spacing: 0px !important;
          word-spacing: normal !important;
          font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "clig" 1;
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: antialiased;
        }
      </style>
      <!-- Shadow Filters -->
      <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.25" />
      </filter>
      <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.3" />
      </filter>
      <filter id="kbach-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#ca8a04" flood-opacity="0.6" />
      </filter>
      <filter id="flower-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.3" />
      </filter>

      <!-- Khmer Gold Gradient -->
      <linearGradient id="khmer-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b8860b" />
        <stop offset="25%" stop-color="#ffd700" />
        <stop offset="50%" stop-color="#fff8dc" />
        <stop offset="75%" stop-color="#daa520" />
        <stop offset="100%" stop-color="#996515" />
      </linearGradient>

      <!-- Royal Blue Gradient -->
      <linearGradient id="royal-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e3a8a" />
        <stop offset="100%" stop-color="#1e40af" />
      </linearGradient>

      <!-- Khmer Flag Gradient -->
      <linearGradient id="cambodia-flag-blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#002b7f" />
        <stop offset="100%" stop-color="#032ea1" />
      </linearGradient>
      <linearGradient id="cambodia-flag-red" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ce1126" />
        <stop offset="100%" stop-color="#e11b22" />
      </linearGradient>
    `;

    // Gradients for text layers
    for (const [key, layer] of Object.entries(this.state.layers)) {
      if (layer.gradientFill) {
        defsHtml += CurvedTextEngine.createGradientDef(
          `grad-${layer.id}`,
          layer.fill,
          layer.fillColor2 || layer.fill,
          90
        );
      }
      if (layer.glowColor) {
        defsHtml += CurvedTextEngine.createGlowFilter(
          `glow-${layer.id}`,
          layer.glowColor,
          layer.glowBlur || 4
        );
      }
    }

    // Pattern defs for stripes & notebook grid
    defsHtml += `
      <pattern id="pastel-stripes" width="48" height="60" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="8" height="60" fill="#9ccc65" />
        <rect x="8" y="0" width="8" height="60" fill="#f48fb1" />
        <rect x="16" y="0" width="8" height="60" fill="#fff59d" />
        <rect x="24" y="0" width="8" height="60" fill="#80deea" />
        <rect x="32" y="0" width="8" height="60" fill="#ce93d8" />
        <rect x="40" y="0" width="8" height="60" fill="#ffcc80" />
      </pattern>
      <!-- Authentic Cambodian Notebook Graph/Ruled Lines -->
      <pattern id="khmer-notebook-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#bfdbfe" stroke-width="0.8" opacity="0.6"/>
        <path d="M 0 24 L 24 24" fill="none" stroke="#93c5fd" stroke-width="0.5" opacity="0.4"/>
      </pattern>
    `;

    this.svgDefs.innerHTML = defsHtml;
  }

  renderBackground() {
    this.bgLayer.innerHTML = `
      <rect width="${this.width}" height="${this.height}" fill="#ffffff" />
    `;
  }

  /**
   * Render Authentic Khmer & Academic Frames
   */
  renderFrame() {
    let frameHtml = '';
    const style = this.state.frameStyle;

    if (style === 'royal-kbach') {
      // 1. Royal Golden Khmer Frame (ក្បាច់ភ្ញីទេសរាជវាំងមាស)
      frameHtml += `
        <!-- Outer Golden Border -->
        <rect x="16" y="16" width="${this.width - 32}" height="${this.height - 32}" rx="18" ry="18"
              fill="#fffdf8" stroke="url(#khmer-gold-grad)" stroke-width="8" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${this.width - 52}" height="${this.height - 52}" rx="12" ry="12"
              fill="none" stroke="#b45309" stroke-width="1.8" />
        <rect x="32" y="32" width="${this.width - 64}" height="${this.height - 64}" rx="10" ry="10"
              fill="none" stroke="#d4af37" stroke-width="1.2" stroke-dasharray="5,4" />
        
        <!-- Inner Card Inset -->
        ${this.state.showInnerCard ? `
          <rect x="42" y="42" width="${this.width - 84}" height="${this.height - 84}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.8" />
        ` : ''}

        <!-- 4 Traditional Royal Kbach Corners -->
        ${this.renderRoyalKbachCorners()}
      `;
    }
    else if (style === 'angkor-wat') {
      // 2. Angkor Wat Heritage Frame (ក្បាច់អង្គរវត្ត & ផ្កាឈូក)
      frameHtml += `
        <!-- Frame Outer Card -->
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="16" ry="16"
              fill="#fffef9" stroke="#b45309" stroke-width="7" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${this.width - 56}" height="${this.height - 56}" rx="10" ry="10"
              fill="none" stroke="#d97706" stroke-width="2" />
        
        <!-- Top Angkor Wat Temple Silhouette Crest -->
        <g transform="translate(${this.width / 2 - 80}, 24) scale(0.7)" filter="url(#kbach-gold-glow)">
          ${this.createAngkorWatSilhouetteSvg()}
        </g>

        <!-- Inner Inset Card -->
        ${this.state.showInnerCard ? `
          <rect x="38" y="58" width="${this.width - 76}" height="${this.height - 86}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.85" stroke="#fcd34d" stroke-width="1.5" stroke-dasharray="6,4" />
        ` : ''}

        <!-- Bottom Lotus Ornaments -->
        <g transform="translate(${this.width / 2}, ${this.height - 34}) scale(0.85)">
          ${this.createGoldenLotusSvg()}
        </g>
        <g transform="translate(60, ${this.height - 38}) scale(0.6)">
          ${this.createGoldenLotusSvg()}
        </g>
        <g transform="translate(${this.width - 60}, ${this.height - 38}) scale(0.6)">
          ${this.createGoldenLotusSvg()}
        </g>
      `;
    }
    else if (style === 'romdoul-khmer') {
      // 3. National Romdoul Blossom Frame (ផ្ការំដួលជាតិខ្មែរ)
      frameHtml += `
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="22" ry="22"
              fill="#fffbf5" stroke="#d97706" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${this.width - 56}" height="${this.height - 56}" rx="14" ry="14"
              fill="none" stroke="#65a30d" stroke-width="1.8" stroke-dasharray="6,4" />
        
        ${this.state.showInnerCard ? `
          <rect x="38" y="38" width="${this.width - 76}" height="${this.height - 76}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        ` : ''}

        <!-- 4 Corner Romdoul Flowers -->
        <g transform="translate(48, 48) scale(0.9)">${this.createRomdoulFlowerSvg()}</g>
        <g transform="translate(${this.width - 48}, 48) scale(0.9)">${this.createRomdoulFlowerSvg()}</g>
        <g transform="translate(48, ${this.height - 48}) scale(0.9)">${this.createRomdoulFlowerSvg()}</g>
        <g transform="translate(${this.width - 48}, ${this.height - 48}) scale(0.9)">${this.createRomdoulFlowerSvg()}</g>
      `;
    }
    else if (style === 'notebook-grid') {
      // 4. Authentic Cambodian Student Notebook (ក្រឡាហ្គារ៉ូសៀវភៅសិស្ស)
      frameHtml += `
        <!-- Outer Notebook Card -->
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="16" ry="16"
              fill="#ffffff" stroke="#0284c7" stroke-width="6" filter="url(#card-shadow)" />
        <!-- Ruled Grid Surface -->
        <rect x="24" y="24" width="${this.width - 48}" height="${this.height - 48}" rx="10" ry="10"
              fill="url(#khmer-notebook-grid)" />
        <!-- Left Red Margin Line (Standard in Cambodian School Notebooks) -->
        <line x1="85" y1="24" x2="85" y2="${this.height - 24}" stroke="#ef4444" stroke-width="2" />
        
        <!-- Header & Footer Khmer Stationery Washi Tapes -->
        <rect x="40" y="10" width="100" height="26" fill="#f59e0b" opacity="0.9" rx="4" transform="rotate(-3 90 23)" />
        <rect x="${this.width - 140}" y="${this.height - 36}" width="100" height="26" fill="#10b981" opacity="0.9" rx="4" transform="rotate(3 ${this.width - 90} ${this.height - 23})" />
      `;
    }
    else if (style === 'cambodian-flag') {
      // 5. Cambodian National Tricolor Ribbon Frame
      const ribbonH = 34;
      frameHtml += `
        <!-- Outer Card -->
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="16" ry="16"
              fill="#fffdf8" stroke="#d4af37" stroke-width="6" filter="url(#card-shadow)" />
        
        <!-- Top Flag Ribbon -->
        <g transform="translate(18, 18)">
          <rect x="0" y="0" width="${this.width - 36}" height="8" fill="url(#cambodia-flag-blue)" />
          <rect x="0" y="8" width="${this.width - 36}" height="18" fill="url(#cambodia-flag-red)" />
          <rect x="0" y="26" width="${this.width - 36}" height="8" fill="url(#cambodia-flag-blue)" />
        </g>

        <!-- Bottom Flag Ribbon -->
        <g transform="translate(18, ${this.height - 52})">
          <rect x="0" y="0" width="${this.width - 36}" height="8" fill="url(#cambodia-flag-blue)" />
          <rect x="0" y="8" width="${this.width - 36}" height="18" fill="url(#cambodia-flag-red)" />
          <rect x="0" y="26" width="${this.width - 36}" height="8" fill="url(#cambodia-flag-blue)" />
        </g>

        ${this.state.showInnerCard ? `
          <rect x="36" y="62" width="${this.width - 72}" height="${this.height - 124}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.9" stroke="#d4af37" stroke-width="1.5" />
        ` : ''}

        <!-- Top Central Golden Emblem -->
        <g transform="translate(${this.width / 2}, 36) scale(0.65)">
          <circle cx="0" cy="0" r="22" fill="#d4af37" stroke="#ffffff" stroke-width="2" filter="url(#soft-shadow)" />
          ${this.createAngkorWatSilhouetteSvg(-35, -20)}
        </g>
      `;
    }
    else if (style === 'sample-floral-stripes') {
      // 6. Pastel Floral Stripes (PDF Replica)
      const stripeHeight = 65;
      const scallopR = 10;

      frameHtml += `
        <rect x="0" y="0" width="${this.width}" height="${stripeHeight}" fill="url(#pastel-stripes)" />
        <rect x="0" y="0" width="${this.width}" height="${stripeHeight}" fill="none" stroke="#e0e0e0" stroke-width="1" />
      `;

      let topScallops = '';
      for (let x = 0; x < this.width; x += scallopR * 2) {
        topScallops += `M ${x},${stripeHeight} Q ${x + scallopR},${stripeHeight + scallopR} ${x + scallopR * 2},${stripeHeight} `;
      }
      frameHtml += `
        <path d="${topScallops} L ${this.width},${stripeHeight - 4} L 0,${stripeHeight - 4} Z" fill="#f06292" />
        <path d="${topScallops}" fill="none" stroke="#d81b60" stroke-width="1.5" />
      `;

      const bottomY = this.height - stripeHeight;
      frameHtml += `
        <rect x="0" y="${bottomY}" width="${this.width}" height="${stripeHeight}" fill="url(#pastel-stripes)" />
        <rect x="0" y="${bottomY}" width="${this.width}" height="${stripeHeight}" fill="none" stroke="#e0e0e0" stroke-width="1" />
      `;

      let bottomScallops = '';
      for (let x = 0; x < this.width; x += scallopR * 2) {
        bottomScallops += `M ${x},${bottomY} Q ${x + scallopR},${bottomY - scallopR} ${x + scallopR * 2},${bottomY} `;
      }
      frameHtml += `
        <path d="${bottomScallops} L ${this.width},${bottomY + 4} L 0,${bottomY + 4} Z" fill="#f06292" />
        <path d="${bottomScallops}" fill="none" stroke="#d81b60" stroke-width="1.5" />
      `;

      if (this.state.showInnerCard) {
        const insetX = 32;
        const insetY = 48;
        const cardW = this.width - insetX * 2;
        const cardH = this.height - insetY * 2;

        frameHtml += `
          <rect x="${insetX}" y="${insetY}" width="${cardW}" height="${cardH}" rx="14" ry="14"
                fill="${this.state.innerCardBg}" stroke="${this.state.innerCardBorderColor}" stroke-width="3"
                filter="url(#card-shadow)" />
          <rect x="${insetX + 6}" y="${insetY + 6}" width="${cardW - 12}" height="${cardH - 12}" rx="10" ry="10"
                fill="none" stroke="#e6c875" stroke-width="1" stroke-dasharray="6,3" opacity="0.7" />
        `;
      }
    }
    else if (style === 'sweet-floral') {
      // 7. Sweet Floral Frame
      frameHtml += `
        <rect x="22" y="22" width="${this.width - 44}" height="${this.height - 44}" rx="24" ry="24"
              fill="#fffaf5" stroke="#f472b6" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="32" y="32" width="${this.width - 64}" height="${this.height - 64}" rx="16" ry="16"
              fill="none" stroke="#ec4899" stroke-width="1.8" stroke-dasharray="6,4" />
      `;
    }
    else if (style === 'cosmic-galaxy') {
      // 8. Cosmic Galaxy Space Frame
      frameHtml += `
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="20" ry="20"
              fill="#0f172a" stroke="#8b5cf6" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${this.width - 56}" height="${this.height - 56}" rx="14" ry="14"
              fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6" />
        <!-- Constellation dots -->
        <circle cx="80" cy="80" r="3" fill="#38bdf8" />
        <circle cx="140" cy="110" r="2" fill="#ffd700" />
        <circle cx="${this.width - 90}" cy="90" r="3.5" fill="#f43f5e" />
        <circle cx="${this.width - 120}" cy="${this.height - 100}" r="2.5" fill="#38bdf8" />
      `;
    }
    else if (style === 'rainbow-fun') {
      // 9. Playful Rainbow
      frameHtml += `
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="28" ry="28"
              fill="#fffde7" stroke="#f97316" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${this.width - 52}" height="${this.height - 52}" rx="20" ry="20"
              fill="none" stroke="#fbbf24" stroke-width="4" />
      `;
    }
    else if (style === 'honor-badge') {
      // 10. Academic Honor Laurel
      frameHtml += `
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="16" ry="16"
              fill="#fffdf8" stroke="#ca8a04" stroke-width="8" filter="url(#card-shadow)" />
        <rect x="30" y="30" width="${this.width - 60}" height="${this.height - 60}" rx="10" ry="10"
              fill="none" stroke="#eab308" stroke-width="2" />
      `;
    }
    else if (style === 'luxury-gold-double') {
      // 11. Luxury Golden Double Border
      frameHtml += `
        <rect x="14" y="14" width="${this.width - 28}" height="${this.height - 28}" rx="12" ry="12"
              fill="#fefefe" stroke="url(#khmer-gold-grad)" stroke-width="5" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="${this.width - 48}" height="${this.height - 48}" rx="8" ry="8"
              fill="none" stroke="#b45309" stroke-width="1.5" />
        <rect x="30" y="30" width="${this.width - 60}" height="${this.height - 60}" rx="6" ry="6"
              fill="none" stroke="#d4af37" stroke-width="3" />
        <rect x="38" y="38" width="${this.width - 76}" height="${this.height - 76}" rx="4" ry="4"
              fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="6,4" />
        ${this.state.showInnerCard ? `
          <rect x="46" y="46" width="${this.width - 92}" height="${this.height - 92}" rx="8" ry="8"
                fill="${this.state.innerCardBg}" opacity="0.85" />
        ` : ''}
        <!-- Corner Gold Studs -->
        <circle cx="24" cy="24" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
        <circle cx="${this.width - 24}" cy="24" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
        <circle cx="24" cy="${this.height - 24}" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
        <circle cx="${this.width - 24}" cy="${this.height - 24}" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
      `;
    }
    else if (style === 'rose-butterflies') {
      // 12. Rose Garden & Butterflies
      frameHtml += `
        <rect x="18" y="18" width="${this.width - 36}" height="${this.height - 36}" rx="24" ry="24"
              fill="#fffafb" stroke="#f43f5e" stroke-width="5" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${this.width - 56}" height="${this.height - 56}" rx="18" ry="18"
              fill="none" stroke="#fda4af" stroke-width="2" stroke-dasharray="5,4" />
        ${this.state.showInnerCard ? `
          <rect x="40" y="40" width="${this.width - 80}" height="${this.height - 80}" rx="14" ry="14"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        ` : ''}
        <!-- Corner Butterfly / Flower motifs -->
        <text x="36" y="46" font-size="22">🌸</text>
        <text x="${this.width - 56}" y="46" font-size="22">🦋</text>
        <text x="36" y="${this.height - 28}" font-size="22">🦋</text>
        <text x="${this.width - 56}" y="${this.height - 28}" font-size="22">🌸</text>
      `;
    }
    else if (style === 'cyber-stem') {
      // 13. Cyber STEM & Tech Frame
      frameHtml += `
        <rect x="16" y="16" width="${this.width - 32}" height="${this.height - 32}" rx="10" ry="10"
              fill="#0b132b" stroke="#00f0ff" stroke-width="4" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${this.width - 52}" height="${this.height - 52}" rx="6" ry="6"
              fill="none" stroke="#3a86ff" stroke-width="1.5" stroke-dasharray="8,5" />
        <!-- Circuit Corner Nodes -->
        <polyline points="16,60 40,60 60,40 60,16" fill="none" stroke="#00f0ff" stroke-width="3" />
        <polyline points="${this.width - 16},60 ${this.width - 40},60 ${this.width - 60},40 ${this.width - 60},16" fill="none" stroke="#00f0ff" stroke-width="3" />
        <circle cx="60" cy="60" r="4" fill="#00f0ff" />
        <circle cx="${this.width - 60}" cy="60" r="4" fill="#00f0ff" />
        ${this.state.showInnerCard ? `
          <rect x="40" y="70" width="${this.width - 80}" height="${this.height - 110}" rx="8" ry="8"
                fill="#1c2541" opacity="0.8" stroke="#3a86ff" stroke-width="1" />
        ` : ''}
      `;
    }
    else if (style === 'khmer-silk-ribbon') {
      // 14. Traditional Khmer Silk Texture Border
      frameHtml += `
        <rect x="14" y="14" width="${this.width - 28}" height="${this.height - 28}" rx="16" ry="16"
              fill="#fffef5" stroke="#991b1b" stroke-width="7" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="${this.width - 48}" height="${this.height - 48}" rx="10" ry="10"
              fill="none" stroke="#d97706" stroke-width="2.5" />
        <rect x="32" y="32" width="${this.width - 64}" height="${this.height - 64}" rx="8" ry="8"
              fill="none" stroke="#ca8a04" stroke-width="1.5" stroke-dasharray="4,4" />
        ${this.state.showInnerCard ? `
          <rect x="42" y="42" width="${this.width - 84}" height="${this.height - 84}" rx="8" ry="8"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        ` : ''}
      `;
    }
    else if (style === 'custom') {
      // 11. Custom Uploaded Frame
      if (this.state.showInnerCard) {
        frameHtml += `
          <rect x="28" y="28" width="${this.width - 56}" height="${this.height - 56}" rx="14" ry="14"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        `;
      }
      if (this.state.customFrame && this.state.customFrame.src) {
        const inset = this.state.customFrame.inset || 0;
        const fit = this.state.customFrame.fit || 'none';
        frameHtml += `
          <image href="${this.state.customFrame.src}" x="${inset}" y="${inset}"
                 width="${this.width - inset * 2}" height="${this.height - inset * 2}"
                 preserveAspectRatio="${fit}" opacity="${this.state.customFrame.opacity || 1}" />
        `;
      }
    }

    // Always overlay custom frame if enabled
    if (style !== 'custom' && this.state.customFrame && this.state.customFrame.visible && this.state.customFrame.src) {
      const inset = this.state.customFrame.inset || 0;
      const fit = this.state.customFrame.fit || 'none';
      frameHtml += `
        <image href="${this.state.customFrame.src}" x="${inset}" y="${inset}"
               width="${this.width - inset * 2}" height="${this.height - inset * 2}"
               preserveAspectRatio="${fit}" opacity="${this.state.customFrame.opacity || 1}" />
      `;
    }

    this.frameLayer.innerHTML = frameHtml;
  }

  /**
   * Render Authentic Khmer National Header (ព្រះរាជាណាចក្រកម្ពុជា / ជាតិ សាសនា ព្រះមហាក្សត្រ)
   */
  renderNationalHeader() {
    const header = this.state.nationalHeader;
    if (!header || !header.visible) {
      this.nationalLayer.innerHTML = '';
      return;
    }

    const yPos = header.y || 85;
    const khmerFont = this.getFontFamilyString(header.fontFamily || 'Moul');

    this.nationalLayer.innerHTML = `
      <g class="national-header-group" transform="translate(${this.width / 2}, ${yPos})" filter="url(#soft-shadow)">
        <!-- Kingdom of Cambodia -->
        <text x="0" y="0" text-anchor="middle" font-family="${khmerFont}" font-size="${header.fontSize + 2}px"
              fill="${header.color || '#1e3a8a'}" font-weight="bold">
          ${this.escapeXml(header.title)}
        </text>
        <!-- Nation Religion King -->
        <text x="0" y="22" text-anchor="middle" font-family="${khmerFont}" font-size="${header.fontSize}px"
              fill="${header.accentColor || '#b45309'}" font-weight="bold">
          ${this.escapeXml(header.motto)}
        </text>
        <!-- Traditional Wavy Ribbon Accent (សញ្ញារលកក្បាច់) -->
        <path d="M -70,33 Q -35,30 0,33 Q 35,36 70,33" fill="none" stroke="${header.accentColor || '#b45309'}" stroke-width="2" />
        <circle cx="0" cy="33" r="3" fill="#ffd700" stroke="#b45309" stroke-width="1" />
      </g>
    `;
  }

  /**
   * Traditional Khmer Royal Kbach Corners (បានដកចេញតាមការស្នើសុំ)
   */
  renderRoyalKbachCorners() {
    return '';
  }

  /**
   * SVG Silhouette of Angkor Wat (ប្រាសាទអង្គរវត្ត)
   */
  createAngkorWatSilhouetteSvg(offsetX = 0, offsetY = 0) {
    return `
      <g transform="translate(${offsetX}, ${offsetY})">
        <!-- Base Terrace -->
        <path d="M 0,40 L 160,40 L 155,34 L 5,34 Z" fill="url(#khmer-gold-grad)" />
        <path d="M 15,34 L 145,34 L 140,28 L 20,28 Z" fill="url(#khmer-gold-grad)" />
        <!-- Central Spire (High Tower) -->
        <path d="M 72,28 C 72,12 77,2 80,0 C 83,2 88,12 88,28 Z" fill="url(#khmer-gold-grad)" stroke="#996515" stroke-width="1" />
        <!-- Middle Left Spire -->
        <path d="M 48,28 C 48,16 53,8 55,6 C 57,8 62,16 62,28 Z" fill="url(#khmer-gold-grad)" stroke="#996515" stroke-width="0.8" />
        <!-- Middle Right Spire -->
        <path d="M 98,28 C 98,16 103,8 105,6 C 107,8 112,16 112,28 Z" fill="url(#khmer-gold-grad)" stroke="#996515" stroke-width="0.8" />
        <!-- Outer Left Spire -->
        <path d="M 28,28 C 28,20 32,14 34,12 C 36,14 40,20 40,28 Z" fill="url(#khmer-gold-grad)" stroke="#996515" stroke-width="0.8" />
        <!-- Outer Right Spire -->
        <path d="M 120,28 C 120,20 124,14 126,12 C 128,14 132,20 132,28 Z" fill="url(#khmer-gold-grad)" stroke="#996515" stroke-width="0.8" />
      </g>
    `;
  }

  /**
   * SVG Golden Lotus Flower (ផ្កាឈូកមាស)
   */
  createGoldenLotusSvg() {
    return `
      <g filter="url(#kbach-gold-glow)">
        <!-- Outer Petals -->
        <path d="M 0,10 C -25,-5 -35,-25 0,-32 C 35,-25 25,-5 0,10 Z" fill="#ffd54f" stroke="#b45309" stroke-width="1.2" />
        <path d="M 0,10 C -45,0 -45,-15 -20,-24 C -5,-15 -5,0 0,10 Z" fill="#ffb300" stroke="#b45309" stroke-width="1" />
        <path d="M 0,10 C 45,0 45,-15 20,-24 C 5,-15 5,0 0,10 Z" fill="#ffb300" stroke="#b45309" stroke-width="1" />
        <!-- Center Lotus Bud -->
        <circle cx="0" cy="-12" r="5" fill="#fef08a" stroke="#b45309" stroke-width="1" />
      </g>
    `;
  }

  /**
   * Cambodian National Romdoul Flower SVG (ផ្ការំដួលជាតិខ្មែរ)
   */
  createRomdoulFlowerSvg() {
    return `
      <g filter="url(#flower-shadow)">
        <!-- 3 Outer Thick Petals (លក្ខណៈពិសេសផ្ការំដួល មានត្របកក្រៅ ៣ ធំៗ) -->
        <path d="M 0,0 C -12,-25 12,-25 0,-40 C -12,-25 -25,-12 0,0 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.2" transform="rotate(0)" />
        <path d="M 0,0 C -12,-25 12,-25 0,-40 C -12,-25 -25,-12 0,0 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.2" transform="rotate(120)" />
        <path d="M 0,0 C -12,-25 12,-25 0,-40 C -12,-25 -25,-12 0,0 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.2" transform="rotate(240)" />
        <!-- 3 Inner Petals -->
        <path d="M 0,0 C -8,-15 8,-15 0,-26 C -8,-15 -16,-8 0,0 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" transform="rotate(60)" />
        <path d="M 0,0 C -8,-15 8,-15 0,-26 C -8,-15 -16,-8 0,0 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" transform="rotate(180)" />
        <path d="M 0,0 C -8,-15 8,-15 0,-26 C -8,-15 -16,-8 0,0 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" transform="rotate(300)" />
        <!-- Flower Pistil Core -->
        <circle cx="0" cy="0" r="7" fill="#ca8a04" stroke="#854d0e" stroke-width="1" />
        <circle cx="0" cy="0" r="4" fill="#fef9c3" />
      </g>
    `;
  }

  /**
   * Render Flowers and Decorative Clipart
   */
  renderDecorations() {
    let decorHtml = '';

    this.state.stickers.forEach((sticker) => {
      if (!sticker.visible) return;

      if (sticker.type === 'kbach-corner-tr') {
        decorHtml += `
          <g transform="translate(${sticker.x}, ${sticker.y}) scale(${sticker.scale || 1}) rotate(${sticker.rotation || 0})" filter="url(#flower-shadow)">
            ${this.createFlowerClusterSvg()}
          </g>
        `;
      }
      else if (sticker.type === 'kbach-corner-bl') {
        decorHtml += `
          <g transform="translate(${sticker.x}, ${sticker.y}) scale(${sticker.scale || 1}) rotate(${sticker.rotation || 0})" filter="url(#flower-shadow)">
            ${this.createFlowerClusterSvg()}
          </g>
        `;
      }
    });

    this.decorLayer.innerHTML = decorHtml;
  }

  createFlowerClusterSvg() {
    return `
      <!-- Green Leaves -->
      <path d="M -20,-10 C -40,-35 -10,-55 5,-40 C 20,-25 0,-5 -20,-10 Z" fill="#8bc34a" stroke="#558b2f" stroke-width="1.5" />
      <path d="M 30,-20 C 55,-40 65,-10 45,5 C 30,20 15,0 30,-20 Z" fill="#7cb342" stroke="#558b2f" stroke-width="1.5" />
      <!-- Top Small Flower -->
      <g transform="translate(-16, -16) scale(0.7)">
        ${this.createLayeredFlowerSvg('#8bc34a', '#cddc39', '#e65100')}
      </g>
      <!-- Bottom Right Pink Flower -->
      <g transform="translate(24, 24) scale(0.8)">
        ${this.createLayeredFlowerSvg('#e91e63', '#f48fb1', '#ffb300')}
      </g>
      <!-- Center Main Gold Flower -->
      <g transform="translate(0, 0) scale(1)">
        ${this.createLayeredFlowerSvg('#ff9800', '#ffd54f', '#d84315')}
      </g>
    `;
  }

  createLayeredFlowerSvg(outerColor, innerColor, centerColor) {
    let petalsSvg = '';
    const numPetals = 12;

    for (let i = 0; i < numPetals; i++) {
      const angle = (i * 360) / numPetals;
      petalsSvg += `
        <ellipse cx="0" cy="-26" rx="7" ry="15" fill="${outerColor}" stroke="#5d4037" stroke-width="1.2" transform="rotate(${angle})" />
      `;
    }

    for (let i = 0; i < numPetals; i++) {
      const angle = (i * 360) / numPetals + 15;
      petalsSvg += `
        <ellipse cx="0" cy="-16" rx="5" ry="9" fill="${innerColor}" stroke="#5d4037" stroke-width="0.8" transform="rotate(${angle})" />
      `;
    }

    petalsSvg += `
      <circle cx="0" cy="0" r="9" fill="${centerColor}" stroke="#5d4037" stroke-width="1.5" />
      <circle cx="0" cy="0" r="5" fill="#ffe082" stroke="#e65100" stroke-width="1" />
      <circle cx="0" cy="0" r="2.5" fill="#d84315" />
    `;

    return petalsSvg;
  }

  renderPhoto() {
    const photo = this.state.studentPhoto;
    if (!photo || !photo.visible || !photo.src) {
      this.photoLayer.innerHTML = '';
      return;
    }

    this.photoLayer.innerHTML = `
      <g transform="translate(${photo.x - photo.width / 2}, ${photo.y - photo.height / 2})" filter="url(#soft-shadow)">
        <clipPath id="photo-clip">
          <rect width="${photo.width}" height="${photo.height}" rx="${photo.borderRadius}" ry="${photo.borderRadius}" />
        </clipPath>
        <rect width="${photo.width}" height="${photo.height}" rx="${photo.borderRadius}" ry="${photo.borderRadius}"
              fill="#f5f5f5" stroke="${photo.borderColor}" stroke-width="${photo.borderWidth}" />
        <image href="${photo.src}" width="${photo.width}" height="${photo.height}" preserveAspectRatio="xMidYMid slice" clip-path="url(#photo-clip)" />
      </g>
    `;
  }

  generate3DTextSnippet(layer, isCurved, pathId, fontFamily, escapedText) {
    if (!layer.is3D) return '';

    const effect = layer.effect3D || 'emboss-gold';
    const depth = Math.max(1, Math.min(15, layer.depth3D || 4));
    const angle = layer.angle3D !== undefined ? layer.angle3D : 135;
    const rad = angle * (Math.PI / 180);
    const dirX = Math.cos(rad);
    const dirY = Math.sin(rad);
    const shadowColor = layer.color3D || '#0f172a';
    const strokeWidth = layer.strokeWidth || 3;

    const renderTextTag = (fill, stroke, sw, opacity = 1) => {
      if (isCurved) {
        return `
          <text font-family="${fontFamily}" font-size="${layer.fontSize}px" font-weight="bold"
                fill="${fill}" stroke="${stroke}" stroke-width="${sw}"
                stroke-linejoin="round" stroke-linecap="round" opacity="${opacity}">
            <textPath href="#${pathId}" startOffset="50%" text-anchor="middle">
              ${escapedText}
            </textPath>
          </text>
        `;
      } else {
        return `
          <text x="${layer.x}" y="${layer.y}" text-anchor="middle" dominant-baseline="central"
                font-family="${fontFamily}" font-size="${layer.fontSize}px" font-weight="bold"
                fill="${fill}" stroke="${stroke}" stroke-width="${sw}"
                stroke-linejoin="round" stroke-linecap="round" opacity="${opacity}">
            ${escapedText}
          </text>
        `;
      }
    };

    let snippet = '';

    if (effect === 'emboss-gold') {
      // 💎 Gold Emboss: Top-left light golden reflection + bottom-right deep shadow
      const offX = (depth * 0.7 * dirX).toFixed(1);
      const offY = (depth * 0.7 * dirY).toFixed(1);
      const hlX = (-1.5 * dirX).toFixed(1);
      const hlY = (-1.5 * dirY).toFixed(1);

      snippet += `
        <g class="layer-3d-shadow" transform="translate(${offX}, ${offY})">
          ${renderTextTag(shadowColor, shadowColor, strokeWidth + 2, 0.65)}
        </g>
        <g class="layer-3d-highlight" transform="translate(${hlX}, ${hlY})">
          ${renderTextTag('#fff8dc', '#ffffff', 2, 0.9)}
        </g>
      `;
    } else if (effect === 'emboss-raised') {
      // 👑 Raised Bevel: Subtle top reflection + bottom bevel
      const offX = (depth * 0.8 * dirX).toFixed(1);
      const offY = (depth * 0.8 * dirY).toFixed(1);
      const hlX = (-1.2 * dirX).toFixed(1);
      const hlY = (-1.2 * dirY).toFixed(1);

      snippet += `
        <g class="layer-3d-shadow" transform="translate(${offX}, ${offY})">
          ${renderTextTag(shadowColor, shadowColor, strokeWidth + 1.5, 0.55)}
        </g>
        <g class="layer-3d-highlight" transform="translate(${hlX}, ${hlY})">
          ${renderTextTag('#ffffff', '#ffffff', 1.5, 0.85)}
        </g>
      `;
    } else if (effect === 'extrude-3d') {
      // 🌟 True 3D Extrusion: Stepped continuous solid 3D extrusion
      const steps = Math.min(depth, 10);
      for (let s = steps; s >= 1; s--) {
        const sx = ((s / steps) * depth * dirX).toFixed(1);
        const sy = ((s / steps) * depth * dirY).toFixed(1);
        snippet += `
          <g class="layer-3d-step" transform="translate(${sx}, ${sy})">
            ${renderTextTag(shadowColor, shadowColor, strokeWidth + 1, 0.9)}
          </g>
        `;
      }
    } else if (effect === 'extrude-gold') {
      // 🏆 Antique Gold 3D Extrusion
      const steps = Math.min(depth, 8);
      const goldPalette = ['#78350f', '#92400e', '#b45309', '#d97706', '#b8860b'];
      for (let s = steps; s >= 1; s--) {
        const sx = ((s / steps) * depth * dirX).toFixed(1);
        const sy = ((s / steps) * depth * dirY).toFixed(1);
        const colorIdx = Math.min(goldPalette.length - 1, s - 1);
        const c = goldPalette[colorIdx] || shadowColor;
        snippet += `
          <g class="layer-3d-step" transform="translate(${sx}, ${sy})">
            ${renderTextTag(c, c, strokeWidth + 1, 0.95)}
          </g>
        `;
      }
    } else if (effect === 'retro-pop') {
      // 🎨 Retro Pop Art 3D
      const offX = (depth * 1.2 * dirX).toFixed(1);
      const offY = (depth * 1.2 * dirY).toFixed(1);
      snippet += `
        <g class="layer-3d-pop" transform="translate(${offX}, ${offY})">
          ${renderTextTag(shadowColor, '#000000', strokeWidth + 3, 1)}
        </g>
      `;
    } else if (effect === 'deep-shadow') {
      // ⬛ Deep Floor Shadow
      const offY = (depth * 1.3).toFixed(1);
      snippet += `
        <g class="layer-3d-deep" transform="translate(0, ${offY})">
          ${renderTextTag(shadowColor, shadowColor, strokeWidth + 3, 0.7)}
        </g>
      `;
    }

    return snippet;
  }

  renderTextLayers() {
    let textHtml = '';

    for (const [key, layer] of Object.entries(this.state.layers)) {
      if (!layer.visible || !layer.text) continue;

      // Always ensure a rich, solid fallback color so text is NEVER hollow or transparent
      const solidFill = layer.fill || '#0d47a1';
      const strokeWidth = layer.strokeWidth || 0;
      const strokeColor = layer.stroke || '#ffffff';
      const glowRef = layer.glowColor ? `filter="url(#glow-${layer.id})"` : '';
      const fontFamily = this.getFontFamilyString(layer.fontFamily);
      const escapedText = this.escapeXml(layer.text);

      if (layer.isCurved && Math.abs(layer.curvature) > 0.5) {
        const pathId = `curve-path-${layer.id}`;
        const pathWidth = 440;
        const pathD = CurvedTextEngine.generatePath(layer.x, layer.y, pathWidth, layer.curvature);
        const snippet3D = this.generate3DTextSnippet(layer, true, pathId, fontFamily, escapedText);

        textHtml += `
          <g class="text-layer-group" data-layer-id="${layer.id}">
            <path id="${pathId}" d="${pathD}" fill="none" stroke="none" />
            
            <!-- 3D / Embossed Underlay -->
            ${snippet3D}

            ${strokeWidth > 0 ? `
              <text font-family="${fontFamily}" font-size="${layer.fontSize}px" font-weight="bold"
                    fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth * 1.8}"
                    stroke-linejoin="round" stroke-linecap="round" ${glowRef}>
                <textPath href="#${pathId}" startOffset="50%" text-anchor="middle">
                  ${escapedText}
                </textPath>
              </text>
            ` : ''}

            <!-- Crisp solid text layer - guarantees 100% full vibrant color on paper and screen -->
            <text font-family="${fontFamily}" font-size="${layer.fontSize}px" font-weight="bold"
                  fill="${solidFill}" stroke="none">
              <textPath href="#${pathId}" startOffset="50%" text-anchor="middle">
                ${escapedText}
              </textPath>
            </text>
          </g>
        `;
      } else {
        const snippet3D = this.generate3DTextSnippet(layer, false, '', fontFamily, escapedText);

        textHtml += `
          <g class="text-layer-group" data-layer-id="${layer.id}">
            <!-- 3D / Embossed Underlay -->
            ${snippet3D}

            ${strokeWidth > 0 ? `
              <text x="${layer.x}" y="${layer.y}" text-anchor="middle" dominant-baseline="central"
                    font-family="${fontFamily}" font-size="${layer.fontSize}px" font-weight="bold"
                    fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth * 1.8}"
                    stroke-linejoin="round" stroke-linecap="round" ${glowRef}>
                ${escapedText}
              </text>
            ` : ''}

            <!-- Crisp solid text layer - guarantees 100% full vibrant color on paper and screen -->
            <text x="${layer.x}" y="${layer.y}" text-anchor="middle" dominant-baseline="central"
                  font-family="${fontFamily}" font-size="${layer.fontSize}px" font-weight="bold"
                  fill="${solidFill}" stroke="none">
              ${escapedText}
            </text>
          </g>
        `;
      }
    }

    this.textLayer.innerHTML = textHtml;
  }

  renderSelectionOverlay() {
    if (!this.selectedLayerId) {
      this.overlay.innerHTML = '';
      return;
    }

    const layer = this.state.layers[this.selectedLayerId];
    if (!layer || !layer.visible) {
      this.overlay.innerHTML = '';
      return;
    }

    const boxW = 420;
    const boxH = layer.fontSize * 1.8;
    const boxX = layer.x - boxW / 2;
    const boxY = layer.y - boxH / 2;

    this.overlay.innerHTML = `
      <g class="selection-box-group" pointer-events="none">
        <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="8" ry="8"
              fill="rgba(217, 119, 6, 0.08)" stroke="#d97706" stroke-width="1.8" stroke-dasharray="5,4" />
        <circle cx="${boxX}" cy="${boxY}" r="4.5" fill="#d97706" stroke="#fff" stroke-width="1.5" />
        <circle cx="${boxX + boxW}" cy="${boxY}" r="4.5" fill="#d97706" stroke="#fff" stroke-width="1.5" />
        <circle cx="${boxX}" cy="${boxY + boxH}" r="4.5" fill="#d97706" stroke="#fff" stroke-width="1.5" />
        <circle cx="${boxX + boxW}" cy="${boxY + boxH}" r="4.5" fill="#d97706" stroke="#fff" stroke-width="1.5" />
      </g>
    `;
  }

  escapeXml(unsafe) {
    return (unsafe || '').replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  getLiveSVGString(uniqueSuffix = '') {
    const currentSelected = this.selectedLayerId;
    this.selectedLayerId = null;
    this.render();

    const svgClone = this.svg.cloneNode(true);
    const overlay = svgClone.querySelector('#interactive-overlay');
    if (overlay) overlay.innerHTML = '';

    // Ensure cloned SVG has explicit attributes for printing & scaling
    svgClone.setAttribute('width', '100%');
    svgClone.setAttribute('height', '100%');
    svgClone.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    let svgString = new XMLSerializer().serializeToString(svgClone);

    if (uniqueSuffix) {
      const idPattern = /id="([^"]+)"/g;
      const ids = [];
      let match;
      while ((match = idPattern.exec(svgString)) !== null) {
        if (!ids.includes(match[1]) && match[1] !== 'interactive-overlay') {
          ids.push(match[1]);
        }
      }

      // Sort by length descending to prevent sub-string ID collisions
      ids.sort((a, b) => b.length - a.length);

      ids.forEach(id => {
        const newId = `${id}_${uniqueSuffix}`;
        svgString = svgString.split(`id="${id}"`).join(`id="${newId}"`);
        svgString = svgString.split(`href="#${id}"`).join(`href="#${newId}"`);
        svgString = svgString.split(`xlink:href="#${id}"`).join(`xlink:href="#${newId}"`);

        // Match all URL forms: url(#id), url('#id'), url("#id"), url(&quot;#id&quot;)
        const safeId = id.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const urlRegex = new RegExp(`url\\((['"]?|&quot;?)#${safeId}\\1\\)`, 'g');
        svgString = svgString.replace(urlRegex, `url(#${newId})`);
      });
    }

    this.selectedLayerId = currentSelected;
    this.render();

    return svgString;
  }

  async exportHighResImage(format = 'image/png', quality = 1.0, scaleMultiplier = 3) {
    if (document.fonts) {
      await document.fonts.ready;
    }

    const currentSelected = this.selectedLayerId;
    this.selectedLayerId = null;
    this.render();

    const exportWidth = this.width * scaleMultiplier;
    const exportHeight = this.height * scaleMultiplier;
    const canvas = document.createElement('canvas');
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const ctx = canvas.getContext('2d');

    const svgString = new XMLSerializer().serializeToString(this.svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, exportWidth, exportHeight);
        ctx.drawImage(img, 0, 0, exportWidth, exportHeight);
        URL.revokeObjectURL(blobURL);

        this.selectedLayerId = currentSelected;
        this.render();

        const dataUrl = canvas.toDataURL(format, quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(blobURL);
        this.selectedLayerId = currentSelected;
        this.render();
        reject(err);
      };
      img.src = blobURL;
    });
  }
}
