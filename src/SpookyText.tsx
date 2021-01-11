import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { mouseState } from './atoms/mouse';

const BaseText = motion.p;

const GlitchText = styled(BaseText)`
  position: absolute;
  top: 0;
  margin: 0;

  &:first-child {
    color: #e20000;
    top: 0;
  }

  &:nth-child(2) {
    color: #000;
    clip-path: polygon(0 0, 100% 0, 100% 66%, 0 66%);
  }
`;

const TextContainer = styled.div`
  font-family: 'Arial', serif;
  position: relative;
  width: 100%;
`;

const calculateDistance = (elem: any, mouseX: number, mouseY: number) => {
  console.log(elem);
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elem.left + elem.width / 2), 2) +
        Math.pow(mouseY - (elem.top + elem.height / 2), 2),
    ),
  );
};

export const SpookyText: React.FC = () => {
  const thisText = useRef(null);
  const { x, y } = useRecoilValue(mouseState);

  const distance = thisText.current
    ? calculateDistance(
        // @ts-ignore
        thisText.current.getBoundingClientRect(),
        x,
        y,
      )
    : 0;

  console.log({ x, y, distance });

  const clampDistance = distance > 200 ? 100 : distance / 2;

  return (
    <TextContainer>
      <GlitchText ref={thisText}>Spooky Text</GlitchText>
      <GlitchText
        animate={{
          clipPath: `polygon(0 0, 100% 0, 100% ${clampDistance}%, 0 ${clampDistance}%)`,
        }}
      >
        Spooky Text
      </GlitchText>
    </TextContainer>
  );
};
