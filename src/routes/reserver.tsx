import { createFileRoute, Link } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Users,
  CreditCard,
  Calendar as CalendarIcon,
  Ticket,
  Sparkles,
} from "lucide-react";
import {
  FORMULES,
  addReservation,
  formatDateLong,
  useStore,
  getAccountByEmail,
  addCreditsForAccount,
  consumeCredit,
  type Participant,
} from "@/lib/data";

export const Route = createFileRoute("/reserver")({
  validateSearch: (search: Record<string, unknown>) => ({
    formule: typeof search.formule === "string" ? search.formule : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Réserver une séance — Trapez’cool" },
      {
        name: "description",
        content:
          "Réservez votre séance de trapèze volant à Sainte-Anne. Paiement sécurisé, confirmation immédiate.",
      },
    ],
  }),
  component: Page,
});

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const BOOKABLE_FORMULES = FORMULES.filter((f) =>
  ["envolee", "progression", "carte5", "carte10"].includes(f.id),
);

function Page() {
  const slots = useStore((s) => s.slots);
  const search = Route.useSearch();
  const initialFormule = BOOKABLE_FORMULES.some((f) => f.id === search.formule)
    ? search.formule!
    : "envolee";
  const [step, setStep] = useState<Step>(0);
  const [formuleId, setFormuleId] = useState<string>(initialFormule);
  const [count, setCount] = useState(1);
  const [slotId, setSlotId] = useState<string>("");
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    note: "",
    accept: false,
  });
  const [participants, setParticipants] = useState<Participant[]>([
    { firstName: "", age: 12, level: "premiere" },
  ]);
  const [confirmation, setConfirmation] = useState<{
    id: string;
    accountCredits?: number;
    usedCredit?: boolean;
  } | null>(null);
  const [creditMode, setCreditMode] = useState(false);
  const [creditEmail, setCreditEmail] = useState("");
  const [creditPhone, setCreditPhone] = useState("");
  const [creditLookup, setCreditLookup] = useState<{
    status: "idle" | "notfound" | "found";
    credits: number;
  }>({ status: "idle", credits: 0 });

  const formule = FORMULES.find((f) => f.id === formuleId)!;
  const isCardPurchase = formuleId === "carte5" || formuleId === "carte10";
  const cardCredits = formuleId === "carte10" ? 10 : 5;
  const displayedFormules = creditMode
    ? BOOKABLE_FORMULES.filter((f) => f.id === "envolee" || f.id === "progression")
    : BOOKABLE_FORMULES;
  const slot = slots.find((s) => s.id === slotId);
  const total = creditMode ? 0 : (formule.price ?? 0) * (isCardPurchase ? 1 : count);

  const upcomingByDate = useMemo(() => {
    const map = new Map<string, typeof slots>();
    slots.forEach((s) => {
      if (s.capacity - s.booked < count) return;
      const arr = map.get(s.date) ?? [];
      arr.push(s);
      map.set(s.date, arr);
    });
    return Array.from(map.entries()).slice(0, 14);
  }, [slots, count]);

  const goNext = () => {
    if (isCardPurchase && step === 0) return setStep(3);
    if (isCardPurchase && step === 3) return setStep(5);
    setStep((s) => Math.min(6, s + 1) as Step);
  };
  const goPrev = () => {
    if (isCardPurchase && step === 5) return setStep(3);
    if (isCardPurchase && step === 3) return setStep(0);
    setStep((s) => Math.max(0, s - 1) as Step);
  };

  const canNext = (() => {
    if (step === 0) return !!formuleId;
    if (step === 1) return !isCardPurchase && count >= 1 && count <= 10;
    if (step === 2) return !isCardPurchase && !!slotId;
    if (step === 3)
      return (
        contact.firstName &&
        contact.lastName &&
        /\S+@\S+\.\S+/.test(contact.email) &&
        contact.phone.length >= 8
      );
    if (step === 4)
      return (
        !isCardPurchase &&
        participants.length === count &&
        participants.every((p) => p.firstName && p.age >= 7)
      );
    if (step === 5) return contact.accept;
    return true;
  })();

  const submit = () => {
    if (isCardPurchase) {
      const account = addCreditsForAccount(contact.email, cardCredits, {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
      });
      setConfirmation({
        id: `C-${Date.now().toString(36).toUpperCase()}`,
        accountCredits: account.credits,
        usedCredit: false,
      });
      setStep(6);
      return;
    }
    if (!slot) return;
    let usedCredit = false;
    let accountCredits: number | undefined;
    if (creditMode) {
      const acc = consumeCredit(contact.email);
      if (!acc) return;
      usedCredit = true;
      accountCredits = acc.credits;
    }
    const r = addReservation({
      slotId,
      formuleId,
      contact: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        note: contact.note || undefined,
      },
      participants,
      total,
    });
    setConfirmation({ id: r.id, accountCredits, usedCredit });
    setStep(6);
  };

  // Resize participants array when count changes
  if (participants.length !== count) {
    const next = [...participants];
    while (next.length < count) next.push({ firstName: "", age: 12, level: "premiere" });
    next.length = count;
    setParticipants(next);
  }

  const steps = isCardPurchase
    ? [
        { step: 0, label: "Carte" },
        { step: 3, label: "Coordonnées" },
        { step: 5, label: "Récapitulatif" },
        { step: 6, label: "Paiement" },
      ]
    : [
        { step: 0, label: "Formule" },
        { step: 1, label: "Participants" },
        { step: 2, label: "Créneau" },
        { step: 3, label: "Contact" },
        { step: 4, label: "Détails" },
        { step: 5, label: "Récapitulatif" },
        { step: 6, label: "Paiement" },
      ];
  const currentStepIndex = steps.findIndex((item) => item.step === step);

  return (
    <div className="pt-28 lg:pt-36 pb-24 px-5 lg:px-8 min-h-screen bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="size-4" /> Retour
        </Link>
        <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          {isCardPurchase ? "Acheter une carte" : "Réserver une séance"}
        </h1>
        <p className="text-muted-foreground mb-10">
          {isCardPurchase
            ? "La carte sera liée à vos coordonnées, sans mot de passe ni espace personnel à gérer."
            : "Choisissez la séance, le nombre de participants et le créneau qui vous convient."}
        </p>

        {step < 6 && !isCardPurchase && (
          <div className="mb-8 rounded-3xl border border-lagoon/20 bg-lagoon/5 p-5 lg:p-6">
            {!creditMode ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="size-10 rounded-2xl bg-white text-lagoon flex items-center justify-center shrink-0">
                    <Ticket className="size-5" />
                  </span>
                  <div>
                    <div className="font-display font-bold">
                      Vous avez déjà une carte Trapez’cool&nbsp;?
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Utilisez un crédit de votre carte 5 ou 10 séances pour cette réservation.
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-[1fr_150px_auto] gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    placeholder="Votre e-mail"
                    value={creditEmail}
                    onChange={(e) => {
                      setCreditEmail(e.target.value);
                      setCreditLookup({ status: "idle", credits: 0 });
                    }}
                    className="min-w-0 sm:w-56 px-4 h-11 rounded-full border border-border bg-white text-sm focus:border-lagoon outline-none"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="4 derniers chiffres"
                    value={creditPhone}
                    onChange={(e) => {
                      setCreditPhone(e.target.value);
                      setCreditLookup({ status: "idle", credits: 0 });
                    }}
                    className="min-w-0 px-4 h-11 rounded-full border border-border bg-white text-sm focus:border-lagoon outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const acc = getAccountByEmail(creditEmail);
                      const enteredPhone = creditPhone.replace(/\D/g, "");
                      const accountPhone = acc?.phone?.replace(/\D/g, "") ?? "";
                      const phoneMatches =
                        enteredPhone.length >= 4 && accountPhone.endsWith(enteredPhone.slice(-4));
                      if (acc && acc.credits > 0 && phoneMatches) {
                        setCreditLookup({ status: "found", credits: acc.credits });
                        setCreditMode(true);
                        setFormuleId("envolee");
                        setCount(1);
                        setContact((c) => ({
                          ...c,
                          email: creditEmail,
                          firstName: acc.firstName || c.firstName,
                          lastName: acc.lastName || c.lastName,
                          phone: acc.phone || c.phone,
                        }));
                      } else {
                        setCreditLookup({ status: "notfound", credits: 0 });
                      }
                    }}
                    className="h-11 px-5 rounded-full bg-midnight text-paper text-sm font-semibold"
                  >
                    Vérifier
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="size-10 rounded-2xl bg-turquoise text-white flex items-center justify-center shrink-0">
                    <Sparkles className="size-5" />
                  </span>
                  <div>
                    <div className="font-display font-bold">
                      Carte trouvée · {creditLookup.credits} crédit
                      {creditLookup.credits > 1 ? "s" : ""} disponible
                      {creditLookup.credits > 1 ? "s" : ""}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cette réservation utilisera 1 crédit. Aucun paiement ne sera demandé.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCreditMode(false);
                    setCreditLookup({ status: "idle", credits: 0 });
                  }}
                  className="h-10 px-4 rounded-full border border-border bg-white text-sm font-semibold"
                >
                  Annuler
                </button>
              </div>
            )}
            {creditLookup.status === "notfound" && !creditMode && (
              <p className="text-sm text-coral mt-3">
                Carte introuvable avec ces informations, ou aucun crédit disponible.
              </p>
            )}
          </div>
        )}

        {/* Stepper */}
        <div className="hidden md:flex items-center gap-2 mb-10 text-xs font-medium">
          {steps.map((item, i) => (
            <div key={item.step} className="flex items-center gap-2">
              <div
                className={`size-7 rounded-full inline-flex items-center justify-center font-bold ${i < currentStepIndex ? "bg-lagoon text-white" : i === currentStepIndex ? "bg-midnight text-white" : "bg-white border border-border text-muted-foreground"}`}
              >
                {i < currentStepIndex ? <Check className="size-3.5" /> : i + 1}
              </div>
              <span
                className={i === currentStepIndex ? "text-foreground" : "text-muted-foreground"}
              >
                {item.label}
              </span>
              {i < steps.length - 1 && <span className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-3xl border border-border p-6 lg:p-10">
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Choisissez votre formule</h2>
                {creditMode && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Mode crédit actif : le tarif est offert par votre carte.
                  </p>
                )}
                <div className="grid sm:grid-cols-2 gap-3">
                  {displayedFormules.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setFormuleId(f.id);
                        if (f.id === "carte5" || f.id === "carte10") {
                          setCreditMode(false);
                          setCount(1);
                          setSlotId("");
                        }
                      }}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${formuleId === f.id ? "border-lagoon bg-lagoon/5" : "border-border hover:border-lagoon/30"}`}
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <div className="font-display font-bold text-lg">{f.name}</div>
                        <div className="font-display font-bold text-xl">
                          {creditMode ? "1 crédit" : f.priceLabel}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{f.tagline}</div>
                      {(f.id === "carte5" || f.id === "carte10") && (
                        <div className="text-xs font-semibold text-lagoon mt-3">
                          Achat immédiat · aucun compte à créer
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && !isCardPurchase && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Nombre de participants</h2>
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => setCount(Math.max(1, count - 1))}
                    className="size-12 rounded-full bg-secondary text-foreground font-bold text-xl"
                  >
                    −
                  </button>
                  <div className="font-display text-6xl font-bold w-20 text-center">{count}</div>
                  <button
                    type="button"
                    onClick={() => setCount(Math.min(10, count + 1))}
                    className="size-12 rounded-full bg-secondary text-foreground font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Jusqu’à 10 participants par séance. Au-delà, contactez-nous pour un événement
                  privé.
                </p>
              </div>
            )}

            {step === 2 && !isCardPurchase && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Sélectionnez un créneau</h2>
                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                  {upcomingByDate.length === 0 && (
                    <p className="text-muted-foreground">
                      Aucun créneau ne correspond. Réduisez le nombre de participants.
                    </p>
                  )}
                  {upcomingByDate.map(([date, daySlots]) => (
                    <div key={date}>
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 capitalize">
                        {formatDateLong(date)}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {daySlots.map((s) => {
                          const remaining = s.capacity - s.booked;
                          const active = slotId === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSlotId(s.id)}
                              className={`p-4 rounded-2xl border-2 text-left transition-all ${active ? "border-lagoon bg-lagoon/5" : "border-border hover:border-lagoon/30"}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-semibold flex items-center gap-2">
                                  <Clock className="size-4 text-muted-foreground" />
                                  {s.time.replace(":", " h ")} – {s.endTime.replace(":", " h ")}
                                </div>
                                <span
                                  className={`text-xs font-bold ${remaining <= 2 ? "text-coral" : "text-turquoise"}`}
                                >
                                  {remaining <= 2 ? `Plus que ${remaining}` : `${remaining} places`}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Vos coordonnées</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Prénom"
                    value={contact.firstName}
                    onChange={(v) => setContact({ ...contact, firstName: v })}
                  />
                  <Field
                    label="Nom"
                    value={contact.lastName}
                    onChange={(v) => setContact({ ...contact, lastName: v })}
                  />
                  <Field
                    label="E-mail"
                    type="email"
                    value={contact.email}
                    onChange={(v) => setContact({ ...contact, email: v })}
                  />
                  <Field
                    label="Téléphone"
                    type="tel"
                    value={contact.phone}
                    onChange={(v) => setContact({ ...contact, phone: v })}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="booking-note" className="block text-sm font-medium mb-1.5">
                    Remarque (optionnel)
                  </label>
                  <textarea
                    id="booking-note"
                    value={contact.note}
                    onChange={(e) => setContact({ ...contact, note: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-secondary/40 focus:border-lagoon focus:ring-2 focus:ring-lagoon/20 outline-none"
                  />
                </div>
              </div>
            )}

            {step === 4 && !isCardPurchase && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Participants</h2>
                <div className="space-y-4">
                  {participants.map((p, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30">
                      <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                        Participant {i + 1}
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Field
                          label="Prénom"
                          value={p.firstName}
                          onChange={(v) => {
                            const n = [...participants];
                            n[i] = { ...n[i], firstName: v };
                            setParticipants(n);
                          }}
                        />
                        <div>
                          <label
                            htmlFor={`participant-age-${i}`}
                            className="block text-sm font-medium mb-1.5"
                          >
                            Âge
                          </label>
                          <input
                            id={`participant-age-${i}`}
                            type="number"
                            min={7}
                            max={99}
                            value={p.age}
                            onChange={(e) => {
                              const n = [...participants];
                              n[i] = { ...n[i], age: parseInt(e.target.value) || 0 };
                              setParticipants(n);
                            }}
                            className="w-full px-4 py-3 rounded-2xl border border-border bg-white focus:border-lagoon focus:ring-2 focus:ring-lagoon/20 outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`participant-level-${i}`}
                            className="block text-sm font-medium mb-1.5"
                          >
                            Niveau
                          </label>
                          <select
                            id={`participant-level-${i}`}
                            value={p.level}
                            onChange={(e) => {
                              const n = [...participants];
                              n[i] = { ...n[i], level: e.target.value as Participant["level"] };
                              setParticipants(n);
                            }}
                            className="w-full px-4 py-3 rounded-2xl border border-border bg-white focus:border-lagoon focus:ring-2 focus:ring-lagoon/20 outline-none"
                          >
                            <option value="premiere">Première fois</option>
                            <option value="debutant">Débutant</option>
                            <option value="pratiquant">Pratiquant</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (slot || isCardPurchase) && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Récapitulatif</h2>
                <dl className="divide-y divide-border">
                  <Row k="Formule" v={formule.name} />
                  {isCardPurchase ? (
                    <>
                      <Row k="Crédits" v={`${cardCredits} séances`} />
                      <Row k="Validité" v={formule.validity ?? ""} />
                    </>
                  ) : (
                    slot && (
                      <>
                        <Row
                          k="Date"
                          v={<span className="capitalize">{formatDateLong(slot.date)}</span>}
                        />
                        <Row
                          k="Horaire"
                          v={`${slot.time.replace(":", " h ")} – ${slot.endTime.replace(":", " h ")}`}
                        />
                        <Row k="Participants" v={`${count} personne${count > 1 ? "s" : ""}`} />
                      </>
                    )
                  )}
                  <Row
                    k="Contact"
                    v={`${contact.firstName} ${contact.lastName} · ${contact.email}`}
                  />
                  <Row
                    k="Total"
                    v={<span className="font-display text-2xl font-bold">{total} €</span>}
                  />
                </dl>
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contact.accept}
                    onChange={(e) => setContact({ ...contact, accept: e.target.checked })}
                    className="mt-1 size-5 rounded border-border accent-lagoon"
                  />
                  <span className="text-sm text-muted-foreground">
                    {isCardPurchase
                      ? "J’accepte les conditions générales et la politique de confidentialité."
                      : "J’accepte les conditions générales et la politique de confidentialité. Je confirme l’aptitude des participants à pratiquer une activité sportive."}
                  </span>
                </label>
              </div>
            )}

            {step === 6 && confirmation && (slot || isCardPurchase) && (
              <div className="text-center py-8">
                <div className="inline-flex size-20 rounded-full bg-turquoise/10 text-turquoise items-center justify-center mb-6">
                  <Check className="size-10" />
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">
                  {isCardPurchase ? "Votre carte est prête !" : "C’est réservé !"}
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-2">
                  {isCardPurchase
                    ? "Elle est automatiquement liée à votre e-mail et à votre téléphone. Vous pourrez utiliser vos crédits depuis n’importe quel créneau disponible."
                    : "Vous allez recevoir toutes les informations pratiques par e-mail. Rendez-vous 15 minutes avant le début de votre séance."}
                </p>
                <p className="text-xs text-muted-foreground mb-8">
                  Référence:{" "}
                  <span className="font-mono font-bold text-foreground">{confirmation.id}</span>
                </p>
                {confirmation.accountCredits !== undefined && (
                  <div className="max-w-md mx-auto bg-lagoon/5 border border-lagoon/20 rounded-2xl p-5 mb-8 text-left">
                    <div className="flex items-center gap-2 font-display font-bold mb-1">
                      <Ticket className="size-4 text-lagoon" />{" "}
                      {confirmation.usedCredit ? "Crédit utilisé" : "Aucun mot de passe nécessaire"}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {confirmation.usedCredit
                        ? `Il vous reste ${confirmation.accountCredits} crédit${confirmation.accountCredits > 1 ? "s" : ""} sur votre carte.`
                        : `${confirmation.accountCredits} crédits sont disponibles. Pour réserver, saisissez votre e-mail et les 4 derniers chiffres de votre téléphone dans le bandeau « J’ai déjà une carte ».`}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-3 justify-center">
                  {!isCardPurchase && (
                    <button className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-midnight text-paper font-semibold">
                      <CalendarIcon className="size-4" /> Ajouter au calendrier
                    </button>
                  )}
                  <a
                    href="https://wa.me/590690193428"
                    className="inline-flex items-center h-12 px-6 rounded-full bg-secondary font-semibold"
                  >
                    Contacter Trapez’cool
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center h-12 px-6 rounded-full border border-border font-semibold"
                  >
                    Retour à l’accueil
                  </Link>
                </div>
              </div>
            )}

            {step < 6 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 px-5 h-11 rounded-full text-sm font-semibold text-muted-foreground disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" /> Précédent
                </button>
                {step === 5 ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={submit}
                    className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-lagoon text-white text-sm font-semibold disabled:opacity-40 hover:brightness-110 shadow-lg shadow-lagoon/20"
                  >
                    {creditMode ? (
                      <>
                        <Ticket className="size-4" /> Confirmer (1 crédit)
                      </>
                    ) : (
                      <>
                        <CreditCard className="size-4" /> Payer {total} €
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-midnight text-paper text-sm font-semibold disabled:opacity-40 hover:bg-lagoon transition-colors"
                  >
                    Continuer <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          {step < 6 && (
            <aside className="bg-midnight text-paper rounded-3xl p-6 h-fit lg:sticky lg:top-24">
              <div className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-4">
                Récapitulatif
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-paper/70">Formule</span>
                  <span className="font-semibold">{formule.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper/70">
                    {isCardPurchase ? "Crédits" : "Participants"}
                  </span>
                  <span className="font-semibold">{isCardPurchase ? cardCredits : count}</span>
                </div>
                {slot && !isCardPurchase && (
                  <div className="flex justify-between">
                    <span className="text-paper/70">Date</span>
                    <span className="font-semibold capitalize text-right">
                      {formatDateLong(slot.date)}
                      <br />
                      <span className="text-xs text-paper/60">{slot.time.replace(":", " h ")}</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/10 mt-5 pt-5 flex items-baseline justify-between">
                <span className="text-paper/70 text-sm">Total</span>
                <span className="font-display text-3xl font-bold">{total} €</span>
              </div>
              <p className="text-xs text-paper/50 mt-4 flex items-center gap-1.5">
                {isCardPurchase ? <Ticket className="size-3" /> : <Users className="size-3" />}
                Récapitulatif avant confirmation et paiement
              </p>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-border bg-white focus:border-lagoon focus:ring-2 focus:ring-lagoon/20 outline-none"
      />
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <dt className="text-sm text-muted-foreground">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}
