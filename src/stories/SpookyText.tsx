import React from 'react';
import styled from '@emotion/styled'

const GlitchText = styled.p`
  position: absolute;
  top: 0;
  margin: 0;

  &:first-child {
    color: #e20000;
    top: 0;
  }

  &:nth-child(2) {
    color: black;
    clip-path: polygon(0 0, 100% 0, 100% 66%, 0 66%);
  }
`

const TextContainer = styled.div`
  font-family: "Arial", serif;
  position: relative;
`

export const SpookyText: React.FC = () =>
    (
        <TextContainer>
            <GlitchText>Spooky Text</GlitchText>
            <GlitchText>Spooky Text</GlitchText>
        </TextContainer>
    );
