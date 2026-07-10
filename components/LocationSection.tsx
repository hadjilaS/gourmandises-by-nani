import { MapPin, Truck, CalendarClock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import ScrollReveal from "./ScrollReveal";

export default function LocationSection() {
  const mapSrc = `https://www.google.com/maps?q=${siteConfig.location.lat},${siteConfig.location.lng}&z=12&output=embed`;

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
          Où nous trouver
        </span>
        <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">
          Localisation &amp; livraison
        </h2>
      </ScrollReveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <ScrollReveal className="lg:col-span-3">
          <div className="relative h-[380px] w-full overflow-hidden rounded-[1.75rem] shadow-elegant sm:h-[440px]">
            <iframe
              title="Zone de livraison Gourmandises By Nani"
              src={mapSrc}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-5 rounded-[1.75rem] border border-beige bg-white/70 p-7 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-medium text-chocolate-700">Atelier privé</p>
                <p className="mt-1 text-sm text-chocolate-700/70">
                  Pas de boutique physique — {siteConfig.location.note}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <Truck size={20} />
              </span>
              <div>
                <p className="font-medium text-chocolate-700">Zone de livraison</p>
                <p className="mt-1 text-sm text-chocolate-700/70">
                  {siteConfig.location.deliveryZone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <CalendarClock size={20} />
              </span>
              <div>
                <p className="font-medium text-chocolate-700">Retrait sur rendez-vous</p>
                <p className="mt-1 text-sm text-chocolate-700/70">{siteConfig.hours}</p>
              </div>
            </div>
            <div className="mt-auto rounded-xl bg-gold-500/10 px-4 py-3 text-sm text-chocolate-700/80">
              L&apos;adresse exacte de retrait vous est communiquée lors de la
              confirmation de votre commande.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
