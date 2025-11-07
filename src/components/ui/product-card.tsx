"use client";

import { Product } from "@/src/types/product";
import React, { useState, useMemo } from "react";
import Button from "./button";

// --- Componente de Tarjeta de Producto Minimalista ---
const ProductCard = ({
  product,
  onAddToCart,
  onViewDetails,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}) => (
  <div
    className="group bg-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 flex flex-col h-full"
    role="article"
    aria-label={`Producto: ${product.name}`}
  >
    {/* Imagen del producto */}
    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-50">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {product.oldPrice && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
        </div>
      )}
    </div>

    {/* Información del producto */}
    <div className="flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
        {product.name}
      </h3>

      {product.category && (
        <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mb-3">
          {product.category}
        </span>
      )}
    </div>

    {/* Precios y acción */}
    <div className="mt-auto pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-2">
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => onViewDetails(product)}
          size="md"
          className="flex-1 justify-center"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Ver
          </span>
        </Button>
        <Button
          variant="primary"
          onClick={() => onAddToCart(product)}
          size="md"
          className="flex-1 justify-center"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Añadir
          </span>
        </Button>
      </div>
    </div>
  </div>
);

export default ProductCard;
