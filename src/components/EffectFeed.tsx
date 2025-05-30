import React from 'react';
import EffectCard from './EffectCard'; // Assuming same directory for now
// Ensure your styles.css is imported, usually done at a higher level like __root.tsx or main.tsx/client.tsx

// Updated Mock Data
export const mockEffects = [ // Exporting for use in other files (temporary)
  {
    id: '1',
    title: 'Fresnel Glow', // For card display
    imageUrl: 'https://placehold.co/200x100?text=Fresnel',
    description: 'A shiny outline based on viewing angle.',
    name: 'Fresnel Effect', // For viewer display / more detailed name
    shaderKey: 'fresnel01',
  },
  {
    id: '2',
    title: 'Toon Outline',
    imageUrl: 'https://placehold.co/200x100?text=Toon',
    description: 'Cel-shaded look with outlines.',
    name: 'Toon Shader',
    shaderKey: 'toon01',
  },
  {
    id: '3',
    title: 'Water Ripples',
    imageUrl: 'https://placehold.co/200x100?text=Water',
    description: 'Simulates realistic water ripples.',
    name: 'Water Simulation',
    shaderKey: 'waterSim01',
  },
  {
    id: '4',
    title: 'Bright Bloom',
    imageUrl: 'https://placehold.co/200x100?text=Bloom',
    description: 'Makes bright areas glow.',
    name: 'Bloom Effect',
    shaderKey: 'bloom01',
  },
  {
    id: '5',
    title: 'Particle Burst',
    imageUrl: 'https://placehold.co/200x100?text=Particles',
    description: 'Dynamic particle system.',
    name: 'Particle System',
    shaderKey: 'particles01',
  },
  {
    id: '6',
    title: 'Edge Glow',
    imageUrl: 'https://placehold.co/200x100?text=RimLight',
    description: 'Highlights object edges.',
    name: 'Rim Lighting',
    shaderKey: 'rimLight01',
  },
  {
    id: '7',
    title: 'Retro Pixels',
    imageUrl: 'https://placehold.co/200x100?text=Pixelated',
    description: 'Pixelation for a retro style.',
    name: 'Pixelation Effect',
    shaderKey: 'pixelate01',
  },
  {
    id: '8',
    title: 'CRT Scanlines',
    imageUrl: 'https://placehold.co/200x100?text=Scanlines',
    description: 'Old CRT monitor look.',
    name: 'Scanlines Effect',
    shaderKey: 'scanlines01',
  },
];

const EffectFeed: React.FC = () => {
  return (
    <div className="effect-feed-container">
      {mockEffects.map(effect => (
        <EffectCard
          key={effect.id}
          id={effect.id}
          title={effect.title} // title remains for card
          imageUrl={effect.imageUrl}
          description={effect.description}
          // `name` and `shaderKey` are not directly used by EffectCard display
          // but are part of the data structure now.
        />
      ))}
    </div>
  );
};

export default EffectFeed;
