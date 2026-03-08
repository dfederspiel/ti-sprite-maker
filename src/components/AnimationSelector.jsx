import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnimation } from './context/AnimationProvider';
import { allExamples } from '../models/exampleAnimations';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "TI", sans-serif;
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
  font-size: 11px;
  min-width: 0;
  flex: 1 1 auto;

  &:hover { background-color: var(--ti-btnHoverBg); }
  &:active { background-color: var(--ti-btnActiveBg); }
`;

const ActiveButton = styled(TIButton)`
  background-color: var(--ti-btnActiveSel);
  border-color: var(--ti-btnActiveSelBorder);
  color: var(--ti-btnActiveSelText);
  font-weight: bold;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-family: "TI", sans-serif;
  color: var(--ti-labelColor);
  margin: 8px 0 4px;
  border-bottom: 1px solid var(--ti-labelBorder);
  padding-bottom: 2px;
  width: 100%;
  text-align: center;
`;

const TIInput = styled.input`
  font-family: "TI", sans-serif;
  font-size: 11px;
  border: 1px solid var(--ti-inputBorder);
  background: var(--ti-inputBg);
  color: var(--ti-inputText);
  padding: 4px 8px;
  margin: 2px;
  width: 100%;
  box-sizing: border-box;
`;

function AnimationSelector() {
  const anim = useAnimation();
  const [newName, setNewName] = useState('');

  const handleNew = () => {
    const name = newName.trim() || `Anim ${Date.now() % 10000}`;
    anim.newAnimation(name);
    setNewName('');
  };

  const handleSave = () => {
    anim.saveAnimation();
  };

  return (
    <SelectorContainer>
      <SectionLabel>Examples</SectionLabel>
      <ButtonRow>
        {allExamples.map((ex) => {
          const isActive = anim.currentAnimation?.name === ex.name;
          const Btn = isActive ? ActiveButton : TIButton;
          return (
            <Btn
              key={ex.name}
              type="button"
              onClick={() => anim.setCurrentAnimation(ex)}
            >
              {ex.name}
            </Btn>
          );
        })}
      </ButtonRow>

      {anim.animations.length > 0 && (
        <>
          <SectionLabel>Saved</SectionLabel>
          <ButtonRow>
            {anim.animations.map((a) => {
              const isActive = anim.currentAnimation?.name === a.name;
              const Btn = isActive ? ActiveButton : TIButton;
              return (
                <Btn
                  key={a.name}
                  type="button"
                  onClick={() => anim.setCurrentAnimation(a)}
                >
                  {a.name}
                </Btn>
              );
            })}
          </ButtonRow>
        </>
      )}

      <SectionLabel>Create / Save</SectionLabel>
      <TIInput
        type="text"
        placeholder="Animation name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleNew(); }}
      />
      <ButtonRow>
        <TIButton type="button" onClick={handleNew}>New</TIButton>
        <TIButton
          type="button"
          onClick={handleSave}
          disabled={!anim.currentAnimation}
        >
          Save
        </TIButton>
      </ButtonRow>
    </SelectorContainer>
  );
}

export default AnimationSelector;
