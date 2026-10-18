/**
 * Main Application Logic for Khmer Student Book Cover Studio (បែបខ្មែរ Pro Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Vector Canvas Engine
  const engine = new BookCoverCanvasEngine('canvas-container');

  // 2. DOM Elements
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const subjectListContainer = document.getElementById('subject-list');
  const frameListContainer = document.getElementById('frame-list');
  const fontSelect = document.getElementById('font-family-select');
  const tab2FontSelect = document.getElementById('tab2-font-select');
  const btnApplyFontAll = document.getElementById('btn-apply-font-all');
  const btnTab2ApplyAllFonts = document.getElementById('btn-tab2-apply-all-fonts');
  const layerSelect = document.getElementById('layer-select');

  // Splash Screen Elements
  const splashScreen = document.getElementById('splash-screen');
  const btnSplashSkip = document.getElementById('btn-splash-skip');
  const splashTimerNum = document.getElementById('splash-timer-num');

  // Form Inputs
  const toggleNationalHeader = document.getElementById('toggle-national-header');
  const inputNationalTitle = document.getElementById('input-national-title');
  const inputNationalMotto = document.getElementById('input-national-motto');
  const inputSchool = document.getElementById('input-school-name');
  const inputGrade = document.getElementById('input-grade');
  const inputSubject = document.getElementById('input-subject');
  const inputStudent = document.getElementById('input-student-name');
  const inputStudentExtra = document.getElementById('input-student-extra');
  const inputTeacher = document.getElementById('input-teacher-name');
  const toggleTeacher = document.getElementById('toggle-teacher');
  const inputYear = document.getElementById('input-academic-year');
  const togglePhoto = document.getElementById('toggle-photo');
  const photoUploadInput = document.getElementById('photo-upload');
  const toggleCornerFlowers = document.getElementById('toggle-corner-flowers');

  // Typography Controls
  const toggleCurved = document.getElementById('toggle-curved');
  const sliderCurvature = document.getElementById('slider-curvature');
  const curvatureVal = document.getElementById('curvature-val');
  const sliderFontSize = document.getElementById('slider-font-size');
  const fontSizeVal = document.getElementById('font-size-val');
  const toggleGradient = document.getElementById('toggle-gradient');
  const colorFill1 = document.getElementById('color-fill-1');
  const colorFill2 = document.getElementById('color-fill-2');
  const colorStroke = document.getElementById('color-stroke');
  const sliderStrokeWidth = document.getElementById('slider-stroke-width');
  const strokeWidthVal = document.getElementById('stroke-width-val');
  const colorGlow = document.getElementById('color-glow');
  const sliderGlowBlur = document.getElementById('slider-glow-blur');
  const glowBlurVal = document.getElementById('glow-blur-val');
  const sliderPosX = document.getElementById('slider-pos-x');
  const sliderPosY = document.getElementById('slider-pos-y');
  const btnAlignH = document.getElementById('btn-align-h');

  // 3D & Embossed Text Controls (អក្សរផុស & 3D)
  const toggle3DText = document.getElementById('toggle-3d-text');
  const controls3DPanel = document.getElementById('controls-3d-panel');
  const preset3DBtns = document.querySelectorAll('.preset-3d-btn');
  const slider3DDepth = document.getElementById('slider-3d-depth');
  const val3DDepth = document.getElementById('val-3d-depth');
  const select3DDirection = document.getElementById('select-3d-direction');
  const color3DShadow = document.getElementById('color-3d-shadow');
  const btnApply3DAll = document.getElementById('btn-apply-3d-all');

  // Header Actions
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadJpg = document.getElementById('btn-download-jpg');
  const btnPrintA4 = document.getElementById('btn-print-a4');
  const btnBatchModal = document.getElementById('btn-batch-modal');
  const btnReset = document.getElementById('btn-reset');
  const btnOpenSheetsModal = document.getElementById('btn-open-sheets-modal');

  // Custom Diverse PC Frame Elements
  const frameDropzone = document.getElementById('frame-dropzone');
  const inputFrameUpload = document.getElementById('input-frame-upload');
  const btnBrowseFrame = document.getElementById('btn-browse-frame');
  const customFrameControls = document.getElementById('custom-frame-controls');
  const customFrameThumb = document.getElementById('custom-frame-thumb');
  const activeCustomFrameTitle = document.getElementById('active-custom-frame-title');
  const btnRemoveCustomFrame = document.getElementById('btn-remove-custom-frame');
  const sliderFrameOpacity = document.getElementById('slider-frame-opacity');
  const frameOpacityVal = document.getElementById('frame-opacity-val');
  const sliderFrameInset = document.getElementById('slider-frame-inset');
  const frameInsetVal = document.getElementById('frame-inset-val');
  const selectFrameFit = document.getElementById('select-frame-fit');
  const toggleInnerCard = document.getElementById('toggle-inner-card');
  const pcFramesGrid = document.getElementById('pc-frames-grid');
  const pcFramesCount = document.getElementById('pc-frames-count');
  const btnClearAllPcFrames = document.getElementById('btn-clear-all-pc-frames');

  // Subject Modal Elements
  const subjectModal = document.getElementById('subject-modal');
  const closeSubjectModal = document.getElementById('close-subject-modal');
  const btnCancelSubjectModal = document.getElementById('btn-cancel-subject-modal');
  const btnOpenAddSubject = document.getElementById('btn-open-add-subject');
  const btnSaveSubject = document.getElementById('btn-save-subject');
  const btnResetDefaultSubjects = document.getElementById('btn-reset-default-subjects');
  const modalSubjectId = document.getElementById('modal-subject-id');
  const modalSubjectName = document.getElementById('modal-subject-name');
  const modalSubjectSub = document.getElementById('modal-subject-sub');
  const modalSubjectIcon = document.getElementById('modal-subject-icon');
  const modalSubjectFrame = document.getElementById('modal-subject-frame');
  const modalSubjectColor = document.getElementById('modal-subject-color');
  const modalSubjectTextColor = document.getElementById('modal-subject-text-color');
  const modalColorHex = document.getElementById('modal-color-hex');
  const modalTextColorHex = document.getElementById('modal-text-color-hex');
  const subjectCountBadge = document.getElementById('subject-count-badge');

  // Print Modal Elements
  const printModal = document.getElementById('print-modal');
  const closePrintModal = document.getElementById('close-print-modal');
  const btnExecutePrint = document.getElementById('btn-execute-print');
  const btnDownloadA4Png = document.getElementById('btn-download-a4-png');
  const printModeSelect = document.getElementById('print-mode-select');
  const printSub1Select = document.getElementById('print-sub1-select');
  const printSub2Select = document.getElementById('print-sub2-select');
  const groupSubject1 = document.getElementById('group-subject-1');
  const groupSubject2 = document.getElementById('group-subject-2');
  const printMarginSelect = document.getElementById('print-margin-select');
  const toggleCutGuides = document.getElementById('toggle-cut-guides');
  const printPreviewContainer = document.getElementById('print-preview-container');
  const printSheetInfoText = document.getElementById('print-sheet-info-text');

  // Batch Modal Elements
  const batchModal = document.getElementById('batch-modal');
  const closeBatchModal = document.getElementById('close-batch-modal');
  const btnExecuteBatchDownload = document.getElementById('btn-execute-batch-download');
  const batchGrid = document.getElementById('batch-grid');

  // Sheets Modal Elements
  const sheetsModal = document.getElementById('sheets-modal');
  const closeSheetsModal = document.getElementById('close-sheets-modal');

  // ==========================================
  // Splash Screen Timer (Instant for returning visits, 1s for first load)
  // ==========================================
  if (splashScreen) {
    const dismissSplash = () => {
      sessionStorage.setItem('khmer_splash_dismissed', 'true');
      splashScreen.style.opacity = '0';
      splashScreen.style.pointerEvents = 'none';
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 300);
    };

    if (sessionStorage.getItem('khmer_splash_dismissed') === 'true') {
      splashScreen.style.display = 'none';
    } else {
      let splashSeconds = 1;
      if (splashTimerNum) splashTimerNum.textContent = splashSeconds;
      const splashInterval = setInterval(() => {
        splashSeconds--;
        if (splashTimerNum) splashTimerNum.textContent = splashSeconds;
        if (splashSeconds <= 0) {
          clearInterval(splashInterval);
          dismissSplash();
        }
      }, 800);

      if (btnSplashSkip) {
        btnSplashSkip.addEventListener('click', () => {
          clearInterval(splashInterval);
          dismissSplash();
        });
      }
    }
  }

  // ==========================================
  // Populate Font Selector (Windows Fonts + Google Fonts + Computer Fonts)
  // ==========================================
  function populateFontSelect() {
    const selects = [fontSelect, tab2FontSelect].filter(Boolean);
    
    selects.forEach(sel => {
      sel.innerHTML = '';

      // 1. Windows Pre-installed Khmer System Fonts
      if (typeof WINDOWS_KHMER_SYSTEM_FONTS !== 'undefined' && WINDOWS_KHMER_SYSTEM_FONTS.length > 0) {
        const winGroup = document.createElement('optgroup');
        winGroup.label = '💻 Font ខ្មែរក្នុង Windows (មានស្រាប់ក្នុងកុំព្យូទ័រ)';
        WINDOWS_KHMER_SYSTEM_FONTS.forEach(font => {
          const opt = document.createElement('option');
          opt.value = font.id;
          opt.textContent = font.name;
          opt.style.fontFamily = font.family;
          winGroup.appendChild(opt);
        });
        sel.appendChild(winGroup);
      }

      // 2. Scanned System Fonts directly from PC via queryLocalFonts
      if (typeof SCANNED_SYSTEM_FONTS !== 'undefined' && SCANNED_SYSTEM_FONTS.length > 0) {
        const scannedGroup = document.createElement('optgroup');
        scannedGroup.label = `🖥️ Font បានស្កេនពីកុំព្យូទ័រ (${SCANNED_SYSTEM_FONTS.length} Fonts)`;
        SCANNED_SYSTEM_FONTS.forEach(font => {
          const opt = document.createElement('option');
          opt.value = font.id;
          opt.textContent = font.name;
          opt.style.fontFamily = font.family;
          scannedGroup.appendChild(opt);
        });
        sel.appendChild(scannedGroup);
      }

      // 3. Custom font files uploaded from computer
      if (typeof CUSTOM_LOCAL_FONTS !== 'undefined' && CUSTOM_LOCAL_FONTS.length > 0) {
        const localGroup = document.createElement('optgroup');
        localGroup.label = `📁 Font បានបញ្ចូលពី File (${CUSTOM_LOCAL_FONTS.length} Fonts)`;
        CUSTOM_LOCAL_FONTS.forEach(font => {
          const opt = document.createElement('option');
          opt.value = font.id;
          opt.textContent = font.name;
          opt.style.fontFamily = font.family;
          localGroup.appendChild(opt);
        });
        sel.appendChild(localGroup);
      }

      // 4. Google Khmer Fonts
      const googleGroup = document.createElement('optgroup');
      googleGroup.label = '🇰🇭 ពុម្ពអក្សរខ្មែរ (Google Khmer Fonts)';
      KHMER_FONTS.filter(f => !f.isLocal).forEach(font => {
        const opt = document.createElement('option');
        opt.value = font.id;
        opt.textContent = font.name;
        opt.style.fontFamily = font.family;
        googleGroup.appendChild(opt);
      });
      sel.appendChild(googleGroup);
    });

    const currentLayer = engine.state.layers[engine.selectedLayerId];
    if (currentLayer && currentLayer.fontFamily) {
      if (fontSelect) fontSelect.value = currentLayer.fontFamily;
      if (tab2FontSelect) tab2FontSelect.value = currentLayer.fontFamily;
    }
  }
  populateFontSelect();

  // Scan All Installed PC Fonts (Local Font Access API)
  const btnScanPcFonts = document.getElementById('btn-scan-pc-fonts');
  if (btnScanPcFonts) {
    btnScanPcFonts.addEventListener('click', async () => {
      try {
        btnScanPcFonts.innerHTML = '<span>⏳</span> កំពុងស្កេន...';
        const scanned = await scanLocalSystemFonts();
        populateFontSelect();
        alert(`ស្កេនបានជោគជ័យ! រកឃើញ Font សរុបចំនួន ${scanned.length} ក្នុងកុំព្យូទ័ររបស់អ្នក។ អ្នកអាចរើសក្នុងបញ្ជី Font បានភ្លាមៗ!`);
      } catch (err) {
        alert(err.message);
      } finally {
        btnScanPcFonts.innerHTML = '<span>🔍</span> ស្កេន Font ក្នុង PC';
      }
    });
  }

  // Type & Apply Direct Font Name from PC
  const inputCustomFontName = document.getElementById('input-custom-font-name');
  const btnApplyCustomFontName = document.getElementById('btn-apply-custom-font-name');

  const applyCustomTypedFont = () => {
    const fontName = inputCustomFontName.value.trim();
    if (!fontName) {
      alert('សូមបញ្ចូលឈ្មោះ Font (ឧទាហរណ៍៖ Khmer OS Muol Light)!');
      return;
    }

    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.fontFamily = fontName;
      
      // Add as custom option if not already present
      let exists = false;
      for (let i = 0; i < fontSelect.options.length; i++) {
        if (fontSelect.options[i].value.toLowerCase() === fontName.toLowerCase()) {
          fontSelect.selectedIndex = i;
          exists = true;
          break;
        }
      }
      if (!exists) {
        const newOpt = document.createElement('option');
        newOpt.value = fontName;
        newOpt.textContent = `💻 ${fontName} (ម៉ាស៊ីនផ្ទាល់)`;
        newOpt.style.fontFamily = `'${fontName}', 'Moul', sans-serif`;
        fontSelect.insertBefore(newOpt, fontSelect.firstChild);
        fontSelect.value = fontName;
      }

      engine.render();
      alert(`បានដាក់ Font "${fontName}" លើអក្សររួចរាល់!`);
    }
  };

  if (btnApplyCustomFontName && inputCustomFontName) {
    btnApplyCustomFontName.addEventListener('click', applyCustomTypedFont);
    inputCustomFontName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyCustomTypedFont();
      }
    });
  }

  // ==========================================
  // Font Selection & Batch File Upload Helpers
  // ==========================================
  function updateActiveLayerFont(fontVal) {
    if (!fontVal) return;
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.fontFamily = fontVal;
      engine.render();
    }
    if (fontSelect && fontSelect.value !== fontVal) fontSelect.value = fontVal;
    if (tab2FontSelect && tab2FontSelect.value !== fontVal) tab2FontSelect.value = fontVal;
    if (typeof renderFontPickerCards === 'function') renderFontPickerCards();
  }

  function applyFontToAllText(fontVal) {
    if (!fontVal) return;
    Object.values(engine.state.layers).forEach(layer => {
      layer.fontFamily = fontVal;
    });
    if (engine.state.nationalHeader) {
      engine.state.nationalHeader.fontFamily = fontVal;
    }
    engine.render();
    if (fontSelect) fontSelect.value = fontVal;
    if (tab2FontSelect) tab2FontSelect.value = fontVal;
    if (typeof renderFontPickerCards === 'function') renderFontPickerCards();
    alert(`បានដាក់ Font "${fontVal}" លើអក្សរទាំងអស់លើក្របរួចរាល់!`);
  }

  // Local Computer Font File Upload Listener (Supports Single & Multiple Files)
  const btnUploadLocalFont = document.getElementById('btn-upload-local-font');
  const inputFontUpload = document.getElementById('input-font-upload');

  if (btnUploadLocalFont && inputFontUpload) {
    btnUploadLocalFont.addEventListener('click', () => inputFontUpload.click());
    inputFontUpload.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        try {
          btnUploadLocalFont.innerHTML = `<span>⏳</span> កំពុងដំឡើង ${files.length} Font...`;
          const loadedEntries = await registerCustomFontFiles(files);
          populateFontSelect();

          if (loadedEntries.length > 0) {
            updateActiveLayerFont(loadedEntries[0].id);
            alert(`បានដំឡើង Font ចំនួន ${loadedEntries.length} ពីកុំព្យូទ័របានជោគជ័យ និងរក្សាទុកក្នុងម៉ាស៊ីនរួចរាល់!`);
          }
        } catch (err) {
          alert('កំហុសក្នុងការបញ្ចូល Font: ' + err.message);
        } finally {
          btnUploadLocalFont.innerHTML = '<span>📁</span> ជ្រើសរើស File Font';
          inputFontUpload.value = '';
        }
      }
    });
  }

  // ==========================================
  // Visual Font Studio & PC Local Font Picker Modal Controller
  // ==========================================
  const fontPickerModal = document.getElementById('font-picker-modal');
  const closeFontPickerModal = document.getElementById('close-font-picker-modal');
  const closeFontPickerFooter = document.getElementById('close-font-picker-footer');
  const fontPickerSearch = document.getElementById('font-picker-search');
  const fontCardsGrid = document.getElementById('font-cards-grid');
  const fontSampleInput = document.getElementById('font-sample-input');
  const btnResetPreviewText = document.getElementById('btn-reset-preview-text');
  const fontCategoryTabs = document.getElementById('font-category-tabs');
  const fontPickerEmpty = document.getElementById('font-picker-empty');
  const fontPickerActiveLayerName = document.getElementById('font-picker-active-layer-name');
  const btnModalScanPc = document.getElementById('btn-modal-scan-pc');
  const btnModalUploadFont = document.getElementById('btn-modal-upload-font');
  const modalFontUploadInput = document.getElementById('modal-font-upload-input');

  const btnHeaderOpenFontPicker = document.getElementById('btn-header-open-font-picker');
  const btnTab2OpenFontPicker = document.getElementById('btn-tab2-open-font-picker');
  const btnTab3OpenFontPicker = document.getElementById('btn-tab3-open-font-picker');

  let activeFontCategory = 'all';
  let fontSearchQuery = '';

  function openFontPickerModal() {
    if (!fontPickerModal) return;
    fontPickerModal.style.display = 'flex';

    const currentLayer = engine.state.layers[engine.selectedLayerId];
    if (fontPickerActiveLayerName && currentLayer) {
      fontPickerActiveLayerName.textContent = currentLayer.label || engine.selectedLayerId;
      if (fontSampleInput && currentLayer.text) {
        fontSampleInput.value = currentLayer.text;
      }
    }

    renderFontPickerCards();
    if (fontPickerSearch) fontPickerSearch.focus();
  }

  function closeFontPickerModalFunc() {
    if (!fontPickerModal) return;
    fontPickerModal.style.display = 'none';
  }

  if (btnHeaderOpenFontPicker) btnHeaderOpenFontPicker.addEventListener('click', openFontPickerModal);
  if (btnTab2OpenFontPicker) btnTab2OpenFontPicker.addEventListener('click', openFontPickerModal);
  if (btnTab3OpenFontPicker) btnTab3OpenFontPicker.addEventListener('click', openFontPickerModal);
  if (closeFontPickerModal) closeFontPickerModal.addEventListener('click', closeFontPickerModalFunc);
  if (closeFontPickerFooter) closeFontPickerFooter.addEventListener('click', closeFontPickerModalFunc);

  if (fontPickerModal) {
    fontPickerModal.addEventListener('click', (e) => {
      if (e.target === fontPickerModal) closeFontPickerModalFunc();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fontPickerModal && fontPickerModal.style.display === 'flex') {
      closeFontPickerModalFunc();
    }
  });

  // Category filter tabs
  if (fontCategoryTabs) {
    const pills = fontCategoryTabs.querySelectorAll('.font-tab-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFontCategory = pill.getAttribute('data-cat') || 'all';
        renderFontPickerCards();
      });
    });
  }

  // Real-time search filter
  if (fontPickerSearch) {
    fontPickerSearch.addEventListener('input', () => {
      fontSearchQuery = fontPickerSearch.value.trim().toLowerCase();
      renderFontPickerCards();
    });
  }

  // Sample text input
  if (fontSampleInput) {
    fontSampleInput.addEventListener('input', () => {
      renderFontPickerCards();
    });
  }

  if (btnResetPreviewText) {
    btnResetPreviewText.addEventListener('click', () => {
      const currentLayer = engine.state.layers[engine.selectedLayerId];
      if (fontSampleInput) {
        fontSampleInput.value = (currentLayer && currentLayer.text) ? currentLayer.text : 'សាលាបឋមសិក្សាកោះថ្កូវ • ភាសាខ្មែរ';
        renderFontPickerCards();
      }
    });
  }

  // Modal Direct Upload File
  if (btnModalUploadFont && modalFontUploadInput) {
    btnModalUploadFont.addEventListener('click', () => modalFontUploadInput.click());
    modalFontUploadInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        try {
          btnModalUploadFont.innerHTML = `<span>⏳</span> កំពុងបញ្ចូល ${files.length} Font...`;
          const loadedEntries = await registerCustomFontFiles(files);
          populateFontSelect();
          renderFontPickerCards();

          if (loadedEntries.length > 0) {
            updateActiveLayerFont(loadedEntries[0].id);
            alert(`បានដំឡើង Font ចំនួន ${loadedEntries.length} ពីកុំព្យូទ័របានជោគជ័យ!`);
          }
        } catch (err) {
          alert('កំហុសក្នុងការបញ្ចូល Font: ' + err.message);
        } finally {
          btnModalUploadFont.innerHTML = '<span>📁</span> បញ្ចូល File Font (.ttf)';
          modalFontUploadInput.value = '';
        }
      }
    });
  }

  // Modal Scan PC Fonts
  if (btnModalScanPc) {
    btnModalScanPc.addEventListener('click', async () => {
      try {
        btnModalScanPc.innerHTML = '<span>⏳</span> កំពុងស្កេន...';
        const scanned = await scanLocalSystemFonts();
        populateFontSelect();
        renderFontPickerCards();
        alert(`ស្កេនបានជោគជ័យ! រកឃើញ Font សរុបចំនួន ${scanned.length} ក្នុងកុំព្យូទ័ររបស់អ្នក។`);
      } catch (err) {
        alert(err.message);
      } finally {
        btnModalScanPc.innerHTML = '<span>🔍</span> ស្កេន PC Fonts';
      }
    });
  }

  // Render Font Cards in Modal
  function renderFontPickerCards() {
    if (!fontCardsGrid) return;

    const currentLayer = engine.state.layers[engine.selectedLayerId];
    const activeFontId = currentLayer ? currentLayer.fontFamily : 'Moul';
    const sampleText = (fontSampleInput && fontSampleInput.value.trim()) ? fontSampleInput.value : 'សាលាបឋមសិក្សា • ភាសាខ្មែរ';

    // 1. Gather all font items
    const winFonts = (typeof WINDOWS_KHMER_SYSTEM_FONTS !== 'undefined') ? WINDOWS_KHMER_SYSTEM_FONTS.map(f => ({ ...f, type: 'windows' })) : [];
    const customFonts = (typeof CUSTOM_LOCAL_FONTS !== 'undefined') ? CUSTOM_LOCAL_FONTS.map(f => ({ ...f, type: 'custom' })) : [];
    const scannedFonts = (typeof SCANNED_SYSTEM_FONTS !== 'undefined') ? SCANNED_SYSTEM_FONTS.map(f => ({ ...f, type: 'scanned' })) : [];
    const googleFonts = (typeof KHMER_FONTS !== 'undefined') ? KHMER_FONTS.map(f => ({ ...f, type: 'google' })) : [];

    // Update tab badges
    const countAllEl = document.getElementById('count-all-fonts');
    const countPcEl = document.getElementById('count-pc-fonts');
    const countCustomEl = document.getElementById('count-custom-fonts');
    const countScannedEl = document.getElementById('count-scanned-fonts');
    const countGoogleEl = document.getElementById('count-google-fonts');

    const totalCount = winFonts.length + customFonts.length + scannedFonts.length + googleFonts.length;
    if (countAllEl) countAllEl.textContent = totalCount;
    if (countPcEl) countPcEl.textContent = winFonts.length;
    if (countCustomEl) countCustomEl.textContent = customFonts.length;
    if (countScannedEl) countScannedEl.textContent = scannedFonts.length;
    if (countGoogleEl) countGoogleEl.textContent = googleFonts.length;

    let fontPool = [];
    if (activeFontCategory === 'windows') {
      fontPool = winFonts;
    } else if (activeFontCategory === 'custom') {
      fontPool = customFonts;
    } else if (activeFontCategory === 'scanned') {
      fontPool = scannedFonts;
    } else if (activeFontCategory === 'google') {
      fontPool = googleFonts;
    } else {
      // All: Custom & Windows first, then Google, then scanned
      fontPool = [...customFonts, ...winFonts, ...googleFonts, ...scannedFonts];
    }

    // Apply Search Filter
    if (fontSearchQuery) {
      fontPool = fontPool.filter(f => {
        const idMatch = (f.id || '').toLowerCase().includes(fontSearchQuery);
        const nameMatch = (f.name || '').toLowerCase().includes(fontSearchQuery);
        const baseMatch = (f.baseName || '').toLowerCase().includes(fontSearchQuery);
        return idMatch || nameMatch || baseMatch;
      });
    }

    fontCardsGrid.innerHTML = '';

    if (fontPool.length === 0) {
      if (fontPickerEmpty) fontPickerEmpty.style.display = 'block';
      return;
    }
    if (fontPickerEmpty) fontPickerEmpty.style.display = 'none';

    fontPool.forEach(font => {
      const card = document.createElement('div');
      const isSelected = (font.id === activeFontId || font.baseName === activeFontId);
      card.className = `font-card-item ${isSelected ? 'selected' : ''}`;

      let badgeHtml = '';
      if (font.type === 'custom') {
        badgeHtml = '<span class="font-card-badge badge-custom">📁 File PC</span>';
      } else if (font.type === 'windows') {
        badgeHtml = font.isInstalled
          ? '<span class="font-card-badge badge-pc">✅ ក្នុង Windows</span>'
          : '<span class="font-card-badge badge-pc">💻 Windows</span>';
      } else if (font.type === 'scanned') {
        badgeHtml = '<span class="font-card-badge badge-scanned">🖥️ ពីកុំព្យូទ័រ</span>';
      } else {
        badgeHtml = '<span class="font-card-badge badge-google">🌐 Google</span>';
      }

      const fontCssFamily = font.family || `'${font.id}', 'Khmer OS Muol Light', sans-serif`;

      card.innerHTML = `
        <div class="font-card-header">
          <div class="font-card-title" title="${font.name}">${font.name}</div>
          ${badgeHtml}
        </div>
        <div class="font-card-preview" style="font-family: ${fontCssFamily};">
          ${sampleText}
        </div>
        <div class="font-card-actions">
          <button type="button" class="font-btn-select" title="អនុវត្តលើស្រទាប់អក្សរសកម្ម">
            <span>${isSelected ? '✓ បានរើស' : '👉 ជ្រើសរើស'}</span>
          </button>
          <button type="button" class="font-btn-apply-all" title="ដាក់ Font នេះលើអក្សរទាំងអស់លើក្រប">
            <span>✨ លើទាំងអស់</span>
          </button>
          ${font.type === 'custom' ? `
            <button type="button" class="font-btn-delete" title="លុប Font ផ្ទាល់ខ្លួននេះចេញ">
              🗑️
            </button>
          ` : ''}
        </div>
      `;

      // Select click
      const btnSelect = card.querySelector('.font-btn-select');
      if (btnSelect) {
        btnSelect.addEventListener('click', (e) => {
          e.stopPropagation();
          updateActiveLayerFont(font.id);
          populateFontSelect();
          renderFontPickerCards();
        });
      }

      // Card body click
      card.addEventListener('click', () => {
        updateActiveLayerFont(font.id);
        populateFontSelect();
        renderFontPickerCards();
      });

      // Apply to all
      const btnApplyAll = card.querySelector('.font-btn-apply-all');
      if (btnApplyAll) {
        btnApplyAll.addEventListener('click', (e) => {
          e.stopPropagation();
          applyFontToAllText(font.id);
        });
      }

      // Delete custom font
      const btnDelete = card.querySelector('.font-btn-delete');
      if (btnDelete) {
        btnDelete.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (confirm(`តើអ្នកពិតជាចង់លុប Font "${font.name}" នេះចេញពីកម្មវិធីមែនទេ?`)) {
            await deleteCustomLocalFont(font.id);
            populateFontSelect();
            renderFontPickerCards();
          }
        });
      }

      fontCardsGrid.appendChild(card);
    });
  }

  // Listen to background font restoration event
  window.addEventListener('khmerFontsLoaded', () => {
    populateFontSelect();
    renderFontPickerCards();
  });

  // ==========================================
  // 35 Pre-designed Text Color & Style Gallery
  // ==========================================
  const textStylesGrid = document.getElementById('text-styles-grid');

  function renderTextStylesGrid() {
    if (!textStylesGrid || typeof TEXT_COLOR_STYLES_35 === 'undefined') return;
    textStylesGrid.innerHTML = '';

    TEXT_COLOR_STYLES_35.forEach((st, idx) => {
      const card = document.createElement('div');
      card.className = 'text-style-card';
      card.title = st.name;

      const curLayer = engine.state.layers[engine.selectedLayerId];
      if (curLayer && curLayer.fill === st.fill && curLayer.fillColor2 === st.fillColor2) {
        card.classList.add('active');
      }

      const gradCss = `linear-gradient(135deg, ${st.fill}, ${st.fillColor2})`;

      card.innerHTML = `
        <div class="text-style-preview" style="background: ${gradCss}; color: #ffffff; text-shadow: 0 0 ${st.glowBlur || 4}px ${st.glowColor}; border: 1.5px solid ${st.stroke || '#fff'};">
          ក
        </div>
        <div class="text-style-info">
          <div class="text-style-name">${idx + 1}. ${st.name}</div>
          <span class="text-style-badge">${st.badge || 'Pro'}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        const layer = engine.state.layers[engine.selectedLayerId];
        if (layer) {
          layer.fill = st.fill;
          layer.fillColor2 = st.fillColor2;
          layer.gradientFill = !!st.gradientFill;
          layer.stroke = st.stroke;
          layer.strokeWidth = st.strokeWidth;
          layer.glowColor = st.glowColor;
          layer.glowBlur = st.glowBlur;

          engine.render();
          syncControlsWithLayer();
          renderTextStylesGrid();
        }
      });

      textStylesGrid.appendChild(card);
    });
  }
  renderTextStylesGrid();

  // ==========================================
  // Populate Layer Selector
  // ==========================================
  function populateLayerSelect() {
    layerSelect.innerHTML = '';
    for (const [key, layer] of Object.entries(engine.state.layers)) {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = layer.label;
      if (key === engine.selectedLayerId) opt.selected = true;
      layerSelect.appendChild(opt);
    }
  }
  populateLayerSelect();

  // ==========================================
  // Sidebar Tab Switching
  // ==========================================
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });

  // ==========================================
  // Render Subject Cards List
  // ==========================================
  function renderSubjectList() {
    subjectListContainer.innerHTML = '';
    if (subjectCountBadge) {
      subjectCountBadge.textContent = SUBJECT_PRESETS.length;
    }

    SUBJECT_PRESETS.forEach((sub, idx) => {
      const card = document.createElement('div');
      card.className = `subject-card ${engine.state.presetId === sub.id ? 'active' : ''}`;
      card.style.setProperty('--card-color', sub.themeColor || '#1565c0');

      const isCustom = !DEFAULT_SUBJECT_PRESETS.some(d => d.id === sub.id);

      card.innerHTML = `
        <div class="subject-icon">${sub.icon || '📚'}</div>
        <div class="subject-info">
          <div class="subject-name">${idx + 1}. ${sub.name}</div>
          <div class="subject-sub">${sub.subtitle || 'Subject'}</div>
        </div>
        ${isCustom ? `
          <div class="subject-actions">
            <button class="btn-subject-action edit-action" title="កែសម្រួលមុខវិជ្ជា" data-id="${sub.id}">✏️</button>
            <button class="btn-subject-action delete-action" title="លុបមុខវិជ្ជាចេញ" data-id="${sub.id}">🗑️</button>
          </div>
        ` : ''}
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-subject-action')) return;
        engine.setSubjectPreset(sub.id);
        inputSubject.value = engine.state.layers.subject.text;
        syncControlsWithLayer();
        renderSubjectList();
      });

      const btnEdit = card.querySelector('.edit-action');
      if (btnEdit) {
        btnEdit.addEventListener('click', (e) => {
          e.stopPropagation();
          openSubjectModal(sub.id);
        });
      }

      const btnDelete = card.querySelector('.delete-action');
      if (btnDelete) {
        btnDelete.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`តើអ្នកពិតជាចង់លុបមុខវិជ្ជា "${sub.name}" មែនទេ?`)) {
            deleteCustomSubjectPreset(sub.id);
            if (engine.state.presetId === sub.id) {
              engine.setSubjectPreset(SUBJECT_PRESETS[0].id);
            }
            renderSubjectList();
          }
        });
      }

      subjectListContainer.appendChild(card);
    });
  }
  renderSubjectList();

  // ==========================================
  // Render Frame Styles Gallery
  // ==========================================
  function renderFrameList() {
    frameListContainer.innerHTML = '';
    FRAME_STYLES.forEach(frame => {
      if (frame.isCustom) return; // Shown in upload section
      const card = document.createElement('div');
      card.className = `frame-card ${engine.state.frameStyle === frame.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="frame-card-preview" style="border-color: ${frame.previewColor};">
          <div class="frame-card-sample" style="background: ${frame.previewColor}20;"></div>
        </div>
        <div class="frame-card-info">
          <div class="frame-card-title">
            <span>${frame.name}</span>
            ${frame.badge ? `<span class="frame-badge">${frame.badge}</span>` : ''}
          </div>
          <div class="frame-card-desc">${frame.description}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        engine.setFrameStyle(frame.id);
        renderFrameList();
      });

      frameListContainer.appendChild(card);
    });
  }
  renderFrameList();

  // ==========================================
  // Sync Controls with Active Layer
  // ==========================================
  function syncControlsWithLayer() {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (!layer) return;

    layerSelect.value = engine.selectedLayerId;
    if (fontSelect) fontSelect.value = layer.fontFamily || 'Moul';
    if (tab2FontSelect) tab2FontSelect.value = layer.fontFamily || 'Moul';
    sliderFontSize.value = layer.fontSize;
    fontSizeVal.textContent = `${layer.fontSize}px`;

    toggleCurved.checked = !!layer.isCurved;
    sliderCurvature.value = layer.curvature || 0;
    curvatureVal.textContent = layer.curvature || 0;
    sliderCurvature.disabled = !layer.isCurved;

    toggleGradient.checked = !!layer.gradientFill;
    colorFill1.value = layer.fill || '#1565c0';
    colorFill2.value = layer.fillColor2 || layer.fill || '#1e88e5';
    colorFill2.disabled = !layer.gradientFill;

    colorStroke.value = layer.stroke || '#ffffff';
    sliderStrokeWidth.value = layer.strokeWidth || 0;
    strokeWidthVal.textContent = `${layer.strokeWidth || 0}px`;

    colorGlow.value = layer.glowColor || '#ffeb3b';
    sliderGlowBlur.value = layer.glowBlur || 0;
    glowBlurVal.textContent = `${layer.glowBlur || 0}px`;

    sliderPosX.value = layer.x;
    sliderPosY.value = layer.y;

    // 3D & Embossed Text State Synchronization
    if (toggle3DText) {
      toggle3DText.checked = !!layer.is3D;
      if (controls3DPanel) {
        controls3DPanel.style.display = layer.is3D ? 'block' : 'none';
      }
    }
    if (slider3DDepth) {
      slider3DDepth.value = layer.depth3D || 4;
      if (val3DDepth) val3DDepth.textContent = `${layer.depth3D || 4}px`;
    }
    if (select3DDirection) {
      select3DDirection.value = layer.angle3D !== undefined ? String(layer.angle3D) : '135';
    }
    if (color3DShadow) {
      color3DShadow.value = layer.color3D || '#0f172a';
    }
    if (preset3DBtns) {
      preset3DBtns.forEach(btn => {
        const p = btn.getAttribute('data-preset');
        if (p === (layer.effect3D || 'emboss-gold')) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Refresh 35 Text Styles active status
    renderTextStylesGrid();
  }

  // Populate initial text values in Info Tab
  function syncInputsFromState() {
    if (toggleNationalHeader) {
      toggleNationalHeader.checked = engine.state.nationalHeader.visible;
    }
    if (inputNationalTitle) {
      inputNationalTitle.value = engine.state.nationalHeader.title;
    }
    if (inputNationalMotto) {
      inputNationalMotto.value = engine.state.nationalHeader.motto;
    }
    inputSchool.value = engine.state.layers.schoolName.text;
    inputGrade.value = engine.state.layers.grade.text;
    inputSubject.value = engine.state.layers.subject.text;
    inputStudent.value = engine.state.layers.studentName.text;
    if (inputStudentExtra) {
      inputStudentExtra.value = engine.state.layers.studentInfoExtra.text;
    }
    inputTeacher.value = engine.state.layers.teacherName.text;
    toggleTeacher.checked = engine.state.layers.teacherName.visible;
    inputYear.value = engine.state.layers.academicYear.text;
    if (toggleCornerFlowers) {
      toggleCornerFlowers.checked = engine.state.stickers.some(s => s.visible);
    }
  }
  syncInputsFromState();
  syncControlsWithLayer();

  // ==========================================
  // Auto-Save System (ប្រព័ន្ធ Save ស្វ័យប្រវត្តិ)
  // ==========================================
  const AUTOSAVE_STORAGE_KEY = 'khmer_bookcover_autosave_state';
  const AUTOSAVE_TIME_KEY = 'khmer_bookcover_autosave_time';
  const AUTOSAVE_ENABLED_KEY = 'khmer_bookcover_autosave_enabled';

  const autosaveHeaderBox = document.getElementById('autosave-header-box');
  const autosaveDot = document.getElementById('autosave-dot');
  const autosaveStatusText = document.getElementById('autosave-status-text');
  const toggleAutosaveSetting = document.getElementById('toggle-autosave-setting');
  const autosaveLastTime = document.getElementById('autosave-last-time');
  const btnForceSaveNow = document.getElementById('btn-force-save-now');
  const btnClearAutosave = document.getElementById('btn-clear-autosave');

  let isAutosaveEnabled = localStorage.getItem(AUTOSAVE_ENABLED_KEY) !== 'false';
  let autosaveTimer = null;
  let isInitialLoading = true;

  const updateAutosaveUIStatus = (status, timeStr) => {
    if (!autosaveHeaderBox || !autosaveStatusText) return;

    if (!isAutosaveEnabled) {
      autosaveHeaderBox.className = 'autosave-header-box disabled';
      autosaveStatusText.textContent = 'Auto-Save: បានបិទ';
      if (toggleAutosaveSetting) toggleAutosaveSetting.checked = false;
      return;
    }

    if (toggleAutosaveSetting) toggleAutosaveSetting.checked = true;

    if (status === 'saving') {
      autosaveHeaderBox.className = 'autosave-header-box saving';
      autosaveStatusText.textContent = 'Auto-Save: កំពុង Save...';
    } else {
      autosaveHeaderBox.className = 'autosave-header-box';
      autosaveStatusText.textContent = 'Auto-Save: បានរក្សាទុក';
      if (autosaveLastTime && timeStr) {
        autosaveLastTime.textContent = `បានរក្សាទុកចុងក្រោយ ៖ ${timeStr}`;
      }
    }
  };

  let serverSyncTimer = null;

  const triggerAutoSave = () => {
    if (!isAutosaveEnabled || isInitialLoading) return;

    updateAutosaveUIStatus('saving');
    clearTimeout(autosaveTimer);

    // Save to localStorage quickly (lightweight)
    autosaveTimer = setTimeout(() => {
      try {
        const stateJson = JSON.stringify(engine.state);
        const now = new Date();
        const timeFormatted = now.toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        localStorage.setItem(AUTOSAVE_STORAGE_KEY, stateJson);
        localStorage.setItem(AUTOSAVE_TIME_KEY, now.toISOString());
        updateAutosaveUIStatus('saved', timeFormatted);

        // Debounce server database sync to prevent network hammering
        clearTimeout(serverSyncTimer);
        serverSyncTimer = setTimeout(async () => {
          if (typeof TemplateManager !== 'undefined') {
            try {
              await TemplateManager.saveToDatabase('AutoSave (ចុងក្រោយ)', engine.state);
            } catch (e) {
              // Ignore offline error
            }
          }
        }, 3000);
      } catch (err) {
        console.warn('AutoSave error:', err);
      }
    }, 400);
  };

  // Restore autosaved state on initial page load (if not opening from share link)
  const restoreAutosaveOnLoad = () => {
    const hasShareHash = window.location.hash && window.location.hash.includes('#tpl=');
    if (!hasShareHash && isAutosaveEnabled) {
      const savedRaw = localStorage.getItem(AUTOSAVE_STORAGE_KEY);
      if (savedRaw) {
        try {
          const parsed = JSON.parse(savedRaw);
          if (parsed && parsed.layers) {
            engine.state = { ...engine.state, ...parsed };
            engine.render();
            syncInputsFromState();
            syncControlsWithLayer();

            const savedTime = localStorage.getItem(AUTOSAVE_TIME_KEY);
            const timeStr = savedTime ? new Date(savedTime).toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'ថ្មីៗនេះ';
            updateAutosaveUIStatus('saved', timeStr);
          }
        } catch (e) {
          console.warn('Failed restoring autosave:', e);
        }
      }
    }

    const lastTimeRaw = localStorage.getItem(AUTOSAVE_TIME_KEY);
    if (lastTimeRaw) {
      const timeStr = new Date(lastTimeRaw).toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      if (autosaveLastTime) autosaveLastTime.textContent = `បានរក្សាទុកចុងក្រោយ ៖ ${timeStr}`;
    }

    setTimeout(() => {
      isInitialLoading = false;
    }, 600);
  };

  // Engine callbacks
  engine.onLayerSelect = (layerId) => {
    syncControlsWithLayer();
  };
  engine.onStateChange = () => {
    syncControlsWithLayer();
    triggerAutoSave();
  };
  engine.onRender = () => {
    // Keep rendering 60fps smooth - do not trigger autosave during rendering frames
  };

  // Listeners for AutoSave controls
  if (toggleAutosaveSetting) {
    toggleAutosaveSetting.addEventListener('change', () => {
      isAutosaveEnabled = toggleAutosaveSetting.checked;
      localStorage.setItem(AUTOSAVE_ENABLED_KEY, isAutosaveEnabled ? 'true' : 'false');
      updateAutosaveUIStatus(isAutosaveEnabled ? 'saved' : 'disabled');
      if (isAutosaveEnabled) {
        isInitialLoading = false;
        triggerAutoSave();
      }
    });
  }

  if (btnForceSaveNow) {
    btnForceSaveNow.addEventListener('click', () => {
      isInitialLoading = false;
      triggerAutoSave();
      alert('បានរក្សាទុកការកែប្រែលើក្របសៀវភៅរួចរាល់!');
    });
  }

  if (btnClearAutosave) {
    btnClearAutosave.addEventListener('click', () => {
      if (confirm('តើអ្នកពិតជាចង់សម្អាតទិន្នន័យ Auto-Save នេះមែនទេ? (ទិន្នន័យដែលបានរក្សាទុកនឹងត្រូវលុប)')) {
        localStorage.removeItem(AUTOSAVE_STORAGE_KEY);
        localStorage.removeItem(AUTOSAVE_TIME_KEY);
        if (autosaveLastTime) autosaveLastTime.textContent = 'មិនទាន់មានទិន្នន័យ Save ទេ';
        alert('បានសម្អាតទិន្នន័យ Auto-Save រួចរាល់!');
      }
    });
  }

  // Run restore on startup
  restoreAutosaveOnLoad();

  // ==========================================
  // Form Inputs Listeners
  // ==========================================
  if (toggleNationalHeader) {
    toggleNationalHeader.addEventListener('change', () => {
      engine.state.nationalHeader.visible = toggleNationalHeader.checked;
      engine.render();
    });
  }
  if (inputNationalTitle) {
    inputNationalTitle.addEventListener('input', () => {
      engine.state.nationalHeader.title = inputNationalTitle.value;
      engine.render();
    });
  }
  if (inputNationalMotto) {
    inputNationalMotto.addEventListener('input', () => {
      engine.state.nationalHeader.motto = inputNationalMotto.value;
      engine.render();
    });
  }

  inputSchool.addEventListener('input', () => {
    engine.state.layers.schoolName.text = inputSchool.value;
    engine.render();
  });

  inputGrade.addEventListener('input', () => {
    engine.state.layers.grade.text = inputGrade.value;
    engine.render();
  });

  inputSubject.addEventListener('input', () => {
    engine.state.layers.subject.text = inputSubject.value;
    engine.render();
  });

  inputStudent.addEventListener('input', () => {
    engine.state.layers.studentName.text = inputStudent.value;
    engine.render();
  });

  if (inputStudentExtra) {
    inputStudentExtra.addEventListener('input', () => {
      engine.state.layers.studentInfoExtra.text = inputStudentExtra.value;
      engine.render();
    });
  }

  inputTeacher.addEventListener('input', () => {
    engine.state.layers.teacherName.text = inputTeacher.value;
    engine.render();
  });

  toggleTeacher.addEventListener('change', () => {
    engine.state.layers.teacherName.visible = toggleTeacher.checked;
    engine.render();
  });

  inputYear.addEventListener('input', () => {
    engine.state.layers.academicYear.text = inputYear.value;
    engine.render();
  });

  // Student Photo Upload
  togglePhoto.addEventListener('change', () => {
    engine.state.studentPhoto.visible = togglePhoto.checked;
    engine.render();
  });

  photoUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        engine.state.studentPhoto.src = evt.target.result;
        engine.state.studentPhoto.visible = true;
        togglePhoto.checked = true;
        engine.render();
      };
      reader.readAsDataURL(file);
    }
  });

  // Corner Flowers Toggle
  if (toggleCornerFlowers) {
    toggleCornerFlowers.addEventListener('change', () => {
      engine.state.stickers.forEach(s => s.visible = toggleCornerFlowers.checked);
      engine.render();
    });
  }

  // ==========================================
  // Typography Controls Listeners
  // ==========================================
  layerSelect.addEventListener('change', () => {
    engine.selectedLayerId = layerSelect.value;
    engine.render();
    syncControlsWithLayer();
  });


  if (fontSelect) {
    fontSelect.addEventListener('change', () => {
      updateActiveLayerFont(fontSelect.value);
    });
  }

  if (tab2FontSelect) {
    tab2FontSelect.addEventListener('change', () => {
      updateActiveLayerFont(tab2FontSelect.value);
    });
  }

  if (btnApplyFontAll) {
    btnApplyFontAll.addEventListener('click', () => {
      const selected = fontSelect ? fontSelect.value : (tab2FontSelect ? tab2FontSelect.value : 'Moul');
      applyFontToAllText(selected);
    });
  }

  if (btnTab2ApplyAllFonts) {
    btnTab2ApplyAllFonts.addEventListener('click', () => {
      const selected = tab2FontSelect ? tab2FontSelect.value : (fontSelect ? fontSelect.value : 'Moul');
      applyFontToAllText(selected);
    });
  }

  sliderFontSize.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.fontSize = parseInt(sliderFontSize.value, 10);
      fontSizeVal.textContent = `${layer.fontSize}px`;
      engine.render();
    }
  });

  toggleCurved.addEventListener('change', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.isCurved = toggleCurved.checked;
      sliderCurvature.disabled = !layer.isCurved;
      if (layer.isCurved && (!layer.curvature || layer.curvature === 0)) {
        layer.curvature = 36;
        sliderCurvature.value = 36;
        curvatureVal.textContent = '36';
      }
      engine.render();
    }
  });

  sliderCurvature.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.curvature = parseInt(sliderCurvature.value, 10);
      curvatureVal.textContent = layer.curvature;
      engine.render();
    }
  });

  // Curvature Preset Buttons
  document.querySelectorAll('.curve-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = parseInt(btn.getAttribute('data-curve'), 10);
      const layer = engine.state.layers[engine.selectedLayerId];
      if (layer) {
        layer.isCurved = c !== 0;
        layer.curvature = c;
        toggleCurved.checked = layer.isCurved;
        sliderCurvature.disabled = !layer.isCurved;
        sliderCurvature.value = c;
        curvatureVal.textContent = c;
        engine.render();
      }
    });
  });

  toggleGradient.addEventListener('change', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.gradientFill = toggleGradient.checked;
      colorFill2.disabled = !layer.gradientFill;
      engine.render();
    }
  });

  colorFill1.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.fill = colorFill1.value;
      engine.render();
    }
  });

  colorFill2.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.fillColor2 = colorFill2.value;
      engine.render();
    }
  });

  // Quick Swatches
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      const layer = engine.state.layers[engine.selectedLayerId];
      if (layer) {
        layer.fill = color;
        colorFill1.value = color;
        engine.render();
      }
    });
  });

  colorStroke.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.stroke = colorStroke.value;
      engine.render();
    }
  });

  sliderStrokeWidth.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.strokeWidth = parseFloat(sliderStrokeWidth.value);
      strokeWidthVal.textContent = `${layer.strokeWidth}px`;
      engine.render();
    }
  });

  colorGlow.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.glowColor = colorGlow.value;
      engine.render();
    }
  });

  sliderGlowBlur.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.glowBlur = parseInt(sliderGlowBlur.value, 10);
      glowBlurVal.textContent = `${layer.glowBlur}px`;
      engine.render();
    }
  });

  sliderPosX.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.x = parseInt(sliderPosX.value, 10);
      engine.render();
    }
  });

  sliderPosY.addEventListener('input', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.y = parseInt(sliderPosY.value, 10);
      engine.render();
    }
  });

  btnAlignH.addEventListener('click', () => {
    const layer = engine.state.layers[engine.selectedLayerId];
    if (layer) {
      layer.x = engine.width / 2;
      sliderPosX.value = layer.x;
      engine.render();
    }
  });

  // ==========================================
  // 3D & Embossed Text Listeners (មុខងារអក្សរផុស & 3D)
  // ==========================================
  if (toggle3DText) {
    toggle3DText.addEventListener('change', () => {
      const layer = engine.state.layers[engine.selectedLayerId];
      if (layer) {
        layer.is3D = toggle3DText.checked;
        if (!layer.effect3D) layer.effect3D = 'emboss-gold';
        if (!layer.depth3D) layer.depth3D = 4;
        if (layer.angle3D === undefined) layer.angle3D = 135;
        if (!layer.color3D) layer.color3D = '#0f172a';
        if (controls3DPanel) {
          controls3DPanel.style.display = layer.is3D ? 'block' : 'none';
        }
        engine.render();
      }
    });
  }

  if (preset3DBtns) {
    preset3DBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        const layer = engine.state.layers[engine.selectedLayerId];
        if (layer && preset) {
          layer.is3D = true;
          layer.effect3D = preset;
          if (toggle3DText) toggle3DText.checked = true;
          if (controls3DPanel) controls3DPanel.style.display = 'block';

          preset3DBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          engine.render();
        }
      });
    });
  }

  if (slider3DDepth) {
    slider3DDepth.addEventListener('input', () => {
      const layer = engine.state.layers[engine.selectedLayerId];
      if (layer) {
        layer.depth3D = parseInt(slider3DDepth.value, 10);
        if (val3DDepth) val3DDepth.textContent = `${layer.depth3D}px`;
        engine.render();
      }
    });
  }

  if (select3DDirection) {
    select3DDirection.addEventListener('change', () => {
      const layer = engine.state.layers[engine.selectedLayerId];
      if (layer) {
        layer.angle3D = parseInt(select3DDirection.value, 10);
        engine.render();
      }
    });
  }

  if (color3DShadow) {
    color3DShadow.addEventListener('input', () => {
      const layer = engine.state.layers[engine.selectedLayerId];
      if (layer) {
        layer.color3D = color3DShadow.value;
        engine.render();
      }
    });
  }

  if (btnApply3DAll) {
    btnApply3DAll.addEventListener('click', () => {
      const current = engine.state.layers[engine.selectedLayerId];
      if (!current) return;

      Object.values(engine.state.layers).forEach(layer => {
        layer.is3D = current.is3D;
        layer.effect3D = current.effect3D || 'emboss-gold';
        layer.depth3D = current.depth3D || 4;
        layer.angle3D = current.angle3D !== undefined ? current.angle3D : 135;
        layer.color3D = current.color3D || '#0f172a';
      });

      engine.render();
      alert('បានដាក់ម៉ូតអក្សរ 3D / ផុស នេះលើគ្រប់ស្រទាប់អក្សរទាំងអស់រួចរាល់!');
    });
  }

  // ==========================================
  // Diverse PC Custom Frames Gallery & Manager
  // ==========================================
  const PC_FRAMES_STORAGE_KEY = 'khmer_cover_user_pc_frames';

  const getPCCustomFrames = () => {
    try {
      const raw = localStorage.getItem(PC_FRAMES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const savePCCustomFrames = (list) => {
    try {
      localStorage.setItem(PC_FRAMES_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('LocalStorage limit reached for custom frames:', e);
    }
  };

  const applyCustomFrame = (frameItem) => {
    if (!frameItem || !frameItem.src) return;

    engine.state.customFrame.src = frameItem.src;
    engine.state.customFrame.visible = true;
    engine.setFrameStyle('custom');

    if (customFrameThumb) customFrameThumb.src = frameItem.src;
    if (activeCustomFrameTitle) activeCustomFrameTitle.textContent = frameItem.name || 'ស៊ុមផ្ទាល់ខ្លួន';
    if (customFrameControls) customFrameControls.style.display = 'block';

    renderFrameList();
    renderPcCustomFramesGrid();
  };

  const renderPcCustomFramesGrid = () => {
    if (!pcFramesGrid) return;
    const frames = getPCCustomFrames();

    if (pcFramesCount) pcFramesCount.textContent = frames.length;
    if (btnClearAllPcFrames) btnClearAllPcFrames.style.display = frames.length > 0 ? 'inline-flex' : 'none';

    if (frames.length === 0) {
      pcFramesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 18px 10px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px dashed var(--border-color); color: var(--text-muted); font-size: 11px;">
          <span>📂</span> មិនទាន់មានស៊ុមផ្ទាល់ខ្លួនពីកុំព្យូទ័រឡើយ<br/>
          <span style="font-size: 10px; color: var(--accent-gold-light);">ចុចប្រអប់ខាងលើដើម្បីជ្រើសរើសរូបស៊ុមជាច្រើនពី PC</span>
        </div>
      `;
      return;
    }

    pcFramesGrid.innerHTML = '';
    const currentSrc = engine.state.customFrame?.src;

    frames.forEach((item) => {
      const isSelected = engine.state.frameStyle === 'custom' && currentSrc === item.src;

      const card = document.createElement('div');
      card.style.cssText = `
        position: relative;
        background: #111827;
        border: 2px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-color)'};
        border-radius: var(--radius-sm);
        padding: 4px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.2s;
        box-shadow: ${isSelected ? '0 0 12px rgba(212,175,55,0.4)' : 'none'};
      `;
      card.title = item.name;

      card.innerHTML = `
        <div style="width: 100%; height: 60px; border-radius: 4px; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center;">
          <img src="${item.src}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>
        <div style="font-size: 10px; color: ${isSelected ? '#ffd54f' : 'var(--text-light)'}; font-weight: 600; width: 100%; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 4px;">
          ${item.name || 'ស៊ុម PC'}
        </div>
        ${isSelected ? '<span style="position: absolute; top: 2px; right: 2px; background: #10b981; color: #fff; font-size: 9px; padding: 1px 4px; border-radius: 6px; font-weight: bold;">ប្រើ</span>' : ''}
        <button type="button" class="btn-del-pc-frame" style="position: absolute; top: 2px; left: 2px; background: rgba(0,0,0,0.7); border: none; color: #ef4444; width: 18px; height: 18px; border-radius: 50%; font-size: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0.7;" title="លុបស៊ុមនេះ">
          &times;
        </button>
      `;

      // Apply on card click
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-del-pc-frame')) return;
        applyCustomFrame(item);
      });

      // Delete single frame
      card.querySelector('.btn-del-pc-frame').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`តើអ្នកចង់លុបស៊ុម "${item.name}" នេះចេញពីបញ្ជីមែនទេ?`)) {
          let list = getPCCustomFrames();
          list = list.filter(f => f.id !== item.id);
          savePCCustomFrames(list);
          if (engine.state.customFrame?.src === item.src) {
            engine.state.customFrame.src = null;
            engine.state.customFrame.visible = false;
            engine.setFrameStyle('royal-kbach');
            if (customFrameControls) customFrameControls.style.display = 'none';
          }
          renderPcCustomFramesGrid();
        }
      });

      pcFramesGrid.appendChild(card);
    });
  };

  // Multiple File Upload Reader
  const processUploadedFrameFiles = (files) => {
    if (!files || files.length === 0) return;

    const list = getPCCustomFrames();
    let pendingCount = files.length;
    let firstUploadedItem = null;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const frameItem = {
          id: 'pcf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          name: file.name.replace(/\.[^/.]+$/, '').trim() || 'ស៊ុម PC',
          src: evt.target.result,
          addedAt: new Date().toISOString()
        };

        if (!firstUploadedItem) firstUploadedItem = frameItem;
        list.unshift(frameItem);

        pendingCount--;
        if (pendingCount === 0) {
          savePCCustomFrames(list);
          applyCustomFrame(firstUploadedItem);
          renderPcCustomFramesGrid();
          alert(`បានបញ្ចូលស៊ុមចំនួន ${files.length} ពីកុំព្យូទ័របានជោគជ័យ!`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  if (btnBrowseFrame && inputFrameUpload) {
    btnBrowseFrame.addEventListener('click', () => inputFrameUpload.click());
    inputFrameUpload.addEventListener('change', (e) => {
      processUploadedFrameFiles(e.target.files);
      inputFrameUpload.value = '';
    });
  }

  // Drag & drop onto dropzone
  if (frameDropzone) {
    frameDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      frameDropzone.style.borderColor = 'var(--accent-gold)';
      frameDropzone.style.background = 'rgba(212,175,55,0.1)';
    });
    frameDropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      frameDropzone.style.borderColor = 'var(--border-color)';
      frameDropzone.style.background = 'transparent';
    });
    frameDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      frameDropzone.style.borderColor = 'var(--border-color)';
      frameDropzone.style.background = 'transparent';
      if (e.dataTransfer && e.dataTransfer.files) {
        processUploadedFrameFiles(e.dataTransfer.files);
      }
    });
  }

  if (btnClearAllPcFrames) {
    btnClearAllPcFrames.addEventListener('click', () => {
      if (confirm('តើអ្នកពិតជាចង់សម្អាតស៊ុមទាំងអស់ដែលបានបញ្ចូលពីកុំព្យូទ័រមែនទេ?')) {
        savePCCustomFrames([]);
        engine.state.customFrame.src = null;
        engine.state.customFrame.visible = false;
        engine.setFrameStyle('royal-kbach');
        if (customFrameControls) customFrameControls.style.display = 'none';
        renderPcCustomFramesGrid();
        renderFrameList();
      }
    });
  }

  if (btnRemoveCustomFrame) {
    btnRemoveCustomFrame.addEventListener('click', () => {
      engine.state.customFrame.src = null;
      engine.state.customFrame.visible = false;
      if (customFrameControls) customFrameControls.style.display = 'none';
      engine.setFrameStyle('royal-kbach');
      renderFrameList();
      renderPcCustomFramesGrid();
    });
  }

  if (sliderFrameOpacity) {
    sliderFrameOpacity.addEventListener('input', () => {
      const op = parseInt(sliderFrameOpacity.value, 10);
      if (frameOpacityVal) frameOpacityVal.textContent = `${op}%`;
      engine.state.customFrame.opacity = op / 100;
      engine.render();
    });
  }

  if (sliderFrameInset) {
    sliderFrameInset.addEventListener('input', () => {
      const ins = parseInt(sliderFrameInset.value, 10);
      if (frameInsetVal) frameInsetVal.textContent = `${ins}px`;
      engine.state.customFrame.inset = ins;
      engine.render();
    });
  }

  if (selectFrameFit) {
    selectFrameFit.addEventListener('change', () => {
      engine.state.customFrame.fit = selectFrameFit.value;
      engine.render();
    });
  }

  if (toggleInnerCard) {
    toggleInnerCard.addEventListener('change', () => {
      engine.state.showInnerCard = toggleInnerCard.checked;
      engine.render();
    });
  }

  // Initial render of PC custom frames grid
  renderPcCustomFramesGrid();

  // ==========================================
  // Quick Actions: Download PNG & JPG
  // ==========================================
  btnDownloadPng.addEventListener('click', async () => {
    const originalText = btnDownloadPng.innerHTML;
    try {
      btnDownloadPng.innerHTML = '<span>⏳</span> កំពុងដំណើរការ...';
      btnDownloadPng.disabled = true;
      const dataUrl = await engine.exportHighResImage('image/png', 1.0, 3);
      const link = document.createElement('a');
      link.download = `ក្របសៀវភៅ_${engine.state.layers.subject.text.replace(/[^a-zA-Z0-9\u1780-\u17FF]/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('បរាជ័យក្នុងការទាញយក PNG: ' + err.message);
    } finally {
      btnDownloadPng.innerHTML = originalText;
      btnDownloadPng.disabled = false;
    }
  });

  btnDownloadJpg.addEventListener('click', async () => {
    const originalText = btnDownloadJpg.innerHTML;
    try {
      btnDownloadJpg.innerHTML = '<span>⏳</span> កំពុងដំណើរការ...';
      btnDownloadJpg.disabled = true;
      const dataUrl = await engine.exportHighResImage('image/jpeg', 0.95, 3);
      const link = document.createElement('a');
      link.download = `ក្របសៀវភៅ_${engine.state.layers.subject.text.replace(/[^a-zA-Z0-9\u1780-\u17FF]/g, '_')}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('បរាជ័យក្នុងការទាញយក JPG: ' + err.message);
    } finally {
      btnDownloadJpg.innerHTML = originalText;
      btnDownloadJpg.disabled = false;
    }
  });

  btnReset.addEventListener('click', () => {
    if (confirm('តើអ្នកចង់កំណត់ក្របឡើងវិញដូចគំរូដើមមែនទេ?')) {
      engine.setSubjectPreset('khmer');
      syncInputsFromState();
      syncControlsWithLayer();
      renderSubjectList();
    }
  });

  // ==========================================
  // Enhanced A4 Print Studio
  // ==========================================
  function populatePrintSubjectSelects() {
    printSub1Select.innerHTML = '';
    printSub2Select.innerHTML = '';
    SUBJECT_PRESETS.forEach(sub => {
      const opt1 = document.createElement('option');
      opt1.value = sub.id;
      opt1.textContent = sub.name;
      printSub1Select.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = sub.id;
      opt2.textContent = sub.name;
      printSub2Select.appendChild(opt2);
    });

    if (SUBJECT_PRESETS.length > 1) {
      printSub1Select.value = SUBJECT_PRESETS[0].id;
      printSub2Select.value = SUBJECT_PRESETS[1].id;
    }
  }

  btnPrintA4.addEventListener('click', () => {
    populatePrintSubjectSelects();
    renderPrintPreview();
    printModal.classList.add('show');
  });

  closePrintModal.addEventListener('click', () => {
    printModal.classList.remove('show');
  });

  printModeSelect.addEventListener('change', () => {
    const mode = printModeSelect.value;
    if (mode === '2-diff') {
      groupSubject1.style.display = 'block';
      groupSubject2.style.display = 'block';
    } else {
      groupSubject1.style.display = 'none';
      groupSubject2.style.display = 'none';
    }
    renderPrintPreview();
  });

  printSub1Select.addEventListener('change', renderPrintPreview);
  printSub2Select.addEventListener('change', renderPrintPreview);
  printMarginSelect.addEventListener('change', renderPrintPreview);
  toggleCutGuides.addEventListener('change', renderPrintPreview);

  function renderPrintPreview() {
    printPreviewContainer.innerHTML = '';
    const mode = printModeSelect.value;
    const showGuides = toggleCutGuides.checked;
    const marginClass = printMarginSelect.value;

    const currentPresetId = engine.state.presetId;
    const originalSubjectText = engine.state.layers.subject.text;

    const renderSheetElement = (leftPresetId, rightPresetId, sheetIndex, totalSheets) => {
      const sheet = document.createElement('div');
      sheet.className = `a4-sheet-preview ${marginClass}`;
      sheet.innerHTML = `
        <div class="sheet-index-label">ទំព័រ A4 ទី ${sheetIndex} / ${totalSheets}</div>
        <div class="a4-covers-row">
          <div class="a4-cover-item" id="sheet-${sheetIndex}-left"></div>
          ${showGuides ? '<div class="a4-cut-guide"></div>' : ''}
          ${rightPresetId ? `<div class="a4-cover-item" id="sheet-${sheetIndex}-right"></div>` : ''}
        </div>
      `;
      printPreviewContainer.appendChild(sheet);

      // Render Left SVG
      engine.setSubjectPreset(leftPresetId);
      const leftSvg = engine.getLiveSVGString(`p_${sheetIndex}_l`);
      sheet.querySelector(`#sheet-${sheetIndex}-left`).innerHTML = leftSvg;

      // Render Right SVG
      if (rightPresetId) {
        engine.setSubjectPreset(rightPresetId);
        const rightSvg = engine.getLiveSVGString(`p_${sheetIndex}_r`);
        sheet.querySelector(`#sheet-${sheetIndex}-right`).innerHTML = rightSvg;
      }
    };

    if (mode === 'all-12' || mode === 'all-10') {
      const count = mode === 'all-12' ? Math.min(SUBJECT_PRESETS.length, 12) : Math.min(SUBJECT_PRESETS.length, 10);
      const totalSheets = Math.ceil(count / 2);
      printSheetInfoText.textContent = `បោះពុម្ពទាំង ${count} មុខវិជ្ជា (ស្មើ ${totalSheets} សន្លឹក A4)`;

      for (let s = 0; s < totalSheets; s++) {
        const sub1 = SUBJECT_PRESETS[s * 2] ? SUBJECT_PRESETS[s * 2].id : SUBJECT_PRESETS[0].id;
        const sub2 = SUBJECT_PRESETS[s * 2 + 1] ? SUBJECT_PRESETS[s * 2 + 1].id : null;
        renderSheetElement(sub1, sub2, s + 1, totalSheets);
      }
    } else if (mode === '2-diff') {
      printSheetInfoText.textContent = 'បោះពុម្ព ២ មុខវិជ្ជាលើ ១ សន្លឹក A4';
      renderSheetElement(printSub1Select.value, printSub2Select.value, 1, 1);
    } else if (mode === '2-same') {
      printSheetInfoText.textContent = 'បោះពុម្ព ២ ក្របដូចគ្នាលើ ១ សន្លឹក A4';
      renderSheetElement(currentPresetId, currentPresetId, 1, 1);
    } else if (mode === '1-full') {
      printSheetInfoText.textContent = 'បោះពុម្ព ១ ក្របទំហំពេញ ១ សន្លឹក A4';
      renderSheetElement(currentPresetId, null, 1, 1);
    }

    // Restore engine state
    engine.setSubjectPreset(currentPresetId);
    engine.state.layers.subject.text = originalSubjectText;
    engine.render();

    // Sync to print-root for standard window.print()
    const printRoot = document.getElementById('print-root');
    if (printRoot) {
      printRoot.innerHTML = '';
      const previewSheets = printPreviewContainer.querySelectorAll('.a4-sheet-preview');
      previewSheets.forEach(sheet => {
        const clone = sheet.cloneNode(true);
        const label = clone.querySelector('.sheet-index-label');
        if (label) label.remove();
        printRoot.appendChild(clone);
      });
    }
  }

  btnExecutePrint.addEventListener('click', () => {
    try {
      let sheets = printPreviewContainer.querySelectorAll('.a4-sheet-preview');
      if (sheets.length === 0) {
        renderPrintPreview();
        sheets = printPreviewContainer.querySelectorAll('.a4-sheet-preview');
      }

      if (sheets.length === 0) {
        alert('មិនទាន់មានទំព័រសម្រាប់បោះពុម្ពទេ។ សូមសាកល្បងម្តងទៀត!');
        return;
      }

      btnExecutePrint.innerHTML = '<span>⏳</span> កំពុងរៀបចំ...';
      btnExecutePrint.disabled = true;

      // Extract sheets HTML with clean SVG
      let sheetsHtml = '';
      sheets.forEach((sheet) => {
        const clone = sheet.cloneNode(true);
        const label = clone.querySelector('.sheet-index-label');
        if (label) label.remove();
        sheetsHtml += `
          <div class="a4-print-page ${printMarginSelect.value}">
            ${clone.innerHTML}
          </div>
        `;
      });

      // Also ensure parent print-root is updated
      const printRoot = document.getElementById('print-root');
      if (printRoot) {
        printRoot.innerHTML = '';
        sheets.forEach(sheet => {
          const clone = sheet.cloneNode(true);
          const label = clone.querySelector('.sheet-index-label');
          if (label) label.remove();
          printRoot.appendChild(clone);
        });
      }

      // Execute Isolated Iframe Printing (Guarantees zero blank pages in Chrome/Edge)
      executeIsolatedIframePrint(sheetsHtml);

    } catch (err) {
      console.error('Print execution error:', err);
      alert('កំហុសក្នុងការបោះពុម្ព ៖ ' + err.message);
      btnExecutePrint.innerHTML = '<span>🖨️</span> បោះពុម្ពឥឡូវនេះ (Print Now)';
      btnExecutePrint.disabled = false;
    }
  });

  function executeIsolatedIframePrint(sheetsContent) {
    let printIframe = document.getElementById('print-sandbox-frame');
    if (printIframe) {
      printIframe.remove();
    }

    printIframe = document.createElement('iframe');
    printIframe.id = 'print-sandbox-frame';
    printIframe.style.position = 'fixed';
    printIframe.style.top = '0';
    printIframe.style.left = '0';
    printIframe.style.width = '100vw';
    printIframe.style.height = '100vh';
    printIframe.style.opacity = '0.001';
    printIframe.style.border = 'none';
    printIframe.style.zIndex = '-9999';
    printIframe.style.pointerEvents = 'none';
    document.body.appendChild(printIframe);

    const marginVal = printMarginSelect.value;
    const marginPad = marginVal === 'margin-standard' ? '8mm' : (marginVal === 'margin-tight' ? '4mm' : '0mm');

    // Collect all loaded custom @font-face from document
    let customFontsCss = '';
    document.querySelectorAll('style').forEach(s => {
      if (s.textContent && s.textContent.includes('@font-face')) {
        customFontsCss += s.textContent + '\n';
      }
    });

    const iframeHtml = `
      <!DOCTYPE html>
      <html lang="km">
      <head>
        <meta charset="UTF-8">
        <title>បោះពុម្ពក្របសៀវភៅ A4</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&family=Koulen&family=Moul&display=swap" rel="stylesheet">
        <style>
          ${customFontsCss}
          @page {
            size: A4 landscape;
            margin: 0mm;
          }
          *, *:before, *:after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            width: 297mm;
            height: auto;
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #000000;
            font-family: 'Kantumruy Pro', 'Khmer OS Battambang', 'Khmer OS Muol Light', sans-serif;
          }
          .a4-print-page {
            width: 297mm;
            height: 210mm;
            min-height: 210mm;
            max-height: 210mm;
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            break-inside: avoid;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: ${marginPad};
            box-sizing: border-box;
            background: #ffffff;
            position: relative;
            overflow: hidden;
          }
          .a4-print-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
          .a4-covers-row {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            gap: 4mm;
            box-sizing: border-box;
          }
          .a4-cover-item {
            flex: 1 1 0;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
          .a4-cover-item svg {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: calc(210mm - (${marginPad} * 2));
            display: block;
            aspect-ratio: 600 / 850;
          }
          .a4-cut-guide {
            display: block;
            width: 0px;
            height: 96%;
            border-left: 1px dashed #94a3b8;
            margin: 0 1mm;
          }
          .sheet-index-label {
            display: none !important;
          }
        </style>
      </head>
      <body>
        ${sheetsContent}
      </body>
      </html>
    `;

    const frameDoc = printIframe.contentWindow.document;
    frameDoc.open();
    frameDoc.write(iframeHtml);
    frameDoc.close();

    const doPrint = () => {
      try {
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      } catch (e) {
        console.warn('Iframe print fallback to window.print():', e);
        window.print();
      } finally {
        btnExecutePrint.innerHTML = '<span>🖨️</span> បោះពុម្ពឥឡូវនេះ (Print Now)';
        btnExecutePrint.disabled = false;
      }
    };

    if (printIframe.contentWindow.document.fonts) {
      printIframe.contentWindow.document.fonts.ready.then(() => {
        setTimeout(doPrint, 250);
      }).catch(() => {
        setTimeout(doPrint, 350);
      });
    } else {
      setTimeout(doPrint, 350);
    }
  }


  // Download High-Resolution A4 PNGs for easy offline printing
  btnDownloadA4Png.addEventListener('click', async () => {
    const sheets = printPreviewContainer.querySelectorAll('.a4-sheet-preview');
    if (sheets.length === 0) {
      alert('មិនទាន់មានទំព័រសម្រាប់ទាញយកទេ។ សូមសាកល្បងម្តងទៀត!');
      return;
    }

    const origBtnText = btnDownloadA4Png.innerHTML;
    btnDownloadA4Png.innerHTML = '<span>⏳</span> កំពុង Export...';
    btnDownloadA4Png.disabled = true;

    try {
      const mode = printModeSelect.value;
      const count = (mode === 'all-12' || mode === 'all-10') ? (mode === 'all-12' ? 12 : 10) : 2;
      const totalSheets = sheets.length;

      alert(`កំពុងរៀបចំទាញយកសន្លឹក A4 ចំនួន ${totalSheets} សន្លឹក (HD 300 DPI)! វានឹងទាញយកម្តងមួយៗដោយស្វ័យប្រវត្តិ។`);

      for (let s = 0; s < totalSheets; s++) {
        const sheet = sheets[s];
        const svgs = sheet.querySelectorAll('svg');
        if (svgs.length === 0) continue;

        // Render to high-res canvas (2480 x 1754 for A4 landscape at ~300 DPI)
        const canvas = document.createElement('canvas');
        canvas.width = 2480;
        canvas.height = 1754;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate positions
        const marginClass = printMarginSelect.value;
        const marginPx = marginClass === 'margin-standard' ? 68 : (marginClass === 'margin-tight' ? 34 : 0);
        const availWidth = canvas.width - (marginPx * 2);
        const availHeight = canvas.height - (marginPx * 2);

        if (svgs.length === 1) {
          // Single cover centered or full
          const svgData = new XMLSerializer().serializeToString(svgs[0]);
          const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          await drawImageOnCanvas(ctx, url, marginPx, marginPx, availWidth, availHeight);
          URL.revokeObjectURL(url);
        } else if (svgs.length >= 2) {
          // 2 covers side by side
          const coverW = (availWidth - 20) / 2;
          const coverH = availHeight;

          // Left cover
          const leftData = new XMLSerializer().serializeToString(svgs[0]);
          const leftBlob = new Blob([leftData], { type: 'image/svg+xml;charset=utf-8' });
          const leftUrl = URL.createObjectURL(leftBlob);
          await drawImageOnCanvas(ctx, leftUrl, marginPx, marginPx, coverW, coverH);
          URL.revokeObjectURL(leftUrl);

          // Right cover
          const rightData = new XMLSerializer().serializeToString(svgs[1]);
          const rightBlob = new Blob([rightData], { type: 'image/svg+xml;charset=utf-8' });
          const rightUrl = URL.createObjectURL(rightBlob);
          await drawImageOnCanvas(ctx, rightUrl, marginPx + coverW + 20, marginPx, coverW, coverH);
          URL.revokeObjectURL(rightUrl);

          // Draw center cut guide line
          if (toggleCutGuides.checked) {
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.moveTo(marginPx + coverW + 10, marginPx);
            ctx.lineTo(marginPx + coverW + 10, marginPx + coverH);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        const a4DataUrl = canvas.toDataURL('image/png', 1.0);
        const downloadLink = document.createElement('a');
        downloadLink.download = `ក្របសៀវភៅ_A4_សន្លឹកទី_${s + 1}_នៃ_${totalSheets}.png`;
        downloadLink.href = a4DataUrl;
        downloadLink.click();
        await new Promise(r => setTimeout(r, 600));
      }
    } catch (err) {
      console.error('A4 Export error:', err);
      alert('កំហុសក្នុងការទាញយក A4: ' + err.message);
    } finally {
      btnDownloadA4Png.innerHTML = origBtnText;
      btnDownloadA4Png.disabled = false;
    }
  });

  function drawImageOnCanvas(ctx, url, x, y, w, h) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, x, y, w, h);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = url;
    });
  }

  // ==========================================
  // Batch All Subjects Modal
  // ==========================================
  btnBatchModal.addEventListener('click', () => {
    batchGrid.innerHTML = '';
    const currentPresetId = engine.state.presetId;
    const originalSubjectText = engine.state.layers.subject.text;

    SUBJECT_PRESETS.forEach((sub, i) => {
      engine.setSubjectPreset(sub.id);
      const card = document.createElement('div');
      card.className = 'batch-card-item';
      card.innerHTML = `
        <div class="batch-card-title">${i + 1}. ${sub.name}</div>
        <div class="batch-card-svg">${engine.getLiveSVGString(`batch_${sub.id}`)}</div>
      `;
      batchGrid.appendChild(card);
    });

    engine.setSubjectPreset(currentPresetId);
    engine.state.layers.subject.text = originalSubjectText;
    engine.render();

    batchModal.classList.add('show');
  });

  closeBatchModal.addEventListener('click', () => {
    batchModal.classList.remove('show');
  });

  btnExecuteBatchDownload.addEventListener('click', async () => {
    alert('កំពុងដំណើរការទាញយកគ្រប់មុខវិជ្ជា! វានឹងទាញយកជារូបភាព HD ម្តងមួយៗដោយស្វ័យប្រវត្តិ។');
    const currentPresetId = engine.state.presetId;

    for (let i = 0; i < SUBJECT_PRESETS.length; i++) {
      const sub = SUBJECT_PRESETS[i];
      engine.setSubjectPreset(sub.id);
      const dataUrl = await engine.exportHighResImage('image/png', 1.0, 2.5);
      const link = document.createElement('a');
      link.download = `ក្រប_${i + 1}_${sub.name}.png`;
      link.href = dataUrl;
      link.click();
      await new Promise(r => setTimeout(r, 600));
    }

    engine.setSubjectPreset(currentPresetId);
    engine.render();
  });

  // ==========================================
  // Add / Edit Custom Subject Modal
  // ==========================================
  function openSubjectModal(subjectId = null) {
    if (subjectId) {
      const sub = SUBJECT_PRESETS.find(s => s.id === subjectId);
      if (sub) {
        document.getElementById('subject-modal-title').textContent = '✏️ កែសម្រួលមុខវិជ្ជា';
        modalSubjectId.value = sub.id;
        modalSubjectName.value = sub.name;
        modalSubjectSub.value = sub.subtitle || '';
        modalSubjectIcon.value = sub.icon || '📚';
        modalSubjectFrame.value = sub.frameStyle || 'royal-kbach';
        modalSubjectColor.value = sub.themeColor || '#1565c0';
        modalSubjectTextColor.value = sub.defaultColors?.subject || '#1565c0';
        modalColorHex.textContent = modalSubjectColor.value;
        modalTextColorHex.textContent = modalSubjectTextColor.value;
      }
    } else {
      document.getElementById('subject-modal-title').textContent = '➕ បន្ថែមមុខវិជ្ជាថ្មី';
      modalSubjectId.value = '';
      modalSubjectName.value = '';
      modalSubjectSub.value = '';
      modalSubjectIcon.value = '📚';
      modalSubjectFrame.value = 'royal-kbach';
      modalSubjectColor.value = '#0284c7';
      modalSubjectTextColor.value = '#0369a1';
      modalColorHex.textContent = '#0284c7';
      modalTextColorHex.textContent = '#0369a1';
    }
    subjectModal.classList.add('show');
  }

  btnOpenAddSubject.addEventListener('click', () => openSubjectModal(null));
  closeSubjectModal.addEventListener('click', () => subjectModal.classList.remove('show'));
  btnCancelSubjectModal.addEventListener('click', () => subjectModal.classList.remove('show'));

  // Quick chips inside subject modal
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      modalSubjectName.value = chip.getAttribute('data-name');
      modalSubjectSub.value = chip.getAttribute('data-sub');
      modalSubjectIcon.value = chip.getAttribute('data-icon');
      modalSubjectColor.value = chip.getAttribute('data-color');
      modalSubjectTextColor.value = chip.getAttribute('data-color');
      modalColorHex.textContent = chip.getAttribute('data-color');
      modalTextColorHex.textContent = chip.getAttribute('data-color');
    });
  });

  modalSubjectColor.addEventListener('input', () => {
    modalColorHex.textContent = modalSubjectColor.value;
  });
  modalSubjectTextColor.addEventListener('input', () => {
    modalTextColorHex.textContent = modalSubjectTextColor.value;
  });

  btnSaveSubject.addEventListener('click', () => {
    const name = modalSubjectName.value.trim();
    if (!name) {
      alert('សូមបញ្ចូលឈ្មោះមុខវិជ្ជា!');
      return;
    }

    const editId = modalSubjectId.value;
    const subjectData = {
      id: editId || `custom_${Date.now()}`,
      name: name,
      subtitle: modalSubjectSub.value.trim() || 'Custom',
      icon: modalSubjectIcon.value.trim() || '📚',
      themeColor: modalSubjectColor.value,
      frameStyle: modalSubjectFrame.value,
      defaultColors: {
        schoolName: '#0d47a1',
        schoolStroke: '#ffffff',
        grade: '#d84315',
        subject: modalSubjectTextColor.value,
        name: '#2e7d32',
        year: '#6a1b9a'
      },
      defaultFonts: {
        schoolName: 'Moul',
        grade: 'Koulen',
        subject: 'Moul',
        name: 'Koulen',
        year: 'Koulen'
      }
    };

    if (editId) {
      updateCustomSubjectPreset(editId, subjectData);
    } else {
      addCustomSubjectPreset(subjectData);
    }

    renderSubjectList();
    engine.setSubjectPreset(subjectData.id);
    inputSubject.value = engine.state.layers.subject.text;
    syncControlsWithLayer();
    subjectModal.classList.remove('show');
  });

  btnResetDefaultSubjects.addEventListener('click', () => {
    if (confirm('តើអ្នកពិតជាចង់កំណត់ត្រឡប់មកមុខវិជ្ជាដើមវិញទាំងអស់មែនទេ?')) {
      resetSubjectPresetsToDefault();
      renderSubjectList();
      engine.setSubjectPreset(SUBJECT_PRESETS[0].id);
      subjectModal.classList.remove('show');
    }
  });

  // ==========================================
  // Google Sheets Cloud Sync & CSV Import
  // ==========================================
  btnOpenSheetsModal.addEventListener('click', () => {
    sheetsModal.classList.add('show');
  });
  closeSheetsModal.addEventListener('click', () => {
    sheetsModal.classList.remove('show');
  });

  // Sheets Sub-Tabs Switching
  const sheetsTabBtns = document.querySelectorAll('.sheets-tab-btn');
  const sheetsTabPanes = document.querySelectorAll('.sheets-tab-pane');
  sheetsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-sheet-tab');
      sheetsTabBtns.forEach(b => b.classList.remove('active'));
      sheetsTabPanes.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const pane = document.getElementById(targetId);
      if (pane) pane.style.display = 'block';
    });
  });

  // Setup Code Display
  const scriptCode = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["កាលបរិច្ឆេទ", "ឈ្មោះសាលា", "ថ្នាក់ទី", "មុខវិជ្ជា", "ឈ្មោះសិស្ស", "ភេទ/អត្តលេខ", "គ្រូបង្រៀន", "ឆ្នាំសិក្សា"]);
    }
    
    sheet.appendRow([
      data.timestamp || new Date(),
      data.schoolName,
      data.grade,
      data.subject,
      data.studentName,
      data.studentInfoExtra,
      data.teacherName,
      data.academicYear
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "រក្សាទុកបានជោគជ័យ" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
  const scriptCodeDisplay = document.getElementById('script-code-display');
  if (scriptCodeDisplay) scriptCodeDisplay.textContent = scriptCode;

  const btnCopyScript = document.getElementById('btn-copy-script-code');
  if (btnCopyScript) {
    btnCopyScript.addEventListener('click', () => {
      navigator.clipboard.writeText(scriptCode);
      alert('បានចម្លងកូដ Apps Script រួចរាល់!');
    });
  }

  // Backup & Restore
  const btnExportBackup = document.getElementById('btn-export-backup-json');
  if (btnExportBackup) {
    btnExportBackup.addEventListener('click', () => {
      GoogleSheetsManager.exportBackupJSON(engine.state);
    });
  }

  const btnTriggerImport = document.getElementById('btn-trigger-import-json');
  const inputImportJson = document.getElementById('input-import-json-file');
  if (btnTriggerImport && inputImportJson) {
    btnTriggerImport.addEventListener('click', () => inputImportJson.click());
    inputImportJson.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        GoogleSheetsManager.importBackupJSON(file, (data) => {
          if (data && data.engineState) {
            engine.state = { ...engine.state, ...data.engineState };
            engine.render();
            syncInputsFromState();
            syncControlsWithLayer();
            alert('នាំចូលឯកសារ Backup បានជោគជ័យ!');
          }
        }, (err) => alert('កំហុស៖ ' + err.message));
      }
    });
  }

  // Batch CSV Parse
  const btnParseCsv = document.getElementById('btn-parse-csv-textarea');
  const textareaCsv = document.getElementById('textarea-csv-import');
  const importPreviewBox = document.getElementById('import-preview-box');
  const importedCount = document.getElementById('imported-count');
  const importedTbody = document.getElementById('imported-students-tbody');

  let parsedStudents = [];

  if (btnParseCsv && textareaCsv) {
    btnParseCsv.addEventListener('click', () => {
      parsedStudents = GoogleSheetsManager.parseCSV(textareaCsv.value);
      if (parsedStudents.length === 0) {
        alert('មិនមានទិន្នន័យត្រឹមត្រូវក្នុងប្រអប់អត្ថបទទេ!');
        return;
      }

      importedCount.textContent = parsedStudents.length;
      importedTbody.innerHTML = '';

      parsedStudents.forEach(st => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${st.index}</td>
          <td><strong>${st.studentName}</strong></td>
          <td>${st.grade}</td>
          <td>${st.schoolName}</td>
          <td>${st.academicYear}</td>
          <td>
            <button class="btn btn-sm btn-outline apply-st-btn" data-idx="${st.index - 1}">
              🎯 ប្រើលើក្រប
            </button>
          </td>
        `;
        importedTbody.appendChild(tr);
      });

      importPreviewBox.style.display = 'block';

      // Apply student handler
      importedTbody.querySelectorAll('.apply-st-btn').forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.getAttribute('data-idx'), 10);
          const st = parsedStudents[idx];
          if (st) {
            if (st.schoolName) engine.state.layers.schoolName.text = st.schoolName;
            if (st.grade) engine.state.layers.grade.text = st.grade;
            if (st.studentName) engine.state.layers.studentName.text = `ឈ្មោះ ៖ ${st.studentName}`;
            if (st.academicYear) engine.state.layers.academicYear.text = st.academicYear;
            if (st.teacherName) {
              engine.state.layers.teacherName.text = st.teacherName;
              engine.state.layers.teacherName.visible = true;
            }
            engine.render();
            syncInputsFromState();
            sheetsModal.classList.remove('show');
          }
        });
      });
    });
  }

  const btnApplyFirstStudent = document.getElementById('btn-apply-first-student');
  if (btnApplyFirstStudent) {
    btnApplyFirstStudent.addEventListener('click', () => {
      if (parsedStudents.length > 0) {
        const st = parsedStudents[0];
        if (st.schoolName) engine.state.layers.schoolName.text = st.schoolName;
        if (st.grade) engine.state.layers.grade.text = st.grade;
        if (st.studentName) engine.state.layers.studentName.text = `ឈ្មោះ ៖ ${st.studentName}`;
        if (st.academicYear) engine.state.layers.academicYear.text = st.academicYear;
        if (st.teacherName) {
          engine.state.layers.teacherName.text = st.teacherName;
          engine.state.layers.teacherName.visible = true;
        }
        engine.render();
        syncInputsFromState();
        sheetsModal.classList.remove('show');
      }
    });
  }

  // ==========================================
  // Template Database & Cross-Computer Sharing
  // ==========================================
  const databaseModal = document.getElementById('database-modal');
  const btnOpenDatabaseModal = document.getElementById('btn-open-database-modal');
  const closeDatabaseModal = document.getElementById('close-database-modal');
  const closeDatabaseModalFooter = document.getElementById('close-database-modal-footer');
  const inputSaveTemplateName = document.getElementById('input-save-template-name');
  const btnSaveTemplateDb = document.getElementById('btn-save-template-db');
  const inputShareableLinkUrl = document.getElementById('input-shareable-link-url');
  const btnCopyShareUrl = document.getElementById('btn-copy-share-url');
  const dbTemplateCount = document.getElementById('db-template-count');
  const btnRefreshDbTemplates = document.getElementById('btn-refresh-db-templates');
  const btnExportTemplateFile = document.getElementById('btn-export-template-file');
  const btnImportTemplateFile = document.getElementById('btn-import-template-file');
  const inputDbJsonFile = document.getElementById('input-db-json-file');
  const dbTemplatesListContainer = document.getElementById('db-templates-list-container');

  // Check URL on startup for shared template link (#tpl=...)
  if (typeof TemplateManager !== 'undefined') {
    const sharedData = TemplateManager.parseTemplateFromUrl();
    if (sharedData) {
      try {
        engine.state = { ...engine.state, ...sharedData };
        engine.render();
        syncInputsFromState();
        syncControlsWithLayer();
        setTimeout(() => {
          alert('🎉 បានបើក Template ពី Link ចែករំលែកដោយជោគជ័យ!');
        }, 500);
      } catch (err) {
        console.error('Error loading shared template:', err);
      }
    }
  }

  const renderDbTemplatesList = async () => {
    if (!dbTemplatesListContainer || typeof TemplateManager === 'undefined') return;

    dbTemplatesListContainer.innerHTML = '<div style="text-align: center; padding: 25px; color: var(--text-muted); font-size: 13px;"><span>⏳</span> កំពុងទាញយកបញ្ជី Template...</div>';

    try {
      const templates = await TemplateManager.getAllTemplates();
      if (dbTemplateCount) dbTemplateCount.textContent = templates.length;

      if (templates.length === 0) {
        dbTemplatesListContainer.innerHTML = `
          <div style="text-align: center; padding: 30px 20px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
            <div style="font-size: 28px; margin-bottom: 6px;">📂</div>
            <div style="color: #fff; font-size: 13px; font-weight: 600;">មិនទាន់មាន Template ក្នុង Database ឡើយ</div>
            <p style="color: var(--text-muted); font-size: 11.5px; margin: 4px 0 0;">
              សូមវាយឈ្មោះក្នុងប្រអប់ខាងលើ រួចចុច "រក្សាទុក (Save)" ដើម្បីរក្សាទុក Template នេះ!
            </p>
          </div>
        `;
        return;
      }

      dbTemplatesListContainer.innerHTML = '';
      templates.forEach((tpl) => {
        const item = document.createElement('div');
        item.style.cssText = 'background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; transition: all 0.2s;';
        item.onmouseenter = () => { item.style.borderColor = 'var(--border-gold)'; item.style.background = 'rgba(212, 175, 55, 0.06)'; };
        item.onmouseleave = () => { item.style.borderColor = 'var(--border-color)'; item.style.background = 'rgba(255, 255, 255, 0.04)'; };

        const updatedDate = tpl.updatedAt ? new Date(tpl.updatedAt).toLocaleDateString('km-KH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

        item.innerHTML = `
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 13.5px; font-weight: 700; color: #ffd54f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${tpl.name}
            </div>
            <div style="font-size: 11.5px; color: var(--text-light); margin-top: 2px;">
              ${tpl.subject ? `<span>${tpl.subject}</span> • ` : ''}${tpl.grade || ''} ${tpl.schoolName ? `• ${tpl.schoolName}` : ''}
            </div>
            <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">
              កាលបរិច្ឆេទ ៖ ${updatedDate || 'ថ្មីៗ'}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <button type="button" class="btn btn-sm btn-primary btn-load-tpl" style="padding: 6px 12px; font-size: 11.5px;" title="បើកប្រើ Template នេះលើអេក្រង់">
              <span>📂</span> បើកប្រើ
            </button>
            <button type="button" class="btn btn-sm btn-outline btn-share-tpl" style="padding: 6px 10px; font-size: 11.5px; border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;" title="ចម្លង Link ចែករំលែក">
              <span>🔗</span> Link
            </button>
            <button type="button" class="btn btn-sm btn-outline btn-del-tpl" style="padding: 6px 10px; font-size: 11.5px; border-color: rgba(239, 68, 68, 0.4); color: #ef4444;" title="លុប Template">
              <span>🗑️</span>
            </button>
          </div>
        `;

        // Load handler
        item.querySelector('.btn-load-tpl').addEventListener('click', () => {
          if (tpl.data) {
            engine.state = JSON.parse(JSON.stringify(tpl.data));
            engine.render();
            syncInputsFromState();
            syncControlsWithLayer();
            databaseModal.classList.remove('show');
            alert(`បានបើក Template "${tpl.name}" រួចរាល់!`);
          }
        });

        // Share link handler
        item.querySelector('.btn-share-tpl').addEventListener('click', () => {
          if (tpl.data) {
            const shareUrl = TemplateManager.generateShareUrl(tpl.data);
            navigator.clipboard.writeText(shareUrl).then(() => {
              alert(`បានចម្លង Link សម្រាប់ Template "${tpl.name}" រួចរាល់! លោកអ្នកអាចផ្ញើទៅបើកលើកុំព្យូទ័រណាក៏ចេញដូចគ្នាបេះបិទ។`);
            }).catch(() => {
              prompt('ចម្លង Link ខាងក្រោមនេះ ៖', shareUrl);
            });
          }
        });

        // Delete handler
        item.querySelector('.btn-del-tpl').addEventListener('click', async () => {
          if (confirm(`តើអ្នកពិតជាចង់លុប Template "${tpl.name}" មែនទេ?`)) {
            await TemplateManager.deleteTemplate(tpl.id);
            renderDbTemplatesList();
          }
        });

        dbTemplatesListContainer.appendChild(item);
      });
    } catch (err) {
      dbTemplatesListContainer.innerHTML = `<div style="color: #ef4444; padding: 20px; text-align: center; font-size: 12px;">កំហុសក្នុងការទាញយកបញ្ជី ៖ ${err.message}</div>`;
    }
  };

  if (btnOpenDatabaseModal) {
    btnOpenDatabaseModal.addEventListener('click', () => {
      // Update share URL with current cover state
      if (typeof TemplateManager !== 'undefined' && inputShareableLinkUrl) {
        inputShareableLinkUrl.value = TemplateManager.generateShareUrl(engine.state);
      }
      databaseModal.classList.add('show');
      renderDbTemplatesList();
    });
  }

  if (closeDatabaseModal) {
    closeDatabaseModal.addEventListener('click', () => databaseModal.classList.remove('show'));
  }
  if (closeDatabaseModalFooter) {
    closeDatabaseModalFooter.addEventListener('click', () => databaseModal.classList.remove('show'));
  }

  // Save current cover to DB
  if (btnSaveTemplateDb) {
    btnSaveTemplateDb.addEventListener('click', async () => {
      const name = inputSaveTemplateName.value.trim();
      if (!name) {
        alert('សូមបញ្ចូលឈ្មោះ Template!');
        inputSaveTemplateName.focus();
        return;
      }

      try {
        btnSaveTemplateDb.innerHTML = '<span>⏳</span> កំពុង Save...';
        await TemplateManager.saveToDatabase(name, engine.state);
        inputSaveTemplateName.value = '';
        await renderDbTemplatesList();
        alert(`បានរក្សាទុក Template "${name}" ក្នុង Database ជោគជ័យ!`);
      } catch (err) {
        alert('កំហុសក្នុងការរក្សាទុក ៖ ' + err.message);
      } finally {
        btnSaveTemplateDb.innerHTML = '<span>💾</span> រក្សាទុក (Save)';
      }
    });
  }

  // Copy share URL button
  if (btnCopyShareUrl && inputShareableLinkUrl) {
    btnCopyShareUrl.addEventListener('click', () => {
      const url = inputShareableLinkUrl.value;
      if (!url) return;
      navigator.clipboard.writeText(url).then(() => {
        alert('បានចម្លង Link ចែករំលែករួចរាល់! លោកអ្នកអាចផ្ញើតាម Telegram ឬ Messenger ទៅបើកលើកុំព្យូទ័រណាក៏ចេញដូចគ្នាបេះបិទ។');
      }).catch(() => {
        prompt('ចម្លង Link ខាងក្រោមនេះ ៖', url);
      });
    });
  }

  // Refresh list button
  if (btnRefreshDbTemplates) {
    btnRefreshDbTemplates.addEventListener('click', renderDbTemplatesList);
  }

  // Export current template as .json file
  if (btnExportTemplateFile) {
    btnExportTemplateFile.addEventListener('click', () => {
      const subjectName = engine.state.layers?.subject?.text || 'Template';
      TemplateManager.exportToJsonFile(subjectName, engine.state);
    });
  }

  // Import template from .json file
  if (btnImportTemplateFile && inputDbJsonFile) {
    btnImportTemplateFile.addEventListener('click', () => inputDbJsonFile.click());
    inputDbJsonFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const importedState = await TemplateManager.importFromJsonFile(file);
          engine.state = { ...engine.state, ...importedState };
          engine.render();
          syncInputsFromState();
          syncControlsWithLayer();
          databaseModal.classList.remove('show');
          alert(`បានបញ្ចូល Template ពីឯកសារ "${file.name}" ដោយជោគជ័យ!`);
        } catch (err) {
          alert('កំហុសក្នុងការអានឯកសារ ៖ ' + err.message);
        } finally {
          inputDbJsonFile.value = '';
        }
      }
    });
  }
});


