import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, TreePine, Map, Plus, QrCode,
  Users, BarChart3, LogOut, Leaf, ScanLine, Globe,
  Sparkles, Network, WifiOff,
  Crown, FileText, SearchCheck, X,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",      icon: LayoutDashboard, path: "/dashboard" },
  { label: "Tree Inventory", icon: TreePine,         path: "/trees" },
  { label: "Tree Map",       icon: Map,              path: "/map" },
  { label: "Add Tree",       icon: Plus,             path: "/add-tree" },
  { label: "AI Identifier",  icon: Sparkles,         path: "/ai-identify" },
  { label: "Community",      icon: Network,          path: "/community" },
  { label: "QR Scanner",     icon: ScanLine,         path: "/scan" },
  { label: "Public Portal",  icon: Globe,            path: "/public" },
  { label: "Upgrade Pro",    icon: Crown,            path: "/upgrade" },
];

const adminItems = [
  { label: "QR Generator", icon: QrCode,    path: "/qr-manager" },
  { label: "Health Logs",  icon: BarChart3, path: "/health-logs" },
  { label: "Unknown Review", icon: SearchCheck, path: "/unknown-species" },
  { label: "Reports & Tools", icon: FileText, path: "/reports" },
  { label: "Users",        icon: Users,     path: "/admin/users" },
];

export default function Sidebar({ user, mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const { logout } = useAuth();
  const { isOnline, queueLength } = useOfflineSync();
  const isAdmin = user?.role === "admin";
  const isCitizen = user?.role === "citizen";
  const roleText = user?.role?.replace("_", " ") || "field worker";
  const planText = user?.role === "admin" || user?.role === "field_worker"
    ? "INSTITUTIONAL"
    : (user?.subscription_plan || "free").toUpperCase();
  const visibleNavItems = navItems
    .filter((item) => !(isCitizen && ["Add Tree", "Public Portal"].includes(item.label)))
    .map((item) => {
      if (isCitizen && item.label === "Tree Map") {
        return { ...item, path: "/public" };
      }
      return item;
    });

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-sidebar-primary to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-sidebar-primary/20">
                <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="font-fraunces text-sidebar-primary text-xl font-semibold leading-none">
                  TreeTrace
                </h1>
                <p className="text-sidebar-foreground/50 text-[11px] mt-0.5 tracking-wide">Geo-Spatial Inventory</p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Offline indicator */}
          {!isOnline && (
            <div className="mt-3 flex items-center gap-2 px-2 py-1.5 bg-amber-500/20 rounded-lg border border-amber-500/10">
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 text-xs">
                Offline{queueLength > 0 ? ` · ${queueLength} queued` : ""}
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="mb-2">
            <p className="text-sidebar-foreground/40 text-[10px] font-semibold uppercase tracking-[0.15em] px-3 mb-2">
              Main
            </p>
            {visibleNavItems.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                active={location.pathname === item.path}
                onClick={onCloseMobile}
              />
            ))}
          </div>

          {isAdmin && (
            <div className="mt-4 pt-3 border-t border-sidebar-border/50">
              <p className="text-sidebar-foreground/40 text-[10px] font-semibold uppercase tracking-[0.15em] px-3 mb-2">
                Admin
              </p>
              {adminItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  active={location.pathname === item.path}
                  onClick={onCloseMobile}
                />
              ))}
            </div>
          )}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-sidebar-border bg-sidebar-accent/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sidebar-primary/30 to-emerald-500/20 flex items-center justify-center ring-2 ring-sidebar-primary/20">
              <span className="text-sidebar-primary text-sm font-semibold">
                {user?.full_name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sidebar-foreground text-sm font-medium truncate">
                {user?.full_name || "User"}
              </p>
              <p className="text-sidebar-foreground/50 text-[11px] capitalize">
                {roleText} · {planText}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
        active
          ? "bg-gradient-to-r from-sidebar-primary to-emerald-500 text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/25"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      )}
    >
      <Icon className={cn(
        "w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200",
        !active && "group-hover:scale-110"
      )} />
      {item.label}
      {active && (
        <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/80" />
      )}
    </Link>
  );
}
