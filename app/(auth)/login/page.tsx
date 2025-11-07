"use client";

import Button from "@/src/components/ui/button";
import NavBar from "@/src/components/ui/nav-bar";
import React, { useState, FormEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
  autoComplete = "on",
  disabled = false,
}: InputFieldProps) => (
  <div className="mb-6">
    <label
      htmlFor={label.toLowerCase()}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={label.toLowerCase()}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-200 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
      } ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
      aria-describedby={error ? `${label.toLowerCase()}-error` : undefined}
    />
    {error && (
      <p
        id={`${label.toLowerCase()}-error`}
        className="mt-2 text-sm text-red-600"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
);

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Simula la lógica de autenticación
    setTimeout(() => {
      setLoading(false);
      if (email === "test@choppi.com" && password === "password") {
        setSuccess("¡Inicio de sesión exitoso! Redireccionando...");
        console.log("Login Choppi simulado exitoso.");
      } else {
        setError("Credenciales incorrectas. Usa test@choppi.com / password.");
      }
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login con ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavBar/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[80vh]">
          {/* Card de Login */}
          <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-8">
              {/* Logo y Encabezado */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    Choppi
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Bienvenido de nuevo
                </h1>
                <p className="text-gray-600">
                  Inicia sesión en tu cuenta para continuar
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Mensajes de feedback */}
                {error && (
                  <div
                    className="p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200"
                    role="alert"
                  >
                    <div className="flex items-center gap-2">
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
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">Error:</span> {error}
                    </div>
                  </div>
                )}

                {success && (
                  <div
                    className="p-4 text-sm text-green-700 bg-green-50 rounded-xl border border-green-200"
                    role="status"
                  >
                    <div className="flex items-center gap-2">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">Éxito:</span> {success}
                    </div>
                  </div>
                )}

                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="tu@email.com"
                  required
                  error={error && !success ? error : ""}
                  autoComplete="email"
                  disabled={loading || !!success}
                />

                <InputField
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={loading || !!success}
                />

                {/* Recordarme y Olvidé contraseña */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading || !!success}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Recordarme</span>
                  </label>

                  <a
                    href="#"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                {/* Botón de Login */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={loading || !!success}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              {/* Separador */}
              <div className="mt-8 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      O continúa con
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de Login Social */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    provider: "Google",
                    color: "bg-red-500 hover:bg-red-600",
                    icon: "G",
                  },
                  {
                    provider: "Facebook",
                    color: "bg-blue-600 hover:bg-blue-700",
                    icon: "f",
                  },
                ].map((social) => (
                  <button
                    key={social.provider}
                    onClick={() => handleSocialLogin(social.provider)}
                    disabled={loading || !!success}
                    className={`${social.color} text-white py-3 px-4 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="font-bold">{social.icon}</span>
                    <span className="text-sm">{social.provider}</span>
                  </button>
                ))}
              </div>

              {/* Link a Registro */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  ¿No tienes una cuenta?{" "}
                  <a
                    href="#"
                    className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                  >
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginCard;
