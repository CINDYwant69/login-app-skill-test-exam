import React, { useState } from 'react';
import { COLORS } from '../constants/colors';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  style = {} 
}) => {
  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? COLORS.primary : COLORS.danger;
  const hoverColor = isPrimary ? COLORS.primaryHover : COLORS.dangerHover;
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '10px 24px',
        backgroundColor: isHovered ? hoverColor : bgColor,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ...style
      }}
    >
      {children}
    </button>
  );
};

export default Button;