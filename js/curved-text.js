/**
 * Curved Text & Typography Engine for Khmer Book Cover
 * Produces crisp, non-breaking Khmer script on curved trajectories using SVG textPath
 */

const CurvedTextEngine = {
  /**
   * Calculate SVG Arc Path string for curved text
   * @param {number} cx - Center X
   * @param {number} cy - Center Y
   * @param {number} width - Base width of curve span
   * @param {number} curvature - Curvature value (-100 to 100). Positive is arch up, negative is arch down, 0 is straight line.
   * @returns {string} SVG Path d attribute
   */
  generatePath(cx, cy, width, curvature) {
    if (Math.abs(curvature) < 1) {
      // Straight line
      const x1 = cx - width / 2;
      const x2 = cx + width / 2;
      return `M ${x1},${cy} L ${x2},${cy}`;
    }

    // Convert curvature (-100 to 100) to arc height / radius
    // Positive curvature: arch upward (center is higher than ends)
    // Negative curvature: arch downward (center is lower than ends)
    const arcHeight = (curvature / 100) * (width * 0.45);
    const x1 = cx - width / 2;
    const x2 = cx + width / 2;
    
    // Smooth quadratic bezier curve
    const cpY = cy - arcHeight * 2;
    return `M ${x1},${cy + arcHeight * 0.5} Q ${cx},${cpY} ${x2},${cy + arcHeight * 0.5}`;
  },

  /**
   * Build SVG Gradient defs
   * @param {string} id - Unique gradient ID
   * @param {string} color1 - Start color
   * @param {string} color2 - End color
   * @param {number} angle - Gradient angle in degrees
   * @returns {string} SVG <linearGradient> string
   */
  createGradientDef(id, color1, color2, angle = 90) {
    return `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="50%" stop-color="${color2 || color1}" />
        <stop offset="100%" stop-color="${color1}" />
      </linearGradient>
    `;
  },

  /**
   * Build SVG Drop Shadow / Glow Filter def
   * @param {string} id - Filter ID
   * @param {string} color - Shadow color
   * @param {number} blur - Blur radius
   * @param {number} dx - Offset X
   * @param {number} dy - Offset Y
   * @returns {string} SVG <filter> string
   */
  createGlowFilter(id, color = '#ffffff', blur = 4, dx = 0, dy = 1) {
    return `
      <filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${blur}" flood-color="${color}" flood-opacity="0.85" />
      </filter>
    `;
  }
};
