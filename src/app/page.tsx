// app/page.tsx
import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import Categories from "@/components/home/Categories";
import Recommended from "@/components/home/Recommended";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <Hero />
      <div className="mx-auto max-w-7xl px-6">
        <PromoBanner />
      </div>
      <Categories />
      <Recommended />
    </main>
  );
}
