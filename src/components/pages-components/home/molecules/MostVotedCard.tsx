import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MostVotedCardProps {
    imageSrc: string;
    title: string;
    href?: string;
    alt?: string;
}

export default function MostVotedCard({ imageSrc, title, href = "#", alt }: MostVotedCardProps): React.ReactElement {
    const altText = alt ?? title;

    return (
        <article className="flex flex-col" aria-label={title}>
            <figure className="bg-foreground pb-1 space-y-1 border-3 border-foreground rounded-t-lg flex flex-col justify-center items-center text-background">
                <Image
                    src={imageSrc}
                    alt={altText}
                    width={400}
                    height={220}
                    className="-mt-3 object-cover w-full h-auto rounded-t-lg"
                    priority={false}
                />
                <figcaption className="text-background font-bold text-sm py-1 text-center">{title}</figcaption>
            </figure>

            <Link
                href={href}
                className="bg-background font-semibold hover:bg-foreground/30 transition-colors duration-200 ease-in-out py-3 text-sm border-2 border-foreground rounded-b-lg flex justify-center items-center text-foreground"
                aria-label={`Ver receita: ${title}`}
            >
                Ver receita
            </Link>
        </article>
    );
}
