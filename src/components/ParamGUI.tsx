import React, { useState, useEffect } from 'react';

export interface ShaderParams {
  intensity: number;
  color: string;
  // Add more params as needed later, e.g. roughness, metalness etc.
}

interface ParamGUIProps {
  initialParams: ShaderParams;
  onParamsChange: (newParams: ShaderParams) => void;
  onOpenMiniLesson?: () => void; // Keep this if it exists
}

const ParamGUI: React.FC<ParamGUIProps> = ({ initialParams, onParamsChange, onOpenMiniLesson }) => {
  const [params, setParams] = useState<ShaderParams>(initialParams);

  useEffect(() => {
    // If initialParams prop changes, update the internal state
    setParams(initialParams);
  }, [initialParams]);

  const handleIntensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIntensity = parseFloat(event.target.value);
    const newParams = { ...params, intensity: newIntensity };
    setParams(newParams);
    onParamsChange(newParams);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const newParams = { ...params, color: newColor };
    setParams(newParams);
    onParamsChange(newParams);
  };

  return (
    // Removed inline style, using className now
    <div className="param-gui-container">
      <h2>Parameters</h2> {/* Styling handled by .param-gui-container h2 */}
      
      <div className="param-gui-input-group">
        <label htmlFor="intensityRange" className="param-gui-label">Intensity: </label>
        <div className="param-gui-control-row">
          <input
            type="range"
            id="intensityRange"
            min="0"
            max="1"
            step="0.01"
            value={params.intensity}
            onChange={handleIntensityChange}
            className="param-gui-range-slider" // Applied class
          />
          <span className="param-gui-value-display">{params.intensity.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="param-gui-input-group">
        <label htmlFor="colorPicker" className="param-gui-label">Color: </label>
        <div className="param-gui-control-row">
          <input
            type="color"
            id="colorPicker"
            value={params.color}
            onChange={handleColorChange}
            className="param-gui-color-picker" // Applied class
          />
          <span className="param-gui-value-display" style={{ minWidth: '80px' }}>{params.color}</span> {/* Slightly wider for hex */}
        </div>
      </div>
      
      {onOpenMiniLesson && (
        // Removed inline style, using className now
        <button onClick={onOpenMiniLesson} className="param-gui-button">
          Learn More (Mini-Lesson)
        </button>
      )}
    </div>
  );
};

export default ParamGUI;
