import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Cake,
  Building2,
  Users,
  Sparkles,
  Check,
  MessageCircle,
  Mail,
} from "lucide-react";
import groupSchoolAsset from "@/assets/group-school.jpg.asset.json";
const groupSchool = groupSchoolAsset.url;

export const Route = createFileRoute("/groupes")({
  head: () => ({
    meta: [
      { title: "Groupes & événements — Trapez’cool Guadeloupe" },
      {
        name: "description",
        content:
          "Privatisez un créneau de trapèze volant au Helleux pour un anniversaire, une fête ou un événement sur mesure en Guadeloupe.",
      },
      { property: "og:title", content: "Groupes & événements — Trapez’cool" },
      {
        property: "og:description",
        content: "Un créneau privatisé et une expérience de trapèze volant imaginée autour de votre événement.",
      },
    ],
  }),
  component: Page,
});

const FORMATS = [
  {
    icon: Cake,
    title: "Célébration privée",
    desc: "Anniversaire, fête de famille ou moment important : un créneau rien que pour vous.",
    details: "Enfants dès 7 ans & adultes",
  },
  {
    icon: Users,
    title: "Expérience entre proches",
    desc: "Une activité forte à vivre ensemble, avec un déroulé adapté aux envies du groupe.",
    details: "Créneau privatisé",
  },
  {
    icon: Building2,
    title: "Équipe & structure",
    desc: "Association, entreprise ou collectif : créez un rendez-vous fédérateur hors du quotidien.",
    details: "Format sur mesure",
  },
  {
    icon: Sparkles,
    title: "Votre idée",
    desc: "Vous avez un projet particulier ? Nous construisons ensemble une expérience qui lui ressemble.",
    details: "Parlons-en ensemble",
  },
];

const INCLUS = [
  "Un créneau réservé exclusivement à votre groupe",
  "Un déroulé défini avec vous avant l’événement",
  "Matériel nécessaire à la pratique",
  "Échauffement et consignes avant de monter",
  "Passages adaptés au niveau de chacun",
  "Accompagnement dédié par l’équipe Trapez’cool",
];

function Page() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-5 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center mb-20 rounded-[2.5rem] bg-sky p-7 lg:p-14">
          <div className="absolute -top-16 -left-16 size-44 rounded-full bg-solar/35" aria-hidden />
          <div className="absolute -bottom-20 right-1/3 size-52 rounded-full bg-coral/15" aria-hidden />
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-6">
              <span className="h-px w-6 bg-lagoon" /> Groupes & événements
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6">
              Votre événement prend de la hauteur.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Ici, il ne s’agit pas simplement de réserver plusieurs places. Vous pouvez privatiser
              un créneau et imaginer avec l’équipe une expérience unique, pensée pour votre groupe,
              votre occasion et votre rythme.
            </p>
          </div>
          <div className="relative rotate-2">
            <div className="absolute -inset-4 rounded-[2rem] bg-coral/25 -rotate-3" aria-hidden />
            <img
              src={groupSchool}
              alt="Groupe accueilli pour une expérience privée à l’école Trapez’cool"
              loading="lazy"
              className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl"
            />
            <span className="absolute -bottom-5 left-6 rounded-full bg-solar px-5 py-3 font-display font-bold shadow-lg -rotate-2">
              Privatisation sur demande
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {FORMATS.map((f) => (
            <div
              key={f.title}
              className="bg-white/90 rounded-3xl p-7 border border-white flex flex-col shadow-lg shadow-midnight/5 hover:-translate-y-1 transition-transform"
            >
              <div className="size-12 rounded-2xl bg-lagoon/10 text-lagoon flex items-center justify-center mb-5">
                <f.icon className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground flex-1 mb-5">{f.desc}</p>
              <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground border-t border-border pt-4">
                {f.details}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
              Plus qu’une réservation de groupe
            </h2>
            <ul className="space-y-4">
              {INCLUS.map((i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="size-6 mt-0.5 rounded-full bg-lagoon/15 flex items-center justify-center shrink-0">
                    <Check className="size-3.5 text-lagoon" />
                  </span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-midnight text-paper rounded-[2rem] p-8 lg:p-10 rotate-1 shadow-2xl shadow-midnight/20">
            <h2 className="font-display text-3xl font-bold mb-6 tracking-tight">
              Comment ça marche
            </h2>
            <ol className="space-y-5">
              {[
                {
                  n: "01",
                  t: "Vous nous racontez votre idée",
                  d: "Occasion, date envisagée, nombre et âge des participants, ambiance souhaitée.",
                },
                {
                  n: "02",
                  t: "On imagine le bon format",
                  d: "L’équipe construit une proposition adaptée à votre événement et à votre groupe.",
                },
                {
                  n: "03",
                  t: "On privatise votre créneau",
                  d: "La date, le déroulé et les détails pratiques sont confirmés avec vous.",
                },
                {
                  n: "04",
                  t: "Vous vivez l’expérience",
                  d: "Le jour venu, le site et l’équipe sont prêts à faire décoller votre événement.",
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="font-display text-2xl font-bold text-solar shrink-0 w-8">
                    {s.n}
                  </span>
                  <div>
                    <div className="font-semibold mb-1">{s.t}</div>
                    <p className="text-paper/70 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bg-gradient-to-br from-coral to-lagoon rounded-[2.5rem] p-10 lg:p-16 text-white text-center relative overflow-hidden">
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Imaginons votre événement en l’air.
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-8">
            Écrivez-nous avec votre occasion, le nombre de participants et la date souhaitée.
            L’équipe vous proposera une privatisation adaptée.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:trapezcool971@gmail.com?subject=Demande%20de%20devis%20groupe"
              className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-white text-midnight font-semibold hover:bg-solar transition-colors"
            >
              <Mail className="size-4" /> Écrire par e-mail
            </a>
            <a
              href="https://wa.me/590690193428?text=Bonjour%2C%20je%20souhaite%20organiser%20un%20%C3%A9v%C3%A9nement%20avec%20Trapez%E2%80%99cool"
              className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/25 transition-all"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
