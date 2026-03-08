/**
 * Theme definitions for TI-99/4A Sprite Maker.
 *
 * "classic" — TI-99/4A boot screen aesthetic (cyan bg, black text)
 * "dark"    — Modern dark workstation
 *
 * Each token maps to a CSS custom property: --ti-{token}
 */

export const themes = {
  classic: {
    // Surfaces
    shellBg: '#40f0f0',
    titleBarBg: '#000000',
    titleBarBorder: '#000000',
    titleBarText: '#40f0f0',
    panelBg: '#e0e0e0',
    panelBorder: '#000000',
    canvasBg: '#cccccc',
    canvasBorder: '#000000',
    // Text
    textPrimary: '#000000',
    textSecondary: '#333333',
    textMuted: '#666666',
    accentColor: '#000000',
    // Buttons
    btnBg: '#cccccc',
    btnBorder: '#000000',
    btnText: '#000000',
    btnHoverBg: '#ffffff',
    btnActiveBg: '#999999',
    btnDisabledBg: '#888888',
    btnDisabledText: '#555555',
    // Active/selected button
    btnActiveSel: '#40f0f0',
    btnActiveSelBorder: '#000000',
    btnActiveSelText: '#000000',
    // Inputs
    inputBg: '#ffffff',
    inputBorder: '#000000',
    inputText: '#000000',
    // Slider
    sliderTrack: '#cccccc',
    sliderBorder: '#000000',
    sliderThumb: '#000000',
    // Hex display
    hexBg: '#000000',
    hexText: '#40f0f0',
    hexBorder: '#000000',
    // Section labels
    labelColor: '#000000',
    labelBorder: '#000000',
    // Filmstrip / thumbnails
    filmBg: '#000000',
    filmBorder: '#000000',
    thumbBorder: '#666666',
    thumbActiveBorder: '#ffff00',
    thumbPixelOn: '#40f0f0',
    thumbPixelOff: '#000000',
    // Icons
    iconColor: '#000000',
    // Grid block off state
    blockOff: '#ffffff',
    // Color picker tile border
    tileBorder: '#000000',
    tileHoverBorder: '#ffffff',
    // Code block
    codeBg: '#000000',
    codeText: '#40f0f0',
    codeBorder: '#000000',
    // Danger button hover
    dangerHoverBg: '#ff6666',
    dangerHoverText: '#ffffff',
    // Placeholder
    placeholderText: '#666666',
    // Copied badge
    copiedColor: '#21c842',
  },
  dark: {
    shellBg: '#1a1a2e',
    titleBarBg: '#0f0f23',
    titleBarBorder: '#40f0f0',
    titleBarText: '#40f0f0',
    panelBg: '#16213e',
    panelBorder: '#333333',
    canvasBg: '#0f0f23',
    canvasBorder: '#444444',
    textPrimary: '#e0e0e0',
    textSecondary: '#cccccc',
    textMuted: '#aaaaaa',
    accentColor: '#40f0f0',
    btnBg: '#2a2a4a',
    btnBorder: '#444444',
    btnText: '#cccccc',
    btnHoverBg: '#3a3a5a',
    btnActiveBg: '#1a1a3a',
    btnDisabledBg: '#1a1a2e',
    btnDisabledText: '#555555',
    btnActiveSel: '#0a3a3a',
    btnActiveSelBorder: '#40f0f0',
    btnActiveSelText: '#40f0f0',
    inputBg: '#0f0f23',
    inputBorder: '#444444',
    inputText: '#e0e0e0',
    sliderTrack: '#333333',
    sliderBorder: '#555555',
    sliderThumb: '#40f0f0',
    hexBg: '#000000',
    hexText: '#40f0f0',
    hexBorder: '#40f0f0',
    labelColor: '#40f0f0',
    labelBorder: '#333333',
    filmBg: '#0a0a1a',
    filmBorder: '#333333',
    thumbBorder: '#333333',
    thumbActiveBorder: '#40f0f0',
    thumbPixelOn: '#40f0f0',
    thumbPixelOff: '#000000',
    iconColor: '#40f0f0',
    blockOff: '#1a1a2e',
    tileBorder: '#333333',
    tileHoverBorder: '#ffffff',
    codeBg: '#0a0a1a',
    codeText: '#40f0f0',
    codeBorder: '#333333',
    dangerHoverBg: '#5a2020',
    dangerHoverText: '#ff6666',
    placeholderText: '#666666',
    copiedColor: '#21c842',
  },
};

export const themeNames = Object.keys(themes);

/**
 * Convert a theme object into CSS custom property declarations.
 */
export function themeToCSSVars(themeName) {
  const t = themes[themeName];
  if (!t) return '';
  return Object.entries(t)
    .map(([key, val]) => `--ti-${key}: ${val};`)
    .join('\n  ');
}
