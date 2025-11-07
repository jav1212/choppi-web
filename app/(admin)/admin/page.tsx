"use client";

import Link from "next/link";
import React, { useState } from "react";

// --- Tipos e Interfaces ---
interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
}

// --- Componente de Botón ---
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}> = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 bg-white",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Componente de Input ---
const Input: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}> = ({ label, type = "text", value, onChange, placeholder = "", required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      required={required}
    />
  </div>
);

// --- Datos Iniciales ---
const initialStores: Store[] = [
  {
    id: "1",
    name: "Mi Tienda Principal",
    address: "Av. Principal 123",
    phone: "+1 234 567 890",
    email: "tienda@ejemplo.com",
    status: "active"
  }
];

// --- Componente Principal Simplificado ---
const AdminPage = () => {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // Iniciar creación de nueva tienda
  const handleNewStore = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
    });
    setEditingStore(null);
    setActiveTab("form");
  };

  // Editar tienda existente
  const handleEditStore = (store: Store) => {
    setFormData({
      name: store.name,
      address: store.address,
      phone: store.phone,
      email: store.email,
    });
    setEditingStore(store);
    setActiveTab("form");
  };

  // Crear o actualizar tienda
  const handleSaveStore = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    if (editingStore) {
      // Actualizar tienda existente
      setStores(prev => prev.map(store =>
        store.id === editingStore.id
          ? { ...store, ...formData }
          : store
      ));
    } else {
      // Crear nueva tienda
      const newStore: Store = {
        id: Date.now().toString(),
        ...formData,
        status: "active"
      };
      setStores(prev => [...prev, newStore]);
    }

    // Volver a la lista
    setActiveTab("list");
    setEditingStore(null);
  };

  // Eliminar tienda
  const handleDeleteStore = (storeId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tienda?")) {
      setStores(prev => prev.filter(store => store.id !== storeId));
    }
  };

  // Cambiar estado de la tienda
  const handleToggleStatus = (storeId: string) => {
    setStores(prev => prev.map(store =>
      store.id === storeId
        ? { ...store, status: store.status === "active" ? "inactive" : "active" }
        : store
    ));
  };

  // Cancelar edición/creación
  const handleCancel = () => {
    setActiveTab("list");
    setEditingStore(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Choppi Admin</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Inicio
              </Link>
              <Link href="/stores" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Tiendas
              </Link>
              <a href="/admin" className="text-orange-600 font-medium text-sm">
                Administrar
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administrar Tiendas
          </h1>
          <p className="text-gray-600">
            Gestiona las tiendas de tu negocio en Choppi
          </p>
        </div>

        {/* Tabs de Navegación */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("list")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "list"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Mis Tiendas
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "form"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {editingStore ? "Editar Tienda" : "Nueva Tienda"}
            </button>
          </nav>
        </div>

        {/* Contenido de las Tabs */}
        {activeTab === "list" && (
          <div>
            {/* Header de la lista */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Mis Tiendas ({stores.length})
              </h2>
              <Button onClick={handleNewStore}>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nueva Tienda
                </span>
              </Button>
            </div>

            {/* Lista de Tiendas */}
            {stores.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tienes tiendas registradas
                </h3>
                <p className="text-gray-500 mb-4">
                  Comienza agregando tu primera tienda
                </p>
                <Button onClick={handleNewStore}>
                  Crear Primera Tienda
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {store.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              store.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {store.status === "active" ? "Activa" : "Inactiva"}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{store.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{store.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{store.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleToggleStatus(store.id)}
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            store.status === "active"
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {store.status === "active" ? "Desactivar" : "Activar"}
                        </button>
                        <Button
                          onClick={() => handleEditStore(store)}
                          variant="secondary"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDeleteStore(store.id)}
                          variant="danger"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "form" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingStore ? "Editar Tienda" : "Crear Nueva Tienda"}
            </h2>

            <div className="space-y-6">
              <Input
                label="Nombre de la Tienda"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder="Ej: Mi Supermercado"
                required
              />
              
              <Input
                label="Dirección"
                value={formData.address}
                onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                placeholder="Dirección completa de la tienda"
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Teléfono"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  placeholder="Ej: +1 234 567 890"
                  required
                />
                
                <Input
                  label="Email de contacto"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                  placeholder="tienda@ejemplo.com"
                  required
                />
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  onClick={handleSaveStore}
                >
                  {editingStore ? "Actualizar Tienda" : "Crear Tienda"}
                </Button>
                
                <Button
                  onClick={handleCancel}
                  variant="secondary"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;