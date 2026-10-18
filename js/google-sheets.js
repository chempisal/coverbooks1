/**
 * Google Sheets Cloud Sync & Batch Student List Processor for Khmer Student Covers
 */

const GoogleSheetsManager = {
  storageKeys: {
    webappUrl: 'khmer_cover_sheets_webapp_url',
    publicSheetUrl: 'khmer_cover_public_sheet_url',
    cloudRecords: 'khmer_cover_cached_cloud_records'
  },

  getWebAppUrl() {
    return localStorage.getItem(this.storageKeys.webappUrl) || '';
  },

  setWebAppUrl(url) {
    if (url) {
      localStorage.setItem(this.storageKeys.webappUrl, url.trim());
    } else {
      localStorage.removeItem(this.storageKeys.webappUrl);
    }
  },

  getPublicSheetUrl() {
    return localStorage.getItem(this.storageKeys.publicSheetUrl) || '';
  },

  setPublicSheetUrl(url) {
    if (url) {
      localStorage.setItem(this.storageKeys.publicSheetUrl, url.trim());
    } else {
      localStorage.removeItem(this.storageKeys.publicSheetUrl);
    }
  },

  async pushCoverToSheets(coverData) {
    const webappUrl = this.getWebAppUrl();
    if (!webappUrl) {
      throw new Error('សូមបញ្ចូល Google Apps Script Web App URL ជាមុនសិន!');
    }

    const payload = {
      action: 'saveCover',
      timestamp: new Date().toISOString(),
      schoolName: coverData.schoolName || '',
      grade: coverData.grade || '',
      subject: coverData.subject || '',
      studentName: coverData.studentName || '',
      studentInfoExtra: coverData.studentInfoExtra || '',
      teacherName: coverData.teacherName || '',
      academicYear: coverData.academicYear || '',
      presetId: coverData.presetId || '',
      frameStyle: coverData.frameStyle || '',
      fullJson: JSON.stringify(coverData)
    };

    const response = await fetch(webappUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result;
  },

  async pullCoversFromSheets() {
    const webappUrl = this.getWebAppUrl();
    if (!webappUrl) {
      throw new Error('សូមបញ្ចូល Google Apps Script Web App URL ជាមុនសិន!');
    }

    const fetchUrl = `${webappUrl}${webappUrl.includes('?') ? '&' : '?'}action=getCovers&t=${Date.now()}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    if (data.status === 'success' && Array.isArray(data.records)) {
      localStorage.setItem(this.storageKeys.cloudRecords, JSON.stringify(data.records));
      return data.records;
    }
    throw new Error(data.message || 'មិនអាចទាញទិន្នន័យពី Google Sheets បានទេ');
  },

  parseCSV(csvText) {
    if (!csvText || !csvText.trim()) return [];

    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if ((char === ',' || char === '\t') && !inQuotes) {
          result.push(current.trim().replace(/^["']|["']$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      return result;
    };

    const headers = parseLine(lines[0]);
    const students = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = parseLine(lines[i]);
      if (values.length >= 1 && values[0]) {
        students.push({
          index: students.length + 1,
          schoolName: values[0] || '',
          grade: values[1] || '',
          studentName: values[2] || '',
          academicYear: values[3] || '',
          teacherName: values[4] || '',
          studentInfoExtra: values[5] || ''
        });
      }
    }

    return students;
  },

  exportBackupJSON(engineState) {
    const backupData = {
      version: '2.0-khmer-pro',
      exportedAt: new Date().toISOString(),
      engineState: engineState,
      customSubjects: typeof SUBJECT_PRESETS !== 'undefined' ? SUBJECT_PRESETS : []
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Khmer-Book-Cover-Backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importBackupJSON(jsonFile, onSuccess, onError) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (onSuccess) onSuccess(data);
      } catch (err) {
        if (onError) onError(err);
      }
    };
    reader.onerror = () => {
      if (onError) onError(new Error('បរាជ័យក្នុងការអានឯកសារ JSON'));
    };
    reader.readAsText(jsonFile);
  }
};
