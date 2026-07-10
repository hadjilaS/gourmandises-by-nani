"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, CheckCircle2 } from "lucide-react";
import { orderSchema, type OrderSchema } from "@/lib/order-schema";
import ScrollReveal from "./ScrollReveal";

const cakeTypes = [
  "Gâteau anniversaire",
  "Wedding cake",
  "Number cake",
  "Bento cake",
  "Cupcakes",
  "Entremets",
  "Sweet table",
  "Buffet salé",
  "Buffet mixte",
  "Autre",
];

const inputClass =
  "w-full rounded-xl border border-beige bg-white/80 px-4 py-3 text-sm text-chocolate-700 placeholder:text-chocolate-700/40 transition-all duration-300 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-100";

const labelClass = "mb-1.5 block text-sm font-medium text-chocolate-700";

export default function OrderForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderSchema) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur");
      setStatus("success");
      reset();
      setFileName(null);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="order" className="mx-auto max-w-4xl px-5 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
          Votre projet, notre savoir-faire
        </span>
        <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">
          Formulaire de commande
        </h2>
        <p className="mt-5 text-base leading-relaxed text-chocolate-700/75 md:text-lg">
          Racontez-nous votre événement, nous revenons vers vous sous 24h.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-14 rounded-[2rem] border border-beige bg-white/70 p-6 shadow-elegant backdrop-blur-sm sm:p-10"
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Nom complet</label>
              <input id="name" className={inputClass} placeholder="Votre nom" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-rose-700">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">Téléphone</label>
              <input id="phone" className={inputClass} placeholder="05 XX XX XX XX" {...register("phone")} />
              {errors.phone && <p className="mt-1 text-xs text-rose-700">{errors.phone.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="email">Email</label>
              <input id="email" type="email" className={inputClass} placeholder="vous@email.com" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-rose-700">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="eventDate">Date de l&apos;événement</label>
              <input id="eventDate" type="date" className={inputClass} {...register("eventDate")} />
              {errors.eventDate && <p className="mt-1 text-xs text-rose-700">{errors.eventDate.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="guestCount">Nombre de personnes</label>
              <input id="guestCount" className={inputClass} placeholder="Ex : 40" {...register("guestCount")} />
              {errors.guestCount && <p className="mt-1 text-xs text-rose-700">{errors.guestCount.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="cakeType">Type de création</label>
              <select id="cakeType" className={inputClass} defaultValue="" {...register("cakeType")}>
                <option value="" disabled>Choisissez une option</option>
                {cakeTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.cakeType && <p className="mt-1 text-xs text-rose-700">{errors.cakeType.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="flavor">Saveur souhaitée</label>
              <input id="flavor" className={inputClass} placeholder="Ex : vanille, chocolat, pistache..." {...register("flavor")} />
              {errors.flavor && <p className="mt-1 text-xs text-rose-700">{errors.flavor.message}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="colors">Couleurs souhaitées</label>
              <input id="colors" className={inputClass} placeholder="Ex : rose poudré, doré..." {...register("colors")} />
              {errors.colors && <p className="mt-1 text-xs text-rose-700">{errors.colors.message}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className={labelClass} htmlFor="decoration">Décoration souhaitée</label>
            <textarea
              id="decoration"
              rows={3}
              className={inputClass}
              placeholder="Fleurs fraîches, dorure, thème particulier..."
              {...register("decoration")}
            />
            {errors.decoration && <p className="mt-1 text-xs text-rose-700">{errors.decoration.message}</p>}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="customText">Texte personnalisé (optionnel)</label>
              <input id="customText" className={inputClass} placeholder="Ex : Joyeux Anniversaire Lina" {...register("customText")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="inspirationPhoto">Photo d&apos;inspiration (optionnel)</label>
              <label
                htmlFor="inspirationPhoto"
                className={`${inputClass} flex cursor-pointer items-center justify-between gap-2 text-chocolate-700/60`}
              >
                <span className="truncate">{fileName ?? "Choisir un fichier..."}</span>
                <UploadCloud size={18} className="shrink-0 text-rose-700" />
              </label>
              <input
                id="inspirationPhoto"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className={labelClass} htmlFor="message">Message (optionnel)</label>
            <textarea
              id="message"
              rows={3}
              className={inputClass}
              placeholder="Toute information complémentaire utile à votre commande"
              {...register("message")}
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-chocolate-700 px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-gold transition-colors hover:bg-rose-700 disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Envoi en cours...
              </>
            ) : (
              "Envoyer la demande"
            )}
          </motion.button>

          {status === "success" && (
            <p className="mt-4 flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle2 size={16} /> Votre demande a bien été envoyée. Nous vous répondrons rapidement !
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-rose-700">
              Une erreur est survenue. Merci de réessayer ou de nous contacter directement.
            </p>
          )}
        </form>
      </ScrollReveal>
    </section>
  );
}
