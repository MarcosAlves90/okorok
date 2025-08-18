import MostVotedCard from "./MostVotedCard";
import { Star } from "lucide-react";

type Item = {
    id: string;
    title: string;
    image: string;
    href?: string;
};

const sampleData: Item[] = [
    { id: "1", title: "Carne da Receita", image: "/local-images/linguica.png", href: "/receitas/1" },
    { id: "2", title: "Prato do Chef", image: "/local-images/linguica.png", href: "/receitas/2" },
    { id: "3", title: "Especial da Casa", image: "/local-images/linguica.png", href: "/receitas/3" },
    { id: "4", title: "Clássico", image: "/local-images/linguica.png", href: "/receitas/4" },
];

export default function MostVoted() {
    return (
        <section className="px-(--pc-padding) py-15 space-y-10">
            <h2 className="font-protest-strike text-foreground text-5xl flex items-center gap-3">
                <span>As Mais Votadas</span>
                <Star className="w-11 h-11 text-foreground fill-current" aria-hidden="true" stroke="none" fill="currentColor" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {sampleData.map((item) => (
                    <MostVotedCard key={item.id} imageSrc={item.image} title={item.title} href={item.href} />
                ))}
            </div>
        </section>
    );
}
