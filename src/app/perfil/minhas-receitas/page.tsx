import type { Metadata } from 'next';
import Link from 'next/link';
import RecipeCard from '@/components/pages-components/home/molecules/section-all-recipes/RecipeCard';
import Button from '@/components/atoms/Button';

export const metadata: Metadata = {
    title: 'Minhas Receitas',
};

export default function MinhasReceitas() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] py-20 px-[var(--pc-padding)]">
            <div className="border-2 border-foreground px-20 py-17 max-w-6xl w-full flex flex-col gap-6 rounded-xl h-full text-center text-foreground mx-auto">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="font-protest-strike text-4xl">Minhas Receitas</h1>
                        <p className="text-sm text-foreground/80 max-w-2xl">Aqui estão as receitas que você criou. Você pode editar, remover ou compartilhar cada uma delas.</p>
                    </div>

                        <div className="w-full flex items-center justify-between max-w-5xl">
                        <div className="flex items-center gap-3">
                            <input
                                aria-label="Pesquisar minhas receitas"
                                placeholder="Pesquisar..."
                                className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 text-sm focus:outline-none"
                            />
                            <select aria-label="Ordenar" className="bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 text-sm focus:outline-none">
                                <option>Mais recentes</option>
                                <option>Mais votadas</option>
                                <option>Alfabético</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="primary" size="sm">Criar receita</Button>
                            </Link>
                            <Link href="/perfil">
                                <Button variant="primary" size="sm">Voltar ao perfil</Button>
                            </Link>
                        </div>
                    </div>

                    <section className="w-full max-w-5xl mt-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <RecipeCard key={i} />
                            ))}
                        </div>
                    </section>

                    <div className="w-full max-w-5xl mt-6 text-left">
                        <h2 className="text-lg font-semibold">Dica</h2>
                        <p className="text-sm text-foreground/80">Clique em uma receita para ver detalhes, editar ou remover. Esta lista mostra um exemplo com cards reutilizados do layout principal.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
