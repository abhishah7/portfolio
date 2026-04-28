import React from 'react';

const GlitchText = ({ text, className = '', onHover = false }) => {
  if (onHover) {
    return (
      <span className={`glitch-hover ${className}`} data-text={text}>
        {text}
      </span>
    );
  }

  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
};

export default GlitchText;
