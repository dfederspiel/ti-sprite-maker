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
  background: var(--ti-codeBg);
  color: var(--ti-codeText);
  font-family: "TI", monospace;
  font-size: 0.75rem;
  padding: 8px;
  border: 1px solid var(--ti-codeBorder);
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
  background-color: var(--ti-btnBg);
  border: 1px solid var(--ti-btnBorder);
  color: var(--ti-btnText);
  padding: 4px 8px;
  margin: 2px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 0.8rem;

  &:hover { background-color: var(--ti-btnHoverBg); }
  &:active { background-color: var(--ti-btnActiveBg); }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 3px;
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

const CopiedBadge = styled.span`
  font-size: 0.75rem;
  color: var(--ti-copiedColor);
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
