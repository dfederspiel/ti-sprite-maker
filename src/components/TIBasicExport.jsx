import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnimation } from './context/AnimationProvider';
import { exportToTIBasic } from '../models/AnimationModel';

const ExportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0;
  font-family: "TI", sans-serif;
  width: 100%;
  box-sizing: border-box;
`;

const CodeBlock = styled.pre`
  background: #0a0a1a;
  color: #40f0f0;
  font-family: "TI", monospace;
  font-size: 10px;
  padding: 8px;
  border: 1px solid #333;
  max-width: 100%;
  max-height: 180px;
  overflow: auto;
  text-align: left;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
  box-sizing: border-box;
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

  &:hover { background-color: #3a3a5a; color: #fff; }
  &:active { background-color: #1a1a3a; }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 3px;
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

const CopiedBadge = styled.span`
  font-size: 10px;
  color: #21c842;
  margin-left: 6px;
`;

function TIBasicExport() {
  const { currentAnimation } = useAnimation();
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!currentAnimation) return null;

  const lines = exportToTIBasic(currentAnimation);
  const code = lines.join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.querySelector('[data-export-code]');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }
  };

  return (
    <ExportContainer>
      <SectionLabel>TI-BASIC Export</SectionLabel>
      <ButtonRow>
        <TIButton type="button" onClick={() => setShowCode(!showCode)}>
          {showCode ? 'Hide Code' : 'Show Code'}
        </TIButton>
        {showCode && (
          <TIButton type="button" onClick={handleCopy}>
            Copy
            {copied && <CopiedBadge>Copied!</CopiedBadge>}
          </TIButton>
        )}
      </ButtonRow>
      {showCode && (
        <CodeBlock data-export-code>{code}</CodeBlock>
      )}
    </ExportContainer>
  );
}

export default TIBasicExport;
