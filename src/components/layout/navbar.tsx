import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/store";

const navigation = [
  { name: "Knee OA Info", href: "/" },
  { name: "Analysis", href: "/analysis" },
  { name: "Contribute", href: "/contribute" },
  { name: "Contributors", href: "/contributors" },
  { name: "About", href: "/about" },
  { name: "Admin", href: "/admin", icon: ShieldCheck },
];

export function Navbar() {
  const location = useLocation();
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Knee OA Analysis
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-2",
                  location.pathname === item.href
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
