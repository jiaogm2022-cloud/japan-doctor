import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Departments from "@/components/Departments";
import Doctors from "@/components/Doctors";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import TawkTo from "@/components/TawkTo";
import FloatingContact from "@/components/FloatingContact";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Departments />
        <Doctors />
        <Pricing />
        <FAQ />
        <Booking />
      </main>
      <Footer />
      <TawkTo />
      <FloatingContact />
    </>
  );
}
