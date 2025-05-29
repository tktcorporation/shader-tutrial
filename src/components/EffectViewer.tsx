import React, { useEffect, useRef, useState } from 'react';
import ParamGUI from './ParamGUI';
import MiniLessonPopin from './MiniLessonPopin';
import * as THREE from 'three';

// Define the structure of the effect data
interface EffectData {
  id: string;
  title: string; // Using title from mockEffects for card display, name for viewer
  imageUrl?: string;
  description?: string;
  name: string; // For detailed view
  shaderKey: string; // For loading specific shader
}

interface EffectViewerProps {
  effect: EffectData; // Updated prop to take the full effect object
}

const EffectViewer: React.FC<EffectViewerProps> = ({ effect }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

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
    scene.background = new THREE.Color(0x333333); // Background for canvas
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
    container.innerHTML = ''; // Clear any previous content (like placeholder text)
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Cube setup (could be replaced by actual effect later)
    const geometry = new THREE.BoxGeometry();
    // Use shaderKey to potentially vary the cube color or effect in future
    const materialColor = effect.shaderKey === 'fresnel01' ? 0x00ff00 : (effect.shaderKey === 'toon01' ? 0x0000ff : 0xff0000);
    const material = new THREE.MeshStandardMaterial({ color: materialColor });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
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
    handleResize(); // Initial resize

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
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
    // Re-run effect if 'effect.shaderKey' changes, to update cube or shader
  }, [effect.shaderKey, effect.id]); // Added effect.id to dependencies to re-initialize if different effect

  return (
    <div style={{ display: 'flex', padding: '20px', height: 'calc(100vh - 100px)' }}>
      <div
        ref={canvasContainerRef}
        style={{
          flex: '0.7',
          backgroundColor: '#333', // Fallback if canvas doesn't cover
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      />
      <div style={{ flex: '0.3', marginLeft: '20px', overflowY: 'auto', position: 'relative' }}>
        <h2>{effect.name}</h2> {/* Display effect name */}
        <p style={{ fontSize: '0.8em', color: '#666', marginBottom: '15px' }}>
          ID: {effect.id} <br/> Shader Key: {effect.shaderKey || 'N/A'}
        </p>
        <ParamGUI onOpenMiniLesson={handleOpenMiniLesson} />
        {/* Removed old effectId display, using effect.id from the object now */}
      </div>
      <MiniLessonPopin visible={miniLessonVisible} onClose={handleCloseMiniLesson} />
    </div>
  );
};

export default EffectViewer;
