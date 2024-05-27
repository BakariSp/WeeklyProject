import * as THREE from "three";
import React, { useState, useEffect } from 'react';
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import CubeArray from './CubeArray';

const GameCanvas = ({ size, cubeSize, orbitRef, canvasReset, handleCanvasReset, selectState, setSelectState, setPointersIndecator }) => {
  const [reset, setReset] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPointerEnter, setIsPointerEnter] = useState(false);
  const boxMaterial = new THREE.MeshBasicMaterial({ opacity: 0.1, transparent: true, color: 0x00ff00 });

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.enableDamping = true;
      orbitRef.current.dampingFactor = 0.05;
      orbitRef.current.enablePan = true;
      orbitRef.current.enableRotate = true;
      orbitRef.current.maxPolarAngle = Math.PI / 2 + 0.1;
      orbitRef.current.minPolarAngle = 0;
    }
  }, [orbitRef]);

  useFrame(() => {
    if ((reset && orbitRef.current) || (canvasReset && orbitRef.current)) {
      orbitRef.current.target.set(size / 2, 0, size / 2);
      orbitRef.current.update();
      setReset(false);
      handleCanvasReset(false);
    }
  });

  const handlePointerDown = () => {
    setIsPointerDown(true);
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);
    setSelectState(false);
  };

  const handlePointerEnter = () => {
    setIsPointerEnter(true);
  };

  const handlePointerLeave = () => {
    setIsPointerEnter(false);
  };

  useEffect(() => {
    const checkPointerStatus = () => {
      if (isPointerDown && isPointerEnter) {
        setSelectState(true);
      }

      setPointersIndecator(
        <>
          <p>Pointer Down: {isPointerDown ? 'true' : 'false'}</p>
          <p>Pointer Enter: {isPointerEnter ? 'true' : 'false'}</p>
        </>
      );
    };
    checkPointerStatus();
  }, [isPointerDown, isPointerEnter, setSelectState, setPointersIndecator]);

  return (
    <>
      <OrthographicCamera
        makeDefault
        far={500}
        near={0}
        position={[size * 1.2 , 5, size * 1.2 ]}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
        zoom={75}
      />
      <OrbitControls ref={orbitRef} enableRotate={!selectState} target={[size / 2, -1, size / 2]}/>
      <mesh
        position={[size * 0.5, 0, size * 0.5]}
        material={boxMaterial}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <boxGeometry args={[size * 1.1, 3, size * 1.1]} />
      </mesh>
      <CubeArray size={size} cubeSize={cubeSize} selectState={selectState} />
    </>
  );
}

export default GameCanvas;
