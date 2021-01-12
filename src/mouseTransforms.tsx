import { RefObject, useEffect } from 'react';
import { MotionValue, useMotionValue, useTransform } from 'framer-motion';

const maxDistModifier = 4;
const maxDist = maxDistModifier * 100;
const chanceModifier = 0.00002;

const dist = (y: number, x: number) =>
  Math.floor(Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2)));

const calculateDistance = (
  elem: any,
  mouseX: number,
  mouseY: number,
  variance: boolean,
) => {
  const { left, top, width, height } = elem;
  const topLine = top;
  const bottomLine = top + height;
  const leftLine = left;
  const rightLine = left + width;

  const isAbove = mouseY < topLine;
  const isBelow = mouseY > bottomLine;
  const isLeft = mouseX < leftLine;
  const isRight = mouseX > rightLine;
  const isInside = !isAbove && !isBelow && !isLeft && !isRight;

  if (isInside) {
    return Infinity;
  }
  const realDist = dist(
    isAbove ? mouseY - topLine : mouseY - bottomLine,
    isLeft ? mouseX - leftLine : mouseX - rightLine,
  );

  const chance = Math.random();

  if (chance < chanceModifier || !variance) {
    return realDist;
  }
  return Infinity;
};

export const useMousePosition = () => {
  const x = useMotionValue(maxDist);
  const y = useMotionValue(maxDist);

  useEffect(() => {
    const type = 'mousemove';
    const listener = (e: any) => {
      if (e.clientX) x.set(e.clientX);
      if (e.clientY) y.set(e.clientY);
    };
    document.addEventListener(type, listener);
    return () => document.removeEventListener(type, listener);
  });

  return { x, y };
};

const conditionalChange = (val: MotionValue<number>, constVal: number) => {
  if (val.get() !== constVal) val.set(constVal);
};

export const useBoundingBox = (ref: RefObject<HTMLElement>) => {
  const { x, y } = useMousePosition();
  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const distance = useMotionValue(maxDist);

  useEffect(() => {
    const checkResize = () => {
      const textRef = ref.current;
      const boundingRect = textRef
        ? textRef.getBoundingClientRect()
        : { left: 0, top: 0, width: 0, height: 0 };
      conditionalChange(left, boundingRect.left);
      conditionalChange(top, boundingRect.top);
      conditionalChange(width, boundingRect.width);
      conditionalChange(height, boundingRect.height);
    };
    const xUnsub = x.onChange(checkResize);
    const yUnsub = y.onChange(checkResize);
    return () => {
      xUnsub();
      yUnsub();
    };
  }, [x, y, ref, left, top, width, height]);

  useEffect(() => {
    const boundValues = () => {
      const oldDistance = distance.get();
      distance.set(
        calculateDistance(
          {
            left: left.get(),
            top: top.get(),
            width: width.get(),
            height: height.get(),
          },
          x.get(),
          y.get(),
          oldDistance > maxDist,
        ),
      );
    };

    const xUnsub = x.onChange(boundValues);
    const yUnsub = y.onChange(boundValues);

    return () => {
      xUnsub();
      yUnsub();
    };
  }, [distance, left, top, width, height, x, y]);

  return useTransform<any, any>(distance, (currentDistance) =>
    currentDistance > maxDist ? 100 : currentDistance / maxDistModifier,
  );
};
