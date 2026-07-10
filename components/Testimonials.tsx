"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import ScrollReveal from "./ScrollReveal";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-beige/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
            Ils nous font confiance
          </span>
          <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">
            Avis clients
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="flex h-full flex-col rounded-[1.75rem] border border-beige bg-white/80 p-7 shadow-soft">
                  <Quote className="mb-3 text-rose-300" size={28} aria-hidden="true" />
                  <div className="mb-3 flex gap-1 text-gold-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-chocolate-700/85">
                    &laquo; {t.quote} &raquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-beige pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 font-display text-rose-700">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-chocolate-700">{t.name}</p>
                      <p className="text-xs text-chocolate-700/60">{t.event}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>
      </div>
    </section>
  );
}
