import Hero from "@/components/Hero";
import About from "@/components/About";
import Creations from "@/components/Creations";
import Gallery from "@/components/Gallery";
import ProcessSection from "@/components/ProcessSection";
import OrderForm from "@/components/OrderForm";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider />
      <Creations />
      <Gallery />
      <ProcessSection />
      <SectionDivider />
      <OrderForm />
      <Testimonials />
      <Faq />
      <LocationSection />
      <ContactSection />
    </>
  );
}
