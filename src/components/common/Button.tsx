import { memo } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'premium' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button = memo<ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'rounded-xl font-medium transition-all duration-300 ease-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group transform active:scale-95 touch-manipulation';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-navy-900 via-navy-800 to-blue-800 hover:from-navy-800 hover:via-blue-800 hover:to-blue-700 text-white shadow-lg focus:ring-blue-500 hover:shadow-xl border-0 active:shadow-md',
    secondary: 'bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-navy-900 shadow-md focus:ring-blue-500 border border-blue-200 hover:border-blue-300 active:shadow-sm',
    outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus:ring-blue-500 shadow-md hover:shadow-lg backdrop-blur-sm active:shadow-sm',
    premium: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl focus:ring-purple-500 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity active:shadow-lg',
    gold: 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl focus:ring-yellow-500 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity active:shadow-lg',
  };
  
  const sizeClasses = {
    sm: 'text-xs sm:text-sm px-3 sm:px-4 py-2 tracking-wide',
    md: 'text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 tracking-wide',
    lg: 'text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 tracking-wide font-semibold',
    xl: 'text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 tracking-wider font-semibold',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none' 
    : 'cursor-pointer hover:transform active:scale-[0.98] hover:shadow-lg active:shadow-sm';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
    >
      <span className="relative z-10 font-premium">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;