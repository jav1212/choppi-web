"use client";

import Button from "@/src/components/ui/button";
import NavBar from "@/src/components/ui/nav-bar";
import { COLOR_SCHEME } from "@/src/core/utils/constants";
import Link from "next/link";
import React, { useState } from "react";

// --- Tipos e Interfaces ---
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    allergens: string[];
  };
  store: {
    id: number;
    name: string;
    rating: number;
    deliveryTime: string;
  };
}

// Tipos para las tabs
type TabType = "description" | "specifications" | "nutrition";

// --- Datos de Producto de Ejemplo ---
const PRODUCT: Product = {
  id: 1,
  name: "Aceite de Oliva Extra Virgen Choppi",
  description:
    "Aceite de oliva extra virgen de primera calidad, obtenido de aceitunas seleccionadas mediante prensado en frío. Ideal para ensaladas, cocina y aderezos. Sabor intenso y aroma frutado.",
  price: 12.99,
  originalPrice: 15.99,
  discount: 19,
  rating: 4.7,
  reviews: 892,
  images: [
    "https://images.unsplash.com/photo-1531386450457-50e72e55d15f?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582515073490-39981397c445?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop",
  ],
  category: "Aceites y Vinagres",
  brand: "Choppi Select",
  inStock: true,
  features: [
    "Extra Virgen - Primera prensada en frío",
    "Origen: Andalucía, España",
    "Botella de vidrio oscuro",
    "Acidez ≤ 0.8%",
    "Apto para cocina y ensaladas",
    "Envase 100% reciclable",
  ],
  specifications: {
    Capacidad: "1 Litro",
    Tipo: "Extra Virgen",
    Acidez: "0.8% máximo",
    Origen: "Andalucía, España",
    Envase: "Botella de vidrio oscuro",
    Caducidad: "24 meses",
    Almacenamiento: "Lugar fresco y oscuro",
  },
  nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    allergens: ["Ninguno"],
  },
  store: {
    id: 1,
    name: "Choppi Centro",
    rating: 4.8,
    deliveryTime: "30-45 min",
  },
};

// --- Componente Principal de Detalle de Producto ---
const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const handleAddToCart = () => {
    console.log(`Agregado al carrito: ${quantity} x ${PRODUCT.name}`);
    // Lógica para agregar al carrito
  };

  const handleBuyNow = () => {
    console.log(`Comprar ahora: ${quantity} x ${PRODUCT.name}`);
    // Lógica para compra inmediata
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  // Definir las tabs con tipo correcto
  const tabs: { id: TabType; label: string }[] = [
    { id: "description", label: "Descripción" },
    { id: "specifications", label: "Especificaciones" },
    { id: "nutrition", label: "Información Nutricional" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavBar/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal */}
            <div className="aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <img
                src={PRODUCT.images[selectedImage]}
                alt={PRODUCT.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-xl border-2 overflow-hidden transition-all ${
                    selectedImage === index
                      ? "border-orange-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${PRODUCT.name} vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            {/* Marca y Categoría */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{PRODUCT.brand}</span>
              <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                {PRODUCT.category}
              </span>
            </div>

            {/* Nombre del Producto */}
            <h1 className="text-3xl font-bold text-gray-900">{PRODUCT.name}</h1>

            {/* Rating y Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(PRODUCT.rating)
                        ? "text-orange-400 fill-current"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {PRODUCT.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({PRODUCT.reviews} reseñas)
              </span>
              {PRODUCT.inStock ? (
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  ✓ En stock
                </span>
              ) : (
                <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  Agotado
                </span>
              )}
            </div>

            {/* Precio */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(PRODUCT.price)}
              </span>
              {PRODUCT.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(PRODUCT.originalPrice)}
                  </span>
                  <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    -{PRODUCT.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Descripción Corta */}
            <p className="text-gray-600 leading-relaxed">
              {PRODUCT.description}
            </p>

            {/* Características Principales */}
            <div className="grid grid-cols-2 gap-3">
              {PRODUCT.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Selector de Cantidad y Acciones */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Cantidad:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-medium min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Agregar al Carrito
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex-1 justify-center"
                >
                  Comprar Ahora
                </Button>
              </div>
            </div>

            {/* Información de la Tienda */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Disponible en</p>
                  <p className="font-medium text-gray-900">
                    {PRODUCT.store.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Entrega en</p>
                  <p className="font-medium text-gray-900">
                    {PRODUCT.store.deliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Información Detallada */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {PRODUCT.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Características destacadas:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PRODUCT.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-orange-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-4">
                {Object.entries(PRODUCT.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-100 py-3">
                    <span className="w-1/3 font-medium text-gray-700">
                      {key}
                    </span>
                    <span className="w-2/3 text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">
                      {PRODUCT.nutrition.calories}
                    </div>
                    <div className="text-sm text-gray-600">Calorías</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">
                      {PRODUCT.nutrition.protein}g
                    </div>
                    <div className="text-sm text-gray-600">Proteínas</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">
                      {PRODUCT.nutrition.carbs}g
                    </div>
                    <div className="text-sm text-gray-600">Carbohidratos</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">
                      {PRODUCT.nutrition.fat}g
                    </div>
                    <div className="text-sm text-gray-600">Grasas</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Alérgenos:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT.nutrition.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="inline-block bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm border border-red-200"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
