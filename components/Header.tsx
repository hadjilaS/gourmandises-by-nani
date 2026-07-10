"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./icons/SocialIcons";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#creations", label: "Créations" },
  { href: "#gallery", label: "Galerie" },
  { href: "#process", label: "Comment commander" },
  { href: "#testimonials", label: "Avis" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="font-display text-xl md:text-2xl tracking-wide text-chocolate-700">
          Gourmandises <span className="italic text-rose-700">By Nani</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-chocolate-700/80 hover:text-rose-700 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-chocolate-700/70 hover:text-rose-700 transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={siteConfig.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-chocolate-700/70 hover:text-rose-700 transition-colors"
          >
            <FacebookIcon size={18} />
          </a>
          <a
            href="#order"
            className="ml-2 rounded-full bg-chocolate-700 px-5 py-2.5 text-sm font-medium text-cream shadow-gold transition-all hover:bg-rose-700 hover:-translate-y-0.5"
          >
            Commander
          </a>
        </div>

        <button
          className="lg:hidden text-chocolate-700"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-chocolate-900/40 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto flex h-full w-[82%] max-w-sm flex-col gap-8 bg-cream px-8 py-8 shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-chocolate-700">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Fermer le menu">
                  <X size={24} className="text-chocolate-700" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl text-chocolate-700 hover:text-rose-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href="#order"
                onClick={() => setOpen(false)}
                className="mt-auto rounded-full bg-chocolate-700 px-6 py-3.5 text-center text-sm font-medium text-cream"
              >
                Commander maintenant
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
