import React, { useEffect, useRef, useState } from 'react';
import ParamGUI, { ShaderParams } from './ParamGUI.tsx';
import MiniLessonPopin from './MiniLessonPopin.tsx';
import * as THREE from 'three';

// Define the structure of the effect data
interface EffectData {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  name: string;
  shaderKey: string;
}

interface EffectViewerProps {
  effect: EffectData;
}

const EffectViewer: React.FC<EffectViewerProps> = ({ effect }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  const [shaderParams, setShaderParams] = useState<ShaderParams>({
    intensity: 0.7,
    color: effect.shaderKey === 'toon01' ? '#ff0000' : (effect.shaderKey === 'fresnel01' ? '#00ff00' : '#0077ff'),
  });

  const [miniLessonVisible, setMiniLessonVisible] = useState(false);

  const handleOpenMiniLesson = () => {
    setMiniLessonVisible(true);
  };

  const handleCloseMiniLesson = () => {
    setMiniLessonVisible(false);
  };

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Updated canvas background to black from CSS
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Slightly increased ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Slightly increased directional
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: shaderParams.color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cubeRef.current = cube;

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      cube.rotation.x += 0.005; // Slowed down rotation
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (canvasContainerRef.current && rendererRef.current) {
        const currentContainer = canvasContainerRef.current;
        camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (cubeRef.current) {
        scene.remove(cubeRef.current);
        if(cubeRef.current.geometry) cubeRef.current.geometry.dispose();
        if(cubeRef.current.material && cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
            (cubeRef.current.material as THREE.MeshStandardMaterial).dispose();
        }
      }
      cubeRef.current = null;
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      ambientLight.dispose();
      directionalLight.dispose();
      if (rendererRef.current) {
        if (rendererRef.current.domElement.parentNode === container) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [effect.shaderKey, effect.id, shaderParams.color]);

  useEffect(() => {
    if (cubeRef.current && cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
      const material = cubeRef.current.material as THREE.MeshStandardMaterial;
      material.color.set(shaderParams.color);
      
      console.log("Intensity parameter changed to:", shaderParams.intensity);
      if (shaderParams.intensity > 0.1) { // Adjusted threshold for emissive
          material.emissive.set(shaderParams.color);
          material.emissiveIntensity = shaderParams.intensity * 0.8; // Modulate intensity
      } else {
          material.emissive.set(0x000000);
          material.emissiveIntensity = 0;
      }
      material.needsUpdate = true;
    }
  }, [shaderParams]);

  const handleParamsChange = (newParams: ShaderParams) => {
    setShaderParams(newParams);
  };

  return (
    // Main flex container style is kept inline for overall page structure
    <div style={{ display: 'flex', padding: '20px', gap: '20px', height: 'calc(100vh - 40px)' /* Adjust height if needed, considering padding */ }}>
      <div
        ref={canvasContainerRef}
        className="effect-viewer-canvas-container" // Applied class
        // Removed inline styles, now handled by CSS class
      />
      {/* Applied class and removed inline styles */}
      <div className="effect-viewer-panel">
        <h2>{effect.name}</h2> {/* Styling handled by .effect-viewer-panel h2 */}
        <p className="effect-details"> {/* Applied class */}
          ID: {effect.id} <br/> Shader Key: {effect.shaderKey || 'N/A'}
        </p>
        <ParamGUI
          initialParams={shaderParams}
          onParamsChange={handleParamsChange}
          onOpenMiniLesson={handleOpenMiniLesson}
        />
      </div>
      <MiniLessonPopin visible={miniLessonVisible} onClose={handleCloseMiniLesson} />
    </div>
  );
};

export default EffectViewer;
