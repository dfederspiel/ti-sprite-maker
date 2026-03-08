/**
 * Animation data model for TI-99/4A sprite animations.
 *
 * A Frame holds one or more CharDefs arranged in a grid,
 * supporting single-char (8x8) through multi-char sprites
 * up to the TI-99's maximum of 2x2 (16x16) for sprites,
 * or arbitrary arrangements for character-based animations.
 *
 * TI-99/4A constraints:
 * - Each character pattern is 8x8 pixels, 1-bit color
 * - Hex encoding: 16 hex chars per 8x8 character
 * - Hardware sprites support up to 16x16 (2x2 chars)
 * - 15 colors + transparent (codes 1-15)
 * - CALL CHAR defines patterns, CALL SPRITE places them
 */

/**
 * Create a character definition for one 8x8 tile within a sprite.
 * @param {string} hex - 16-char hex string for the 8x8 pattern
 * @param {number} row - Row position in the multi-char grid (0-based)
 * @param {number} col - Column position in the multi-char grid (0-based)
 * @param {number} colorCode - TI-99 color code (1-15)
 * @returns {CharDef}
 */
export function createCharDef(hex = '0'.repeat(16), row = 0, col = 0, colorCode = 1) {
  return {
    hex,
    position: { row, col },
    colorCode,
  };
}

/**
 * Create a single animation frame.
 * For a simple 8x8 sprite, chars will contain one CharDef.
 * For a 16x16 sprite, chars will contain four CharDefs in a 2x2 grid.
 * @param {string|CharDef[]} hexOrChars - hex string (for single-char) or array of CharDefs
 * @param {number} [duration] - optional per-frame duration in ms (overrides animation FPS)
 * @returns {Frame}
 */
export function createFrame(hexOrChars, duration) {
  let chars;
  if (typeof hexOrChars === 'string') {
    chars = [createCharDef(hexOrChars)];
  } else if (Array.isArray(hexOrChars)) {
    chars = hexOrChars;
  } else {
    chars = [createCharDef()];
  }

  return {
    chars,
    duration: duration || null,
  };
}

/**
 * Create a new animation.
 * @param {object} opts
 * @param {string} opts.name - Display name
 * @param {Frame[]} opts.frames - Ordered frame sequence
 * @param {number} [opts.frameRate=5] - Default playback FPS
 * @param {boolean} [opts.loop=true] - Whether to loop
 * @param {object} [opts.gridSize] - Character grid dimensions
 * @param {number} [opts.gridSize.rows=1] - Rows of 8x8 chars (1 or 2)
 * @param {number} [opts.gridSize.cols=1] - Cols of 8x8 chars (1 or 2)
 * @returns {Animation}
 */
export function createAnimation({
  name = 'Untitled',
  frames = [],
  frameRate = 5,
  loop = true,
  gridSize = { rows: 1, cols: 1 },
} = {}) {
  return {
    name,
    frames: frames.length > 0 ? frames : [createFrame()],
    frameRate,
    loop,
    gridSize,
  };
}

/**
 * Get the primary hex string for a frame (first CharDef).
 * Convenience for single-char sprites.
 * @param {Frame} frame
 * @returns {string}
 */
export function getFrameHex(frame) {
  return frame.chars[0]?.hex || '0'.repeat(16);
}

/**
 * Get all hex strings for a frame, ordered by position (row-major).
 * @param {Frame} frame
 * @returns {string[]}
 */
export function getFrameHexList(frame) {
  return [...frame.chars]
    .sort((a, b) => a.position.row - b.position.row || a.position.col - b.position.col)
    .map((c) => c.hex);
}

/**
 * Generate TI-BASIC CALL CHAR statements for an animation.
 * Assigns character codes starting from startChar.
 * @param {Animation} animation
 * @param {number} startChar - Starting character code (default 96)
 * @returns {string[]} Array of TI-BASIC lines
 */
export function exportToTIBasic(animation, startChar = 96) {
  const lines = [];
  let lineNum = 100;
  const uniquePatterns = new Map();

  // Collect unique patterns and assign character codes
  animation.frames.forEach((frame) => {
    frame.chars.forEach((charDef) => {
      if (!uniquePatterns.has(charDef.hex)) {
        uniquePatterns.set(charDef.hex, startChar + uniquePatterns.size);
      }
    });
  });

  // CALL CHAR for each unique pattern
  lines.push(`${lineNum} REM ${animation.name.toUpperCase()}`);
  lineNum += 10;

  uniquePatterns.forEach((charCode, hex) => {
    lines.push(`${lineNum} CALL CHAR(${charCode},"${hex.toUpperCase()}")`);
    lineNum += 10;
  });

  // Animation loop using CALL PATTERN (sprite) or CALL HCHAR (character)
  const charsPerFrame = animation.gridSize.rows * animation.gridSize.cols;
  if (charsPerFrame === 1) {
    // Simple single-char animation loop
    lines.push(`${lineNum} REM ANIMATION LOOP`);
    lineNum += 10;

    const delay = Math.round(1000 / animation.frameRate);
    animation.frames.forEach((frame) => {
      const charCode = uniquePatterns.get(frame.chars[0].hex);
      lines.push(`${lineNum} CALL HCHAR(12,16,${charCode})`);
      lineNum += 10;
      // Simple delay loop
      lines.push(`${lineNum} FOR D=1 TO ${Math.max(1, Math.round(delay / 50))}`);
      lineNum += 10;
      lines.push(`${lineNum} NEXT D`);
      lineNum += 10;
    });

    if (animation.loop) {
      // GOTO the start of the animation loop
      const loopStart = 100 + 10 + (uniquePatterns.size * 20) + 10;
      lines.push(`${lineNum} GOTO ${loopStart}`);
    }
  }

  return lines;
}

/**
 * Serialize an animation for storage (JSON-compatible).
 * @param {Animation} animation
 * @returns {object}
 */
export function serializeAnimation(animation) {
  return {
    name: animation.name,
    frames: animation.frames.map((f) => ({
      chars: f.chars.map((c) => ({
        hex: c.hex,
        position: { ...c.position },
        colorCode: c.colorCode,
      })),
      duration: f.duration,
    })),
    frameRate: animation.frameRate,
    loop: animation.loop,
    gridSize: { ...animation.gridSize },
  };
}

/**
 * Deserialize an animation from stored JSON.
 * @param {object} data
 * @returns {Animation}
 */
export function deserializeAnimation(data) {
  return createAnimation({
    name: data.name,
    frames: data.frames.map((f) => createFrame(
      f.chars.map((c) => createCharDef(c.hex, c.position.row, c.position.col, c.colorCode)),
      f.duration,
    )),
    frameRate: data.frameRate,
    loop: data.loop,
    gridSize: data.gridSize,
  });
}
