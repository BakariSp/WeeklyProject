import React, {useRef} from 'react'
import * as THREE from 'three'

const CubeArray = ({size, cubeSize, selectState}) => {
  const meshRefs = useRef([]);

  let positions = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      positions.push([i, j]);
    }
  }

  const cube = new THREE.BoxGeometry(cubeSize, 0.1, cubeSize);
  const defaultMaterial = new THREE.MeshNormalMaterial();
  const newMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const selectCube = (index) => {
    if ( meshRefs.current[index] && selectState) {
      const currentMesh = meshRefs.current[index];
      currentMesh.material = newMaterial;
    }
  }

  return (
    <>
      {positions.map((position, index) => (
        <mesh
          key={index}
          position={[position[0], 0, position[1]]}
          onPointerEnter={() => selectCube(index)}
          geometry={cube}
          material={defaultMaterial}
          ref={(ref) => (meshRefs.current[index] = ref)}
        />
      ))}
    </>
  )
}

export default CubeArray
