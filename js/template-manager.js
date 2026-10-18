/**
 * Template Database & Multi-Computer Sharing Manager
 * Supports:
 * 1. Server Database API (/api/templates) - saved templates sync across all computers
 * 2. Instant Shareable URL (Hash encoding) - send link to any PC/Phone to open identical cover
 * 3. File Import/Export (.json) - backup and restore templates anywhere
 * 4. LocalStorage Fallback - works even offline without server
 */

const TemplateManager = {
  storageKey: 'khmer_bookcover_local_templates',

  /**
   * Save a template to the Server Database
   */
  async saveToDatabase(name, state) {
    if (!name || !name.trim()) throw new Error('សូមបញ្ចូលឈ្មោះគំរូ Template!');

    const payload = {
      name: name.trim(),
      subject: state.layers?.subject?.text || '',
      schoolName: state.layers?.schoolName?.text || '',
      grade: state.layers?.grade?.text || '',
      academicYear: state.layers?.academicYear?.text || '',
      data: state
    };

    // Try server API first
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const res = await response.json();
      if (res.success) {
        // Also save to localStorage backup
        this.saveToLocalStorage(res.template);
        return res.template;
      }
    } catch (err) {
      console.warn('Server API unavailable, saving to local database fallback', err);
    }

    // Fallback: save to LocalStorage
    const localItem = {
      id: 'local_' + Date.now(),
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.saveToLocalStorage(localItem);
    return localItem;
  },

  /**
   * Fetch all saved templates from Server Database
   */
  async getAllTemplates() {
    try {
      const response = await fetch('/api/templates?t=' + Date.now());
      if (response.ok) {
        const res = await response.json();
        if (res.success && Array.isArray(res.templates)) {
          // Merge with any local offline templates
          const localList = this.getLocalTemplates();
          const serverIds = new Set(res.templates.map(t => t.id));
          const merged = [...res.templates];
          localList.forEach(lt => {
            if (!serverIds.has(lt.id)) merged.push(lt);
          });
          return merged;
        }
      }
    } catch (err) {
      console.warn('Server API unavailable, reading from local database', err);
    }

    // Fallback: Return LocalStorage templates
    return this.getLocalTemplates();
  },

  /**
   * Delete a template from Server Database
   */
  async deleteTemplate(id) {
    try {
      await fetch('/api/templates/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ id })
      });
    } catch (err) {
      console.warn('Server delete failed, deleting locally', err);
    }
    this.deleteFromLocalStorage(id);
    return true;
  },

  /**
   * Generate an instant Shareable URL that opens the identical cover on ANY computer
   */
  generateShareUrl(state) {
    try {
      const cleanState = JSON.parse(JSON.stringify(state));
      // Remove large custom photo data from URL if any, or keep essential properties
      const jsonStr = JSON.stringify(cleanState);
      const encoded = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
      }));
      const baseUrl = window.location.origin + window.location.pathname;
      return `${baseUrl}#tpl=${encoded}`;
    } catch (err) {
      console.error('Share URL generation failed:', err);
      throw new Error('មិនអាចបង្កើត Link ចែករំលែកបានទេ៖ ' + err.message);
    }
  },

  /**
   * Read template from URL Hash (if opened via share link)
   */
  parseTemplateFromUrl() {
    const hash = window.location.hash;
    if (!hash || !hash.includes('#tpl=')) return null;

    try {
      const encoded = hash.split('#tpl=')[1];
      const jsonStr = decodeURIComponent(Array.prototype.map.call(atob(encoded), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonStr);
    } catch (err) {
      console.warn('Failed to parse template from URL:', err);
      return null;
    }
  },

  /**
   * Export template as a downloadable .json file
   */
  exportToJsonFile(name, state) {
    const fileName = (name || 'khmer-bookcover-template').replace(/[/\\?%*:|"<>]/g, '-') + '.json';
    const jsonStr = JSON.stringify({
      appName: 'KhmerStudentBookCoverStudio',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      name: name,
      templateData: state
    }, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Read template from imported .json file
   */
  async importFromJsonFile(file) {
    if (!file) throw new Error('គ្មានឯកសារត្រូវបានជ្រើសរើសទេ');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.templateData) {
            resolve(parsed.templateData);
          } else if (parsed.layers) {
            resolve(parsed);
          } else {
            throw new Error('ទម្រង់ឯកសារមិនត្រឹមត្រូវ');
          }
        } catch (err) {
          reject(new Error('បរាជ័យក្នុងការអានឯកសារ JSON: ' + err.message));
        }
      };
      reader.onerror = () => reject(new Error('បរាជ័យក្នុងការអានឯកសារ'));
      reader.readAsText(file);
    });
  },

  // LocalStorage Helpers
  getLocalTemplates() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveToLocalStorage(item) {
    const list = this.getLocalTemplates();
    const idx = list.findIndex(t => t.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  },

  deleteFromLocalStorage(id) {
    let list = this.getLocalTemplates();
    list = list.filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }
};
