import About from "@/components/landing/About";
import Brands from "@/components/landing/Brands";
import CTA from "@/components/landing/CTA";
import Contact from "@/components/landing/Contact";
import Cursor from "@/components/landing/Cursor";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Process from "@/components/landing/Process";
import Projects from "@/components/landing/Projects";
import Solutions from "@/components/landing/Solutions";
import Testimonials from "@/components/landing/Testimonials";
import WhyXR from "@/components/landing/WhyXR";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Solutions />
        <Process />
        <Projects />
        <WhyXR />
        <Brands />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </>
  );
}
