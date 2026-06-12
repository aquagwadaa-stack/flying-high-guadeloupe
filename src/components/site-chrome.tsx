import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, MessageCircle, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/decouvrir", label: "Découvrir" },
  { to: "/seances", label: "Séances & tarifs" },
  { to: "/groupes", label: "Groupes & événements" },
  { to: "/infos", label: "Infos pratiques" },
] as const;

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";
  if (isAdmin) return <>{children}</>;
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader transparent={isHome} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}

function SiteHeader({ transparent }: { transparent: boolean }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !transparent || scrolled;

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-300 inset-x-3 top-3 lg:inset-x-6 lg:top-5 rounded-full",
        solid
          ? "bg-background/90 backdrop-blur-xl border border-white/70 shadow-xl shadow-midnight/10"
          : "bg-white/10 backdrop-blur-xl border border-white/20",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 lg:h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <Logo color={solid ? "midnight" : "paper"} />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-sm font-medium tracking-tight transition-colors",
                solid ? "text-foreground/80 hover:text-lagoon" : "text-paper/90 hover:text-white",
              )}
              activeProps={{ className: "!text-lagoon font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/reserver"
            search={{ formule: "envolee" }}
               className="hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-coral text-white text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-coral/25"
          >
            Réserver une séance
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={cn(
              "lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-full",
              solid ? "bg-secondary text-foreground" : "bg-white/15 text-white backdrop-blur",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl rounded-3xl mt-2 border border-border shadow-2xl overflow-hidden">
          <div className="px-5 py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="py-3 px-4 rounded-xl text-base font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "!text-lagoon bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/reserver"
              search={{ formule: "envolee" }}
              className="mt-4 inline-flex items-center justify-center h-12 rounded-full bg-lagoon text-white font-semibold"
            >
              Réserver une séance
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo({ color = "midnight" }: { color?: "midnight" | "paper" }) {
  const cls = color === "paper" ? "text-white" : "text-foreground";
  return (
    <div className={cn("flex items-center gap-2.5", cls)}>
      <span className="relative inline-flex size-9 rounded-full bg-lagoon items-center justify-center overflow-hidden shadow-lg shadow-lagoon/25">
        <svg viewBox="0 0 32 32" className="size-6 text-white" fill="none" aria-hidden>
          <path
            d="M4 10 L16 18 L28 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="22" r="2.5" fill="currentColor" />
        </svg>
        <span className="absolute -bottom-1 -right-1 size-3 rounded-full bg-solar" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Trapez<span className="text-lagoon">’</span>cool
      </span>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-midnight text-paper pt-24 pb-32 lg:pb-16 px-5 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
          <div className="space-y-6">
            <Logo color="paper" />
            <p className="text-paper/70 text-sm leading-relaxed max-w-xs">
              École de trapèze volant au Helleux, entre Sainte-Anne et Saint-François. Débutants et
              habitués sont les bienvenus.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/590690193428"
                className="inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-lagoon transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Trapezcool-ecole-de-trapeze-volant/100063718410178/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-lagoon transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-paper/40 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-paper/80 hover:text-lagoon transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-paper/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-paper/80">
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 text-lagoon shrink-0" />
                <a href="tel:+590690193428" className="hover:text-white">
                  +590 690 19 34 28
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="size-4 mt-0.5 text-lagoon shrink-0" />
                <a href="https://wa.me/590690193428" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 text-lagoon shrink-0" />
                <a href="mailto:trapezcool971@gmail.com" className="hover:text-white break-all">
                  trapezcool971@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-paper/40 mb-5">
              Adresse
            </h4>
            <p className="text-sm text-paper/80 leading-relaxed">
              Le Helleux
              <br />
              97180 Sainte-Anne
              <br />
              Guadeloupe
            </p>
            <p className="text-sm text-paper/60 mt-4">Ouvert toute l’année</p>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} Trapez’cool. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

function MobileActionBar() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/reserver")) return null;
  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-midnight/95 backdrop-blur-md rounded-full p-1.5 flex gap-1.5 shadow-2xl shadow-midnight/40 ring-1 ring-white/10">
        <a
          href="https://wa.me/590690193428"
          className="flex-1 h-11 rounded-full bg-[#25D366] text-white font-semibold text-sm inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
        <Link
          to="/reserver"
          search={{ formule: "envolee" }}
          className="flex-[1.4] h-11 rounded-full bg-lagoon text-white font-semibold text-sm inline-flex items-center justify-center"
        >
          Réserver
        </Link>
      </div>
    </div>
  );
}
