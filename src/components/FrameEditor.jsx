import React from 'react';
import styled from 'styled-components';
import { useAnimation } from './context/AnimationProvider';
import { useSpriteMaker } from './context/SpriteMakerProvider';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0;
  font-family: "TI", sans-serif;
  width: 100%;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TIButton = styled.button`
  background-color: #cccccc;
  border: 2px solid #000000;
  padding: 4px 8px;
  margin: 2px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 11px;
  min-width: 0;
  flex: 1 1 auto;

  &:hover { background-color: #ffffff; }
  &:active { background-color: #999999; }
  &:disabled { background-color: #888888; cursor: not-allowed; opacity: 0.5; }
`;

const DangerButton = styled(TIButton)`
  &:hover { background-color: #ff6666; color: white; }
`;

function FrameEditor() {
  const anim = useAnimation();
  const spriteMaker = useSpriteMaker();

  const {
    currentAnimation,
    currentFrameIndex,
    totalFrames,
    isPlaying,
  } = anim;

  if (!currentAnimation) return null;

  const handleAddBlank = () => {
    anim.addFrame('0'.repeat(16));
  };

  const handleDuplicate = () => {
    anim.duplicateFrame();
  };

  const handleCapture = () => {
    // Capture whatever is currently in the sprite editor as a new frame
    const hex = spriteMaker.getHex();
    anim.addFrame(hex);
  };

  const handleUpdateFromEditor = () => {
    // Push the current editor state into the current frame
    const hex = spriteMaker.getHex();
    anim.updateCurrentFrameHex(hex);
  };

  const handleDelete = () => {
    anim.deleteFrame();
  };

  return (
    <EditorContainer>
      <ButtonRow>
        <TIButton type="button" onClick={handleCapture} disabled={isPlaying}>
          + Capture
        </TIButton>
        <TIButton type="button" onClick={handleDuplicate} disabled={isPlaying || !totalFrames}>
          Duplicate
        </TIButton>
        <TIButton type="button" onClick={handleAddBlank} disabled={isPlaying}>
          + Blank
        </TIButton>
        <TIButton type="button" onClick={handleUpdateFromEditor} disabled={isPlaying || !totalFrames}>
          Update
        </TIButton>
        <DangerButton
          type="button"
          onClick={handleDelete}
          disabled={isPlaying || totalFrames <= 1}
        >
          Delete
        </DangerButton>
      </ButtonRow>
    </EditorContainer>
  );
}

export default FrameEditor;
