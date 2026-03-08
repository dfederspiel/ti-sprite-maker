import { useState, useCallback } from 'react';
import {
  createAnimation, createFrame, getFrameHex, serializeAnimation, deserializeAnimation,
} from '../../models/AnimationModel';

const STORAGE_KEY = 'ti99-animations';

function loadAnimations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map(deserializeAnimation);
    }
  } catch (e) {
    // ignore corrupt data
  }
  return [];
}

function saveAnimations(animations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animations.map(serializeAnimation)));
}

const AnimationContext = () => {
  const [animations, setAnimations] = useState(loadAnimations);
  const [currentAnimation, setCurrentAnimationState] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const setCurrentAnimation = useCallback((animation) => {
    setCurrentAnimationState(animation);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  }, []);

  const getCurrentFrame = useCallback(() => {
    if (!currentAnimation || !currentAnimation.frames.length) return null;
    return currentAnimation.frames[currentFrameIndex] || currentAnimation.frames[0];
  }, [currentAnimation, currentFrameIndex]);

  const getCurrentHex = useCallback(() => {
    const frame = getCurrentFrame();
    return frame ? getFrameHex(frame) : '0'.repeat(16);
  }, [getCurrentFrame]);

  const totalFrames = currentAnimation ? currentAnimation.frames.length : 0;

  // Frame navigation
  const goToFrame = useCallback((index) => {
    if (!currentAnimation) return;
    const clamped = Math.max(0, Math.min(index, currentAnimation.frames.length - 1));
    setCurrentFrameIndex(clamped);
  }, [currentAnimation]);

  const nextFrame = useCallback(() => {
    if (!currentAnimation) return;
    const next = currentFrameIndex + 1;
    if (next >= currentAnimation.frames.length) {
      if (currentAnimation.loop) {
        setCurrentFrameIndex(0);
      } else {
        setIsPlaying(false);
      }
    } else {
      setCurrentFrameIndex(next);
    }
  }, [currentAnimation, currentFrameIndex]);

  const prevFrame = useCallback(() => {
    if (!currentAnimation) return;
    setCurrentFrameIndex(
      currentFrameIndex > 0 ? currentFrameIndex - 1 : currentAnimation.frames.length - 1,
    );
  }, [currentAnimation, currentFrameIndex]);

  // Frame editing
  const updateCurrentFrameHex = useCallback((hex) => {
    if (!currentAnimation) return;
    const updatedFrames = currentAnimation.frames.map((f, i) => {
      if (i === currentFrameIndex) {
        return createFrame(hex, f.duration);
      }
      return f;
    });
    const updated = { ...currentAnimation, frames: updatedFrames };
    setCurrentAnimationState(updated);
  }, [currentAnimation, currentFrameIndex]);

  const addFrame = useCallback((hex) => {
    if (!currentAnimation) return;
    const newFrame = createFrame(hex || '0'.repeat(16));
    const updatedFrames = [...currentAnimation.frames];
    updatedFrames.splice(currentFrameIndex + 1, 0, newFrame);
    const updated = { ...currentAnimation, frames: updatedFrames };
    setCurrentAnimationState(updated);
    setCurrentFrameIndex(currentFrameIndex + 1);
  }, [currentAnimation, currentFrameIndex]);

  const duplicateFrame = useCallback(() => {
    if (!currentAnimation) return;
    const current = currentAnimation.frames[currentFrameIndex];
    const duplicate = createFrame(
      current.chars.map((c) => ({ ...c, position: { ...c.position } })),
      current.duration,
    );
    const updatedFrames = [...currentAnimation.frames];
    updatedFrames.splice(currentFrameIndex + 1, 0, duplicate);
    const updated = { ...currentAnimation, frames: updatedFrames };
    setCurrentAnimationState(updated);
    setCurrentFrameIndex(currentFrameIndex + 1);
  }, [currentAnimation, currentFrameIndex]);

  const deleteFrame = useCallback(() => {
    if (!currentAnimation || currentAnimation.frames.length <= 1) return;
    const updatedFrames = currentAnimation.frames.filter((_, i) => i !== currentFrameIndex);
    const updated = { ...currentAnimation, frames: updatedFrames };
    setCurrentAnimationState(updated);
    setCurrentFrameIndex(Math.min(currentFrameIndex, updatedFrames.length - 1));
  }, [currentAnimation, currentFrameIndex]);

  // Animation management
  const saveAnimation = useCallback(() => {
    if (!currentAnimation) return;
    const existing = animations.findIndex((a) => a.name === currentAnimation.name);
    let updated;
    if (existing >= 0) {
      updated = animations.map((a, i) => (i === existing ? currentAnimation : a));
    } else {
      updated = [...animations, currentAnimation];
    }
    setAnimations(updated);
    saveAnimations(updated);
  }, [currentAnimation, animations]);

  const deleteAnimation = useCallback((name) => {
    const updated = animations.filter((a) => a.name !== name);
    setAnimations(updated);
    saveAnimations(updated);
    if (currentAnimation?.name === name) {
      setCurrentAnimationState(null);
      setCurrentFrameIndex(0);
    }
  }, [animations, currentAnimation]);

  const newAnimation = useCallback((name = 'Untitled', gridSize = 8) => {
    const anim = createAnimation({ name, gridSize });
    setCurrentAnimation(anim);
  }, [setCurrentAnimation]);

  const setFrameRate = useCallback((fps) => {
    if (!currentAnimation) return;
    setCurrentAnimationState({ ...currentAnimation, frameRate: fps });
  }, [currentAnimation]);

  const setLoop = useCallback((loop) => {
    if (!currentAnimation) return;
    setCurrentAnimationState({ ...currentAnimation, loop });
  }, [currentAnimation]);

  return {
    // Animation list
    animations,
    // Current animation
    currentAnimation,
    setCurrentAnimation,
    newAnimation,
    saveAnimation,
    deleteAnimation,
    // Current frame
    currentFrameIndex,
    totalFrames,
    getCurrentFrame,
    getCurrentHex,
    // Frame navigation
    goToFrame,
    nextFrame,
    prevFrame,
    // Frame editing
    updateCurrentFrameHex,
    addFrame,
    duplicateFrame,
    deleteFrame,
    // Playback
    isPlaying,
    setIsPlaying,
    // Settings
    setFrameRate,
    setLoop,
  };
};

export default AnimationContext;
