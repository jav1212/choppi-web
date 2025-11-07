import { Product } from "@/src/types/product";
import Button from "./button";
import { CartItem } from "@/src/types/cart-item";

const CartSidebar: React.FC<{
  cart: CartItem[];
  totalItems: number;
  cartTotal: number;
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (productId: number) => void;
  setIsCartOpen: (open: boolean) => void;
  isMobile: boolean;
}> = ({
  cart,
  totalItems,
  cartTotal,
  handleAddToCart,
  handleRemoveFromCart,
  setIsCartOpen,
  isMobile,
}) => (
  <div
    className={`bg-white h-full flex flex-col ${
      isMobile ? "p-6" : "p-4 rounded-2xl border border-gray-200"
    }`}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Tu carrito</h2>
        <p className="text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
        </p>
      </div>
      {isMobile && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCartOpen(false)}
          className="!p-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      )}
    </div>

    {/* Lista de productos */}
    <div className="flex-grow overflow-y-auto space-y-4">
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
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
          </div>
          <p className="text-gray-500 text-lg font-medium">
            Tu carrito está vacío
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Agrega productos para continuar
          </p>
        </div>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-grow min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">
                {item.name}
              </p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFromCart(item.id)}
                className="!p-1"
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
                    d="M20 12H4"
                  />
                </svg>
              </Button>
              <span className="font-semibold text-gray-900 min-w-6 text-center">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddToCart(item)}
                className="!p-1"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Footer del carrito */}
    {cart.length > 0 && (
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total:</span>
          <span className="text-2xl font-bold text-gray-900">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
        <Button
          variant="primary"
          onClick={() => console.log("Procesando pago...")}
          size="lg"
          className="w-full"
        >
          Finalizar compra
        </Button>
      </div>
    )}
  </div>
);

export default CartSidebar;