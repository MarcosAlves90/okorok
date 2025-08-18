import Hero from "@/components/pages-components/home/organisms/hero/Hero";
import HeroTicker from "@/components/pages-components/home/molecules/hero-ticker/HeroTicker";
import MostVoted from "@/components/pages-components/home/molecules/section-most-voted/SectionMostVoted";
import AllRecipes from "@/components/pages-components/home/molecules/section-all-recipes/SectionAllRecipes";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HeroTicker />
      <MostVoted />
      <AllRecipes/>
    </div>
  );
}
