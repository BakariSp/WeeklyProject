import './App.css';
import React, { useState, useRef, useCallback } from 'react';
import { Canvas } from "@react-three/fiber";
import GameCanvas from './components/GameCanvas';

const size = 10;
const cubeSize = 0.8;

function App() {
  const [reset, setReset] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [pointersIndecator, setPointersIndecator] = useState(<></>);
  const orbitRef = useRef();

  const handleReset = useCallback((value) => {
    setReset(value);
  }, []);

  const handleSelectState = useCallback(() => {
    setSelectState((prev) => !prev);
  }, []);

  const setSelectStateCallback = useCallback((value) => {
    setSelectState(value);
  }, []);

  const setPointersIndecatorCallback = useCallback((value) => {
    setPointersIndecator(value);
  }, []);

  return (
    <>
      <div>
        <button onClick={handleSelectState}>Reset</button>
        <div className='unselectable'>
          <p>Select State: {selectState ? 'true' : 'false'}</p>
          {pointersIndecator}
        </div>
      </div>
      
      <Canvas>
        <GameCanvas 
          size={size} cubeSize={cubeSize} orbitRef={orbitRef} canvasReset={reset} handleCanvasReset={handleReset}
          selectState={selectState} setSelectState={setSelectStateCallback}
          setPointersIndecator={setPointersIndecatorCallback}/>
      </Canvas>
    </>
  );
}

export default App;
