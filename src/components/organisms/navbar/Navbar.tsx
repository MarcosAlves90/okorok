"use client";

import { Heart, Search } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';

export default function Navbar(): React.ReactElement {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Se não for a página inicial, isso mantem o scrolled sempre ativo
        if (pathname && pathname !== '/') {
            setScrolled(true);
            return;
        }

        // Na página inicia, usa o listener normal
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    return (
    <nav role="navigation" aria-label="Navegação principal" className={`py-3 px-(--pc-padding) flex fixed w-full top-0 right-0 left-0 z-50 items-center justify-between text-xs md:text-sm lg:text-base transition-all duration-200 ease-in-out border-b-2 ${scrolled ? 'bg-background/70 backdrop-blur-2xl text-foreground border-foreground' : 'bg-transparent text-background border-background/5'}`}>
            <div className="h-10 md:h-12 lg:h-14 flex items-center">
                <Link href="/" aria-label="Ir para a página inicial" className="flex items-center cursor-pointer">
                    <Image src="/logo.png" alt="Logotipo Okorok" width={60} height={60} className="h-full w-auto object-contain" priority />
                </Link>
            </div>
            <div className="flex items-center gap-10">
                <ul className="flex space-x-15 text-xs md:text-sm lg:text-base" role="list" aria-label="Menu principal">
                    <NavItem href="/" label="Início" scrolled={scrolled} ariaLabel="Início" />
                    <NavItem href="/#most-voted" label="Mais votadas" scrolled={scrolled} ariaLabel="Mais votadas" />
                    <NavItem href="/#all-recipes" label="Categorias" scrolled={scrolled} ariaLabel="Categorias" />
                    <NavItem href="/sobre" label="Sobre" scrolled={scrolled} ariaLabel="Sobre" />
                    <NavItem href="/contact" label="Contato" scrolled={scrolled} ariaLabel="Contato" />
                </ul>
                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        aria-label="Minha conta"
                        className={`py-1 font-medium px-4 rounded-xl cursor-pointer text-xs md:text-sm lg:text-base transition-colors duration-300 ease-in-out ${scrolled ? 'bg-foreground text-background hover:bg-foreground/30 hover:text-foreground' : 'text-foreground bg-background hover:bg-foreground hover:text-background'}`}>
                        Minha conta
                    </button>
                    <button type="button" className="inline-flex items-center justify-center" aria-label="Favoritos" title="Favoritos">
                        <Heart className="text-[#FF5353] fill-none hover:fill-[#FF5353] transition-colors duration-300 ease-in-out cursor-pointer stroke-current" size={28} aria-hidden="true" />
                    </button>
                    <button type="button" className="inline-flex items-center justify-center" aria-label="Pesquisar" title="Pesquisar">
                        <Search className={`${scrolled ? 'text-foreground' : 'text-background'} transition-colors duration-300 ease-in-out cursor-pointer`} size={28} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </nav>
    );
}