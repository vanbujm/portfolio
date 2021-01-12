import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useTransform } from 'framer-motion';
import { useBoundingBox } from './mouseTransforms';

const BaseText = motion.div;

const GlitchText = styled(BaseText)`
  display: inline-block;
  position: absolute;
  top: 0;
  margin: 0;

  &:first-of-type {
    color: #e20000;
  }
`;

const TextContainer = styled.div<{ size: number }>`
  font-family: 'Arial', serif;
  position: relative;
  display: inline-block;
  width: ${(props) => `${props.size * 0.6}rem`};
`;

type SpookyTextProps = {
  children: string;
};

export const SpookyText: React.FC<SpookyTextProps> = ({
  children,
  ...props
}) => {
  const thisText = useRef<HTMLParagraphElement>(null);

  const clampDistance = useBoundingBox(thisText);
  const clipPath = useTransform(
    clampDistance,
    (currentClamp) =>
      `polygon(0 0, 100% 0, 100% ${currentClamp}%, 0 ${currentClamp}%)`,
  );

  return (
    <TextContainer {...props} size={children.length}>
      <GlitchText ref={thisText}>{children}</GlitchText>
      <GlitchText
        style={{
          clipPath,
        }}
      >
        {children}
      </GlitchText>
    </TextContainer>
  );
};

export const SplitSpookyText = ({ children }: any) => {
  if (typeof children === 'string') {
    const splitChildren = children.split(/(?=\s)/g);
    return (
      <div>
        {splitChildren.map((subStr, i) => (
          <SpookyText key={i}>{subStr}</SpookyText>
        ))}
      </div>
    );
  }
  return <SpookyText>{children}</SpookyText>;
};
