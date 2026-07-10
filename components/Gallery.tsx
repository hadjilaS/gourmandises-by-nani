"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import type { CreationCategory } from "@/types";
import ScrollReveal from "./ScrollReveal";

const filters: { id: CreationCategory | "tous"; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "anniversaire", label: "Anniversaire" },
  { id: "mariage", label: "Mariage" },
  { id: "sale", label: "Salé" },
  { id: "sucre", label: "Sucré" },
  { id: "bapteme", label: "Baptême" },
  { id: "naissance", label: "Naissance" },
  { id: "entreprise", label: "Entreprise" },
];

export default function Gallery() {
  const [active, setActive] = useState<CreationCategory | "tous">("tous");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "tous" ? galleryItems : galleryItems.filter((g) => g.category === active)),
    [active]
  );

  const openLightbox = (id: string) => {
    const idx = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(idx);
  };

  const close = () => setLightboxIndex(null);
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  const active_item = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="bg-beige/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
            Portfolio
          </span>
          <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">
            Galerie
          </h2>
          <p className="mt-5 text-base leading-relaxed text-chocolate-700/75 md:text-lg">
            Un aperçu de nos réalisations récentes, sucrées comme salées.
          </p>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === f.id
                  ? "border-chocolate-700 bg-chocolate-700 text-cream shadow-gold"
                  : "border-rose-300/60 bg-white/70 text-chocolate-700 hover:border-rose-500 hover:text-rose-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-chocolate-700/60">
            Prochainement de nouvelles créations dans cette catégorie.
          </p>
        ) : (
          <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 *:mb-5">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={(i % 6) * 0.06}>
                <button
                  onClick={() => openLightbox(item.id)}
                  className="group relative block w-full overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 hover:shadow-elegant"
                  aria-label={`Agrandir : ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={750}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-chocolate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-left text-sm text-cream">{item.title}</p>
                  </div>
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/85 text-chocolate-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ZoomIn size={16} />
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active_item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 flex items-center justify-center bg-chocolate-900/90 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={close}
              aria-label="Fermer"
              className="absolute right-5 top-5 text-cream/80 hover:text-cream"
            >
              <X size={30} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 md:left-6"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 md:right-6"
            >
              <ChevronRight size={26} />
            </button>

            <motion.div
              key={active_item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[82vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl shadow-elegant">
                <Image
                  src={active_item.image}
                  alt={active_item.title}
                  fill
                  sizes="90vw"
                  className="object-contain bg-chocolate-900"
                />
              </div>
              <p className="mt-4 text-center text-sm text-cream/90">{active_item.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
