"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Esquema de Colores Minimalista ---
const COLOR_SCHEME = {
  primary: {
    text: "text-gray-900",
    bg: "bg-white",
    border: "border-gray-200",
  },
  accent: {
    text: "text-orange-600",
    bg: "bg-orange-600",
    hover: "hover:bg-orange-700",
    light: "bg-orange-50",
    border: "border-orange-600",
  },
  background: {
    light: "bg-gray-50",
    subtle: "bg-gray-25",
  },
} as const;

// --- Componente de Botón ---
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

// --- Props del NavBar ---
interface NavBarProps {
  totalItemsInCart?: number;
  onCartClick?: () => void;
  onAccountClick?: () => void;
}

const NavBar = ({
  totalItemsInCart = 0,
  onCartClick,
  onAccountClick,
}: NavBarProps) => {
  const router = useRouter();

  const handleAccountClick = () => {
    if (onAccountClick) {
      onAccountClick();
    } else {
      // Comportamiento por defecto
      router.push("/login");
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      // Comportamiento por defecto
      console.log("Abrir carrito");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Navegación */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Choppi</span>
            </div>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Inicio
              </Link>
              <Link
                href="/stores"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Tiendas
              </Link>
              <Link
                href="/products"
                className="text-orange-600 font-medium text-sm"
              >
                Productos
              </Link>
            </nav>
          </div>

          {/* Carrito Desktop */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleAccountClick}
              className="!p-2"
              aria-label="Mi cuenta"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Button>

            <Button
              variant="ghost"
              onClick={handleCartClick}
              className="relative !p-2"
              aria-label={`Carrito de compras con ${totalItemsInCart} items`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Navegación Mobile */}
        <nav className="md:hidden flex items-center justify-around py-3 border-t border-gray-200">
          <Link
            href="/"
            className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors text-xs"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Inicio</span>
          </Link>
          <Link
            href="/stores"
            className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors text-xs"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>Tiendas</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center text-orange-600 transition-colors text-xs"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span>Productos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
