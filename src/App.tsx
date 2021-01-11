import React, { useEffect } from 'react';
import './App.css';
import { useSetRecoilState } from 'recoil';
import { mouseState } from './atoms/mouse';
import { SpookyText } from './SpookyText';

const App = () => {
  const setPosition = useSetRecoilState(mouseState);

  useEffect(() => {
    const type = 'mousemove';
    const listener = (e: any) => {
      setPosition({
        x: e.offsetX,
        y: e.offsetY,
      });
    };

    document.addEventListener(type, listener);

    return () => {
      document.removeEventListener(type, listener);
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <SpookyText />
      </header>
    </div>
  );
};

export default App;
