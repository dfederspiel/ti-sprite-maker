import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnimation } from './context/AnimationProvider';
import { allExamples } from '../models/exampleAnimations';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0;
  font-family: "TI", sans-serif;
  width: 100%;
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
`;

const ActiveButton = styled(TIButton)`
  background-color: #40f0f0;
  font-weight: bold;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const SectionLabel = styled.div`
  font-size: 13px;
  font-family: "TI", sans-serif;
  margin: 8px 0 4px;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
`;

const TIInput = styled.input`
  font-family: "TI", sans-serif;
  font-size: 12px;
  border: 2px solid #000;
  padding: 4px 8px;
  margin: 2px;
  width: 140px;
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
      <ButtonRow>
        <TIInput
          type="text"
          placeholder="Animation name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNew(); }}
        />
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
