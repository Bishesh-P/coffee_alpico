import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const baseClasses = 'rounded font-medium transition-all duration-300 flex items-center justify-center';
  
  const variantClasses = {
    primary: `bg-navy-900 hover:bg-blue-800 text-white shadow-sm ${isPressed ? 'scale-95' : 'scale-100'}`,
    secondary: `bg-blue-100 hover:bg-blue-200 text-navy-900 ${isPressed ? 'scale-95' : 'scale-100'}`,
    outline: `border-2 border-navy-900 text-navy-900 hover:bg-blue-50 ${isPressed ? 'scale-95' : 'scale-100'}`,
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const hoverClass = isHovered && !disabled ? 'transform translate-y-[-2px]' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClass}
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;