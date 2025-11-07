import { Store } from "@/src/types/store";
import Button from "./button";

const StoreCard = ({
  store,
  onViewDetails,
}: {
  store: Store;
  onViewDetails: (store: Store) => void;
}) => (
  <div
    className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 flex flex-col h-full"
    role="article"
    aria-label={`Tienda: ${store.name}`}
  >
    {/* Imagen de la tienda */}
    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-50">
      <img
        src={store.imageUrl}
        alt={store.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {store.distance && (
        <div className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          📍 {store.distance} km
        </div>
      )}
    </div>

    {/* Información de la tienda */}
    <div className="flex-grow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {store.name}
        </h3>
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
          <span className="text-orange-600 font-bold text-sm">
            {store.rating}
          </span>
          <svg
            className="w-4 h-4 text-orange-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            {store.neighborhood}, {store.city}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{store.hours}</span>
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {store.categories.slice(0, 3).map((category, index) => (
            <span
              key={index}
              className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
          {store.categories.length > 3 && (
            <span className="inline-block text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              +{store.categories.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Características */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {store.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="inline-block text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-200"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Acciones */}
    <div className="mt-auto pt-4 border-t border-gray-100">
      <div className="flex gap-3">
        <Button
          variant="primary"
          onClick={() => onViewDetails(store)}
          size="md"
          className="flex-1 justify-center"
        >
          Ver Detalles
        </Button>
        <Button
          variant="secondary"
          onClick={() => console.log(`Llamando a ${store.phone}`)}
          size="md"
          className="!p-2"
        >
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </Button>
      </div>
    </div>
  </div>
);

export default StoreCard;