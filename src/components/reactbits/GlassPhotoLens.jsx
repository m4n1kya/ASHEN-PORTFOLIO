import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export default function GlassPhotoLens({ imageSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. PARAMETERS ---
    // Hardcoded best settings without lil-gui
    const params = {
      shape: 'Square',
      photoScale: 1.2,
      envMapUrl: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/royal_esplanade_2k.hdr',
      glassColor: '#ffffff',
      envIntensity: 1.0,
      internalReflect: 1.5,
      opacity: 1.0,
      globalSpeed: 1.0,
      yAxis: { speed: 0.5 },
      xAxis: { speed: 0.4, amp: 0.2 },
      zAxis: { speed: 0.3, amp: 0.1 }
    };

    // --- 2. SCENE ---
    const scene = new THREE.Scene();
    // Intentionally leaving scene.background empty so it's fully transparent

    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    // Add canvas to our DOM ref
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false; // Disable zoom to prevent scroll trapping

    // --- 3. LIGHTS AND ENV ---
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(params.envMapUrl, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      scene.environment = texture;
      scene.environmentIntensity = params.envIntensity;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 3.0);
    backLight.position.set(-5, 2, -10);
    scene.add(backLight);
    
    const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);
    
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
    frontLight.position.set(0, 2, 10);
    scene.add(frontLight);

    const group = new THREE.Group();
    scene.add(group);

    // --- 4. PHOTO ---
    let currentAspectRatio = 1.0; 
    const photoGeo = new THREE.PlaneGeometry(1, 1);
    const photoMat = new THREE.MeshStandardMaterial({ 
      side: THREE.DoubleSide,
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
      transparent: false, 
      alphaTest: 0.5,
      depthWrite: true 
    });
    
    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    photoMesh.position.set(0, 0, 0);
    photoMesh.renderOrder = 0;
    group.add(photoMesh);

    const updatePhotoScale = () => {
      const s = params.photoScale;
      if (currentAspectRatio > 1) {
        photoMesh.scale.set(s, s / currentAspectRatio, 1);
      } else {
        photoMesh.scale.set(s * currentAspectRatio, s, 1);
      }
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      photoMat.map = tex;
      photoMat.needsUpdate = true;
      if (tex.image) {
        currentAspectRatio = tex.image.width / tex.image.height;
        updatePhotoScale();
      }
    });

    // --- 5. GLASS GEOMETRY ---
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: params.glassColor,
      transmission: 1.0,      
      opacity: params.opacity,
      metalness: 0.0,
      roughness: 0.0,         
      ior: params.internalReflect,
      thickness: 1.2,
      attenuationColor: 0xffffff,
      attenuationDistance: 9999.0,
      specularIntensity: 1.0,
      envMapIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      transparent: true,
      side: THREE.DoubleSide, 
      depthWrite: false
    });
    
    const glassGeo = new RoundedBoxGeometry(2.1, 2.1, 1.0, 32, 0.25);
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.receiveShadow = false;
    glassMesh.renderOrder = 1;
    group.add(glassMesh);

    // --- LOOP ---
    const clock = new THREE.Clock();
    let time = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      
      time += delta * params.globalSpeed;
      
      // Constant spinning/floating animation
      group.rotation.y += delta * params.yAxis.speed * params.globalSpeed; 
      group.rotation.x = Math.cos(time * params.xAxis.speed) * params.xAxis.amp;
      group.rotation.z = Math.sin(time * params.zAxis.speed * 0.7) * params.zAxis.amp;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
      photoGeo.dispose();
      photoMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
    };
  }, [imageSrc]);

  return <div ref={containerRef} className="w-full h-full" />;
}
