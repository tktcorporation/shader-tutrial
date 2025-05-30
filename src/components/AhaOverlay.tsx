import React, { useEffect, useState } from 'react';

interface AhaOverlayProps {
  message: string;
  visible: boolean;
  onClose: () => void; // Callback when the overlay wants to close itself (e.g., after timer)
}

const AhaOverlay: React.FC<AhaOverlayProps> = ({ message, visible, onClose }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute', // Or 'fixed' depending on desired behavior relative to parent
      top: '10px', // Example positioning
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000, // Ensure it's above other elements
      textAlign: 'center',
      minWidth: '200px', // Ensure it's wide enough for messages
    }}>
      {message}
    </div>
  );
};

export default AhaOverlay;
