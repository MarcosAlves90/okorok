import Link from 'next/link'
import Button from '@/components/atoms/Button'

interface Props {
    searchTerm: string
    setSearchTerm: (v: string) => void
    selectedCount: number
    totalCount: number
    onSelectAll: () => void
    onDeleteSelected: () => void
    deleting: boolean
}

export default function MinhasReceitasToolbar({
    searchTerm,
    setSearchTerm,
    selectedCount,
    totalCount,
    onSelectAll,
    onDeleteSelected,
    deleting
}: Props) {
    return (
        <div className="w-full flex items-center justify-between max-w-5xl">
            <div className="flex items-center gap-3">
                <input
                    aria-label="Pesquisar minhas receitas"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-md px-4 py-3 text-sm focus:outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
                {selectedCount > 0 && (
                    <>
                        <button
                            onClick={onSelectAll}
                            className="px-3 py-2 text-sm bg-transparent text-foreground-dark border-2 border-foreground rounded-md hover:bg-foreground/10 transition-colors"
                        >
                            {selectedCount === totalCount ? 'Desmarcar todas' : 'Selecionar todas'}
                        </button>
                        <button
                            onClick={onDeleteSelected}
                            disabled={deleting}
                            className="px-3 py-2 text-sm bg-red-600 text-white border border-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {deleting ? 'Deletando...' : `Deletar (${selectedCount})`}
                        </button>
                    </>
                )}
                <Link href="/receitas/criar">
                    <Button variant="primary" size="sm">Criar receita</Button>
                </Link>
                <Link href="/perfil">
                    <Button variant="primary" size="sm">Voltar ao perfil</Button>
                </Link>
            </div>
        </div>
    )
}
