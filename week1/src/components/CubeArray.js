import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import GrassModel from './grassModel';

class CubeDate {
  constructor(cubeSize, position, material, hasGrass = false) {
    this.cubeSize = cubeSize;
    this.position = position;
    this.material = material; // store as string: "default" or "newMaterial"
    this.hasGrass = hasGrass;
  }
}

const CubeArray = ({ size, cubeSize, selectState }) => {
  const meshRefs = useRef([]);
  const [cubeData, setCubeData] = useState([]);

  const defaultMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x000000 }), []);
  const newMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xff0000 }), []);
  const cubeGeometry = useMemo(() => new THREE.BoxGeometry(cubeSize, 0.1, cubeSize), [cubeSize]);

  const getMaterialByName = (name) => {
    return name === "newMaterial" ? newMaterial : defaultMaterial;
  };

  // Load cube data from local storage or initialize it
  useEffect(() => {
    const storedCubeData = JSON.parse(localStorage.getItem('cubeData'));
    if (storedCubeData) {
      const deserializedCubeData = storedCubeData.map(item => {
        return new CubeDate(item.cubeSize, item.position, item.material, item.hasGrass);
      });
      setCubeData(deserializedCubeData);
    } else {
      const initialCubeData = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          initialCubeData.push(new CubeDate(cubeSize, [i, j], "default"));
        }
      }
      setCubeData(initialCubeData);
      localStorage.setItem('cubeData', JSON.stringify(initialCubeData));
    }
  }, [size, cubeSize]);

  const selectCube = (index) => {
    if (meshRefs.current[index] && selectState) {
      const updatedCubeData = [...cubeData];
      updatedCubeData[index].material = "newMaterial";
      updatedCubeData[index].hasGrass = true;
      setCubeData(updatedCubeData);
      localStorage.setItem('cubeData', JSON.stringify(updatedCubeData));

      // const position = updatedCubeData[index].position;
      // setGrassPositions(prevPositions => [...prevPositions, position]);
    }
  };

  return (
    <>
      {cubeData.map((item, index) => (
          <mesh
            position={[item.position[0], 0, item.position[1]]}
            onPointerEnter={() => selectCube(index)}
            onClick={() => { console.log("clicked: ", index, "\nPosition:", item.position); }}
            geometry={cubeGeometry}
            material={getMaterialByName(item.material)}
            ref={(ref) => (meshRefs.current[index] = ref)}
          />
      ))}

      {cubeData.map((item, index) => (
        item.hasGrass && (
        <mesh position={[item.position[0], 0.1, item.position[1]]}>
          {/* <boxGeometry key={`grass-${index}`}  /> */}
          <GrassModel></GrassModel>
        </mesh>)
      ))}

    </>
  );
};

export default CubeArray;
