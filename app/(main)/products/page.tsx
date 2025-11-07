"use client";

import Button from "@/src/components/ui/button";
import CartSidebar from "@/src/components/ui/cart-side-bar";
import NavBar from "@/src/components/ui/nav-bar";
import ProductCard from "@/src/components/ui/product-card";
import { COLOR_SCHEME } from "@/src/core/utils/constants";
import { CartItem } from "@/src/types/cart-item";
import { Product } from "@/src/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

// --- Datos de Productos Mejorados ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lechuga Romana",
    imageUrl:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    price: 2.5,
    oldPrice: 3.0,
    category: "verduras",
  },
  {
    id: 2,
    name: "Tomates Cherry",
    imageUrl:
      "https://images.unsplash.com/photo-1546470427-e212b7d31075?w=400&h=300&fit=crop",
    price: 4.2,
    category: "verduras",
  },
  {
    id: 3,
    name: "Pan Artesanal",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    price: 3.15,
    oldPrice: 3.5,
    category: "panadería",
  },
  {
    id: 4,
    name: "Aguacates",
    imageUrl:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    price: 1.8,
    category: "frutas",
  },
  {
    id: 5,
    name: "Fresas Orgánicas",
    imageUrl:
      "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400&h=300&fit=crop",
    price: 5.99,
    oldPrice: 6.5,
    category: "frutas",
  },
  {
    id: 6,
    name: "Naranjas",
    imageUrl:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=300&fit=crop",
    price: 2.99,
    category: "frutas",
  },
  {
    id: 7,
    name: "Queso Fresco",
    imageUrl:
      "https://images.unsplash.com/photo-1552767057-3e0fbf63d8e9?w=400&h=300&fit=crop",
    price: 7.5,
    oldPrice: 8.2,
    category: "lácteos",
  },
  {
    id: 8,
    name: "Pimientos",
    imageUrl:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
    price: 3.8,
    category: "verduras",
  },
  {
    id: 9,
    name: "Uvas sin Semilla",
    imageUrl:
      "https://images.unsplash.com/photo-1537640538966-79f741143e54?w=400&h=300&fit=crop",
    price: 4.5,
    oldPrice: 5.0,
    category: "frutas",
  },
  {
    id: 10,
    name: "Cebollas",
    imageUrl:
      "https://images.unsplash.com/photo-1580201092673-a5d14b3e45a5?w=400&h=300&fit=crop",
    price: 1.7,
    category: "verduras",
  },
  {
    id: 11,
    name: "Zanahorias",
    imageUrl:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
    price: 2.1,
    category: "verduras",
  },
  {
    id: 12,
    name: "Patatas",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    price: 1.2,
    category: "verduras",
  },
];

// --- Componente Principal Mejorado ---
const ProductsPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const PRODUCTS_PER_PAGE = 8;

  const handleViewProductDetails = (product: Product) => {
    // Navegación real con Next.js Router
    router.push(`/products/${product.id}`);
  };

  // Manejo del carrito
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  // Filtros y búsqueda
  const categories = useMemo(() => {
    const cats = [
      ...new Set(PRODUCTS.map((p) => p.category).filter(Boolean)),
    ] as string[];
    return ["all", ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Resetear página cuando cambian los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Cálculos del carrito
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Paginación
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-12">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="sm"
        >
          Anterior
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 font-medium rounded-lg transition-colors ${
                number === currentPage
                  ? `${COLOR_SCHEME.accent.bg} text-white`
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="sm"
        >
          Siguiente
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Minimalista con Navegación */}
      <NavBar/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Productos Frescos
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubre nuestra selección de productos frescos y de calidad
              </p>
            </div>

            {/* Filtros y Búsqueda */}
            <div className="mb-8 space-y-4">
              {/* Barra de Búsqueda */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Filtros de Categoría */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-orange-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {category === "all" ? "Todos" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Productos */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onViewDetails={handleViewProductDetails}
                    />
                  ))}
                </div>
                {renderPagination()}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar tus filtros de búsqueda
                </p>
              </div>
            )}
          </div>

          {/* Sidebar del Carrito (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CartSidebar
                cart={cart}
                totalItems={totalItemsInCart}
                cartTotal={cartTotal}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                setIsCartOpen={setIsCartOpen}
                isMobile={false}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Carrito Móvil */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
            <CartSidebar
              cart={cart}
              totalItems={totalItemsInCart}
              cartTotal={cartTotal}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              setIsCartOpen={setIsCartOpen}
              isMobile={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
