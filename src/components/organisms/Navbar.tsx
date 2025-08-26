'use client'

import { Heart, Search } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks/UserContext';
import NavItem from '@/components/atoms/NavItem';

export default function Navbar(): React.ReactElement {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUser();
    const isLogged = !!user;

    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const handleAccountClick = () => router.push(isLogged ? '/perfil' : '/login');
    const toggleSearch = () => setSearchOpen((s) => !s);

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [searchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página ao enviar o formulário.
        const q = searchQuery.trim(); // Remove espaços extras do início e fim da busca.
        if (q) router.push(`/?q=${encodeURIComponent(q)}`); // Se houver texto, redireciona para a home com o termo de busca na URL.
        setSearchOpen(false); // Fecha o campo de busca.
        setSearchQuery(''); // Limpa o campo de busca.
    };
    
    // 'scrolled' é sempre true se não estiver na home
    useEffect(() => {
        if (pathname && pathname !== '/') {
            setScrolled(true);
            return;
        }
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    const navClass = `py-3 px-(--pc-padding) flex fixed w-full top-0 right-0 left-0 z-50 items-center justify-between text-xs md:text-sm lg:text-base transition-all duration-200 ease-in-out border-b-2 ${scrolled ? 'bg-background/70 backdrop-blur-2xl text-foreground border-foreground' : 'bg-transparent text-background border-background/5'}`;
    const accountBtnClass = `py-1 font-medium px-4 rounded-md cursor-pointer text-xs md:text-sm lg:text-base transition-colors duration-300 ease-in-out ${scrolled ? 'bg-foreground text-background hover:bg-foreground/30 hover:text-foreground' : 'text-foreground bg-background hover:bg-foreground hover:text-background'}`;
    const searchInputClass = `transition-all duration-300 ease-in-out text-sm rounded-md h-8 bg-transparent outline-none focus:ring-0 border-2 ${scrolled ? 'border-foreground text-foreground' : 'border-background/20 text-background'} ${searchOpen ? 'w-48 px-3' : 'w-0 px-0 invisible opacity-0'} overflow-hidden`;
    const searchIconClass = `${scrolled ? 'text-foreground' : 'text-background'} transition-colors duration-300 ease-in-out cursor-pointer`;

    const navItems = [
        ['/', 'Início'],
        ['/#mais-votadas', 'Mais votadas'],
        ['/#todas-receitas', 'Categorias'],
        ['/sobre', 'Sobre'],
        ['/contato', 'Contato'],
        ['/usuarios', 'Usuários'],
    ] as const;

    return (
        <nav role="navigation" aria-label="Navegação principal" className={navClass}>
            <div className="h-10 md:h-12 lg:h-14 flex items-center">
                <Link href="/" aria-label="Ir para a página inicial" className="flex items-center cursor-pointer">
                    <Image src="/logo.png" alt="Logotipo Okorok" width={60} height={60} className="h-full w-auto object-contain" priority />
                </Link>
            </div>

            <div className="flex items-center gap-10">
                <ul className="flex space-x-15 text-xs md:text-sm lg:text-base" role="list" aria-label="Menu principal">
                    {navItems.map(([href, label]) => (
                        <NavItem key={href} href={href} label={label} scrolled={scrolled} ariaLabel={label} />
                    ))}
                </ul>

                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        aria-label={isLogged ? 'Minha conta' : 'Login'}
                        title={isLogged ? 'Minha conta' : 'Login'}
                        onClick={handleAccountClick}
                        className={accountBtnClass}
                    >
                        {isLogged ? 'Minha conta' : 'Login'}
                    </button>

                    <button type="button" className="inline-flex items-center justify-center" aria-label="Favoritos" title="Favoritos">
                        <Link href={"/perfil/receitas-marcadas"} aria-label="Botão de receitas marcadas">
                            <Heart className="text-[#FF5353] fill-none hover:fill-[#FF5353] transition-colors duration-300 ease-in-out cursor-pointer stroke-current" size={28} aria-hidden="true" />
                        </Link>
                    </button>

                    <form onSubmit={handleSearchSubmit} className="inline-flex items-center justify-center">
                        <input
                            ref={searchInputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                            type="search"
                            aria-label="Pesquisar receitas"
                            placeholder="Pesquisar..."
                            className={searchInputClass}
                        />

                        <button
                            type="button"
                            onClick={toggleSearch}
                            aria-label={searchOpen ? 'Fechar pesquisa' : 'Pesquisar'}
                            aria-expanded={searchOpen}
                            title="Pesquisar"
                            className="ml-2 inline-flex items-center justify-center"
                        >
                            <Search className={searchIconClass} size={28} aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}