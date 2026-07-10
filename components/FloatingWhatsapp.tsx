import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function FloatingWhatsapp() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-elegant transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle size={26} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-600/50" />
    </a>
  );
}
