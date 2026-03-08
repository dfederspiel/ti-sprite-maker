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
  gap: 3px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const TIButton = styled.button`
  background-color: #2a2a4a;
  border: 1px solid #444;
  color: #ccc;
  padding: 4px 8px;
  margin: 2px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 11px;
  min-width: 0;
  flex: 1 1 auto;

  &:hover { background-color: #3a3a5a; color: #fff; }
  &:active { background-color: #1a1a3a; }
  &:disabled { background-color: #1a1a2e; color: #555; cursor: not-allowed; }
`;

const DangerButton = styled(TIButton)`
  &:hover { background-color: #5a2020; color: #ff6666; }
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-family: "TI", sans-serif;
  color: #40f0f0;
  margin: 8px 0 4px;
  border-bottom: 1px solid #333;
  padding-bottom: 2px;
  width: 100%;
  text-align: center;
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
    const hex = spriteMaker.getHex();
    anim.addFrame(hex);
  };

  const handleUpdateFromEditor = () => {
    const hex = spriteMaker.getHex();
    anim.updateCurrentFrameHex(hex);
  };

  const handleDelete = () => {
    anim.deleteFrame();
  };

  return (
    <EditorContainer>
      <SectionLabel>Frame Tools</SectionLabel>
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
      </ButtonRow>
      <ButtonRow>
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
