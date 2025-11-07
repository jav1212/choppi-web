"use client";

import Button from "@/src/components/ui/button";
import NavBar from "@/src/components/ui/nav-bar";
import StoreCard from "@/src/components/ui/store-card";
import { COLOR_SCHEME } from "@/src/core/utils/constants";
import { Store } from "@/src/types/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

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
  {
    id: 3,
    name: "Choppi Sur",
    address: "Av. Sur 789",
    neighborhood: "Zona Sur",
    city: "Ciudad Central",
    phone: "+1 234 567 892",
    hours: "5:00 AM - 9:00 PM",
    rating: 4.9,
    reviews: 1563,
    imageUrl:
      "https://images.unsplash.com/photo-1604719312566-8912e2217f87?w=400&h=300&fit=crop",
    categories: ["Frescos", "Panadería", "Lácteos"],
    features: ["Horario Extendido", "Cafetería", "App Propia"],
    distance: 3.5,
  },
  {
    id: 4,
    name: "Choppi Este",
    address: "Carrera Este 321",
    neighborhood: "Este Moderno",
    city: "Ciudad Central",
    phone: "+1 234 567 893",
    hours: "6:30 AM - 10:30 PM",
    rating: 4.7,
    reviews: 734,
    imageUrl:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=300&fit=crop",
    categories: ["Electrónicos", "Hogar", "Deportes"],
    features: ["Showroom", "Asesoría Técnica", "Instalación"],
    distance: 1.8,
  },
  {
    id: 5,
    name: "Choppi Oeste",
    address: "Diagonal Oeste 654",
    neighborhood: "Oeste Residencial",
    city: "Ciudad Central",
    phone: "+1 234 567 894",
    hours: "8:00 AM - 8:00 PM",
    rating: 4.5,
    reviews: 421,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    categories: ["Frescos", "Verdulería", "Carnicería"],
    features: ["Productos Locales", "Delivery Inmediato", "Precios Bajos"],
    distance: 4.2,
  },
  {
    id: 6,
    name: "Choppi Plaza",
    address: "Centro Comercial Mega",
    neighborhood: "Plaza Central",
    city: "Ciudad Central",
    phone: "+1 234 567 895",
    hours: "9:00 AM - 9:00 PM",
    rating: 4.4,
    reviews: 298,
    imageUrl:
      "https://images.unsplash.com/photo-1556740772-1a741367b467?w=400&h=300&fit=crop",
    categories: ["Moda", "Electrónicos", "Juguetes"],
    features: ["Centro Comercial", "Food Court", "Cine"],
    distance: 2.8,
  },
];

// --- Componente Principal de Tiendas ---
const StoresPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<string>("all");
  const [selectedFeature, setSelectedFeature] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const STORES_PER_PAGE = 6;

  // Filtros disponibles
  const neighborhoods = useMemo(() => {
    const hoods = [...new Set(STORES.map((store) => store.neighborhood))];
    return ["all", ...hoods];
  }, []);

  const features = useMemo(() => {
    const allFeatures = STORES.flatMap((store) => store.features);
    const uniqueFeatures = [...new Set(allFeatures)];
    return ["all", ...uniqueFeatures];
  }, []);

  // Filtrar tiendas
  const filteredStores = useMemo(() => {
    let filtered = STORES;

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(lowerCaseSearch) ||
          store.neighborhood.toLowerCase().includes(lowerCaseSearch) ||
          store.city.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (selectedNeighborhood !== "all") {
      filtered = filtered.filter(
        (store) => store.neighborhood === selectedNeighborhood
      );
    }

    if (selectedFeature !== "all") {
      filtered = filtered.filter((store) =>
        store.features.includes(selectedFeature)
      );
    }

    return filtered;
  }, [searchTerm, selectedNeighborhood, selectedFeature]);

  const totalPages = Math.ceil(filteredStores.length / STORES_PER_PAGE);

  const currentStores = useMemo(() => {
    const startIndex = (currentPage - 1) * STORES_PER_PAGE;
    const endIndex = startIndex + STORES_PER_PAGE;
    return filteredStores.slice(startIndex, endIndex);
  }, [filteredStores, currentPage]);

  // Resetear página cuando cambian los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedNeighborhood, selectedFeature]);

  // Paginación
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewDetails = (store: Store) => {
    // Redireccionar a la página de detalles de la tienda
    router.push(`/stores/${store.id}`);
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
      <NavBar/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestras Tiendas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra la tienda Choppi más cercana y descubre todos nuestros
            servicios
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="mb-8 space-y-6">
          {/* Barra de Búsqueda */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar tiendas por nombre, barrio o ciudad..."
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

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">
                Barrio:
              </span>
              {neighborhoods.map((neighborhood) => (
                <button
                  key={neighborhood}
                  onClick={() => setSelectedNeighborhood(neighborhood)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedNeighborhood === neighborhood
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {neighborhood === "all" ? "Todos" : neighborhood}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">
                Servicios:
              </span>
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => setSelectedFeature(feature)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedFeature === feature
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {feature === "all" ? "Todos" : feature}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {STORES.length}
            </div>
            <div className="text-gray-600 text-sm">Tiendas Totales</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.max(...STORES.map((s) => s.rating))}
            </div>
            <div className="text-gray-600 text-sm">Rating Máximo</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(
                STORES.reduce((acc, store) => acc + store.rating, 0) /
                  STORES.length
              )}
            </div>
            <div className="text-gray-600 text-sm">Rating Promedio</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-gray-600 text-sm">Algunas Tiendas</div>
          </div>
        </div>

        {/* Grid de Tiendas */}
        {currentStores.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onViewDetails={handleViewDetails}
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron tiendas
            </h3>
            <p className="text-gray-500">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StoresPage;
