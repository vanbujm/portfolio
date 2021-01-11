import { atom } from 'recoil';

export const mouseState = atom({
  key: 'mouseState',
  default: { x: 0, y: 0 },
});
