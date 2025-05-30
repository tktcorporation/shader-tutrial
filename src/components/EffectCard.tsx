import React from 'react';
import { Link } from '@tanstack/react-router'; // Import Link

interface EffectCardProps {
  id: string;
  title: string;
  imageUrl?: string; // Or a placeholder if not provided
  description?: string;
}

const EffectCard: React.FC<EffectCardProps> = ({ id, title, imageUrl, description }) => {
  return (
    // Link to the effect viewer route, passing the effect id
    <Link to="/effect/$effectId" params={{ effectId: id }} className="effect-card-link">
      <div className="effect-card"> {/* Use the new CSS class */}
        {imageUrl && <img src={imageUrl} alt={title} /* Style for img is in CSS */ />}
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </Link>
  );
};

export default EffectCard;
