import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, Clock, Car, Shield } from "lucide-react";
import { FAQ, HORAIRES } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/infos")({
  head: () => ({
    meta: [
      { title: "Infos pratiques — Trapez’cool Guadeloupe" },
      { name: "description", content: "Adresse, horaires, accès, FAQ et conditions : tout ce qu’il faut savoir avant votre séance de trapèze volant au Helleux, Sainte-Anne." },
      { property: "og:title", content: "Infos pratiques — Trapez’cool" },
      { property: "og:description", content: "Adresse, accès, FAQ et conditions pour préparer votre venue." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-5 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-6">
          <span className="h-px w-6 bg-lagoon" /> Infos pratiques
        </span>
        <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6 max-w-3xl">
          Tout pour préparer votre venue.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          Adresse, horaires, accès et réponses à vos questions. Une autre interrogation ? Écrivez-nous, on répond vite.
        </p>

        {/* Coordonnées + carte */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          <div className="bg-white rounded-3xl border border-border p-8 lg:p-10 space-y-6">
            <h2 className="font-display text-2xl font-bold">Nous trouver</h2>
            <div className="flex gap-4">
              <span className="size-11 rounded-2xl bg-lagoon/10 text-lagoon flex items-center justify-center shrink-0"><MapPin className="size-5" /></span>
              <div>
                <div className="font-semibold">Le Helleux</div>
                <div className="text-muted-foreground">97180 Sainte-Anne, Guadeloupe</div>
                <div className="text-sm text-muted-foreground mt-1">Entre Sainte-Anne et Saint-François</div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="size-11 rounded-2xl bg-lagoon/10 text-lagoon flex items-center justify-center shrink-0"><Phone className="size-5" /></span>
              <div>
                <div className="font-semibold">Téléphone</div>
                <a href="tel:+590690193428" className="text-muted-foreground hover:text-lagoon">+590 690 19 34 28</a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="size-11 rounded-2xl bg-lagoon/10 text-lagoon flex items-center justify-center shrink-0"><MessageCircle className="size-5" /></span>
              <div>
                <div className="font-semibold">WhatsApp</div>
                <a href="https://wa.me/590690193428" className="text-muted-foreground hover:text-lagoon">Réponse rapide en journée</a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="size-11 rounded-2xl bg-lagoon/10 text-lagoon flex items-center justify-center shrink-0"><Mail className="size-5" /></span>
              <div>
                <div className="font-semibold">E-mail</div>
                <a href="mailto:trapezcool971@gmail.com" className="text-muted-foreground hover:text-lagoon break-all">trapezcool971@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border min-h-[360px] bg-secondary">
            <iframe
              title="Plan d’accès à Trapez’cool, Le Helleux, Sainte-Anne"
              src="https://maps.google.com/maps?q=Le%20Helleux%2C%2097180%20Sainte-Anne%2C%20Guadeloupe&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              className="w-full h-full min-h-[360px] border-0"
            />
          </div>
        </div>

        {/* Accès & horaires */}
        <div className="grid lg:grid-cols-2 gap-5 mb-20">
          <div className="bg-secondary/50 rounded-3xl p-8">
            <Clock className="size-6 text-lagoon mb-4" />
            <h3 className="font-display text-xl font-bold mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm">
              {HORAIRES.map((h) => (
                <li key={h.jour} className="flex justify-between gap-4">
                  <span className="font-medium">{h.jour}</span>
                  <span className="text-muted-foreground text-right">{h.creneaux.join(" · ")}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">Séances supplémentaires pendant les vacances scolaires.</p>
          </div>
          <div className="bg-secondary/50 rounded-3xl p-8">
            <Car className="size-6 text-lagoon mb-4" />
            <h3 className="font-display text-xl font-bold mb-4">Stationnement</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Parking gratuit sur place, directement à l’entrée du site. Aucune réservation nécessaire pour se garer.
            </p>
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-midnight text-paper rounded-3xl p-8 lg:p-12 mb-20">
          <div className="flex items-start gap-5 mb-6">
            <Shield className="size-8 text-solar shrink-0" />
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2">Sécurité & bonnes conditions</h2>
              <p className="text-paper/70">L’activité est encadrée par l’équipe Trapez’cool. Quelques points à connaître avant de venir.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 text-sm">
            {[
              { t: "Âge minimum", d: "Dès 7 ans, sans limite maximale." },
              { t: "Poids maximum", d: "Jusqu’à 110 kg pour des raisons de sécurité du matériel." },
              { t: "Annulation client", d: "Remboursement intégral jusqu’à 48 h avant la séance." },
              { t: "Météo défavorable", d: "Report sans frais à une autre date." },
              { t: "Contre-indications", d: "Femmes enceintes, problèmes cardiaques ou de dos : nous consulter avant réservation." },
              { t: "Assurance", d: "Activité couverte par notre responsabilité civile professionnelle." },
            ].map((c) => (
              <div key={c.t}>
                <div className="font-semibold text-paper mb-1">{c.t}</div>
                <p className="text-paper/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8 tracking-tight">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="bg-white rounded-3xl border border-border divide-y divide-border overflow-hidden">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-0 px-6 lg:px-8">
                <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}