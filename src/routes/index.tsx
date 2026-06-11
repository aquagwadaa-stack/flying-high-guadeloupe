import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, Heart, MapPin, Clock, Users, Star } from "lucide-react";
import heroFlightAsset from "@/assets/hero-flight.jpg.asset.json";
import groupSchoolAsset from "@/assets/group-school.jpg.asset.json";
import gallery1Asset from "@/assets/gallery-1.jpg.asset.json";
import gallery3Asset from "@/assets/gallery-3.jpg.asset.json";
import gallery6Asset from "@/assets/gallery-6.jpg.asset.json";
const heroFlight = heroFlightAsset.url;
const groupSchool = groupSchoolAsset.url;
const gallery1 = gallery1Asset.url;
const gallery3 = gallery3Asset.url;
const gallery6 = gallery6Asset.url;
import { formatDateLong, useStore } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trapez’cool — Trapèze volant à Sainte-Anne, Guadeloupe" },
      {
        name: "description",
        content:
          "École de trapèze volant au Helleux, Sainte-Anne. Séances dès 7 ans, débutants bienvenus. Réservez votre envol en ligne.",
      },
      { property: "og:title", content: "Prenez votre envol avec Trapez'cool" },
      {
        property: "og:description",
        content:
          "Découvrez le trapèze volant dans une ambiance conviviale, dès 7 ans et quel que soit votre niveau.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Reassurance />
      <ExperienceIntro />
      <Experiences />
      <Steps />
      <Photos />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end pb-20 lg:pb-32 overflow-hidden">
      <img
        src={heroFlight}
        alt="Trapéziste en plein vol au-dessus des palmiers en Guadeloupe"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-midnight/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-24">
        <div className="max-w-3xl text-white animate-rise">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide mb-6">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-solar animate-ping opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-solar" />
            </span>
            Le Helleux · Sainte-Anne · Guadeloupe
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tighter text-balance mb-8">
            Prenez votre <span className="italic text-solar">envol</span>
            <br />
            avec Trapez'cool
          </h1>
          <p className="text-lg lg:text-xl text-white/85 max-w-2xl mb-10 leading-relaxed">
            Découvrez le trapèze volant dans une ambiance conviviale, dès 7 ans et quel que soit
            votre niveau.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/reserver"
              search={{ formule: "envolee" }}
              className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-lagoon text-white font-semibold text-base hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-lagoon/30"
            >
              Réserver une séance <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/decouvrir"
              className="inline-flex items-center h-13 px-7 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold text-base border border-white/30 hover:bg-white/20 transition-all"
            >
              Découvrir l’activité
            </Link>
          </div>
        </div>
      </div>

      {/* Trajectory SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 text-paper"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,120 C300,40 700,90 1440,30 L1440,120 Z" fill="currentColor" />
      </svg>
    </section>
  );
}

function Reassurance() {
  const items = [
    { icon: Heart, title: "Dès 7 ans", desc: "Pour les enfants comme pour les adultes." },
    { icon: Sparkles, title: "Débutants bienvenus", desc: "Aucune expérience nécessaire." },
    {
      icon: MapPin,
      title: "Au Helleux, Sainte-Anne",
      desc: "Entre Sainte-Anne et Saint-François.",
    },
  ];
  return (
    <section className="relative -mt-12 z-20 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-midnight/5 border border-border grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border overflow-hidden">
        {items.map((it) => (
          <div key={it.title} className="p-6 lg:p-8 flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-lagoon/10 text-lagoon flex items-center justify-center shrink-0">
              <it.icon className="size-6" />
            </div>
            <div>
              <div className="font-display font-bold text-lg">{it.title}</div>
              <div className="text-sm text-muted-foreground">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceIntro() {
  return (
    <section className="py-24 lg:py-32 px-5 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <img
            src={groupSchool}
            alt="Groupe à l’école Trapez’cool en Guadeloupe"
            width={1280}
            height={1280}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-[2rem]"
          />
        </div>
        <div className="space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-4">
              <span className="h-px w-6 bg-lagoon" /> L’activité
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
              Voler, progresser, se faire plaisir.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
            Le trapèze volant se découvre passage après passage. L’équipe Trapez’cool vous
            accompagne depuis les premiers essais jusqu’aux premières figures, sans pression et au
            rythme de chacun.
          </p>
          <ul className="space-y-5">
            {[
              {
                c: "lagoon",
                t: "Une progression adaptée à chacun",
                d: "Chaque élève avance à son rythme avec des conseils personnalisés.",
              },
              {
                c: "coral",
                t: "Pour les enfants et les adultes",
                d: "Dès 7 ans, avec des exercices adaptés à chacun.",
              },
              {
                c: "solar",
                t: "Une ambiance sportive et détendue",
                d: "Une équipe encourageante, jamais dans la performance imposée.",
              },
            ].map((it) => (
              <li key={it.t} className="flex gap-4">
                <span
                  className={`size-6 mt-1 rounded-full flex items-center justify-center shrink-0 bg-${it.c}/15`}
                >
                  <Check className={`size-3.5 text-${it.c}`} />
                </span>
                <div>
                  <div className="font-semibold">{it.t}</div>
                  <div className="text-sm text-muted-foreground">{it.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  const cards = [
    {
      id: "envolee",
      title: "Première envolée",
      desc: "Votre toute première séance, accompagnée de A à Z.",
      price: "35 €",
      duration: "1 h 30 · dès 7 ans",
      color: "lagoon",
    },
    {
      id: "progression",
      title: "Séance progression",
      desc: "Pour celles et ceux qui ont déjà volé et veulent continuer.",
      price: "30 €",
      duration: "1 h 30",
      color: "turquoise",
    },
    {
      id: "carte5",
      title: "Carte 5 séances",
      tagline: "",
      desc: "La formule régulière, pour progresser à son rythme.",
      price: "135 €",
      duration: "Valable 3 mois",
      color: "solar",
    },
    {
      id: "groupe",
      title: "Groupes & événements",
      desc: "Anniversaire, association ou groupe d’amis.",
      price: "Sur demande",
      duration: "Selon le groupe",
      color: "coral",
    },
  ];
  return (
    <section className="py-24 lg:py-32 px-5 lg:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-4">
              <span className="h-px w-6 bg-lagoon" /> Les séances
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-2xl">
              Pour découvrir ou revenir voler.
            </h2>
          </div>
          <Link
            to="/seances"
            className="inline-flex items-center gap-2 text-lagoon font-semibold hover:gap-3 transition-all"
          >
            Voir tous les tarifs <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <Link
              key={c.id}
              to="/seances"
              className="group relative bg-white rounded-3xl p-7 border border-border hover:border-lagoon/30 hover:shadow-2xl hover:shadow-midnight/5 hover:-translate-y-1 transition-all flex flex-col"
            >
              <div
                className={`size-12 rounded-2xl flex items-center justify-center mb-6 bg-${c.color}/10`}
              >
                <span className={`font-display text-xl font-bold text-${c.color}`}>0{i + 1}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{c.desc}</p>
              <div className="flex items-end justify-between border-t border-border pt-5">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    {c.duration}
                  </div>
                  <div className="font-display text-2xl font-bold">{c.price}</div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground group-hover:text-lagoon group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    {
      n: "01",
      t: "Accueil et présentation",
      d: "Vous êtes accueilli par l’équipe qui vous explique l’activité et le matériel.",
    },
    {
      n: "02",
      t: "Échauffement et consignes",
      d: "Mise en condition douce et explication des gestes essentiels au sol.",
    },
    {
      n: "03",
      t: "Premiers passages au trapèze",
      d: "Vous montez à l’échelle pour vos premières sensations, en toute sécurité.",
    },
    {
      n: "04",
      t: "Progression selon vos sensations",
      d: "Nous adaptons les exercices et tentons vos premières figures.",
    },
  ];
  return (
    <section className="py-24 lg:py-32 px-5 lg:px-8 bg-midnight text-paper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-solar mb-4">
            <span className="h-px w-6 bg-solar" /> Le déroulement
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Comment se passe une séance.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-display text-[120px] leading-none font-bold text-white/5 absolute -top-8 -left-2 select-none">
                {s.n}
              </div>
              <div className="relative">
                <div className="font-display font-bold text-xl mb-3">{s.t}</div>
                <p className="text-paper/70 text-sm leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Photos() {
  const pics = [
    { src: gallery3, alt: "Catch en plein vol", h: "row-span-2" },
    { src: gallery1, alt: "Enfant souriant sur le trapèze", h: "" },
    { src: gallery6, alt: "Pratiquante sur la barre", h: "" },
  ];
  return (
    <section className="py-24 lg:py-32 px-5 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lagoon mb-4">
              <span className="h-px w-6 bg-lagoon" /> Instantanés
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-xl">
              Quelques moments en vol.
            </h2>
          </div>
          <Link
            to="/decouvrir"
            className="inline-flex items-center gap-2 text-lagoon font-semibold hover:gap-3 transition-all"
          >
            En savoir plus <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[240px] lg:auto-rows-[280px]">
          {pics.map((p, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-3xl ${p.h} ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const slots = useStore((s) => s.slots);
  const next = slots.find((s) => s.booked < s.capacity);
  return (
    <section className="px-5 lg:px-8 pt-24 lg:pt-32 pb-0">
      <div className="max-w-7xl mx-auto relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-lagoon via-turquoise to-lagoon p-10 lg:p-20 text-white">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,200 Q200,50 400,200 T800,200" stroke="white" strokeWidth="2" fill="none" />
          <path d="M0,300 Q200,150 400,300 T800,300" stroke="white" strokeWidth="2" fill="none" />
        </svg>
        <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1] tracking-tight text-balance mb-6">
              Envie de venir voler&nbsp;?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mb-8">
              Consultez les prochains créneaux. Si vous avez une question avant de réserver,
              l’équipe répond aussi sur WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/reserver"
                search={{ formule: "envolee" }}
                className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-white text-midnight font-semibold hover:bg-solar transition-colors"
              >
                Voir les prochains créneaux <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/590690193428"
                className="inline-flex items-center h-13 px-7 py-4 rounded-full bg-white/15 backdrop-blur text-white font-semibold border border-white/30 hover:bg-white/25 transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
          {next && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-xs uppercase tracking-widest font-bold text-white/70 mb-3">
                Prochaine séance
              </div>
              <div className="font-display text-2xl font-bold capitalize mb-1">
                {formatDateLong(next.date)}
              </div>
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <Clock className="size-4" /> {next.time.replace(":", " h ")} –{" "}
                {next.endTime.replace(":", " h ")}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                  <Users className="size-4" /> {next.capacity - next.booked} places restantes
                </span>
                <span className="inline-flex items-center gap-1 text-solar text-sm font-semibold">
                  <Star className="size-4 fill-solar" /> Disponible
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
