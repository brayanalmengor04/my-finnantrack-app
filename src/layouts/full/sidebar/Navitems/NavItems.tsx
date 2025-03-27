import React from 'react';
import { ChildItem } from "../Sidebaritems";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

interface NavItemsProps {
  item: ChildItem;
}

const NavItems: React.FC<NavItemsProps> = ({ item }) => {
  const { pathname } = useLocation();
  const active = item.url === pathname;

  return (
    <Link
      to={item.url}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
        active
          ? "bg-primary text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {item.icon ? (
        <Icon icon={item.icon} className={item.color} height={18} />
      ) : (
        // Si no hay icono, muestra un pequeño punto o indicador
        <span className={`h-2 w-2 rounded-full ${active ? "bg-white" : "bg-gray-400"}`}></span>
      )}
      <span className="truncate">{item.name}</span>
    </Link>
  );
};

export default NavItems;
