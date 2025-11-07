import { Store } from "@/src/types/store";

export const COMPANY_LINKS = [
  { label: "Acerca de Choppi", href: "#" },
  { label: "Nuestras Tiendas", href: "#" },
  { label: "Trabaja con Nosotros", href: "#" },
] as const;

export const HELP_LINKS = [
  { label: "FAQ", href: "#" },
  { label: "Términos y Condiciones", href: "#" },
  { label: "Política de Privacidad", href: "#" },
] as const;

export const STORES: Store[] = [
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
