import * as THREE from 'three';
import { useRef, useState, memo, Suspense } from 'react';
import { Canvas, createPortal, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useFBO, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

export default function GlassCursor() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <LensCursor />
        </Suspense>
      </Canvas>
    </div>
  );
}

const LensCursor = memo(function LensCursor() {
  const ref = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  // Load the background image to refract it perfectly
  const bgTexture = useLoader(THREE.TextureLoader, '/images/bermuda-bg-1.jpg');
  bgTexture.colorSpace = THREE.SRGBColorSpace;

  // Calculate background-size: cover equivalent for the 3D plane
  const aspect = vp.width / vp.height;
  const imageAspect = bgTexture.image.width / bgTexture.image.height;
  
  let scaleX, scaleY;
  if (aspect > imageAspect) {
    scaleX = vp.width;
    scaleY = vp.width / imageAspect;
  } else {
    scaleY = vp.height;
    scaleX = vp.height * imageAspect;
  }

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Make the glass lens smoothly follow the cursor
    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
    }

    // Render the isolated background scene into the Frame Buffer Object
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {/* 
        We use createPortal to render the background plane ONLY to the FBO buffer.
        This means the WebGL canvas itself stays completely transparent, letting the 
        real CSS background show through, but the glass lens has access to the texture 
        buffer to perfectly refract the boat!
      */}
      {createPortal(
        <mesh scale={[scaleX, scaleY, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={bgTexture} />
        </mesh>,
        scene
      )}

      {/* The 3D Glass Lens */}
      <mesh ref={ref} scale={0.8} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[1, 1, 0.1, 64]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.2}
          thickness={5}
          anisotropy={0.1}
          chromaticAberration={0.06}
          roughness={0}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </>
  );
});
