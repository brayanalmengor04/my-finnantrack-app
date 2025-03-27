import React from 'react';
import NavItems from './Navitems/NavItems';
import SidebarContent from "./Sidebaritems";

const SidebarLayout = () => {
  return (
    // El sidebar se muestra en pantallas extra grandes (xl) y se posiciona de forma fija
    <div className="hidden xl:block fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Sección para el logo */}
      <div className="px-6 py-4 flex items-center">
        {/* Puedes reemplazar este span por el logo de tu producto */}
        <span className="text-xl font-bold">Logo</span>
      </div>
      {/* Contenedor de navegación con scroll vertical */}
      <div className="px-5 mt-2 overflow-y-auto h-[calc(100vh-100px)]">
        {SidebarContent && SidebarContent.map((section, index) => (
          <div key={section.heading || index} className="mb-4">
            <h5 className="text-gray-500 dark:text-gray-400 font-semibold text-xs tracking-widest uppercase mb-2">
              {section.heading}
            </h5>
            <div>
              {section.children?.map((child, idx) => (
                <NavItems key={child.id || idx} item={child} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLayout;
