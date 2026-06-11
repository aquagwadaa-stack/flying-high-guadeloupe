import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cake,
  Building2,
  Users,
  Sparkles,
  Check,
  Calendar,
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
          "Anniversaires, familles, amis et associations : organisez une séance de trapèze volant en groupe au Helleux, Sainte-Anne.",
      },
      { property: "og:title", content: "Groupes & événements — Trapez’cool" },
      {
        property: "og:description",
        content: "Une activité originale et fédératrice pour vos groupes en Guadeloupe.",
      },
    ],
  }),
  component: Page,
});

const FORMATS = [
  {
    icon: Cake,
    title: "Anniversaire",
    desc: "Une séance à partager pour les enfants dès 7 ans ou pour les adultes.",
    details: "Organisation avec l’équipe",
  },
  {
    icon: Users,
    title: "Famille & amis",
    desc: "Venir voler ensemble, que tout le monde découvre ou que certains pratiquent déjà.",
    details: "Format selon le groupe",
  },
  {
    icon: Building2,
    title: "Associations & structures",
    desc: "Une séance adaptée à l’âge, au niveau et à la taille de votre groupe.",
    details: "Sur demande",
  },
  {
    icon: Sparkles,
    title: "Groupe constitué",
    desc: "Pour une sortie ponctuelle ou un rendez-vous régulier autour du trapèze.",
    details: "À organiser ensemble",
  },
];

const INCLUS = [
  "Accueil du groupe et présentation de l’activité",
  "Matériel nécessaire à la pratique",
  "Échauffement et consignes avant de monter",
  "Passages adaptés au niveau de chacun",
  "Organisation du créneau avec un membre de l’équipe",
];

function Page() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-5 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-end mb-20">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-6">
              <span className="h-px w-6 bg-lagoon" /> Groupes & événements
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6">
              Venir voler en groupe.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Anniversaire, sortie d’association, famille ou groupe d’amis : dites-nous combien vous
              êtes et ce que vous imaginez. L’équipe vous proposera un format adapté.
            </p>
          </div>
          <img
            src={groupSchool}
            alt="Groupe à l’école Trapez’cool"
            loading="lazy"
            className="w-full aspect-[4/3] object-cover rounded-3xl"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {FORMATS.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-3xl p-7 border border-border flex flex-col"
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
              Ce qui est inclus
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
          <div className="bg-midnight text-paper rounded-3xl p-8 lg:p-10">
            <h2 className="font-display text-3xl font-bold mb-6 tracking-tight">
              Comment ça marche
            </h2>
            <ol className="space-y-5">
              {[
                {
                  n: "01",
                  t: "Vous nous décrivez le groupe",
                  d: "Date envisagée, nombre et âge des participants, niveau et besoins particuliers.",
                },
                {
                  n: "02",
                  t: "On vérifie ce qui est possible",
                  d: "L’équipe vous répond avec un format et un créneau adaptés.",
                },
                {
                  n: "03",
                  t: "On convient de la date",
                  d: "Les détails pratiques sont confirmés directement avec vous.",
                },
                {
                  n: "04",
                  t: "Vous venez voler",
                  d: "L’équipe accueille le groupe et accompagne chaque participant.",
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

        <div className="bg-gradient-to-br from-lagoon to-turquoise rounded-[2.5rem] p-10 lg:p-16 text-white text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Organiser une séance de groupe.
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-8">
            Écrivez-nous avec quelques informations sur le groupe. L’équipe reviendra vers vous pour
            choisir un créneau.
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
