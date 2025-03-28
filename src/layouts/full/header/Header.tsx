import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import MobileSidebar from "../sidebar/MobileSidebar";
import { Link } from "react-router-dom";

const Header = () => {
  const [atTop, setAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          atTop
            ? "bg-white dark:bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between py-4 px-4 sm:px-8">
          {/* Botón para abrir el menú lateral en móvil */}
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="h-10 w-10 flex items-center justify-center text-black dark:text-white xl:hidden hover:text-primary hover:bg-gray-200 rounded-full focus:outline-none"
            >
              <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
            </button>
          </div>
          {/* Logo o título del sitio */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-lg font-bold text-gray-800 dark:text-white"
            >
              Brand
            </Link>
          </div>
          {/* Opciones de navegación para escritorio */}
          <div className="hidden xl:flex items-center gap-4">
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Sidebar móvil */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Capa de fondo para cerrar el menú */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          {/* Contenedor del sidebar */}
          <div className="relative bg-white dark:bg-gray-800 w-64 h-full shadow-lg">
            <div className="px-4 py-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-black dark:text-white focus:outline-none"
              >
                <Icon icon="mingcute:close-line" height={24} />
              </button>
            </div>
            {/* Aquí puedes incluir tu componente MobileSidebar
            <MobileSidebar /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
