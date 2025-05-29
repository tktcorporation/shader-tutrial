import { createFileRoute } from '@tanstack/react-router';
import EffectFeed from '../components/EffectFeed'; // Adjust path if necessary

export const Route = createFileRoute('/')({
  component: EffectFeedDisplay,
});

function EffectFeedDisplay() {
  return (
    <div>
      {/* You can add a title or other elements specific to the page here if needed */}
      <EffectFeed />
    </div>
  );
}
