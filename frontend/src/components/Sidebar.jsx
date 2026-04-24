import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  User,
} from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Togggle button (mobile only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-pink-600 text-white p-2 rounded"
      >
        ☰
      </button>
      {/* sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-pink-50 border-r border-pink-200 w-[250px] p-6 space-y-2 transition-transform duration-300
      z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="text-center px-3 space-y-2">
          <NavLink
            to="/dashboard/sales"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/add-product"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <PackagePlus />
            <span>Add Product</span>
          </NavLink>

          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <PackageSearch />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <User />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <FaRegEdit />
            <span>Orders</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
