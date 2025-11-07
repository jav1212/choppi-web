"use client";

import Footer from "@/src/components/ui/footer";
import NavBar from "@/src/components/ui/nav-bar";
import ProductCard from "@/src/components/ui/product-card";
import { COLOR_SCHEME } from "@/src/core/utils/constants";
import { Product } from "@/src/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aguacate Fresco Hass",
    price: 3.99,
    imageUrl:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    category: "frutas",
    oldPrice: 4.99,
  },
  {
    id: 2,
    name: "Kiwi Zesty Gold",
    price: 2.49,
    imageUrl:
      "https://images.unsplash.com/photo-1550253006-4e31e216dfb0?w=400&h=300&fit=crop",
    category: "frutas",
  },
  {
    id: 3,
    name: "Sandía Premium Sin Semillas",
    price: 8.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=300&fit=crop",
    category: "frutas",
    oldPrice: 10.99,
  },
  {
    id: 4,
    name: "Pollo de Granja Orgánico",
    price: 15.5,
    imageUrl:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop",
    category: "carnes",
  },
  {
    id: 5,
    name: "Ajo Orgánico Español",
    price: 1.2,
    imageUrl:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=300&fit=crop",
    category: "verduras",
    oldPrice: 1.8,
  },
  {
    id: 6,
    name: "Pomelo Rojo Florida",
    price: 2.1,
    imageUrl:
      "https://images.unsplash.com/photo-1550253006-4e31e216dfb0?w=400&h=300&fit=crop",
    category: "frutas",
  },
] as const;

const TESTIMONIALS = [
  {
    id: 1,
    text: "La frescura es inigualable. El mejor aguacate que he comprado.",
    author: "Ana L.",
    rating: 5,
  },
  {
    id: 2,
    text: "Excelente servicio y entrega rápida. ¡Mis verduras llegaron perfectas!",
    author: "Javier M.",
    rating: 5,
  },
  {
    id: 3,
    text: "El 30% de descuento me convenció, la calidad me hizo volver.",
    author: "Elena R.",
    rating: 4,
  },
] as const;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

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
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) => (
  <div
    className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
    role="article"
    aria-label={`Testimonio de ${testimonial.author}`}
  >
    <div
      className="flex mb-4 text-orange-400"
      aria-label={`Calificación: ${testimonial.rating} de 5 estrellas`}
    >
      {"★".repeat(testimonial.rating)}
      {"☆".repeat(5 - testimonial.rating)}
    </div>
    <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
    <p className="font-semibold text-gray-900">— {testimonial.author}</p>
  </div>
);

const Home = () => {
  const router = useRouter();

  const handleViewProductDetails = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Producto añadido: ${product.name}`);
  };

  const handleShopNow = () => {
    console.log("Navegando a tienda...");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavBar />

      <main>
        <section
          className="bg-gradient-to-br from-orange-50 to-amber-100 py-20 md:py-28"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 bg-orange-100 px-4 py-2 rounded-full mb-8"
                aria-label="Oferta especial"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L11.586 10l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Oferta Especial
              </span>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Obtén un{" "}
                <span className="text-orange-600">30% de Descuento</span> en Tu
                Primera Compra
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Descubre productos frescos, electrónicos y más. Todo lo que
                necesitas, entregado directamente a tu puerta.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleShopNow}
                  size="lg"
                  className="min-w-[200px]"
                >
                  Comenzar a Comprar
                </Button>
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  Ver Productos
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" aria-labelledby="featured-products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="featured-products"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Productos Destacados
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Descubre nuestros productos más populares y mejor valorados
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Lista de productos destacados"
            >
              {PRODUCTS.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewProductDetails}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="secondary" size="lg">
                Ver Todos los Productos
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white"
                aria-labelledby="fast-delivery"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 id="fast-delivery" className="text-2xl font-bold mb-4">
                  Entrega Rápida
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Recibe tus compras en minutos. Servicio disponible tanto a
                  nivel local como nacional.
                </p>
                <Button variant="secondary" size="md">
                  Ver Zonas de Cobertura
                </Button>
              </div>

              <div
                className="bg-orange-50 p-8 rounded-2xl border border-orange-100"
                aria-labelledby="product-variety"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-orange-600"
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
                </div>
                <h3
                  id="product-variety"
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  Amplia Variedad
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Desde productos frescos hasta electrónica. Todo lo que
                  necesitas en un solo lugar.
                </p>
                <Button variant="primary" size="md">
                  Explorar Categorías
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-20 bg-gray-50" aria-labelledby="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="testimonials"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Lo Que Dicen Nuestros Clientes
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Descubre por qué miles de usuarios confían en nuestra rapidez y
                calidad
              </p>
            </div>

            <div
              className="grid md:grid-cols-3 gap-8"
              role="list"
              aria-label="Testimonios de clientes"
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} role="listitem">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
