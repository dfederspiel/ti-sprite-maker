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
  background-color: var(--ti-btnBg);
  border: 1px solid var(--ti-btnBorder);
  color: var(--ti-btnText);
  padding: 4px 8px;
  margin: 2px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 0.8rem;
  min-width: 0;
  flex: 1 1 auto;

  &:hover { background-color: var(--ti-btnHoverBg); }
  &:active { background-color: var(--ti-btnActiveBg); }
  &:disabled { background-color: var(--ti-btnDisabledBg); color: var(--ti-btnDisabledText); cursor: not-allowed; }
`;

const DangerButton = styled(TIButton)`
  &:hover { background-color: var(--ti-dangerHoverBg); color: var(--ti-dangerHoverText); }
`;

const SectionLabel = styled.div`
  font-size: 0.8rem;
  font-family: "TI", sans-serif;
  color: var(--ti-labelColor);
  margin: 8px 0 4px;
  border-bottom: 1px solid var(--ti-labelBorder);
  padding-bottom: 2px;
  width: 100%;
  text-align: center;
`;

function FrameEditor() {
  const anim = useAnimation();
  const spriteMaker = useSpriteMaker();
  const { currentAnimation, totalFrames, isPlaying } = anim;

  if (!currentAnimation) return null;

  return (
    <EditorContainer>
      <SectionLabel>Frame Tools</SectionLabel>
      <ButtonRow>
        <TIButton type="button" onClick={() => anim.addFrame(spriteMaker.getHex())} disabled={isPlaying}>+ Capture</TIButton>
        <TIButton type="button" onClick={() => anim.duplicateFrame()} disabled={isPlaying || !totalFrames}>Duplicate</TIButton>
        <TIButton type="button" onClick={() => anim.addFrame('0'.repeat(16))} disabled={isPlaying}>+ Blank</TIButton>
      </ButtonRow>
      <ButtonRow>
        <TIButton type="button" onClick={() => anim.updateCurrentFrameHex(spriteMaker.getHex())} disabled={isPlaying || !totalFrames}>Update</TIButton>
        <DangerButton type="button" onClick={() => anim.deleteFrame()} disabled={isPlaying || totalFrames <= 1}>Delete</DangerButton>
      </ButtonRow>
    </EditorContainer>
  );
}

export default FrameEditor;
