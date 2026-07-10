"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "@/data/faq";
import ScrollReveal from "./ScrollReveal";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
          Questions fréquentes
        </span>
        <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">FAQ</h2>
      </ScrollReveal>

      <div className="mt-14 space-y-4">
        {faqItems.map((item, i) => {
          const isOpen = openId === item.id;
          return (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-rose-300 bg-white" : "border-beige bg-white/60"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-chocolate-700">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-chocolate-700/75">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
