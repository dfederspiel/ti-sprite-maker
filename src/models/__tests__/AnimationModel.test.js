import { describe, it, expect } from 'vitest';
import {
  createCharDef,
  createFrame,
  createAnimation,
  getFrameHex,
  getFrameHexList,
  exportToTIBasic,
  serializeAnimation,
  deserializeAnimation,
} from '../AnimationModel';

describe('AnimationModel', () => {
  describe('createCharDef', () => {
    it('creates a default CharDef', () => {
      const def = createCharDef();
      expect(def.hex).toBe('0'.repeat(16));
      expect(def.position).toEqual({ row: 0, col: 0 });
      expect(def.colorCode).toBe(1);
    });

    it('creates a CharDef with custom values', () => {
      const def = createCharDef('ff00ff00ff00ff00', 1, 1, 5);
      expect(def.hex).toBe('ff00ff00ff00ff00');
      expect(def.position).toEqual({ row: 1, col: 1 });
      expect(def.colorCode).toBe(5);
    });
  });

  describe('createFrame', () => {
    it('creates a frame from a hex string', () => {
      const frame = createFrame('183c7e7e3c180000');
      expect(frame.chars).toHaveLength(1);
      expect(frame.chars[0].hex).toBe('183c7e7e3c180000');
      expect(frame.duration).toBeNull();
    });

    it('creates a frame from CharDef array', () => {
      const chars = [
        createCharDef('ff00ff00ff00ff00', 0, 0),
        createCharDef('00ff00ff00ff00ff', 0, 1),
      ];
      const frame = createFrame(chars, 200);
      expect(frame.chars).toHaveLength(2);
      expect(frame.duration).toBe(200);
    });

    it('creates a default frame with no args', () => {
      const frame = createFrame();
      expect(frame.chars).toHaveLength(1);
      expect(frame.chars[0].hex).toBe('0'.repeat(16));
    });
  });

  describe('createAnimation', () => {
    it('creates a default animation', () => {
      const anim = createAnimation();
      expect(anim.name).toBe('Untitled');
      expect(anim.frames).toHaveLength(1);
      expect(anim.frameRate).toBe(5);
      expect(anim.loop).toBe(true);
      expect(anim.gridSize).toEqual({ rows: 1, cols: 1 });
    });

    it('creates an animation with custom frames', () => {
      const frames = [createFrame('ff'.repeat(8)), createFrame('00'.repeat(8))];
      const anim = createAnimation({ name: 'Test', frames, frameRate: 10 });
      expect(anim.name).toBe('Test');
      expect(anim.frames).toHaveLength(2);
      expect(anim.frameRate).toBe(10);
    });
  });

  describe('getFrameHex', () => {
    it('returns hex from single-char frame', () => {
      const frame = createFrame('183c7e7e3c180000');
      expect(getFrameHex(frame)).toBe('183c7e7e3c180000');
    });
  });

  describe('getFrameHexList', () => {
    it('returns sorted hex list for multi-char frame', () => {
      const chars = [
        createCharDef('bbbbbbbbbbbbbbbb', 1, 0),
        createCharDef('aaaaaaaaaaaaaaaa', 0, 0),
        createCharDef('cccccccccccccccc', 0, 1),
      ];
      const frame = createFrame(chars);
      const list = getFrameHexList(frame);
      expect(list).toEqual([
        'aaaaaaaaaaaaaaaa',
        'cccccccccccccccc',
        'bbbbbbbbbbbbbbbb',
      ]);
    });
  });

  describe('exportToTIBasic', () => {
    it('generates valid TI-BASIC lines', () => {
      const anim = createAnimation({
        name: 'Test',
        frames: [
          createFrame('183c7e7e3c180000'),
          createFrame('0000183c3c180000'),
        ],
        frameRate: 5,
      });
      const lines = exportToTIBasic(anim);
      expect(lines[0]).toContain('REM TEST');
      expect(lines[1]).toContain('CALL CHAR(96,');
      expect(lines.some((l) => l.includes('CALL HCHAR'))).toBe(true);
      expect(lines[lines.length - 1]).toContain('GOTO');
    });

    it('omits GOTO for non-looping animations', () => {
      const anim = createAnimation({
        name: 'Once',
        frames: [createFrame('ff'.repeat(8))],
        loop: false,
      });
      const lines = exportToTIBasic(anim);
      expect(lines.some((l) => l.includes('GOTO'))).toBe(false);
    });
  });

  describe('serialize / deserialize', () => {
    it('round-trips an animation', () => {
      const original = createAnimation({
        name: 'RoundTrip',
        frames: [
          createFrame('183c7e7e3c180000'),
          createFrame('0000183c3c180000', 200),
        ],
        frameRate: 8,
        loop: false,
        gridSize: { rows: 2, cols: 2 },
      });
      const serialized = serializeAnimation(original);
      const restored = deserializeAnimation(serialized);
      expect(restored.name).toBe('RoundTrip');
      expect(restored.frames).toHaveLength(2);
      expect(restored.frameRate).toBe(8);
      expect(restored.loop).toBe(false);
      expect(restored.gridSize).toEqual({ rows: 2, cols: 2 });
      expect(getFrameHex(restored.frames[0])).toBe('183c7e7e3c180000');
      expect(restored.frames[1].duration).toBe(200);
    });
  });
});
