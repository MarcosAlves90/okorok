import { Heart, Search } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar(): React.ReactElement {
    return (
        <nav className="py-5 px-(--pc-padding) flex absolute top-0 right-0 left-0 z-10 text-background items-center justify-between text-sm md:text-base lg:text-lg" role="navigation" aria-label="Navegação principal">
            <div className="h-10 md:h-12 lg:h-14 flex items-center">
                <Link href="/" aria-label="Ir para a página inicial" className="flex items-center cursor-pointer">
                    <Image src="/logo.png" alt="Logotipo Okorok" width={60} height={60} className="h-full w-auto object-contain" priority />
                </Link>
            </div>
            <div className="flex items-center gap-10">
                <ul className="flex space-x-15 text-sm md:text-base lg:text-lg" role="list" aria-label="Menu principal">
                    <li className="text-sm md:text-base lg:text-lg">
                        <Link href="#" className="cursor-pointer" aria-label="Início">Início</Link>
                    </li>
                    <li className="text-sm md:text-base lg:text-lg">
                        <Link href="#" className="cursor-pointer" aria-label="Categorias">Categorias</Link>
                    </li>
                    <li className="text-sm md:text-base lg:text-lg">
                        <Link href="#" className="cursor-pointer" aria-label="Mais votadas">Mais votadas</Link>
                    </li>
                    <li className="text-sm md:text-base lg:text-lg">
                        <Link href="#" className="cursor-pointer" aria-label="Sobre">Sobre</Link>
                    </li>
                    <li className="text-sm md:text-base lg:text-lg">
                        <Link href="#" className="cursor-pointer" aria-label="Contato">Contato</Link>
                    </li>
                </ul>
                <div className="flex items-center gap-5">
                    <button type="button" className="text-foreground bg-background py-1 px-4 rounded-xl cursor-pointer hover:bg-foreground hover:text-background text-sm md:text-base lg:text-lg" aria-label="Minha conta">Minha conta</button>
                    <button type="button" className="inline-flex items-center justify-center" aria-label="Favoritos" title="Favoritos">
                        <Heart className="text-[#FF5353] fill-none hover:fill-[#FF5353] transition-colors cursor-pointer stroke-current" size={28} aria-hidden="true" />
                    </button>
                    <button type="button" className="inline-flex items-center justify-center" aria-label="Pesquisar" title="Pesquisar">
                        <Search className="text-background cursor-pointer" size={28} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </nav>
    );
}