// app/(admin)/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-indigo-600 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y título Admin */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-indigo-100"
              >
                🛒 Choppi
              </Link>
              <span className="text-indigo-200 text-sm font-medium bg-indigo-500 px-2 py-1 rounded">
                Admin
              </span>
            </div>

            {/* Navigation Admin */}
            <nav className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/stores"
                className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Ver Tiendas
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
