import { COLOR_SCHEME } from "@/src/core/utils/constants";

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) => {
  const baseStyle =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: `${COLOR_SCHEME.accent.bg} ${COLOR_SCHEME.accent.hover} text-white focus:ring-orange-500 shadow-sm`,
    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 bg-white",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;