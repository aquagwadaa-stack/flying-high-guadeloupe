import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { FORMULES, HORAIRES, formatDateLong, useStore } from "@/lib/data";

export const Route = createFileRoute("/seances")({
  head: () => ({
    meta: [
      { title: "Séances & tarifs — Trapez’cool" },
      { name: "description", content: "Formules de trapèze volant à Sainte-Anne : première envolée, séance progression, carte 5 séances, séance privée, groupes." },
      { property: "og:title", content: "Séances & tarifs — Trapez’cool" },
      { property: "og:description", content: "Tarifs transparents pour découvrir ou progresser au trapèze volant en Guadeloupe." },
    ],
  }),
  component: Page,
});

function Page() {
  const slots = useStore((s) => s.slots);
  const upcoming = slots.filter((s) => s.booked < s.capacity).slice(0, 8);
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-5 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-6">
          <span className="h-px w-6 bg-lagoon" /> Séances & tarifs
        </span>
        <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6 max-w-3xl">
          Choisissez la formule qui vous ressemble.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          Toutes nos séances incluent l’équipement, l’accompagnement par l’équipe et la mise en sécurité.
        </p>

        <div className="grid lg:grid-cols-3 gap-5 mb-20">
          {FORMULES.map((f) => (
            <div key={f.id} className={`rounded-3xl p-8 border flex flex-col ${f.highlight ? "bg-midnight text-paper border-midnight" : "bg-white border-border"}`}>
              {f.badge && (
                <span className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5 ${f.highlight ? "bg-solar text-midnight" : "bg-lagoon/10 text-lagoon"}`}>{f.badge}</span>
              )}
              <h3 className="font-display text-2xl font-bold mb-3">{f.name}</h3>
              <p className={`text-sm mb-6 flex-1 ${f.highlight ? "text-paper/70" : "text-muted-foreground"}`}>{f.tagline}</p>
              <div className="font-display text-4xl font-bold mb-1">{f.priceLabel}</div>
              <div className={`text-sm mb-6 ${f.highlight ? "text-paper/60" : "text-muted-foreground"}`}>
                {f.duration}{f.age ? ` · ${f.age}` : ""}{f.validity ? ` · ${f.validity}` : ""}
              </div>
              <Link to="/reserver" className={`h-12 inline-flex items-center justify-center rounded-full font-semibold transition-all ${f.highlight ? "bg-lagoon text-white hover:brightness-110" : "bg-midnight text-paper hover:bg-lagoon"}`}>
                {f.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Horaires habituels</h2>
            <div className="bg-white rounded-3xl border border-border divide-y divide-border overflow-hidden">
              {HORAIRES.map((h) => (
                <div key={h.jour} className="px-6 py-4 flex items-center justify-between gap-4">
                  <span className="font-semibold">{h.jour}</span>
                  <span className="text-muted-foreground text-sm text-right">{h.creneaux.join(" · ")}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">Séances supplémentaires pendant les vacances scolaires.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Prochaines disponibilités</h2>
            <div className="space-y-2">
              {upcoming.map((s) => (
                <Link key={s.id} to="/reserver" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-border hover:border-lagoon transition-colors">
                  <div>
                    <div className="font-semibold capitalize">{formatDateLong(s.date)}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5"><Clock className="size-3.5" />{s.time.replace(":", " h ")} – {s.endTime.replace(":", " h ")}</div>
                  </div>
                  <span className={`text-xs font-bold ${s.capacity - s.booked <= 2 ? "text-coral" : "text-turquoise"}`}>
                    {s.capacity - s.booked <= 2 ? `Plus que ${s.capacity - s.booked} places` : `${s.capacity - s.booked} places`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}