import { uniqueId } from "lodash";

export interface ChildItem {
  id: number | string;
  name: string;
  icon: string;
  url: string;
  color?: string;
  children?: ChildItem[];
}

export interface MenuItem {
  heading: string;
  children: ChildItem[];
}

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        id: uniqueId(),
        name: "Dashboard",
        icon: "solar:home-line-duotone", // Modern icon for the dashboard
        url: "/dashboard",
      },
    ],
  },
  {
    heading: "GENERAL ADMINISTRATION MODULE",
    children: [
      {
        id: uniqueId(),
        name: "Customer and Supplier Management",
        icon: "solar:circle-bottom-down-bold", // Representative icon for customers/suppliers
        url: "/administration/customers-suppliers",
      },
      {
        id: uniqueId(),
        name: "Product and Stock Management",
        icon: "solar:circle-bottom-down-bold", // Representative icon for products and stock
        url: "/administration/products-stock",
      },
      {
        id: uniqueId(),
        name: "Income and Expense Control",
        icon: "solar:circle-bottom-down-bold", // Representative icon for financial control
        url: "/administration/income-expenses",
      },
    ],
  },
  {
    heading: "ELECTRONIC BILLING",
    children: [
      {
        id: uniqueId(),
        name: "Electronic Billing",
        icon: "solar:bill-list-bold", // Icon suggesting electronic billing
        url: "/electronic-billing",
      },  

      // Agregar mas opciones

    ],
  },
  {
    heading: "POINT OF SALE (POS)",
    children: [
      {
        id: uniqueId(),
        name: "Point of Sale (POS)",
        icon: "solar:card-send-bold", // Cash register icon for POS systems
        url: "/pos",
      }, 

      // mas opciones
    ],
  },
  {
    heading: "REPORTS AND STATISTICS",
    children: [
      {
        id: uniqueId(),
        name: "Reports and Statistics",
        icon: "solar:shop-bold", // Icon symbolizing charts and data
        url: "/reports-statistics",
      }, 

      // Mas ocpiones
    ],
  },
];

export default SidebarContent;
