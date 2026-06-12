import { useSyncExternalStore } from "react";

export type Formule = {
  id: string;
  name: string;
  tagline: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  age?: string;
  validity?: string;
  cta: string;
  badge?: string;
  highlight?: boolean;
};

export const FORMULES: Formule[] = [
  {
    id: "envolee",
    name: "Première envolée",
    tagline: "Une première séance pour découvrir le trapèze avec l’équipe.",
    price: 35,
    priceLabel: "35 €",
    duration: "1 h 30",
    age: "Dès 7 ans",
    cta: "Voir les créneaux",
    badge: "Découverte",
  },
  {
    id: "progression",
    name: "Séance progression",
    tagline: "Pour revenir voler, reprendre les bases ou essayer de nouvelles figures.",
    price: 30,
    priceLabel: "30 €",
    duration: "1 h 30",
    cta: "Voir les créneaux",
  },
  {
    id: "carte5",
    name: "Carte 5 séances",
    tagline: "Cinq séances à utiliser au fil de vos envies.",
    price: 135,
    priceLabel: "135 €",
    duration: "5 × 1 h 30",
    validity: "Valable 3 mois",
    cta: "Acheter la carte",
  },
  {
    id: "carte10",
    name: "Carte 10 séances",
    tagline: "Pour celles et ceux qui viennent voler régulièrement.",
    price: 250,
    priceLabel: "250 €",
    duration: "10 × 1 h 30",
    validity: "Valable 6 mois",
    cta: "Acheter la carte",
  },
  {
    id: "groupe",
    name: "Groupes & événements",
    tagline: "Privatisez un créneau et imaginons une expérience sur mesure pour votre événement.",
    price: null,
    priceLabel: "Sur demande",
    duration: "Selon le groupe",
    cta: "Nous contacter",
  },
];

export const HORAIRES = [
  { jour: "Mardi", creneaux: ["16 h 30 – 18 h"] },
  { jour: "Mercredi", creneaux: ["16 h 30 – 18 h"] },
  { jour: "Jeudi", creneaux: ["16 h 30 – 18 h"] },
  { jour: "Vendredi", creneaux: ["16 h 30 – 18 h"] },
  { jour: "Samedi", creneaux: ["9 h – 10 h 30", "16 h 30 – 18 h"] },
  { jour: "Dimanche", creneaux: ["Sur réservation"] },
];

export type Slot = {
  id: string;
  date: string; // ISO date (yyyy-mm-dd)
  time: string; // HH:MM
  endTime: string;
  capacity: number;
  booked: number;
  type: "decouverte" | "progression" | "privee";
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Pseudo-random deterministic
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function generateSlots(): Slot[] {
  const out: Slot[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let d = 0; d < 56; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d);
    const dow = day.getDay(); // 0 Sun .. 6 Sat
    const date = isoDate(day);
    const slotsOfDay: Array<{ time: string; end: string; type: Slot["type"] }> = [];
    if (dow >= 2 && dow <= 5) slotsOfDay.push({ time: "16:30", end: "18:00", type: "progression" });
    if (dow === 6) {
      slotsOfDay.push({ time: "09:00", end: "10:30", type: "decouverte" });
      slotsOfDay.push({ time: "16:30", end: "18:00", type: "progression" });
    }
    for (const s of slotsOfDay) {
      const seed = hash(date + s.time);
      const booked = seed % 11; // 0..10
      out.push({
        id: `${date}-${s.time}`,
        date,
        time: s.time,
        endTime: s.end,
        capacity: 10,
        booked,
        type: s.type,
      });
    }
  }
  return out;
}

// ----- Reservations store -----
export type Participant = {
  firstName: string;
  age: number;
  level: "premiere" | "debutant" | "pratiquant";
};
export type Reservation = {
  id: string;
  createdAt: string;
  slotId: string;
  formuleId: string;
  contact: { firstName: string; lastName: string; email: string; phone: string; note?: string };
  participants: Participant[];
  total: number;
  status: "en_attente" | "paye" | "confirme" | "annule" | "rembourse";
};

const subscribers = new Set<() => void>();
function notify() {
  subscribers.forEach((fn) => fn());
}

type State = { slots: Slot[]; reservations: Reservation[] };

const seedReservations = (slots: Slot[]): Reservation[] => {
  const samples: Array<
    Partial<Reservation> & { offsetDays: number; size: number; status: Reservation["status"] }
  > = [
    {
      offsetDays: 0,
      size: 2,
      status: "confirme",
      contact: {
        firstName: "Sophie",
        lastName: "Marin",
        email: "sophie@example.com",
        phone: "0690110011",
      },
      formuleId: "envolee",
    },
    {
      offsetDays: 0,
      size: 1,
      status: "paye",
      contact: {
        firstName: "Julien",
        lastName: "Bertin",
        email: "julien@example.com",
        phone: "0690220022",
      },
      formuleId: "progression",
    },
    {
      offsetDays: 1,
      size: 4,
      status: "confirme",
      contact: {
        firstName: "Claire",
        lastName: "Lefèvre",
        email: "claire@example.com",
        phone: "0690330033",
      },
      formuleId: "envolee",
    },
    {
      offsetDays: 2,
      size: 1,
      status: "en_attente",
      contact: {
        firstName: "Mathis",
        lastName: "Cabrera",
        email: "mathis@example.com",
        phone: "0690440044",
      },
      formuleId: "progression",
    },
    {
      offsetDays: 3,
      size: 2,
      status: "paye",
      contact: {
        firstName: "Léa",
        lastName: "Renard",
        email: "lea@example.com",
        phone: "0690550055",
      },
      formuleId: "envolee",
    },
    {
      offsetDays: 5,
      size: 6,
      status: "confirme",
      contact: {
        firstName: "Alice",
        lastName: "Durand",
        email: "alice@example.com",
        phone: "0690660066",
        note: "Anniversaire de Léna",
      },
      formuleId: "envolee",
    },
    {
      offsetDays: 7,
      size: 2,
      status: "paye",
      contact: {
        firstName: "Mehdi",
        lastName: "Naïm",
        email: "mehdi@example.com",
        phone: "0690770077",
      },
      formuleId: "carte5",
    },
  ];
  const out: Reservation[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  samples.forEach((s, i) => {
    const target = new Date(today);
    target.setDate(today.getDate() + s.offsetDays);
    const date = isoDate(target);
    const candidate = slots.find((sl) => sl.date === date);
    if (!candidate) return;
    const formule = FORMULES.find((f) => f.id === s.formuleId) ?? FORMULES[0];
    const total = (formule.price ?? 0) * s.size;
    out.push({
      id: `R-${1000 + i}`,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      slotId: candidate.id,
      formuleId: formule.id,
      contact: s.contact!,
      participants: Array.from({ length: s.size }, (_, k) => ({
        firstName: k === 0 ? s.contact!.firstName : `Invité ${k}`,
        age: 9 + ((k + i) % 30),
        level: "premiere" as const,
      })),
      total,
      status: s.status,
    });
  });
  return out;
};

const initialSlots = generateSlots();
const state: State = {
  slots: initialSlots,
  reservations: seedReservations(initialSlots),
};
// Apply seeded bookings to slot.booked
for (const r of state.reservations) {
  const s = state.slots.find((sl) => sl.id === r.slotId);
  if (s) s.booked = Math.min(s.capacity, s.booked + r.participants.length);
}

function subscribe(cb: () => void) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}
function getSnapshot() {
  return state;
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

export function addReservation(r: Omit<Reservation, "id" | "createdAt" | "status">): Reservation {
  const reservation: Reservation = {
    ...r,
    id: `R-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "paye",
  };
  state.reservations = [reservation, ...state.reservations];
  const slot = state.slots.find((s) => s.id === r.slotId);
  if (slot) slot.booked = Math.min(slot.capacity, slot.booked + r.participants.length);
  notify();
  return reservation;
}

export function updateReservationStatus(id: string, status: Reservation["status"]) {
  const r = state.reservations.find((x) => x.id === id);
  if (!r) return;
  if (
    (status === "annule" || status === "rembourse") &&
    r.status !== "annule" &&
    r.status !== "rembourse"
  ) {
    const slot = state.slots.find((s) => s.id === r.slotId);
    if (slot) slot.booked = Math.max(0, slot.booked - r.participants.length);
  }
  r.status = status;
  notify();
}

// ----- Credits / comptes carte -----
const CREDITS_KEY = "trapezcool_credits_v1";
type CreditsStore = Record<
  string,
  { credits: number; firstName?: string; lastName?: string; phone?: string }
>;

function readCredits(): CreditsStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CREDITS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeCredits(s: CreditsStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CREDITS_KEY, JSON.stringify(s));
}
export function getAccountByEmail(email: string) {
  const key = email.trim().toLowerCase();
  const s = readCredits();
  return s[key];
}
export function addCreditsForAccount(
  email: string,
  credits: number,
  info: { firstName?: string; lastName?: string; phone?: string } = {},
) {
  const key = email.trim().toLowerCase();
  const s = readCredits();
  const existing = s[key] || { credits: 0 };
  s[key] = { ...existing, ...info, credits: existing.credits + credits };
  writeCredits(s);
  return s[key];
}
export function consumeCredit(email: string) {
  const key = email.trim().toLowerCase();
  const s = readCredits();
  if (!s[key] || s[key].credits <= 0) return null;
  s[key].credits -= 1;
  writeCredits(s);
  return s[key];
}

export const FRENCH_MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
export const FRENCH_DAYS_SHORT = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
export const FRENCH_DAYS_LONG = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

export function formatDateLong(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${FRENCH_DAYS_LONG[d.getDay()]} ${d.getDate()} ${FRENCH_MONTHS[d.getMonth()]}`;
}

export function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${FRENCH_MONTHS[d.getMonth()].slice(0, 3)}.`;
}

export const FAQ = [
  {
    q: "Faut-il avoir déjà pratiqué ?",
    a: "Pas du tout. La majorité de nos élèves découvre le trapèze chez nous. L’équipe vous guide à chaque étape.",
  },
  {
    q: "À partir de quel âge peut-on participer ?",
    a: "Les séances sont accessibles dès 7 ans. L’équipe adapte les exercices à l’âge et au niveau de chacun.",
  },
  {
    q: "Faut-il être particulièrement sportif ?",
    a: "Non. Il n’est pas nécessaire d’être un grand sportif pour essayer. L’équipe vous accompagne progressivement.",
  },
  {
    q: "Quelle tenue prévoir ?",
    a: "Une tenue de sport confortable couvrant les genoux pour éviter les frottements. Évitez les bijoux et attachez les cheveux longs.",
  },
  {
    q: "Que se passe-t-il en cas de mauvais temps ?",
    a: "L’activité dépend de la météo. Si les conditions ne permettent pas de voler, l’équipe vous informe par téléphone ou WhatsApp.",
  },
  {
    q: "Peut-on venir simplement regarder ?",
    a: "Oui, les accompagnateurs sont les bienvenus pour observer sans réserver.",
  },
  {
    q: "Les accompagnateurs doivent-ils réserver ?",
    a: "Non, seuls les participants à l’activité réservent une place.",
  },
  {
    q: "Comment modifier une réservation ?",
    a: "Contactez-nous dès que possible par téléphone ou WhatsApp au +590 690 19 34 28.",
  },
];

export const TEMOIGNAGES = [
  {
    nom: "Sophie",
    lieu: "Sainte-Anne",
    text: "Une équipe rassurante et une expérience incroyable. Les enfants ont immédiatement voulu recommencer !",
  },
  {
    nom: "Julien",
    lieu: "Le Gosier",
    text: "Je pensais ne jamais oser monter. L’accompagnement m’a mis en confiance dès le premier passage.",
  },
  {
    nom: "Claire",
    lieu: "Lyon",
    text: "Une activité originale à faire pendant les vacances. Très belle découverte en famille.",
  },
];
