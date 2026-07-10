import { Phone, MessageCircle, Send, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./icons/SocialIcons";
import { siteConfig } from "@/lib/site-config";
import ScrollReveal from "./ScrollReveal";

const contacts = [
  {
    icon: Phone,
    label: "Téléphone",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Discuter maintenant",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@gourmandises.by.nani",
    href: siteConfig.socials.instagram,
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "Gourmandises By Nani",
    href: siteConfig.socials.facebook,
  },
  {
    icon: Send,
    label: "Messenger",
    value: "Envoyer un message",
    href: siteConfig.socials.messenger,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-chocolate-700 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
            Parlons de votre projet
          </span>
          <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">Contact</h2>
          <p className="mt-5 text-base leading-relaxed text-cream/75 md:text-lg">
            Une question, une envie particulière ? Contactez-nous par le canal
            de votre choix.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c, i) => (
            <ScrollReveal key={c.label} delay={(i % 3) * 0.08}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/60 hover:bg-cream/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-colors group-hover:bg-gold-500 group-hover:text-chocolate-900">
                  <c.icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-cream/50">{c.label}</p>
                  <p className="truncate text-sm font-medium text-cream">{c.value}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
