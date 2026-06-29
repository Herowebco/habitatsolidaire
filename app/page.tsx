import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Promesse } from "@/components/Promesse";
import { CircuitDon } from "@/components/CircuitDon";
import { Poles } from "@/components/Poles";
import { Stats } from "@/components/Stats";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Promesse />
        <CircuitDon />
        <Poles />
        <Stats />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
