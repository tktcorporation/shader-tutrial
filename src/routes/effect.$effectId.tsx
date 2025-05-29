import { createFileRoute, useParams } from '@tanstack/react-router';
import EffectViewer from '../components/EffectViewer.tsx';
// Temporary: Import mock data to simulate fetching effect details
import { mockEffects } from '../components/EffectFeed.tsx'; // Adjust path if needed

export const Route = createFileRoute('/effect/$effectId')({
  component: EffectViewerComponent,
  // Optional: Loader function to fetch data - for future improvement
  // loader: async ({ params }) => {
  //   const effect = mockEffects.find(e => e.id === params.effectId);
  //   if (!effect) throw new Error('Effect not found');
  //   return effect;
  // }
});

function EffectViewerComponent() {
  // Corrected: useParams should be called with options object that has 'from' property
  const { effectId } = useParams({ from: '/effect/$effectId' });


  // Find effect data (manual way without loader for now)
  const effectData = mockEffects.find(e => e.id === effectId);

  if (!effectData) {
    return <div>Effect not found! (ID: {effectId})</div>; // Added ID for debugging
  }

  // Pass the whole effectData object to EffectViewer
  return <EffectViewer effect={effectData} />;
}
