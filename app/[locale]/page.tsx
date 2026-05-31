import Hero from "@/components/sections/Hero";
import Classes from "@/components/sections/Classes";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main
      className="overflow-x-hidden"
      style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
    >
      <Hero />
      <Classes />
      <Contact />
    </main>
  );
}
