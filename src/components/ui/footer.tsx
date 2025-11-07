import { COMPANY_LINKS, HELP_LINKS } from "@/src/core/utils/mocks/mocks";

const Footer = () => (
  <footer
    className="bg-gray-900 border-t border-gray-800"
    aria-label="Pie de página"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 mb-8 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-white">Choppi</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Todo lo que necesitas, entregado rápido y fresco.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Compañía</h3>
          <ul className="space-y-3">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Ayuda</h3>
          <ul className="space-y-3">
            {HELP_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Contáctanos</h3>
          <address className="not-italic space-y-2 text-sm">
            <p className="text-gray-400">Email: info@choppi.com</p>
            <p className="text-gray-400">Tel: +123 456 7890</p>
          </address>
          <div className="flex gap-3 mt-4" aria-label="Redes sociales">
            {["Facebook", "Instagram", "Twitter"].map((network) => (
              <a
                key={network}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label={`Síguenos en ${network}`}
              >
                <span className="text-white text-xs font-medium">
                  {network[0]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Choppi. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;