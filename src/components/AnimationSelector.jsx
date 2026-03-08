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
`;

const ActiveButton = styled(TIButton)`
  background-color: #0a3a3a;
  border-color: #40f0f0;
  color: #40f0f0;
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
  color: #40f0f0;
  margin: 8px 0 4px;
  border-bottom: 1px solid #333;
  padding-bottom: 2px;
  width: 100%;
  text-align: center;
`;

const TIInput = styled.input`
  font-family: "TI", sans-serif;
  font-size: 11px;
  border: 1px solid #444;
  background: #0f0f23;
  color: #e0e0e0;
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
