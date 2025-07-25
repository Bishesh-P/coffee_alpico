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
  const baseClasses = 'rounded-xl font-medium transition-all duration-500 ease-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-navy-900 via-navy-800 to-blue-800 hover:from-navy-800 hover:via-blue-800 hover:to-blue-700 text-white shadow-premium focus:ring-blue-500 hover:shadow-premium-lg',
    secondary: 'bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-navy-900 shadow-premium focus:ring-blue-500 border border-blue-200 hover:border-blue-300',
    outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus:ring-blue-500 shadow-premium hover:shadow-premium-lg backdrop-blur-sm',
    premium: 'bg-premium-gradient text-white shadow-premium-lg hover:shadow-premium-xl focus:ring-blue-500 relative before:absolute before:inset-0 before:bg-shimmer before:opacity-0 hover:before:opacity-100 before:animate-shimmer',
    gold: 'bg-gold-gradient text-white shadow-premium-lg hover:shadow-glow-gold focus:ring-yellow-500 relative before:absolute before:inset-0 before:bg-shimmer before:opacity-0 hover:before:opacity-100 before:animate-shimmer',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-4 py-2 tracking-wide',
    md: 'px-6 py-3 tracking-wide',
    lg: 'text-lg px-8 py-4 tracking-wide font-semibold',
    xl: 'text-xl px-10 py-5 tracking-wider font-semibold',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer hover:transform hover:translate-y-[-3px] active:translate-y-[1px] active:scale-[0.98]';
  
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