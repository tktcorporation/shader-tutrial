import React, { useState } from 'react';
import AhaOverlay from './AhaOverlay'; // Import AhaOverlay

interface ParamGUIProps {
  onOpenMiniLesson?: () => void; // New prop, optional for now to avoid breaking if not passed
}

const ParamGUI: React.FC<ParamGUIProps> = ({ onOpenMiniLesson }) => { // Destructure new prop
  const [ahaVisible, setAhaVisible] = useState(false);
  const [ahaMessage, setAhaMessage] = useState('');

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAhaMessage(`Intensity set to: ${value}. This knob controls the Fresnel strength!`);
    setAhaVisible(true);
  };

  const handleOverlayClose = () => {
    setAhaVisible(false);
  };

  return (
    <div style={{ border: '1px dashed #999', padding: '10px', margin: '10px', position: 'relative' /* For AhaOverlay positioning */ }}>
      <AhaOverlay message={ahaMessage} visible={ahaVisible} onClose={handleOverlayClose} />
      <h2>Parameters</h2>
      <p>Shader controls will appear here.</p>
      <div>
        <label htmlFor="intensityRange">Intensity: </label>
        <input
          type="range"
          id="intensityRange"
          min="0"
          max="1"
          step="0.01"
          defaultValue="0.5"
          onChange={handleSliderChange} // Trigger overlay on change
        />
      </div>
      <div>
        <label htmlFor="colorPicker">Color: </label>
        <input type="color" id="colorPicker" defaultValue="#ff0000" />
      </div>
      {/* Add button to trigger Mini-Lesson */}
      {onOpenMiniLesson && (
        <button onClick={onOpenMiniLesson} style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer' }}>
          Learn More (Mini-Lesson)
        </button>
      )}
    </div>
  );
};

export default ParamGUI;
