import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Flame, Info, LayoutDashboard, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { verificarSaudeApi } from "@/services/api";

export function AppLayout() {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let ativo = true;

    async function checarApi() {
      try {
        await verificarSaudeApi();
        if (ativo) setApiOnline(true);
      } catch {
        if (ativo) setApiOnline(false);
      }
    }

    checarApi();
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <Flame className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base leading-tight font-bold tracking-tight">
                  Dragon Ball Z
                </span>
                <span className="text-xs text-muted-foreground">
                  Painel de Guerreiros
                </span>
              </div>
            </NavLink>

            <nav className="hidden items-center gap-1 sm:flex">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </NavLink>

              <NavLink
                to="/sobre"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Info className="size-4" />
                Sobre a API
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {apiOnline === null ? (
              <Badge variant="outline" className="text-muted-foreground">
                Verificando API...
              </Badge>
            ) : apiOnline ? (
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
              >
                <Wifi className="size-3" />
                API Online
              </Badge>
            ) : (
              <Badge variant="destructive">
                <WifiOff className="size-3" />
                API Offline
              </Badge>
            )}
          </div>
        </div>

        {/* Navegação mobile */}
        <div className="flex items-center gap-1 border-t border-border px-4 py-2 sm:hidden">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`
            }
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`
            }
          >
            <Info className="size-4" />
            Sobre a API
          </NavLink>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card/50 py-4 text-center text-xs text-muted-foreground">
        Dragon Ball API • LDW & IEC (FATEC) — React, TypeScript & shadcn/ui
      </footer>
    </div>
  );
}
