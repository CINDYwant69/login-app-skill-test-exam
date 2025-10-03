import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { COLORS } from '../constants/colors';

const Input = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  showToggle, 
  onToggle, 
  showPassword 
}) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ 
      display: 'block', 
      fontSize: '13px', 
      fontWeight: '500',
      color: COLORS.text,
      marginBottom: '6px',
      textTransform: 'lowercase',
      letterSpacing: '0.5px'
    }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <input
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: `1px solid ${error ? COLORS.danger : COLORS.border}`,
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: COLORS.inputBg,
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
          paddingRight: showToggle ? '40px' : '12px'
        }}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: COLORS.textLight
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
    {error && (
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        marginTop: '6px',
        color: COLORS.danger,
        fontSize: '12px'
      }}>
        <span style={{ marginRight: '4px', fontSize: '14px' }}>⚠</span>
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default Input;