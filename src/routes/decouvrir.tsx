import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import gallery5Asset from "@/assets/gallery-6.jpg.asset.json";
const gallery5 = gallery5Asset.url;

export const Route = createFileRoute("/decouvrir")({
  head: () => ({
    meta: [
      { title: "Découvrir le trapèze volant — Trapez’cool Guadeloupe" },
      {
        name: "description",
        content:
          "Le trapèze volant, accessible à tous dès 7 ans. Déroulement d’une séance, conseils pratiques et accompagnement personnalisé au Helleux, Sainte-Anne.",
      },
      { property: "og:title", content: "Le trapèze volant, accessible à tous" },
      {
        property: "og:description",
        content: "Une activité aérienne accompagnée pas à pas, sans prérequis sportif.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 px-5 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-6">
          <span className="h-px w-6 bg-lagoon" /> L’activité
        </span>
        <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-8">
          Le trapèze volant, accessible à tous.
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Nos séances s’adressent aux débutants, aux personnes de passage en Guadeloupe et aux
          pratiquants réguliers. Aucun prérequis sportif n’est nécessaire : nous adaptons
          l’accompagnement à votre rythme et à vos envies.
        </p>

        <img
          src={gallery5}
          alt="Élèves à l'école Trapez'cool"
          loading="lazy"
          className="w-full aspect-[16/9] object-cover rounded-3xl my-16"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {[
            {
              t: "À qui s’adresse l’activité ?",
              d: "Aux enfants dès 7 ans, aux adolescents, aux adultes, en famille, entre amis ou pour les groupes. Que vous découvriez l’activité ou que vous pratiquiez déjà, vous trouverez votre place.",
            },
            {
              t: "Comment se déroule une séance ?",
              d: "Une séance dure 1 h 30. Elle commence par un accueil, un échauffement et une explication des gestes au sol. Vous montez ensuite sur la plateforme pour vos premiers passages, avec progression au fil de la séance.",
            },
            {
              t: "Que faut-il apporter ?",
              d: "Une tenue de sport confortable couvrant les genoux, une bouteille d’eau, et l’envie de vivre une expérience nouvelle. Le matériel est fourni.",
            },
            {
              t: "Progresser à son rythme",
              d: "Chacun avance comme il le sent. Certains tentent leurs premières figures dès la première séance, d’autres préfèrent profiter pleinement de la sensation de vol. C’est vous qui décidez.",
            },
            {
              t: "Sécurité et accompagnement",
              d: "Toutes les séances se déroulent en harnais, sous la supervision permanente de l’équipe. Les consignes sont expliquées au sol avant chaque exercice.",
            },
          ].map((s) => (
            <div key={s.t}>
              <h2 className="font-display text-2xl font-bold mb-3">{s.t}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-secondary/50 rounded-3xl p-8 lg:p-12">
          <h3 className="font-display text-2xl font-bold mb-6">Conseils pratiques</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Porter une tenue de sport confortable",
              "Attacher les cheveux longs",
              "Prévoir de l’eau",
              "Arriver 15 minutes avant le début",
              "Informer l’équipe de toute contrainte physique",
              "Retirer bijoux et montres",
            ].map((c) => (
              <li key={c} className="flex gap-3 items-start">
                <Check className="size-5 text-lagoon shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/reserver"
            search={{ formule: "envolee" }}
            className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-lagoon text-white font-semibold hover:brightness-110 transition-all shadow-xl shadow-lagoon/20"
          >
            Réserver ma séance <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
