"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  Megaphone,
  Mail,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/categorias", label: "Categorías", icon: Tag },
  { href: "/admin/promociones", label: "Promociones", icon: Megaphone },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

interface SidebarProps {
  userName: string;
  userEmail: string;
  pendingOrders?: number;
}

export function Sidebar({ userName, userEmail, pendingOrders = 0 }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <Link href="/" className="flex-1">
          <Image
            src="/logo.png"
            alt="Pollo Rey"
            width={120}
            height={74}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>
        <span className="rounded-md bg-[#CC1414] px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest text-white">
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                active
                  ? "bg-white/15 text-white"
                  : "text-[#f1ead0]/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <item.icon
                size={17}
                className={active ? "text-[#CC1414]" : "text-[#f1ead0]/40 group-hover:text-[#f1ead0]/70"}
              />
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/pedidos" && pendingOrders > 0 && (
                <span className="rounded-full bg-[#CC1414] px-2 py-0.5 text-[0.6rem] font-black text-white">
                  {pendingOrders}
                </span>
              )}
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#CC1414]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10" />

      {/* Ver sitio */}
      <div className="px-3 py-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#f1ead0]/40 hover:bg-white/8 hover:text-[#f1ead0]/70 transition-all"
        >
          <ExternalLink size={15} />
          <span>Ver sitio</span>
        </Link>
      </div>

      {/* User + Logout */}
      <div className="px-4 py-5 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-[#CC1414] flex items-center justify-center text-white text-xs font-black uppercase">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{userName}</p>
            <p className="text-[0.65rem] text-[#f1ead0]/40 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#f1ead0]/40 hover:bg-white/8 hover:text-red-400 transition-all"
        >
          <LogOut size={13} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-[#4467a9] text-white shadow-lg lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#4467a9] transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-[#f1ead0]/40 hover:text-white"
        >
          <X size={18} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-[#4467a9] shadow-2xl">
        <SidebarContent />
      </aside>
    </>
  );
}
