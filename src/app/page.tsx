import Hero from "@/components/pages-components/home/organisms/Hero";
import HeroTicker from "@/components/pages-components/home/molecules/hero-ticker/HeroTicker";
import MostVoted from "@/components/pages-components/home/organisms/SectionMostVoted";
import AllRecipes from "@/components/pages-components/home/organisms/SectionAllRecipesWrapper";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroTicker />
      <MostVoted />
      <AllRecipes />
    </main>
  );
}
