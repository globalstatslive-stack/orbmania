import React from 'react';
import { ORBMANIA_COLORS } from '../styles/colors';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          borderColor: ORBMANIA_COLORS.GREEN,
          color: ORBMANIA_COLORS.GREEN,
          hoverBg: ORBMANIA_COLORS.GREEN,
          hoverColor: ORBMANIA_COLORS.BACKGROUND,
        };
      case 'secondary':
        return {
          borderColor: ORBMANIA_COLORS.AMBER,
          color: ORBMANIA_COLORS.AMBER,
          hoverBg: ORBMANIA_COLORS.AMBER,
          hoverColor: ORBMANIA_COLORS.BACKGROUND,
        };
      case 'danger':
        return {
          borderColor: ORBMANIA_COLORS.RED,
          color: ORBMANIA_COLORS.RED,
          hoverBg: ORBMANIA_COLORS.RED,
          hoverColor: ORBMANIA_COLORS.BACKGROUND,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '0.5rem 1rem', fontSize: '0.9rem' };
      case 'medium':
        return { padding: '1rem 2rem', fontSize: '1.1rem' };
      case 'large':
        return { padding: '1.2rem 2.5rem', fontSize: '1.3rem' };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`orbmania-button ${className}`}
      style={{
        ...sizeStyles,
        fontWeight: 'bold',
        border: `2px solid ${variantStyles.borderColor}`,
        backgroundColor: 'transparent',
        color: disabled ? ORBMANIA_COLORS.TEXT_MUTED : variantStyles.color,
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = variantStyles.hoverBg;
          e.currentTarget.style.color = variantStyles.hoverColor;
          e.currentTarget.style.boxShadow = `0 0 20px ${variantStyles.borderColor}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = variantStyles.color;
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {children}
    </button>
  );
};