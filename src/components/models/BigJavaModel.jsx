import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const SpinningJava = () => {
  const { scene } = useGLTF('/models/jv-transformed.glb');
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "Plane.001_0" || child.name === "Plane001_0") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E32636",
            metalness: 0.3,
            roughness: 0.4,
            side: THREE.DoubleSide,
          });
        }
        else {
          child.material = new THREE.MeshStandardMaterial({
            color: "#007396",
            metalness: 0.5,
            roughness: 0.3,
          });
        }
      }
    });
  }, [scene]);

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef} scale={2.8} position={[0, -0.5, 0]} rotation={[0.1, 0, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

const BigJavaModel = () => {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={2} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <SpinningJava />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default BigJavaModel;
