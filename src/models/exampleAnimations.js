import { createAnimation, createFrame } from './AnimationModel';

/**
 * Example animations for the TI-99/4A sprite maker.
 * Each hex string is 16 chars representing an 8x8 1-bit pattern.
 */

// 2-frame blinking eye
export const blinkingEye = createAnimation({
  name: 'Blinking Eye',
  frameRate: 3,
  frames: [
    // Eye open
    createFrame('3c4299a1a199423c'),
    // Eye half-closed
    createFrame('00003c5a5a3c0000'),
  ],
});

// 4-frame walking figure
export const walkingFigure = createAnimation({
  name: 'Walking Figure',
  frameRate: 6,
  frames: [
    // Standing, arms down
    createFrame('183c18183c5a1824'),
    // Left step, arms swinging
    createFrame('183c18185a3c0814'),
    // Standing, arms down
    createFrame('183c18183c5a1824'),
    // Right step, arms swinging
    createFrame('183c18185a3c1028'),
  ],
});

// 3-frame beating heart
export const beatingHeart = createAnimation({
  name: 'Beating Heart',
  frameRate: 4,
  frames: [
    // Small heart
    createFrame('0000664242240000'),
    // Medium heart
    createFrame('006699995a241800'),
    // Large heart
    createFrame('66ffffffff7e3c18'),
  ],
});

// 6-frame explosion
export const explosion = createAnimation({
  name: 'Explosion',
  frameRate: 8,
  frames: [
    // Spark
    createFrame('0000001818000000'),
    // Small burst
    createFrame('0000183c3c180000'),
    // Medium burst
    createFrame('00183c7e7e3c1800'),
    // Large burst
    createFrame('185a7effff7e5a18'),
    // Debris
    createFrame('2400425a5a420024'),
    // Fading
    createFrame('0000240024000000'),
  ],
});

// 8-frame spinning line
export const spinningLine = createAnimation({
  name: 'Spinning Line',
  frameRate: 10,
  frames: [
    // Vertical
    createFrame('1818181818181818'),
    // Diagonal /
    createFrame('0102040810204080'),
    // Horizontal
    createFrame('000000ff00000000'),
    // Diagonal backslash
    createFrame('8040201008040201'),
    // Vertical again
    createFrame('1818181818181818'),
    // Diagonal /
    createFrame('0102040810204080'),
    // Horizontal
    createFrame('000000ff00000000'),
    // Diagonal backslash
    createFrame('8040201008040201'),
  ],
});

// 4-frame bouncing ball
export const bouncingBall = createAnimation({
  name: 'Bouncing Ball',
  frameRate: 6,
  frames: [
    // Ball at top
    createFrame('3c7e7e7e3c000000'),
    // Ball middle-high
    createFrame('003c7e7e7e3c0000'),
    // Ball at bottom
    createFrame('0000003c7e7e7e3c'),
    // Ball middle-high (going back up)
    createFrame('003c7e7e7e3c0000'),
  ],
});

// 3-frame arrow/cursor blink
export const arrowBlink = createAnimation({
  name: 'Arrow Cursor',
  frameRate: 2,
  frames: [
    // Arrow visible
    createFrame('80c0e0f0e0c08000'),
    // Arrow visible (hold)
    createFrame('80c0e0f0e0c08000'),
    // Arrow hidden
    createFrame('0000000000000000'),
  ],
});

// 12-frame countdown (3, 2, 1, GO!)
export const countdown = createAnimation({
  name: 'Countdown',
  frameRate: 2,
  loop: false,
  frames: [
    // "3"
    createFrame('7e0606063e06067e'),
    // "3" hold
    createFrame('7e0606063e06067e'),
    // "2"
    createFrame('7e060e1c3060607e'),
    // "2" hold
    createFrame('7e060e1c3060607e'),
    // "1"
    createFrame('1838181818187e00'),
    // "1" hold
    createFrame('1838181818187e00'),
    // blank flash
    createFrame('0000000000000000'),
    // "!" exclamation
    createFrame('183c3c3c18001800'),
  ],
});

export const allExamples = [
  blinkingEye,
  walkingFigure,
  beatingHeart,
  explosion,
  spinningLine,
  bouncingBall,
  arrowBlink,
  countdown,
];

/** Generate a random animation with 10 frames of random hex patterns. */
export function createRandomAnimation() {
  const genHex = () => [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  return createAnimation({
    name: 'Random',
    frameRate: 6,
    frames: Array.from({ length: 10 }, () => createFrame(genHex())),
  });
}
