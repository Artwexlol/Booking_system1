// src/components/SideBar.tsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "block px-3 py-2 rounded-md text-sm",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-700 hover:bg-slate-100",
  ].join(" ");
}

export default function SideBar() {
  const { user } = useAuth();

  return (
    <aside className="w-56 border-r bg-white p-3 space-y-2">
      <div className="text-xs font-semibold text-slate-500 px-3">
        Navigáció
      </div>
      <NavLink to="/" className={linkClass} end>
        Kezdőlap
      </NavLink>
      <NavLink to="/calendar" className={linkClass}>
        Foglalás
      </NavLink>
      <NavLink to="/bookings" className={linkClass}>
        Foglalásaim
      </NavLink>
    </aside>
  );
}
