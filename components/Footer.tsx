import Link from "next/link";
import { Send } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./icons/SocialIcons";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  { href: "#about", label: "À propos" },
  { href: "#creations", label: "Créations" },
  { href: "#gallery", label: "Galerie" },
  { href: "#order", label: "Commander" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="bg-chocolate-900 text-cream/70">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-cream">
              Gourmandises <span className="italic text-gold-300">By Nani</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href={siteConfig.socials.messenger}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <Send size={17} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gold-300">
              Liens rapides
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gold-300">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>{siteConfig.phoneDisplay}</li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.location.city}, Algérie</li>
              <li className="text-cream/50">{siteConfig.location.note}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Gourmandises By Nani. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-cream">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-cream">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
