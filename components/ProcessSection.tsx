import { Sparkles, Send, CheckCircle2, ChefHat, Truck } from "lucide-react";
import { processSteps } from "@/data/process";
import ScrollReveal from "./ScrollReveal";

const icons = { Sparkles, Send, CheckCircle2, ChefHat, Truck };

export default function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
          Simple &amp; sans stress
        </span>
        <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">
          Comment commander
        </h2>
        <p className="mt-5 text-base leading-relaxed text-chocolate-700/75 md:text-lg">
          De l&apos;idée à la dégustation, cinq étapes pour donner vie à votre
          création.
        </p>
      </ScrollReveal>

      <div className="relative mt-20">
        <div
          aria-hidden="true"
          className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-gold-300 via-rose-300 to-gold-300 md:left-1/2"
        />
        <ol className="space-y-12 md:space-y-0">
          {processSteps.map((step, i) => {
            const Icon = icons[step.icon as keyof typeof icons];
            const isEven = i % 2 === 0;
            return (
              <li key={step.id} className="relative md:grid md:grid-cols-2 md:gap-10 md:py-8">
                <ScrollReveal
                  className={`flex items-start gap-5 md:contents`}
                  y={24}
                >
                  <div
                    className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-rose-700 shadow-gold ring-4 ring-cream md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div
                    className={`flex-1 rounded-2xl border border-beige bg-white/70 p-6 shadow-soft md:col-span-1 ${
                      isEven ? "md:col-start-1 md:text-right md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                      Étape {step.step}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-chocolate-700">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-chocolate-700/75">
                      {step.description}
                    </p>
                  </div>
                  <div className="hidden md:block" />
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
