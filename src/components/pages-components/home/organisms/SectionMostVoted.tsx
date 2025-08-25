import React from 'react';
import MostVotedCard from "../molecules/MostVotedCard";
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
    { id: "5", title: "Sabor do Dia", image: "/local-images/linguica.png", href: "/receitas/5" },
    { id: "6", title: "Receita Tradicional", image: "/local-images/linguica.png", href: "/receitas/6" },
];

export default function MostVoted(): React.ReactElement {
    return (
        <section id="mais-votadas" className="px-(--pc-padding) py-15 space-y-10">
            <h2 className="font-protest-strike text-foreground text-5xl flex items-center gap-3">
                <span>As Mais Votadas</span>
                <Star className="w-11 h-11 text-foreground fill-current" aria-hidden="true" stroke="none" fill="currentColor" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {sampleData.map((item) => (
                    <MostVotedCard key={item.id} imageSrc={item.image} title={item.title} href={item.href} />
                ))}
            </div>
        </section>
    );
}
