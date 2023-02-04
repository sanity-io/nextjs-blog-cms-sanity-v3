/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export default function Office(props) {
  const { nodes, materials } = useGLTF('/models/Office.glb')
  return (
    <group {...props} dispose={null}>
      <group
        position={[-3.4, -0.17, -3.99]}
        rotation={[Math.PI, 1.4, -1.77]}
        scale={0.83}
      >
        <group position={[2.05, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane016.geometry}
            material={materials['Preto Braco']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane016_1.geometry}
            material={materials['Plastico Branco']}
          />
        </group>
        <group
          position={[0.52, 0, 0.42]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={-1}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane012.geometry}
            material={materials['Preto Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane012_1.geometry}
            material={materials['Metal Dorado']}
          />
        </group>
        <group position={[0.96, 0.2, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane014.geometry}
            material={materials['Metal Dorado']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane014_1.geometry}
            material={materials['Metal Preto']}
          />
        </group>
        <group position={[1.4, 0.2, 0]} rotation={[-Math.PI, 0, -Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane014.geometry}
            material={materials['Metal Dorado']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane014_1.geometry}
            material={materials['Metal Preto']}
          />
        </group>
        <group position={[1.59, 0.2, -0.33]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle011.geometry}
            material={materials['Metal Cromo']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle011_1.geometry}
            material={materials['Plastico Branco']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle011_2.geometry}
            material={materials.Chave}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Corda1.geometry}
          material={materials['Metal Cromo']}
          position={[0.55, 0.22, -0.1]}
          rotation={[0, 0, Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Corda2.geometry}
          material={materials['Metal Cromo']}
          position={[0.55, 0.22, -0.06]}
          rotation={[0, 0, Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Corda3.geometry}
          material={materials['Metal Cromo']}
          position={[0.55, 0.22, -0.02]}
          rotation={[0, 0, Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Corda4.geometry}
          material={materials['Metal Cromo']}
          position={[0.55, 0.22, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Corda5.geometry}
          material={materials['Metal Cromo']}
          position={[0.55, 0.22, 0.06]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Corda6.geometry}
          material={materials['Metal Cromo']}
          position={[0.55, 0.22, 0.1]}
        />
        <group position={[2.05, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert.geometry}
            material={materials['Preto Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert_1.geometry}
            material={materials['Plastico Branco']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.DetalhesEscala.geometry}
          material={materials['Metal Fosco']}
          position={[1.61, 0.21, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Escala.geometry}
          material={materials.Escala}
          position={[2.05, 0, 0]}
        />
        <group position={[1.18, 0.2, 0.31]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert007.geometry}
            material={materials['Plastico Branco']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert007_1.geometry}
            material={materials['Metal Dorado']}
          />
        </group>
        <group position={[2.05, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert003.geometry}
            material={materials['Metal Dorado']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Vert003_1.geometry}
            material={materials['Metal Preto']}
          />
        </group>
        <group position={[0.59, 0.2, 0.33]} rotation={[0, 1.52, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle005.geometry}
            material={materials['Knob Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle005_1.geometry}
            material={materials['Knob Prata Volume']}
          />
        </group>
        <group
          position={[0.44, 0.2, 0.51]}
          rotation={[-Math.PI, 1.2, -Math.PI]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle012.geometry}
            material={materials['Knob Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle012_1.geometry}
            material={materials['Knob Prata Tone']}
          />
        </group>
        <group position={[0.7, 0.2, 0.51]} rotation={[0, 0.67, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle004_1.geometry}
            material={materials['Knob Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle004_2.geometry}
            material={materials['Knob Prata Volume']}
          />
        </group>
        <group position={[0.33, 0.2, 0.33]} rotation={[0, 0.79, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003.geometry}
            material={materials['Knob Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003_1.geometry}
            material={materials['Knob Prata Tone']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pestana.geometry}
          material={materials['Plastico Branco']}
          position={[3.47, 0.13, 0]}
          rotation={[0, 0, -0.11]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ponte.geometry}
          material={materials['Metal Dorado']}
          position={[0.73, 0.23, 0]}
        />
        <group position={[0, 0.1, -0.01]} scale={0.03}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials['Metal Dorado']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013_1.geometry}
            material={materials['Plastico Preto']}
          />
        </group>
        <group
          position={[1.83, 0.1, -0.25]}
          rotation={[Math.PI, -0.26, Math.PI]}
          scale={0.03}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials['Metal Dorado']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013_1.geometry}
            material={materials['Plastico Preto']}
          />
        </group>
        <group position={[3.49, 0.12, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008_1.geometry}
            material={materials['Preto Base']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008_2.geometry}
            material={materials['Metal Dorado']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008_3.geometry}
            material={materials['Plastico Branco']}
          />
        </group>
        <group
          position={[-0.01, -0.37, 0]}
          rotation={[-Math.PI / 2, -0.2, -Math.PI / 2]}
          scale={0.3}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder009.geometry}
            material={materials['Metal Preto']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder009_1.geometry}
            material={materials['Plastico Preto']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder009_2.geometry}
            material={materials['Metal Cromo']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tarraxa.geometry}
          material={materials['Metal Dorado']}
          position={[3.88, -0.06, 0]}
          rotation={[Math.PI / 2, 1.31, -Math.PI / 2]}
          scale={0.09}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Traste.geometry}
          material={materials['Metal Cromo']}
          position={[2.25, 0.19, 0]}
          rotation={[0, 0, -0.11]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TravaCordas.geometry}
          material={materials['Metal Fosco']}
          position={[0.54, 0.22, 0]}
          rotation={[2.27, 0, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text005.geometry}
        material={nodes.Text005.material}
        position={[5.9, 6.93, -4.1]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.39}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text006.geometry}
        material={nodes.Text006.material}
        position={[5.83, 7.71, 2.4]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.29}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text007.geometry}
        material={nodes.Text007.material}
        position={[5.95, 4.22, -1.8]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.49}
      />
      <group
        position={[-1.77, -0.18, -4.25]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[-1.32, 0.04, -0.16]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials['Table Legs']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['Table Top']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_Top001.geometry}
        material={materials.Metal}
        position={[-0.65, 1.68, -3.94]}
        scale={[2.71, 0.17, 1.32]}
      />
      <group position={[1.53, 0.98, -4.34]} scale={[0.71, 0.8, 0.81]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_2.geometry}
          material={materials['Table Legs']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_Top003.geometry}
        material={materials['Table Top']}
        position={[-0.65, 1.68, -3.94]}
        scale={[2.71, 0.17, 1.32]}
      />
      <group position={[0.42, 2.71, -4.92]} scale={[1.97, 0.1, 0.39]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials['Table Top']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={materials['Table Legs']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Floor}
        position={[0.56, 5.24, -0.42]}
        scale={5.53}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PC.geometry}
        material={materials['Material.004']}
        position={[0.42, -0.19, -4.25]}
        scale={1.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials.Keyboard}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014_1.geometry}
        material={materials['Material.015']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube041.geometry}
        material={materials['White Plastic']}
        position={[-1.87, 2.32, -4.95]}
        rotation={[0, -0.02, 0]}
        scale={0.14}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube042.geometry}
        material={materials['Table Legs']}
        position={[-1.72, 1.89, -5.01]}
        rotation={[-0.03, 0.07, 0.13]}
        scale={0.16}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube043.geometry}
        material={materials['Table Legs']}
        position={[-2.13, 1.97, -4.78]}
        rotation={[-1.26, -1, -1.1]}
        scale={0.16}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube044.geometry}
        material={materials['Table Legs']}
        position={[-1.52, 1.99, -4.71]}
        rotation={[-0.64, 0.14, 0.69]}
        scale={0.16}
      />
      <group position={[0.42, 6.39, -5.58]} scale={[3.77, 0.1, 0.39]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube068_1.geometry}
          material={materials['Table Top']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube068_2.geometry}
          material={materials['Table Legs']}
        />
      </group>
      <group position={[-1.77, 6.49, -5.62]} scale={[0.28, 0.01, 0.28]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials['Material.003']}
        />
      </group>
      <group position={[1.04, 6.89, -5.55]} scale={[0.26, 0.04, 0.26]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube070_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube070_2.geometry}
          material={materials['Material.004']}
        />
      </group>
      <group position={[1.81, 7.18, -5.54]} scale={[0.46, 0.07, 0.46]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube071_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube071_2.geometry}
          material={materials['Material.004']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube051.geometry}
        material={materials.Book}
        position={[-0.1, 6.83, -5.6]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.33, -0.04, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube052.geometry}
        material={materials.Metal}
        position={[0, 6.83, -5.6]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.33, -0.04, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube053.geometry}
        material={materials['Material.005']}
        position={[0.2, 6.83, -5.6]}
        rotation={[0, 0, -1.26]}
        scale={[0.33, -0.04, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube054.geometry}
        material={materials.Metal}
        position={[-0.56, 6.54, -5.48]}
        rotation={[0, -0.6, -Math.PI]}
        scale={[0.33, -0.04, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube055.geometry}
        material={materials['Material.004']}
        position={[0.56, 5.28, -0.42]}
        scale={5.53}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube057.geometry}
        material={materials.Floor}
        position={[0.56, 5.24, -0.42]}
        scale={5.53}
      />
      <group position={[0.41, 0.32, 0.66]} scale={0.18}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003_1.geometry}
          material={materials['Table Legs']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003_2.geometry}
          material={materials['Material.014']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube058.geometry}
        material={materials['Table Top']}
        position={[5.01, 0.75, 2.49]}
        scale={[1, 1, -2.06]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube059.geometry}
        material={materials['Material.006']}
        position={[5.01, 0.75, 2.49]}
        scale={[1, 1, -2.06]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube060.geometry}
        material={nodes.Cube060.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061.geometry}
        material={nodes.Cube061.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube062.geometry}
        material={nodes.Cube062.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube063.geometry}
        material={nodes.Cube063.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube064.geometry}
        material={nodes.Cube064.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube065.geometry}
        material={nodes.Cube065.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube066.geometry}
        material={nodes.Cube066.material}
        position={[5.53, 0.96, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube067.geometry}
        material={nodes.Cube067.material}
        position={[5.53, 1.02, 1.32]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube068.geometry}
        material={nodes.Cube068.material}
        position={[5.75, 1.15, 4.3]}
        scale={[-0.48, -0.48, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube069.geometry}
        material={materials.Leaf}
        position={[4.65, 1.12, 0.93]}
        scale={[0.07, 0.24, 0.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube070.geometry}
        material={materials.Leaf}
        position={[5.46, 1.12, 1.68]}
        rotation={[-Math.PI, 0.56, -Math.PI]}
        scale={[0.07, 0.24, 0.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube071.geometry}
        material={materials.Leaf}
        position={[5.68, 1.12, 0.58]}
        rotation={[0, 0.58, 0]}
        scale={[0.07, 0.24, 0.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube072.geometry}
        material={materials.Leaf}
        position={[4.66, 1.12, 3.03]}
        rotation={[0, 0.58, 0]}
        scale={[0.07, 0.24, 0.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[5.1, 1.78, 2.62]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.11}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials['Table Top']}
        position={[4.8, 1.75, -4.35]}
        scale={[1, 0.05, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials['Table Top']}
        position={[4.8, 0.33, -4.35]}
        rotation={[-0.01, 0, 0.01]}
        scale={[1, 0.05, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials.Metal}
        position={[3.99, -0.25, -4.35]}
        rotation={[0, 0, -0.08]}
        scale={[0.08, 0.01, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials.Metal}
        position={[4.8, -0.25, -3.54]}
        rotation={[-0.08, Math.PI / 2, 0]}
        scale={[0.08, 0.01, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials.Metal}
        position={[5.62, -0.25, -4.35]}
        rotation={[Math.PI, 0, 3.06]}
        scale={[0.08, 0.01, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials.Metal}
        position={[4.8, -0.25, -5.16]}
        rotation={[0.08, -Math.PI / 2, 0]}
        scale={[0.08, 0.01, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube073.geometry}
        material={materials.Metal}
        position={[4.91, 1.89, -3.9]}
        rotation={[0, -0.6, -Math.PI]}
        scale={[0.33, -0.04, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube074.geometry}
        material={materials['Table Legs']}
        position={[5.14, 1.93, -4.04]}
        rotation={[1.04, -0.05, 1.23]}
        scale={0.16}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008.geometry}
        material={nodes.Cylinder008.material}
        position={[4.2, 1.91, -4.24]}
        rotation={[0, 0.65, 0]}
        scale={0.11}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube077.geometry}
        material={materials.Metal}
        position={[4.88, 1.97, -3.98]}
        rotation={[0, -0.55, -Math.PI]}
        scale={[0.33, -0.04, 0.21]}
      />
      <group
        position={[3.01, 2.84, -4.71]}
        rotation={[-Math.PI, -0.06, -Math.PI]}
        scale={0.25}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle008.geometry}
          material={materials.Leaf}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle008_1.geometry}
          material={materials['Material.003']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={nodes.Text.material}
        position={[1.45, 2.22, -3.52]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={nodes.Text001.material}
        position={[-2.29, 2.19, -3.55]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text002.geometry}
        material={nodes.Text002.material}
        position={[4.3, 2.94, 1.02]}
        rotation={[0.06, -1.17, 0.12]}
        scale={0.41}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text003.geometry}
        material={nodes.Text003.material}
        position={[4.19, 2.86, 2.2]}
        rotation={[0.06, -1.03, 0.15]}
        scale={0.41}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text004.geometry}
        material={nodes.Text004.material}
        position={[4.16, 2.82, 3.22]}
        rotation={[0.06, -0.97, 0.16]}
        scale={0.41}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Screen.geometry}
        material={materials.PC}
        position={[0.42, -0.19, -4.25]}
        scale={1.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.PC}
        position={[6.09, 8.55, -3.28]}
        rotation={[Math.PI / 2, 0, -1.57]}
        scale={[0.67, 0.67, 1.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials.PC}
        position={[6.06, 6.98, 0.95]}
        rotation={[Math.PI / 2, 0, -1.57]}
        scale={[0.47, 0.47, 1.81]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials.PC}
        position={[6.01, 3.77, -3.26]}
        rotation={[Math.PI / 2, 0, -1.57]}
        scale={[0.47, 0.47, 1.81]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials['Material.008']}
        position={[6.09, 8.55, -3.28]}
        rotation={[Math.PI / 2, 0, -1.57]}
        scale={[0.67, 0.67, 1.21]}
      />
      <group
        position={[5.29, 3.24, 2.6]}
        rotation={[-0.01, -0.01, -0.54]}
        scale={[-0.04, 0.48, 0.42]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube107.geometry}
          material={materials.Picture}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube107_1.geometry}
          material={materials['Table Top']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['White Board']}
        position={[6.06, 6.98, 0.95]}
        rotation={[Math.PI / 2, 0, -1.57]}
        scale={[0.47, 0.47, 1.81]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials['White Board']}
        position={[6.06, 4.12, -2.13]}
        rotation={[1.57, 0, 1.57]}
        scale={[0.47, 0.47, 1.81]}
      />
      <group
        position={[5.21, 3.16, 4.02]}
        rotation={[-0.01, -0.34, -0.54]}
        scale={[-0.03, 0.42, 0.37]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials['Table Top']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials['Material.013']}
        position={[6.01, 3.77, -3.26]}
        rotation={[Math.PI / 2, 0, -1.57]}
        scale={[0.47, 0.47, 1.81]}
      />
      <group
        position={[4.99, 3.21, 1.27]}
        rotation={[-0.01, 0.45, -0.53]}
        scale={[-0.04, 0.48, 0.42]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube103.geometry}
          material={materials['Table Top']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube103_1.geometry}
          material={materials['Material.007']}
        />
      </group>
      <group
        position={[0.93, 5.36, -6.47]}
        rotation={[-3.04, 1.56, 1.48]}
        scale={[-0.97, 0.33, -3.76]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials['Material.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_1.geometry}
          material={materials['Material.011']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Office.glb')