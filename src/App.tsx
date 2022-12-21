import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import * as three from "three";
import "./styles.css";

const Cube = () => {
  const cube = useRef<three.Mesh>();

  useFrame(() => {
    cube.current!.rotation.x += 0.01;
    cube.current!.rotation.y += 0.01;
  });

  return (
    <mesh ref={cube}>
      {/* <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0391BA" /> */}
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};

const Tree = () => {
  const cube = useRef<three.Mesh>();

  useFrame(() => {
    // cube.current!.rotation.x += 0.01;
    // cube.current!.rotation.y += 0.01;
  });

  return (
    <>
      <mesh ref={cube}>
        <cylinderGeometry
          attach="geometry"
          radiusBottom={0.1}
          radiusTop={0.1}
          height={1}
          segmentsRadial={8}
        />
        <meshBasicMaterial attach="material" color="#9b8c75" />
      </mesh>
      // Create the branches of the tree using cube shapes
      <mesh position={[0.2, 0.8, 0]} rotation={[0, 0, 0.4]} ref={cube}>
        <boxGeometry attach="geometry" width={0.1} height={0.1} depth={0.5} />
        <meshBasicMaterial attach="material" color="#9b8c75" />
      </mesh>
      <mesh position={[-0.2, 0.8, 0]} rotation={[0, 0, -0.4]} ref={cube}>
        <boxGeometry attach="geometry" width={0.1} height={0.1} depth={0.5} />
        <meshBasicMaterial attach="material" color="#9b8c75" />
      </mesh>
      // Create the leaves of the tree using sphere shapes
      <mesh position={[0.2, 1.2, 0]} ref={cube}>
        <sphereGeometry
          attach="geometry"
          radius={0.2}
          widthSegments={8}
          heightSegments={6}
        />
        <meshBasicMaterial attach="material" color="#00ff00" />
      </mesh>
      <mesh position={[-0.2, 1.2, 0]} ref={cube}>
        <sphereGeometry
          attach="geometry"
          radius={0.2}
          widthSegments={8}
          heightSegments={6}
        />
        <meshBasicMaterial attach="material" color="#00ff00" />
      </mesh>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <gridHelper />
      {/* <axesHelper /> */}
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      {/* <Cube /> */}
      <Tree />
    </>
  );
};

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >
      <Canvas
        concurrent
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934");
        }}
      >
        <Stats />
        <OrbitControls />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
