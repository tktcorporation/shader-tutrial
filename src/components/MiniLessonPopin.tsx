import React from 'react';

interface MiniLessonPopinProps {
  visible: boolean;
  onClose: () => void;
}

const MiniLessonPopin: React.FC<MiniLessonPopinProps> = ({ visible, onClose }) => {
  // Using a more robust way to handle visibility and animation via CSS classes would be better,
  // but for now, this matches the requested style. The transition might not work as expected
  // without CSS classes toggling the transform.
  const popinStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: visible ? 0 : '-35%', // Animate by changing right, 30% width + 5% for full hide
    width: '30%', // For PC, adjust as needed
    height: '100vh',
    backgroundColor: '#f0f0f0',
    borderLeft: '1px solid #ccc',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
    padding: '20px',
    zIndex: 1010, // Higher than AhaOverlay
    overflowY: 'auto',
    transition: 'right 0.3s ease-in-out', // Transition for the 'right' property
  };

  if (!visible && true) { // A temporary 'true' to allow the component to render off-screen for transition-out
      // To make transition out work, we need to render it one last time with visible:false
      // A better way is to use a state like 'isRendered' and 'isVisible'
      // For now, let's just keep it simple as per the prompt, but note that exit transitions need more work.
      // The current implementation will make it disappear instantly.
      // To properly animate out, you'd typically delay setting visible to false or use CSS transitions.
      // For now, let's rely on the fact that if `visible` is false, the `right` style is `-35%`.
      // However, the component will not be in the DOM if !visible from the parent.
      // This is a common challenge with purely prop-driven visibility + CSS transitions.
      // The prompt structure `if (!visible) return null;` means it won't animate out.
      // Let's adjust this slightly to allow for an out transition.
  }
  // The initial prompt had `if (!visible) return null;`.
  // This makes exit animations tricky. A common pattern is to always render
  // and use CSS to control visibility/transform. Or use a library like react-transition-group.
  // For this step, I will apply the style that hides it, but if `visible` is false,
  // the parent component might not render it, so the transition out might not be seen.
  // The provided example for EffectViewer *will* render it based on `visible` state,
  // so the style approach for `right` should work for entry. Exit animation will not work
  // if the component is unmounted immediately.

  return (
    <div style={popinStyle}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5em',
          cursor: 'pointer',
        }}
      >
        &times; {/* Close button */}
      </button>
      <h2>Mini-Lesson Title</h2>
      <p>This is the first slide of the lesson. It explains the core concept.</p>
      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#ddd', textAlign: 'center' }}>
        [Placeholder for Animated GIF/Image]
      </div>
      <p>This is the second slide, perhaps with more details.</p>
      <pre style={{
        backgroundColor: '#2d2d2d',
        color: '#f0f0f0',
        padding: '10px',
        borderRadius: '4px',
        overflowX: 'auto',
      }}>
        <code>
          {`// Minimal code example will go here
const shader = new ShaderMaterial();`}
        </code>
      </pre>
      <p>And a concluding third slide.</p>
    </div>
  );
};

export default MiniLessonPopin;
