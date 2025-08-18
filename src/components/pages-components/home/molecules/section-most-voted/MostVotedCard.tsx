import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MostVotedCardProps {
    imageSrc: string;
    title: string;
    href?: string;
    alt?: string;
}

export default function MostVotedCard({ imageSrc, title, href = "#", alt }: MostVotedCardProps) {
    const altText = alt ?? title;

    return (
        <article className="flex flex-col" aria-label={title}>
            <figure className="bg-foreground pb-2 space-y-2 border-3 border-foreground rounded-t-xl flex flex-col justify-center items-center text-background">
                <Image
                    src={imageSrc}
                    alt={altText}
                    width={500}
                    height={300}
                    className="-mt-5 object-cover w-full h-auto"
                    priority={false}
                />
                <figcaption className="text-background font-bold text-xl py-2 text-center">{title}</figcaption>
            </figure>

            <Link
                href={href}
                className="bg-background font-bold hover:bg-foreground/30 py-5 text-xl border-3 border-foreground rounded-b-xl flex justify-center items-center text-foreground"
                aria-label={`Ver receita: ${title}`}
            >
                Ver receita
            </Link>
        </article>
    );
}
