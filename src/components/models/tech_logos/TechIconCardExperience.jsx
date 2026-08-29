import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, Suspense } from "react";
import * as THREE from "three";

const ModelRenderer = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }

    if (model.name === "Java") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Plane.001_0" || child.name === "Plane001_0") {
            child.material = new THREE.MeshStandardMaterial({
              color: "#E32636",
              metalness: 0.2,
              roughness: 0.5,
              side: THREE.DoubleSide,
            });
          }
          else {
            child.material = new THREE.MeshStandardMaterial({
              color: "#007396",
              metalness: 0.3,
              roughness: 0.4,
            });
          }
        }
      });
    }
  }, [scene, model]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation} position={model.position || [0, 0, 0]}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIconCardExperience = ({ model }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <ModelRenderer model={model} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
