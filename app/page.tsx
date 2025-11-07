// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Bienvenido a 🛒 Choppi
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Descubre las mejores tiendas y productos
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/stores" className="btn btn-primary text-lg px-6 py-3">
          Explorar Tiendas
        </Link>
        <Link href="/login" className="btn btn-secondary text-lg px-6 py-3">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
