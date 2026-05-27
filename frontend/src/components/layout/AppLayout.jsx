import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "@/lib/AuthContext";
import { Menu } from "lucide-react";

export default function AppLayout() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        user={user}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:hidden bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <span className="font-fraunces text-lg font-semibold text-primary">TreeTrace</span>
      </div>

      <main className="flex-1 lg:ml-64 min-h-screen overflow-x-hidden pt-14 lg:pt-0">
        <div className="animate-page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
