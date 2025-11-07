"use client";

import Button from "@/src/components/ui/button";
import NavBar from "@/src/components/ui/nav-bar";
import ProductCard from "@/src/components/ui/product-card";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

// --- Tipos e Interfaces ---
interface Store {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  hours: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  categories: string[];
  features: string[];
  distance?: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  oldPrice?: number;
}

interface CartItem extends Product {
  quantity: number;
}

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

// --- Datos de Tiendas ---
const STORES: Store[] = [
  {
    id: 1,
    name: "Choppi Centro",
    address: "Av. Principal 123",
    neighborhood: "Centro",
    city: "Ciudad Central",
    phone: "+1 234 567 890",
    hours: "6:00 AM - 10:00 PM",
    rating: 4.8,
    reviews: 1247,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    categories: ["Frescos", "Electrónicos", "Hogar"],
    features: ["Delivery Express", "Retiro en Tienda", "24/7"],
    distance: 0.5,
  },
  {
    id: 2,
    name: "Choppi Norte",
    address: "Calle Norte 456",
    neighborhood: "Zona Norte",
    city: "Ciudad Central",
    phone: "+1 234 567 891",
    hours: "7:00 AM - 11:00 PM",
    rating: 4.6,
    reviews: 892,
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    categories: ["Orgánicos", "Farmacia", "Mascotas"],
    features: ["Delivery Gratis", "Parqueadero", "WiFi"],
    distance: 2.1,
  },
];

// --- Datos de Productos ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lechuga Romana Premium",
    price: 2.5,
    oldPrice: 3.0,
    imageUrl:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    category: "verduras",
  },
  {
    id: 2,
    name: "Tomates Cherry Orgánicos",
    price: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1546470427-e212b7d31075?w=400&h=300&fit=crop",
    category: "verduras",
  },
  {
    id: 3,
    name: "Pan Artesano Integral",
    price: 3.15,
    oldPrice: 3.5,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    category: "panadería",
  },
  {
    id: 4,
    name: "Aguacates Hass",
    price: 1.8,
    imageUrl:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    category: "frutas",
  },
  {
    id: 5,
    name: "Fresas de Temporada",
    price: 5.99,
    oldPrice: 6.5,
    imageUrl:
      "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400&h=300&fit=crop",
    category: "frutas",
  },
  {
    id: 6,
    name: "Naranjas Valencia",
    price: 2.99,
    imageUrl:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=300&fit=crop",
    category: "frutas",
  },
];

// --- Componente Principal de Detalles de Tienda ---
const StoreDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const storeId = parseInt(params.id as string);

  // Estados - TODOS LOS HOOKS AL INICIO
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PRODUCTS_PER_PAGE = 8;

  // Encontrar la tienda actual
  const currentStore = STORES.find((store) => store.id === storeId);

  // Filtros y búsqueda - HOOKS useMemo SIEMPRE se llaman
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

  // Cálculos del carrito - HOOKS useMemo SIEMPRE se llaman
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Si no se encuentra la tienda, renderizar página de error DESPUÉS de todos los hooks
  if (!currentStore) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tienda no encontrada
          </h1>
          <Button onClick={() => router.push("/stores")} variant="primary">
            Volver a Tiendas
          </Button>
        </div>
      </div>
    );
  }

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

  // Manejo de cambios de filtros
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Paginación
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 600, behavior: "smooth" });
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
      {/* Header */}
      <NavBar />

      <main>
        {/* Sección de Información de la Tienda */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Imagen de la tienda */}
              <div className="lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={currentStore.imageUrl}
                    alt={currentStore.name}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                  {currentStore.distance && (
                    <div className="absolute top-4 left-4 bg-white text-gray-900 font-bold px-3 py-2 rounded-full shadow-lg">
                      📍 {currentStore.distance} km
                    </div>
                  )}
                </div>
              </div>

              {/* Información de la tienda */}
              <div className="lg:w-1/2">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {currentStore.name}
                  </h1>
                  <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-full">
                    <span className="text-orange-600 font-bold">
                      {currentStore.rating}
                    </span>
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      ({currentStore.reviews})
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">
                        {currentStore.address}
                      </p>
                      <p className="text-gray-600">
                        {currentStore.neighborhood}, {currentStore.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <p className="text-gray-900">{currentStore.phone}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-900">{currentStore.hours}</p>
                  </div>
                </div>

                {/* Características */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Servicios Disponibles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStore.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-block text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Categorías */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Categorías Principales
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStore.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-block text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Productos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Productos Disponibles
            </h2>
            <p className="text-gray-600">
              Encuentra los mejores productos en {currentStore.name}
            </p>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
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

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>
      </main>
    </div>
  );
};

export default StoreDetailsPage;
